import { z } from "zod";

import { productLineSlugs } from "@/content/products";

/**
 * Shared between the client form and the route handler. The server re-parses
 * every submission with this schema — client-side validation is a convenience,
 * never a trust boundary (technical spec §5).
 */
export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2, "Please give your name.").max(120),
  company: z.string().trim().min(2, "Please give your company name.").max(160),
  email: z.email("Please give a valid work email address.").max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  productLines: z
    .array(z.enum(productLineSlugs() as [string, ...string[]]))
    .min(1, "Select at least one product line.")
    .max(12),
  quantity: z.string().trim().max(120).optional().or(z.literal("")),
  targetDate: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about the order.")
    .max(4000),

  /**
   * Honeypot. Hidden from real users and ignored by assistive technology;
   * any value at all means a bot filled the form in.
   *
   * Deliberately NOT constrained here. If the schema rejected a populated
   * honeypot, the 400 would name the field and tell the bot exactly which
   * one to leave alone next time. The route handler checks it after a
   * successful parse and answers 200 as though the lead went through.
   */
  website: z.string().max(400).optional(),

  /** Cloudflare Turnstile token, verified server-side before anything else. */
  turnstileToken: z.string().max(4096).optional().or(z.literal("")),
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;

export type QuoteFieldErrors = Partial<
  Record<keyof QuoteRequest, string[] | undefined>
>;

export interface QuoteResponse {
  ok: boolean;
  message: string;
  fieldErrors?: QuoteFieldErrors;
}
