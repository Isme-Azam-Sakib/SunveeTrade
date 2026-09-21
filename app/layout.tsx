import type { Metadata } from "next";
import { DM_Mono, DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";

import { MotionGate } from "@/components/layout/MotionGate";
import { company } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${company.name} | Garment trims and accessories`,
    template: `%s | ${company.name}`,
  },
  description:
    "100% export-oriented manufacturer of garment trims, accessories and packaging. Elastics, lingerie trims, embossed ribbon, bra cups, rhinestones and gum tape from nine production units in Gazipur, Bangladesh.",
  applicationName: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_GB",
    title: `${company.name} | Garment trims and accessories`,
    description:
      "Garment trims, accessories and packaging from nine production units in Gazipur, supplying global brands since 2014.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${dmSerif.variable} ${dmMono.variable}`}
    >
      <body>
        <MotionGate />
        {children}
      </body>
    </html>
  );
}
