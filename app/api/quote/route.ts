import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { sendQuoteEmail } from "@/lib/quote-email";
import {
  quoteRequestSchema,
  type QuoteFieldErrors,
  type QuoteResponse,
} from "@/lib/quote-schema";
import { appendQuoteToSheet } from "@/lib/quote-sheet";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

/** Lead delivery must never be served from a cache. */
export const dynamic = "force-dynamic";

const GENERIC_ERROR =
  "We could not send your request just now. Please email sohag@sunveeintl.com and we will pick it up straight away.";

function json(body: QuoteResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);

  // 1. Rate limit before doing any work.
  const limit = checkRateLimit(`quote:${ip}`);
  if (!limit.ok) {
    return json(
      {
        ok: false,
        message:
          "That is a few requests in a short window. Please try again shortly, or email us directly.",
      },
      429,
      { "retry-after": String(limit.retryAfter) },
    );
  }

  // 2. Parse and validate server-side. Client checks are never trusted.
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Malformed request." }, 400);
  }

  const parsed = quoteRequestSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as QuoteFieldErrors;
    return json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors,
      },
      400,
    );
  }
  const data = parsed.data;

  // 3. Honeypot. A populated hidden field is a bot; answer 200 so it learns
  //    nothing, but drop the submission.
  if (data.website) {
    console.warn("[quote] honeypot triggered", { ip });
    return json({ ok: true, message: "Thank you — your request is in." }, 200);
  }

  // 4. Turnstile.
  const turnstile = await verifyTurnstile(data.turnstileToken, ip);
  if (turnstile.skipped && process.env.NODE_ENV === "production") {
    console.error(
      "[quote] TURNSTILE_SECRET_KEY is not set in production — refusing to accept unverified submissions",
    );
    return json({ ok: false, message: GENERIC_ERROR }, 500);
  }
  if (!turnstile.ok) {
    return json(
      {
        ok: false,
        message:
          "The spam check did not pass. Please reload the page and try once more.",
      },
      400,
    );
  }

  const meta = { submittedAt: new Date().toISOString(), ip };

  // 5. Deliver. Email is the primary channel, the sheet is the backup record;
  //    run both and only fail the request if the lead reached neither.
  const [email, sheet] = await Promise.all([
    sendQuoteEmail(data, meta),
    appendQuoteToSheet(data, meta),
  ]);

  if (!email.ok && !sheet.ok) {
    // Local development before Resend and Sheets credentials exist: print the
    // lead so the form can be exercised end to end. Never in production —
    // there, nothing delivered is a genuine failure the visitor must hear
    // about, so they can fall back to email.
    if (
      process.env.NODE_ENV !== "production" &&
      email.skipped &&
      sheet.skipped
    ) {
      console.info(
        "[quote] no delivery channel configured; lead follows\n",
        JSON.stringify(
          { ...data, turnstileToken: undefined, ...meta },
          null,
          2,
        ),
      );
      return json(
        {
          ok: true,
          message:
            "Logged to the server console. Configure RESEND_API_KEY or the Google Sheets variables to deliver for real.",
        },
        200,
      );
    }

    console.error("[quote] lead was not delivered anywhere", {
      email: email.error,
      sheet: sheet.error,
      company: data.company,
    });
    return json({ ok: false, message: GENERIC_ERROR }, 502);
  }

  if (!email.ok) {
    console.error("[quote] email delivery failed, sheet row written", {
      error: email.error,
    });
  }
  if (!sheet.ok) {
    console.error("[quote] sheet append failed, email sent", {
      error: sheet.error,
    });
  }

  return json(
    {
      ok: true,
      message:
        "Thank you — your request is with our merchandising team. Expect a reply within one working day.",
    },
    200,
  );
}
