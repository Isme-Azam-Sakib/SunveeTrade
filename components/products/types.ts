import type { MediaRef, SpecField } from "@/content/types";

/** One swatch on the product board, flattened out of its category. */
export interface GalleryItem {
  /** Unique across the line: `<category slug>/<item slug>`. */
  readonly key: string;
  readonly categorySlug: string;
  readonly categoryName: string;
  readonly name: string;
  readonly description?: string;
  readonly images: readonly MediaRef[];
  readonly specs?: readonly SpecField[];
}
