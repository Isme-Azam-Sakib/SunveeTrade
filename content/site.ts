import type {
  CapacityRow,
  Certificate,
  ManufacturingSystem,
  Office,
  SustainabilityPillar,
} from "./types";

export const company = {
  name: "Sunvee Trade International",
  shortName: "Sunvee",
  tagline: "House of trims, accessories and value-adding services",
  description:
    "100% export-oriented manufacturer and supplier of garment trims, accessories and packaging.",
  established: 2014,
  phone: "+88 09640 234 234",
  phoneHref: "tel:+8809640234234",
  email: "info@sunveeintl.com",
  salesEmail: "sohag@sunveeintl.com",
} as const;

export const offices: readonly Office[] = [
  {
    label: "Corporate office",
    address:
      "House 3, Lane 5, Block A, Section 6, Mirpur, Dhaka 1216, Bangladesh",
  },
  {
    label: "Factory",
    address:
      "340/1, Uttar Khailkoir, National University, Gacha, Gazipur 1704, Bangladesh",
  },
  {
    label: "China office",
    address: "No. 6 Building, 123 Road, Shilou Town, Panyu, Guangzhou 511447",
  },
];

export const primaryNav = [
  { href: "/#about", label: "About" },
  { href: "/#products", label: "Products" },
  { href: "/#manufacturing", label: "Manufacturing" },
  { href: "/#sustainability", label: "Sustainability" },
  { href: "/#partners", label: "Buying Partners" },
  { href: "/#contact", label: "Contact" },
] as const;

/** `plain` prints the raw integer — a year should not be comma-grouped. */
export const companyStats: readonly {
  value: number;
  label: string;
  plain: boolean;
}[] = [
  { value: 2014, label: "Year established", plain: true },
  { value: 6, label: "Strategic business units", plain: false },
  { value: 17, label: "Global brands supplied", plain: false },
  { value: 2, label: "International certifications", plain: false },
];

export const factoryStats = [
  { value: 28264, label: "Sq ft total area" },
  { value: 9, label: "Production units" },
  { value: 17, label: "Machine types" },
] as const;

export const productionUnits: readonly string[] = [
  "Narrow fabric and jacquard elastic",
  "Lingerie elastic",
  "Ribbon and elastic embossed",
  "Twill tape and needle loom",
  "Drawstring",
  "Crochet elastic",
  "Gum tape",
  "Bra cup and shoulder padding",
  "Rhinestone hot-fix motif",
];

/** Monthly output per line, highest first. Bars are sized off `perMonth`. */
export const capacity: readonly CapacityRow[] = [
  { line: "Lingerie elastic", perMonth: 2496000, unit: "pcs" },
  { line: "Crochet elastic", perMonth: 2470000, unit: "pcs" },
  { line: "Needle loom", perMonth: 1040000, unit: "pcs" },
  { line: "Rhinestone, one colour", perMonth: 889200, unit: "pcs" },
  { line: "Jacquard elastic", perMonth: 884000, unit: "pcs" },
  { line: "Shoulder pads", perMonth: 780640, unit: "pairs" },
  { line: "Drawstring", perMonth: 676000, unit: "pcs" },
  { line: "Elasticated drawcord", perMonth: 520000, unit: "pcs" },
  { line: "Bra cups", perMonth: 416000, unit: "pairs" },
  { line: "Heavy packaging gum tape", perMonth: 208000, unit: "rolls" },
];

export const manufacturingSystems: readonly ManufacturingSystem[] = [
  {
    slug: "sti-operating-system",
    kicker: "Operations",
    title: "STI operating system",
    description:
      "An operations philosophy built on lean manufacturing, removing waste from order to shipment.",
    image: { key: "manufacturing/braiding-machine.jpg", alt: "" },
  },
  {
    slug: "digitalised-shop-floor",
    kicker: "Visibility",
    title: "Digitalised shop floor",
    description:
      "ERP gives accurate, instant production status and KPI measurement for every order line.",
    image: { key: "manufacturing/shop-floor.jpg", alt: "" },
  },
  {
    slug: "five-layer-planning",
    kicker: "Planning",
    title: "Five-layer planning",
    description:
      "Business, capacity, operations, demand and service planning lock delivery dates before bulk starts.",
    image: { key: "manufacturing/yarn-covering-machine.jpg", alt: "" },
  },
  {
    slug: "quality-management",
    kicker: "Quality",
    title: "Quality management system",
    description:
      "Quality built in through assurance, with continuous improvement toward zero defects.",
    image: { key: "manufacturing/quality-team.jpg", alt: "" },
  },
  {
    slug: "productive-maintenance",
    kicker: "Maintenance",
    title: "Total productive maintenance",
    description:
      "Planned upkeep across 17 machine types keeps breakdowns minor and lines running.",
    image: { key: "manufacturing/ironing-machine.jpg", alt: "" },
  },
];

export const alsoInHouse: readonly string[] = [
  "Order procurement",
  "IE engineering",
  "Design structure",
  "Delivery management",
];

export const sustainabilityPillars: readonly SustainabilityPillar[] = [
  {
    slug: "people",
    name: "People",
    description:
      "Legal minimum wages, freedom of association and equal opportunity. First aid and medical care on site. Child labour is strictly prohibited.",
    tags: ["Legal minimum wage", "Non-discrimination", "Medical care"],
    image: { key: "sustainability/quality-team.jpg", alt: "" },
  },
  {
    slug: "process",
    name: "Process",
    description:
      "Lean operations, total productive maintenance and a zero-defect quality system cut waste, rework and energy per piece.",
    tags: ["Lean", "TPM", "Zero-defect QMS"],
    image: { key: "sustainability/shop-floor.jpg", alt: "" },
  },
  {
    slug: "product",
    name: "Product",
    description:
      "Recycled polyester and recycled nylon keep plastic out of landfill and oceans. Organic cotton and Coolmax options, tested to OEKO-TEX Standard 100.",
    tags: ["Recycled polyester", "Recycled nylon", "Organic cotton"],
    image: { key: "sustainability/product-elastic.jpg", alt: "" },
  },
  {
    slug: "place",
    name: "Place",
    description:
      "Fire safety, pure drinking water for everyone and local labour law upheld across our Gazipur factory.",
    tags: ["Fire safety", "Pure water", "Labour law"],
    image: { key: "sustainability/place.jpg", alt: "" },
  },
];

export const certificates: readonly Certificate[] = [
  {
    mark: "ISO",
    standard: "9001:2015",
    issuer: "TNV",
    title: "Quality management system",
    description:
      "Covers the manufacture, supply, import and export of garment accessories.",
  },
  {
    mark: "OEKO-TEX",
    standard: "STANDARD 100",
    issuer: "Hohenstein",
    title: "Tested for harmful substances",
    description:
      "Independent proof that our textile trims are safe and responsibly produced.",
  },
];

export const buyingPartners: readonly string[] = [
  "H&M",
  "BOSS",
  "C&A",
  "PUMA",
  "GUESS",
  "ZARA",
  "next",
  "LPP",
  "BESTSELLER",
  "NEW YORKER",
  "TOM TAILOR",
  "Terranova",
  "COLIN'S",
  "OVS",
  "women'secret",
  "Betty Barclay",
  "G-STAR RAW",
];
