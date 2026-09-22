import type { ProductLine } from "./types";

export const narrowFabrics: ProductLine = {
  slug: "narrow-fabrics",
  name: "Narrow fabrics and elastics",
  tagline:
    "Crochet, jacquard, needle loom and drawstring in recycled polyester, recycled nylon, organic cotton and Coolmax.",
  intro:
    "Our largest business unit. Crochet, jacquard and needle-loom machines run waistbands, tapes and drawcords to your width, elongation and colour spec, with recycled and organic yarn options across every construction.",
  cover: {
    key: "product-lines/narrow-fabrics/crochet-elastic/crochet-plain/1.png",
    alt: "Plain crochet elastic in assorted colours",
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
          images: [
            { key: "product-lines/narrow-fabrics/crochet-elastic/crochet-plain/1.png", alt: "Plain crochet elastic in assorted colours" },
            { key: "product-lines/narrow-fabrics/crochet-elastic/crochet-plain/2.png", alt: "Plain crochet elastic rolls, pastel colours" },
            { key: "product-lines/narrow-fabrics/crochet-elastic/crochet-plain/3.png", alt: "Plain white crochet elastic roll" },
          ],
          specs: [
            { label: "Yarn", value: "Monofilament nylon" },
            { label: "Capacity", value: "24,70,000 pcs per month" },
            { label: "Properties", value: "UV resistant, high tensile" },
          ],
        },
        {
          slug: "crochet-patterned",
          name: "Patterned crochet elastic",
          images: [
            { key: "product-lines/narrow-fabrics/crochet-elastic/crochet-patterned/1.png", alt: "Patterned crochet elastic, black and white" },
            { key: "product-lines/narrow-fabrics/crochet-elastic/crochet-patterned/2.png", alt: "Patterned crochet elastic, rainbow colours" },
            { key: "product-lines/narrow-fabrics/crochet-elastic/crochet-patterned/3.png", alt: "Patterned crochet elastic, flecked texture" },
          ],
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
          images: [
            { key: "product-lines/narrow-fabrics/needle-loom/twill-tape/1.jpg", alt: "Striped twill tape" },
            { key: "product-lines/narrow-fabrics/needle-loom/twill-tape/2.jpg", alt: "Aztec pattern woven tape" },
            { key: "product-lines/narrow-fabrics/needle-loom/twill-tape/3.jpg", alt: "Black and white diamond pattern tape" },
          ],
          specs: [{ label: "Capacity", value: "10,40,000 pcs per month" }],
        },
        {
          slug: "binding-tape",
          name: "Binding tape",
          images: [
            { key: "product-lines/narrow-fabrics/needle-loom/binding-tape/1.jpg", alt: "Folk pattern binding tape" },
            { key: "product-lines/narrow-fabrics/needle-loom/binding-tape/2.jpg", alt: "Rib knit mesh binding tape" },
            { key: "product-lines/narrow-fabrics/needle-loom/binding-tape/3.jpg", alt: "Binding tape in assorted colours" },
          ],
        },
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
          images: [
            { key: "product-lines/narrow-fabrics/drawstring/drawstring-flat/1.png", alt: "Flat cotton drawstring tape" },
            { key: "product-lines/narrow-fabrics/drawstring/drawstring-flat/2.png", alt: "Flat drawstring with metal tips" },
            { key: "product-lines/narrow-fabrics/drawstring/drawstring-flat/3.png", alt: "Flat drawstring, assorted colours" },
          ],
          specs: [{ label: "Capacity", value: "6,76,000 pcs per month" }],
        },
        {
          slug: "elasticated-drawcord",
          name: "Elasticated drawcord",
          images: [
            { key: "product-lines/narrow-fabrics/drawstring/elasticated-drawcord/1.png", alt: "Braided round drawcord with cone tips" },
            { key: "product-lines/narrow-fabrics/drawstring/elasticated-drawcord/2.png", alt: "Round drawcord with metal tips" },
            { key: "product-lines/narrow-fabrics/drawstring/elasticated-drawcord/3.png", alt: "Round drawcords, assorted colours with metal tips" },
          ],
          specs: [{ label: "Capacity", value: "5,20,000 pcs per month" }],
        },
      ],
    },
  ],
};
