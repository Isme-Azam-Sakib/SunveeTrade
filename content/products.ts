import { braCupsPadding } from "./bra-cups-padding";
import { gumTapePackaging } from "./gum-tape-packaging";
import { lingerieElastic } from "./lingerie-elastic";
import { narrowFabrics } from "./narrow-fabrics";
import { rhinestonesStuds } from "./rhinestones-studs";
import { ribbonEmbossedElastic } from "./ribbon-embossed-elastic";
import type { ProductLine } from "./types";

/**
 * Display order drives the homepage horizontal pan, the footer product list
 * and `generateStaticParams` for `/products/[line]`.
 */
export const productLines: readonly ProductLine[] = [
  narrowFabrics,
  lingerieElastic,
  ribbonEmbossedElastic,
  rhinestonesStuds,
  braCupsPadding,
  gumTapePackaging,
];

export function getProductLine(slug: string): ProductLine | undefined {
  return productLines.find((line) => line.slug === slug);
}

export function productLineSlugs(): string[] {
  return productLines.map((line) => line.slug);
}
