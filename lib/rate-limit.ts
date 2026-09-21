/**
 * Per-IP fixed-window rate limiter (technical spec §5).
 *
 * Lead volume is low and high-value, so an in-memory limiter is proportionate:
 * no extra infrastructure, and it stops the obvious abuse case of a script
 * hammering the endpoint. Two caveats worth knowing:
 *
 *  - State is per serverless instance, so the effective limit across a fleet
 *    is (limit x instances). That is fine as a brake, not as a hard quota.
 *  - It resets on cold start.
 *
 * If either becomes a problem, swap the store for Vercel KV / Upstash behind
 * this same `check()` signature.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Stop the map growing without bound on a long-lived instance. */
function sweep(now: number) {
  if (buckets.size < 512) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the window resets. Sent as `Retry-After`. */
  retryAfter: number;
  remaining: number;
}

export function checkRateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {},
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0, remaining: limit - 1 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  return existing.count > limit
    ? { ok: false, retryAfter, remaining: 0 }
    : { ok: true, retryAfter, remaining: limit - existing.count };
}

/**
 * Best-effort client IP. On Vercel `x-forwarded-for` is set by the platform
 * and its left-most entry is the real client; a request that reaches the
 * function without it is bucketed together under `unknown`.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}
