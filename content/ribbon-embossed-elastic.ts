import type { ProductLine } from "./types";

export const ribbonEmbossedElastic: ProductLine = {
  slug: "ribbon-embossed-elastic",
  name: "Ribbon and embossed elastic",
  tagline:
    "Silicone, pattern and grip embossing for 3D logos that hold their shape when stretched.",
  intro:
    "Embossing turns a flat band into a branded one. Silicone and pattern embossing raise a logo that survives wash and stretch; grip embossing adds slip resistance for activewear waistbands.",
  cover: {
    key: "product-lines/ribbon-embossed-elastic/embossed-ribbons.jpg",
    alt: "Embossed elastic with raised logo pattern",
  },
  headlineFigure: "Slip-resistant grip for activewear",
  materials: ["Silicone", "Recycled polyester", "Recycled nylon"],
  categories: [
    {
      slug: "silicone-embossed",
      name: "Silicone embossed",
      summary:
        "Raised silicone logos and bead lines, tested to hold shape through wash and stretch.",
      items: [
        { slug: "silicone-logo", name: "Silicone logo emboss", images: [] },
        { slug: "silicone-grip-line", name: "Silicone grip line", images: [] },
      ],
    },
    {
      slug: "pattern-embossed",
      name: "Pattern embossed",
      summary: "All-over pattern embossing rolled into the band surface.",
      items: [
        { slug: "pattern-roll-emboss", name: "Pattern emboss", images: [] },
      ],
    },
    {
      slug: "ribbon",
      name: "Ribbon",
      summary: "Printed and woven ribbon for packaging and garment detail.",
      items: [
        { slug: "printed-ribbon", name: "Printed ribbon", images: [] },
        { slug: "woven-ribbon", name: "Woven ribbon", images: [] },
      ],
    },
  ],
};
