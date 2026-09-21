import type { ProductLine } from "./types";

export const narrowFabrics: ProductLine = {
  slug: "narrow-fabrics",
  name: "Narrow fabrics and elastics",
  tagline:
    "Crochet, jacquard, needle loom and drawstring in recycled polyester, recycled nylon, organic cotton and Coolmax.",
  intro:
    "Our largest business unit. Crochet, jacquard and needle-loom machines run waistbands, tapes and drawcords to your width, elongation and colour spec, with recycled and organic yarn options across every construction.",
  cover: {
    key: "product-lines/narrow-fabrics/cover.jpg",
    alt: "Jacquard and printed woven elastic bands",
  },
  headlineFigure: "24,70,000 pcs per month, crochet",
  materials: [
    "Recycled polyester",
    "Recycled nylon",
    "Organic cotton",
    "Coolmax",
    "Monofilament nylon",
  ],
  categories: [
    {
      slug: "crochet-elastic",
      name: "Crochet elastic",
      summary:
        "Monofilament nylon yarn, UV resistant and high tensile. The workhorse band for waistbands and cuffs.",
      items: [
        {
          slug: "crochet-plain",
          name: "Plain crochet elastic",
          images: [],
          specs: [
            { label: "Yarn", value: "Monofilament nylon" },
            { label: "Capacity", value: "24,70,000 pcs per month" },
            { label: "Properties", value: "UV resistant, high tensile" },
          ],
        },
        {
          slug: "crochet-patterned",
          name: "Patterned crochet elastic",
          images: [],
          specs: [{ label: "Finish", value: "Open-work pattern knit" }],
        },
      ],
    },
    {
      slug: "jacquard-elastic",
      name: "Jacquard elastic",
      summary:
        "Woven logo and pattern bands for waistbands, with up to four colours in the weave.",
      items: [
        {
          slug: "jacquard-logo-band",
          name: "Jacquard logo band",
          images: [],
          specs: [
            { label: "Capacity", value: "8,84,000 pcs per month" },
            { label: "Colours", value: "Up to 4 in weave" },
          ],
        },
      ],
    },
    {
      slug: "needle-loom",
      name: "Needle loom and twill tape",
      summary:
        "Woven tapes, twill tape and binding in cotton, polyester and recycled blends.",
      items: [
        {
          slug: "twill-tape",
          name: "Twill tape",
          images: [],
          specs: [{ label: "Capacity", value: "10,40,000 pcs per month" }],
        },
        { slug: "binding-tape", name: "Binding tape", images: [] },
      ],
    },
    {
      slug: "drawstring",
      name: "Drawstring and drawcord",
      summary:
        "Flat, tubular and elasticated drawcords, cut and tipped to length.",
      items: [
        {
          slug: "drawstring-flat",
          name: "Flat drawstring",
          images: [],
          specs: [{ label: "Capacity", value: "6,76,000 pcs per month" }],
        },
        {
          slug: "elasticated-drawcord",
          name: "Elasticated drawcord",
          images: [],
          specs: [{ label: "Capacity", value: "5,20,000 pcs per month" }],
        },
      ],
    },
  ],
};
