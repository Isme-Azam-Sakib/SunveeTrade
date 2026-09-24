import type { MediaRef } from "./types";

/**
 * Pexels placeholders for the About page. Swap each `key` for a bucket-relative
 * path (e.g. `about/story-sewing.jpg`) once real photography exists; `mediaUrl`
 * resolves both forms.
 */
export const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const aboutImages = {
  cover: { key: px(4210860, 2000), alt: "Stack of folded denim garments" },
  story: { key: px(3738088), alt: "Seamstress working at a sewing machine" },
  storyAlt: { key: px(1078958), alt: "Patterned garments on a rail" },
  mission: { key: px(5673488), alt: "Two people shaking hands over a table" },
  management: { key: px(3184291), alt: "Team meeting around a table" },
  machineA: { key: px(1108101), alt: "Technician servicing machinery" },
  machineB: {
    key: px(2760241),
    alt: "Engineer inspecting industrial equipment",
  },
  machineC: {
    key: px(3862632),
    alt: "Engineer working on production equipment",
  },
  logistics: {
    key: px(4481259),
    alt: "Warehouse aisle with pallets and racking",
  },
} satisfies Record<string, MediaRef>;

export const aboutFacts = [
  { label: "Established", value: "2014" },
  { label: "Based in", value: "Gazipur, Bangladesh" },
  { label: "Orientation", value: "100% export" },
  { label: "Certified", value: "ISO 9001:2015" },
] as const;

export const aboutIndex = [
  { href: "#story", label: "Our story" },
  { href: "#mission", label: "Mission and vision" },
  { href: "#values", label: "Values" },
  { href: "#leadership", label: "Leadership" },
  { href: "#manufacturing", label: "Manufacturing" },
  { href: "#machinery", label: "Machinery" },
  { href: "#sustainability", label: "Sustainability" },
  { href: "#conduct", label: "Code of conduct" },
  { href: "#certificates", label: "Certificates" },
] as const;

export const offerings = [
  {
    kicker: "01",
    title: "Packaging",
    text: "Solid gum tape in heavy-duty, tissue and foam grades, plus complete packaging solutions for shipped garments.",
  },
  {
    kicker: "02",
    title: "Apparel branding",
    text: "Trims that carry a brand's identity onto the garment: embossed elastics, rhinestone motifs, woven and printed tapes.",
  },
  {
    kicker: "03",
    title: "Supply chain solutions",
    text: "One accessory hub for procurement, production and delivery, so buyers manage one partner instead of many.",
  },
] as const;

export const mission: readonly string[] = [
  "Provide backward-linkage support to countries with bustling export-oriented industries.",
  "Build good relationships with valued customers.",
  "Manufacture garment accessories that consistently meet international standards.",
  "Deliver consignments to the terms of the order, deadlines and other conditions included.",
  "Supply facilities related to the product and the workers who make it.",
];

export const vision: readonly string[] = [
  "Follow the latest fashion trends and industry needs, offering world-class products with advanced technology.",
  "Always adhere to on-time delivery.",
  "Be a top manufacturer of ready-made garment products in the international market.",
  "Help the nation by creating jobs and earning important overseas exchange.",
];

export const coreValues = [
  { name: "Integrity", line: "Honest, with strong moral principles." },
  { name: "Partnership", line: "Work together." },
  { name: "Trust", line: "Quality and delivery." },
  { name: "Responsibility", line: "Own it." },
  { name: "Passion", line: "Excellence: inspire and innovate." },
  { name: "Team work", line: "Stability." },
] as const;

export const managementFunctions: readonly string[] = [
  "Technical",
  "Administrative",
  "Marketing",
  "Accounting",
  "Commercial",
];

export const machinery: readonly string[] = [
  "Bra mould cup machine",
  "Needle loom machine",
  "Crochet machine",
  "Gum tape machine",
  "Braiding / drawstring machine",
  "Elastic emboss machine",
  "Jacquard machine",
  "Fold-over needle loom machine",
  "Yarn covering machine",
  "Warping machine",
  "Horizontal packing machine",
  "Double hit pressing machine",
  "Hashima ironing machine",
  "Laser cutting machine",
  "Shoulder pad cutting machine",
  "Hot-fix motif machine",
  "Ironing and starching machine",
];

/** `text` marks a figure that must print as written (a decimal), not count up. */
export const siteFacts: readonly (
  { label: string; value: number } | { label: string; text: string }
)[] = [
  { text: "9.90", label: "Katha land area" },
  { value: 28264, label: "Sq ft total area" },
  { value: 9, label: "Production units" },
  { value: 17, label: "Machine types" },
];

export const conduct: readonly string[] = [
  "Child labour is strictly prohibited.",
  "Local labour law is upheld.",
  "Pure drinking water for all.",
  "Equal employment opportunity and non-discrimination.",
  "First aid and medical care.",
  "Fire safety.",
  "Legal minimum wages.",
  "Freedom of association.",
];
