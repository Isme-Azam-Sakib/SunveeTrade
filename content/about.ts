import type { MediaRef } from "./types";

/**
 * Pexels URL helper, kept for the one remaining placeholder (the China office
 * on the contact page). `mediaUrl` resolves both URLs and bucket keys.
 */
export const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const aboutImages = {
  cover: {
    key: "about/cover-lace-floor.webp",
    alt: "Operators trimming lace at long cutting tables on the Sunvee floor",
  },
  story: {
    key: "about/story-loom-operator.webp",
    alt: "Operator threading a needle loom",
  },
  storyAlt: {
    key: "about/story-ironing-tape.webp",
    alt: "Operator pressing finished tape at an ironing table",
  },
  mission: {
    key: "about/mission-handshake.webp",
    alt: "Sunvee managers shaking hands with a visitor on the factory floor",
  },
  management: {
    key: "about/management-desk.webp",
    alt: "Manager reviewing order documents at his desk",
  },
  machineA: {
    key: "about/machine-jacquard.webp",
    alt: "Operator setting up a jacquard needle loom",
  },
  machineB: {
    key: "about/machine-hotfix.webp",
    alt: "Hot-fix motif machines",
  },
  machineC: {
    key: "about/machine-laser-cutter.webp",
    alt: "Laser cutting machine in the laser cutting area",
  },
  logistics: {
    key: "about/conduct-lace-team.webp",
    alt: "Two operators checking lace together at a work table",
  },
} satisfies Record<string, MediaRef>;

export const aboutFacts = [
  { label: "Established", value: "2024" },
  { label: "Based in", value: "Gazipur, Bangladesh" },
  { label: "Orientation", value: "100% export" },
  { label: "Certified", value: "ISO 9001:2015" },
] as const;

export const aboutIndex = [
  { href: "#story", label: "Our story" },
  { href: "#mission", label: "Mission and vision" },
  { href: "#values", label: "Values" },
  { href: "#leadership", label: "Leadership" },
] as const;

export const capabilitiesFacts = [
  { label: "Production units", value: "9" },
  { label: "Machine types", value: "17" },
  { label: "Sustainability pillars", value: "4" },
  { label: "Certifications", value: "ISO · OEKO-TEX" },
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
  {
    name: "Integrity",
    line: "Honest, with strong moral principles.",
    icon: "fi-rr-balance-scale-left" as const,
  },
  {
    name: "Partnership",
    line: "Work together.",
    icon: "fi-rr-handshake" as const,
  },
  {
    name: "Trust",
    line: "Quality and delivery.",
    icon: "fi-rr-shield-check" as const,
  },
  {
    name: "Responsibility",
    line: "Own it.",
    icon: "fi-rr-badge-check" as const,
  },
  {
    name: "Passion",
    line: "Excellence: inspire and innovate.",
    icon: "fi-rr-flame" as const,
  },
  {
    name: "Team work",
    line: "Stability.",
    icon: "fi-rr-users" as const,
  },
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
