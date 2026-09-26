import type { ProductLine } from "./types";

export const lingerieElastic: ProductLine = {
  slug: "lingerie-elastic",
  name: "Lingerie elastic",
  tagline:
    "Picot, fold-over, velvet, plush back band, strap elastic and underwire channelling.",
  intro:
    "A dedicated unit for intimates trims, where hand feel matters as much as elongation. Soft-touch finishes, picot edges and plush backs are developed against your handloom standard before bulk.",
  cover: {
    key: "product-lines/lingerie-elastic/lingerie-elastic.jpg",
    alt: "Fold-over elastic in assorted colours",
  },
  headlineFigure: "24,96,000 pcs per month",
  materials: ["Recycled nylon", "Recycled polyester", "Spandex", "Microfibre"],
  categories: [
    {
      slug: "edge-elastic",
      name: "Edge elastic",
      summary:
        "Picot, scalloped and plain edges for necklines and leg openings.",
      items: [
        {
          slug: "picot-elastic",
          name: "Picot elastic",
          images: [
            { key: "product-lines/lingerie-elastic/edge-elastic/picot-elastic/1.jpg", alt: "Picot elastic straps in assorted colours" },
          ],
        },
        {
          slug: "fold-over-elastic",
          name: "Fold-over elastic",
          images: [
            { key: "product-lines/lingerie-elastic/edge-elastic/fold-over-elastic/1.jpg", alt: "Fold-over elastic in assorted colours" },
          ],
        },
      ],
    },
    {
      slug: "band-elastic",
      name: "Band elastic",
      summary: "Under-bust and waistband elastics with plush or velvet backs.",
      items: [
        {
          slug: "plush-back-band",
          name: "Plush back band",
          images: [
            { key: "product-lines/lingerie-elastic/band-elastic/plush-back-band/1.jpg", alt: "Plush back band elastic, nude tone" },
          ],
        },
        {
          slug: "velvet-elastic",
          name: "Velvet elastic",
          images: [
            { key: "product-lines/lingerie-elastic/band-elastic/velvet-elastic/1.jpg", alt: "Velvet-back bra strap elastic" },
          ],
        },
      ],
    },
    {
      slug: "strap-and-channelling",
      name: "Strap and channelling",
      summary:
        "Shoulder strap elastic and underwire channelling tape, sized to your wire gauge.",
      items: [
        {
          slug: "strap-elastic",
          name: "Strap elastic",
          images: [
            { key: "product-lines/lingerie-elastic/strap-and-channelling/strap-elastic/1.jpg", alt: "Bra strap elastic, black, nude and white" },
          ],
        },
        {
          slug: "underwire-channelling",
          name: "Underwire channelling",
          images: [
            { key: "product-lines/lingerie-elastic/strap-and-channelling/underwire-channelling/1.jpg", alt: "Underwire channelling tape" },
          ],
        },
      ],
    },
  ],
};
