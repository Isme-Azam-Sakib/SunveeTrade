import type { ProductLine } from "./types";

export const gumTapePackaging: ProductLine = {
  slug: "gum-tape-packaging",
  name: "Gum tape and packaging",
  tagline:
    "Heavy packaging, double-sided tissue and double-sided foam tape. Tamper-evident.",
  intro:
    "Carton and polybag tapes made to the same QA standard as the trims they ship with. Heavy packaging tape is tamper-evident, and adhesive is matched to your carton board and storage climate.",
  cover: {
    key: "product-lines/gum-tape-packaging/cover.jpg",
    alt: "Rolls of packaging gum tape",
  },
  headlineFigure: "2,08,000 rolls per month",
  materials: ["BOPP", "Tissue", "PE foam", "Acrylic adhesive"],
  categories: [
    {
      slug: "packaging-tape",
      name: "Packaging tape",
      summary: "Heavy-duty carton sealing tape, printed or plain.",
      items: [
        {
          slug: "heavy-packaging-tape",
          name: "Heavy packaging gum tape",
          images: [
            { key: "product-lines/gum-tape-packaging/packaging-tape/heavy-packaging-tape/1.png", alt: "Packaging gum tape rolls, assorted colours" },
            { key: "product-lines/gum-tape-packaging/packaging-tape/heavy-packaging-tape/2.png", alt: "Clear packaging tape rolls" },
            { key: "product-lines/gum-tape-packaging/packaging-tape/heavy-packaging-tape/3.png", alt: "Yellow packaging tape roll" },
          ],
          specs: [
            { label: "Capacity", value: "2,08,000 rolls per month" },
            { label: "Feature", value: "Tamper-evident" },
          ],
        },
      ],
    },
    {
      slug: "double-sided-tape",
      name: "Double-sided tape",
      summary: "Tissue and foam carriers for garment and packaging assembly.",
      items: [
        {
          slug: "double-sided-tissue",
          name: "Double-sided tissue tape",
          images: [],
        },
        {
          slug: "double-sided-foam",
          name: "Double-sided foam tape",
          images: [],
        },
      ],
    },
  ],
};
