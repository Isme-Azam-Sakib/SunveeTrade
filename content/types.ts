/**
 * Catalog schema (technical spec §3).
 *
 * Every product-line module conforms to these types so that pages can be
 * generated generically. There is deliberately no CMS: content lives in the
 * repo as typed data, and `git diff` is the change log.
 */

/** A path inside the image bucket, e.g. `product-lines/narrow-fabrics/cover.jpg`. */
export type MediaKey = string;

export interface MediaRef {
  /** Bucket-relative key. Resolved to a URL by `lib/images.ts`. */
  readonly key: MediaKey;
  /** Meaningful alt text. Empty string marks the image as decorative. */
  readonly alt: string;
}

/** A free-form specification row shown on a product detail card. */
export interface SpecField {
  readonly label: string;
  readonly value: string;
}

export interface Product {
  /** URL-safe, stable. Used in anchors and, later, product detail routes. */
  readonly slug: string;
  readonly name: string;
  readonly description?: string;
  readonly images: readonly MediaRef[];
  /** Composition, finish, width range, certifications — whatever applies. */
  readonly specs?: readonly SpecField[];
}

export interface ProductCategory {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly image?: MediaRef;
  readonly items: readonly Product[];
}

export interface ProductLine {
  /** URL segment: `/products/<slug>`. */
  readonly slug: string;
  readonly name: string;
  /** One-line positioning used on cards and in nav. */
  readonly tagline: string;
  /** Long-form intro for the product-line page. */
  readonly intro: string;
  readonly cover: MediaRef;
  /**
   * Headline capacity figure for this line, as shown on the homepage card.
   * Formatted for display (Indian grouping) rather than computed.
   */
  readonly headlineFigure?: string;
  /** Raw materials and constructions offered across the line. */
  readonly materials?: readonly string[];
  readonly categories: readonly ProductCategory[];
}

/** Monthly output for one production line (homepage capacity table). */
export interface CapacityRow {
  readonly line: string;
  /** Absolute monthly output, used to size the bar. */
  readonly perMonth: number;
  readonly unit: "pcs" | "pairs" | "rolls";
}

export interface Certificate {
  readonly mark: string;
  readonly standard: string;
  readonly issuer: string;
  readonly title: string;
  readonly description: string;
}

export interface ManufacturingSystem {
  readonly slug: string;
  readonly kicker: string;
  readonly title: string;
  readonly description: string;
  readonly image: MediaRef;
}

export interface SustainabilityPillar {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly image: MediaRef;
}

export interface Office {
  readonly label: string;
  readonly address: string;
}
