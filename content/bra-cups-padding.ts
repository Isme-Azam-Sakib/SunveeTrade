import type { ProductLine } from "./types";

export const braCupsPadding: ProductLine = {
  slug: "bra-cups-padding",
  name: "Bra cup and shoulder padding",
  tagline:
    "Moulded, triangle and round cups, plus shoulder pads in laminated high-density foam.",
  intro:
    "Foam is laminated, moulded and cut against your grading. Cup shape is signed off on a fit sample before the moulds are committed, so bulk matches the approved silhouette.",
  cover: {
    key: "product-lines/bra-cups-padding/cover.jpg",
    alt: "Moulded foam bra cups",
  },
  headlineFigure: "7,80,640 pairs per month, shoulder pads",
  materials: ["High-density foam", "Laminated tricot", "Spacer fabric"],
  categories: [
    {
      slug: "moulded-cups",
      name: "Moulded cups",
      summary: "Seamless moulded cups graded to your size set.",
      items: [
        {
          slug: "moulded-cup",
          name: "Moulded cup",
          images: [],
          specs: [{ label: "Capacity", value: "4,16,000 pairs per month" }],
        },
        { slug: "triangle-cup", name: "Triangle cup", images: [] },
        { slug: "round-cup", name: "Round cup", images: [] },
      ],
    },
    {
      slug: "shoulder-padding",
      name: "Shoulder padding",
      summary: "Laminated high-density foam pads for tailoring and outerwear.",
      items: [
        {
          slug: "shoulder-pad",
          name: "Shoulder pad",
          images: [],
          specs: [{ label: "Capacity", value: "7,80,640 pairs per month" }],
        },
      ],
    },
  ],
};
