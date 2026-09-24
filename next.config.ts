import type { NextConfig } from "next";

/**
 * Images are served from object storage (Cloudflare R2) rather than `/public`
 * in production — see the technical spec, §4. `NEXT_PUBLIC_IMAGE_CDN_DOMAIN`
 * holds the public bucket / custom domain origin. When it is unset (local dev
 * before the bucket exists) images resolve to `/media/**` off the local origin,
 * which needs no remote pattern.
 */
function remotePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  const origin = process.env.NEXT_PUBLIC_IMAGE_CDN_DOMAIN;
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];

  // Placeholder photography for pages awaiting real images.
  patterns.push({
    protocol: "https",
    hostname: "images.pexels.com",
    pathname: "/photos/**",
  });

  // Placeholder photography on pages still awaiting real images.
  patterns.push({
    protocol: "https",
    hostname: "images.pexels.com",
    pathname: "/photos/**",
  });

  if (!origin) return patterns;

  let url: URL;
  try {
    url = new URL(/^https?:\/\//.test(origin) ? origin : `https://${origin}`);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_IMAGE_CDN_DOMAIN is not a valid origin: "${origin}"`,
    );
  }

  const base = url.pathname.replace(/\/+$/, "");
  patterns.push({
    protocol: url.protocol.replace(":", "") as "http" | "https",
    hostname: url.hostname,
    pathname: `${base}/**`,
  });

  return patterns;
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.105"],
  images: {
    remotePatterns: remotePatterns(),
    // Catalog photography is content-hashed on upload and effectively
    // immutable, so cache it hard at the optimizer.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Local dev/preview fallback assets. In production these are served by
        // Cloudflare in front of R2 with its own cache headers.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
