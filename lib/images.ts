import type { MediaRef } from "@/content/types";

/**
 * Resolves a bucket-relative media key to a URL (technical spec §4).
 *
 * In production `NEXT_PUBLIC_IMAGE_CDN_DOMAIN` points at the Cloudflare R2
 * public bucket or custom domain. When it is unset, keys resolve against the
 * local `/media` staging directory so the site renders in development before
 * the bucket exists. The key itself is identical in both cases, so switching
 * is a single environment variable.
 */
const origin = normaliseOrigin(process.env.NEXT_PUBLIC_IMAGE_CDN_DOMAIN);

function normaliseOrigin(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  return withProtocol.replace(/\/+$/, "");
}

export function mediaUrl(key: string): string {
  if (/^https?:\/\//i.test(key)) return key;
  const clean = key.replace(/^\/+/, "");
  return origin ? `${origin}/${clean}` : `/media/${clean}`;
}

/** Convenience for spreading a `MediaRef` straight onto `next/image`. */
export function imageProps(ref: MediaRef): { src: string; alt: string } {
  return { src: mediaUrl(ref.key), alt: ref.alt };
}
