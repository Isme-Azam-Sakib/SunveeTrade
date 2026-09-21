const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  ok: boolean;
  /** `true` when no secret is configured, so callers can log the gap. */
  skipped: boolean;
  errors?: string[];
}

/**
 * Verifies a Turnstile token (technical spec §5).
 *
 * With no `TURNSTILE_SECRET_KEY` set the check is skipped so local development
 * works without Cloudflare credentials. The route handler refuses to skip in
 * production.
 */
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return { ok: true, skipped: true };

  if (!token) {
    return { ok: false, skipped: false, errors: ["missing-input-response"] };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      cache: "no-store",
    });
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    return {
      ok: data.success === true,
      skipped: false,
      errors: data["error-codes"],
    };
  } catch (error) {
    console.error("[turnstile] verification request failed", error);
    return { ok: false, skipped: false, errors: ["verification-failed"] };
  }
}
