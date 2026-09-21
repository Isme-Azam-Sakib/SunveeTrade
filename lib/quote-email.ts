import { Resend } from "resend";

import { getProductLine } from "@/content/products";
import type { QuoteRequest } from "./quote-schema";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lineNames(slugs: readonly string[]): string {
  return slugs.map((slug) => getProductLine(slug)?.name ?? slug).join(", ");
}

function recipients(): string[] {
  return (process.env.SALES_NOTIFICATION_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
}

export interface DeliveryResult {
  ok: boolean;
  skipped: boolean;
  error?: string;
}

/**
 * Primary delivery: a transactional email to the sales contacts, sent the
 * moment a quote request is validated (technical spec §5).
 */
export async function sendQuoteEmail(
  data: QuoteRequest,
  meta: { submittedAt: string; ip: string },
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = recipients();
  const from =
    process.env.QUOTE_FROM_EMAIL?.trim() ||
    "Sunvee Website <onboarding@resend.dev>";

  if (!apiKey || to.length === 0) {
    return { ok: false, skipped: true, error: "email-not-configured" };
  }

  const rows: [string, string][] = [
    ["Company", data.company],
    ["Contact", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Country", data.country || "—"],
    ["Product lines", lineNames(data.productLines)],
    ["Quantity", data.quantity || "—"],
    ["Target date", data.targetDate || "—"],
    ["Submitted", meta.submittedAt],
    ["Source IP", meta.ip],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#14161a;line-height:1.6">
      <h2 style="margin:0 0 4px;font-weight:600">New quote request</h2>
      <p style="margin:0 0 20px;color:#5a6068">
        ${escapeHtml(data.company)} &middot; ${escapeHtml(lineNames(data.productLines))}
      </p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 16px 8px 0;color:#7d848c;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
            <td style="padding:8px 0;font-size:14px">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;color:#7d848c;font-weight:600">Message</h3>
      <p style="margin:0;white-space:pre-wrap;font-size:14px">${escapeHtml(data.message)}</p>
    </div>
  `;

  const text = [
    "New quote request",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    data.message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Quote request — ${data.company}`,
      html,
      text,
    });

    if (error) {
      console.error("[quote] Resend rejected the message", error);
      return { ok: false, skipped: false, error: error.message };
    }
    return { ok: true, skipped: false };
  } catch (error) {
    console.error("[quote] Resend request failed", error);
    return {
      ok: false,
      skipped: false,
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
