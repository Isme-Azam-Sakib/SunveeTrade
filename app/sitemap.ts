import type { MetadataRoute } from "next";

import { productLines } from "@/content/products";
import { siteUrl } from "@/lib/site-url";

/**
 * Generated from the same catalog data the pages are built from, so adding a
 * product line updates the sitemap automatically (technical spec §8).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...productLines.map((line) => ({
      url: `${base}/products/${line.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
