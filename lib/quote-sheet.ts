import { JWT } from "google-auth-library";

import { getProductLine } from "@/content/products";
import type { QuoteRequest } from "./quote-schema";
import type { DeliveryResult } from "./quote-email";

/**
 * Backup lead log (technical spec §5).
 *
 * Every submission is appended to a Google Sheet the sales team can open
 * without a developer in the loop. Deliberately not a database: no infra to
 * stand up, no extra login. If filtering or status tracking is ever needed,
 * this is the piece that gets swapped for Supabase.
 *
 * Uses `google-auth-library` + the Sheets REST endpoint rather than the full
 * `googleapis` package, which is far larger than a single append call needs.
 */

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export const SHEET_HEADERS = [
  "Submitted at",
  "Company",
  "Contact",
  "Email",
  "Phone",
  "Country",
  "Product lines",
  "Quantity",
  "Target date",
  "Message",
  "Source IP",
] as const;

function privateKey(): string | undefined {
  const raw = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  // Vercel stores the PEM with literal \n sequences.
  return raw ? raw.replace(/\n/g, "\n") : undefined;
}

function toRow(
  data: QuoteRequest,
  meta: { submittedAt: string; ip: string },
): string[] {
  return [
    meta.submittedAt,
    data.company,
    data.name,
    data.email,
    data.phone || "",
    data.country || "",
    data.productLines
      .map((slug) => getProductLine(slug)?.name ?? slug)
      .join(", "),
    data.quantity || "",
    data.targetDate || "",
    data.message,
    meta.ip,
  ];
}

export async function appendQuoteToSheet(
  data: QuoteRequest,
  meta: { submittedAt: string; ip: string },
): Promise<DeliveryResult> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const key = privateKey();
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || "Leads";

  if (!clientEmail || !spreadsheetId || !key) {
    return { ok: false, skipped: true, error: "sheets-not-configured" };
  }

  try {
    const auth = new JWT({ email: clientEmail, key, scopes: SCOPES });
    const { token } = await auth.getAccessToken();
    if (!token) throw new Error("no access token returned");

    const range = encodeURIComponent(`${sheetName}!A:K`);
    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}` +
      `/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ values: [toRow(data, meta)] }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[quote] Sheets append failed", res.status, detail);
      return { ok: false, skipped: false, error: `sheets-${res.status}` };
    }
    return { ok: true, skipped: false };
  } catch (error) {
    console.error("[quote] Sheets append threw", error);
    return {
      ok: false,
      skipped: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
