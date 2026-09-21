import type { ProductLine } from "./types";

export const rhinestonesStuds: ProductLine = {
  slug: "rhinestones-studs",
  name: "Rhinestone and studs",
  tagline:
    "High-gloss stones and metal studs, nickel, lead and cadmium free, tested to 10 washes.",
  intro:
    "Hot-fix motifs are cut, set and pressed in-house. Every stone and stud is nickel, lead and cadmium free, and adhesion is tested to ten domestic washes before a motif is approved for bulk.",
  cover: {
    key: "product-lines/rhinestones-studs/cover.jpg",
    alt: "Hot-fix rhinestones arranged in a grid",
  },
  headlineFigure: "8,89,200 pcs per month, one colour",
  materials: ["Glass", "Resin", "Brass", "Aluminium"],
  categories: [
    {
      slug: "hot-fix-motif",
      name: "Hot-fix motif",
      summary:
        "Custom motifs set to your artwork and supplied on transfer film, ready to press.",
      items: [
        {
          slug: "single-colour-motif",
          name: "Single-colour motif",
          images: [],
          specs: [
            { label: "Capacity", value: "8,89,200 pcs per month" },
            { label: "Wash test", value: "10 domestic washes" },
          ],
        },
        { slug: "multi-colour-motif", name: "Multi-colour motif", images: [] },
      ],
    },
    {
      slug: "loose-stones",
      name: "Loose stones",
      summary: "Hot-fix and sew-on stones in standard SS sizes.",
      items: [
        { slug: "hot-fix-stone", name: "Hot-fix stone", images: [] },
        { slug: "sew-on-stone", name: "Sew-on stone", images: [] },
      ],
    },
    {
      slug: "metal-studs",
      name: "Metal studs",
      summary:
        "Pyramid, round and custom-shape studs in brushed and polished finishes.",
      items: [
        { slug: "pyramid-stud", name: "Pyramid stud", images: [] },
        { slug: "round-stud", name: "Round stud", images: [] },
      ],
    },
  ],
};
