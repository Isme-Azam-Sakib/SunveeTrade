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
    "Garments Accessories Manufacturer, Exporter, Importer, & Supplier",
  established: 2024,
  phone: "+880 17 1304 8045",
  phoneHref: "tel:+8801713048045",
  email: "sales@sunveeintl.com",
  salesEmail: "sales@sunveeintl.com",
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
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/#partners", label: "Buying Partners" },
  { href: "/contact", label: "Contact" },
] as const;

/** Public PDF of the full company profile for buyer diligence. */
export const companyProfile = {
  href: "/downloads/sunvee-trade-company-profile.pdf",
  filename: "Sunvee-Trade-International-Company-Profile.pdf",
  label: "Download company profile",
} as const;

/** `plain` prints the raw integer — a year should not be comma-grouped. */
export const companyStats: readonly {
  value: number;
  label: string;
  plain: boolean;
}[] = [
  { value: 2024, label: "Year established", plain: true },
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
    icon: "fi-rr-gears",
    title: "STI operating system",
    description:
      "An operations philosophy built on lean manufacturing, removing waste from order to shipment.",
    image: { key: "manufacturing/braiding-machines.jpg", alt: "" },
  },
  {
    slug: "digitalised-shop-floor",
    kicker: "Visibility",
    icon: "fi-rr-chart-histogram",
    title: "Digitalised shop floor",
    description:
      "ERP gives accurate, instant production status and KPI measurement for every order line.",
    image: { key: "manufacturing/shop-floors.jpg", alt: "" },
  },
  {
    slug: "five-layer-planning",
    kicker: "Planning",
    icon: "fi-rr-calendar",
    title: "Five-layer planning",
    description:
      "Business, capacity, operations, demand and service planning lock delivery dates before bulk starts.",
    image: { key: "manufacturing/planning.jpg", alt: "" },
  },
  {
    slug: "quality-management",
    kicker: "Quality",
    icon: "fi-rr-badge-check",
    title: "Quality management system",
    description:
      "Quality built in through assurance, with continuous improvement toward zero defects.",
    image: { key: "manufacturing/qc.jpg", alt: "" },
  },
  {
    slug: "productive-maintenance",
    kicker: "Maintenance",
    icon: "fi-rr-wrench-simple",
    title: "Total productive maintenance",
    description:
      "Planned upkeep across 17 machine types keeps breakdowns minor and lines running.",
    image: { key: "manufacturing/machine-line.jpg", alt: "" },
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
    icon: "fi-rr-users",
    description:
      "Legal minimum wages, freedom of association and equal opportunity. First aid and medical care on site. Child labour is strictly prohibited.",
    tags: ["Legal minimum wage", "Non-discrimination", "Medical care"],
    image: { key: "manufacturing/qc.jpg", alt: "" },
  },
  {
    slug: "process",
    name: "Process",
    icon: "fi-rr-settings",
    description:
      "Lean operations, total productive maintenance and a zero-defect quality system cut waste, rework and energy per piece.",
    tags: ["Lean", "TPM", "Zero-defect QMS"],
    image: { key: "manufacturing/machine-line.jpg", alt: "" },
  },
  {
    slug: "product",
    name: "Product",
    icon: "fi-rr-recycle",
    description:
      "Recycled polyester and recycled nylon keep plastic out of landfill and oceans. Organic cotton and Coolmax options, tested to OEKO-TEX Standard 100.",
    tags: ["Recycled polyester", "Recycled nylon", "Organic cotton"],
    image: { key: "product-lines/rhinestones-studs/rhinestones.jpg", alt: "" },
  },
  {
    slug: "place",
    name: "Place",
    icon: "fi-rr-map-marker",
    description:
      "Fire safety, pure drinking water for everyone and local labour law upheld across our Gazipur factory.",
    tags: ["Fire safety", "Pure water", "Labour law"],
    image: { key: "sustainability/factory.jpg", alt: "" },
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
    preview: {
      key: "certificates/iso.png",
      alt: "ISO 9001:2015 certificate issued by TNV",
    },
  },
  {
    mark: "OEKO-TEX",
    standard: "STANDARD 100",
    issuer: "Hohenstein",
    title: "Tested for harmful substances",
    description:
      "Independent proof that our textile trims are safe and responsibly produced.",
    preview: {
      key: "certificates/oekotext.png",
      alt: "OEKO-TEX STANDARD 100 certificate issued by Hohenstein",
    },
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
