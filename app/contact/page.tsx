import type { Metadata } from "next";

import { ContactHero } from "@/components/contact/ContactHero";
import { Offices } from "@/components/contact/Offices";
import { QuoteProcess } from "@/components/contact/QuoteProcess";
import { PageShell } from "@/components/layout/PageShell";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 86_400;

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Contact Sunvee Trade International: our Dhaka corporate office, Gazipur factory and Guangzhou office. Send a tech pack for a costed quotation and sampling plan.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactHero />
      <Offices />
      <QuoteProcess />
      <ScrollReveal />
    </PageShell>
  );
}
