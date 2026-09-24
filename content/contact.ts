import { px } from "./about";
import { company, offices } from "./site";
import type { MediaRef } from "./types";

const address = (label: string) =>
  offices.find((o) => o.label === label)?.address ?? "";

export interface ContactOffice {
  readonly slug: string;
  readonly label: string;
  readonly role: string;
  readonly address: string;
  readonly image: MediaRef;
  readonly people?: readonly { name: string; role: string }[];
  readonly phones?: readonly { label: string; href: string }[];
  readonly email?: string;
}

/** Pexels placeholders; swap the `key` for a bucket path when photos exist. */
export const contactOffices: readonly ContactOffice[] = [
  {
    slug: "dhaka",
    label: "Corporate office",
    role: "Bangladesh, Dhaka",
    address: address("Corporate office"),
    image: { key: px(6774432), alt: "Team working in a bright office" },
    people: [{ name: "Sohag Patwary", role: "Contact person" }],
    phones: [
      { label: "+880 1713 048045", href: "tel:+8801713048045" },
      { label: "+880 1913 257876", href: "tel:+8801913257876" },
    ],
    email: company.salesEmail,
  },
  {
    slug: "factory",
    label: "Factory",
    role: "Bangladesh, Gazipur",
    address: address("Factory"),
    image: {
      key: px(2760243),
      alt: "Engineer beside large industrial machinery",
    },
  },
  {
    slug: "china",
    label: "China office",
    role: "China, Guangzhou",
    address: `${address("China office")}. Post code 511447.`,
    image: { key: px(3183197), alt: "Team gathered around a meeting table" },
    email: "yyzyhui@163.com",
  },
];

export const channels = [
  {
    kicker: "General enquiries",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    kicker: "Sales and quotations",
    value: company.salesEmail,
    href: `mailto:${company.salesEmail}`,
  },
  { kicker: "Head office line", value: company.phone, href: company.phoneHref },
] as const;

export const quoteSteps = [
  {
    title: "Send your tech pack",
    text: "Share the product line, quantity and target date, with artwork or a reference sample if you have one.",
  },
  {
    title: "Costed quotation",
    text: "Our merchandising team replies with pricing against your specification.",
  },
  {
    title: "Sampling plan",
    text: "We agree samples and approvals before any bulk material is committed.",
  },
  {
    title: "Bulk and delivery",
    text: "Production runs on the planned dates and the consignment ships to your order terms.",
  },
] as const;

export const banks: readonly { name: string; branch: string }[] = [
  { name: "Jamuna Bank PLC", branch: "Mirpur Branch, Dhaka" },
  { name: "Dutch-Bangla Bank Limited", branch: "Ashkona Branch, Dhaka" },
];
