import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { About } from "@/components/home/About";
import { Certificates } from "@/components/home/Certificates";
import { Factory } from "@/components/home/Factory";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { MaskReveal } from "@/components/home/MaskReveal";
import { Partners } from "@/components/home/Partners";
import { ProductsPan } from "@/components/home/ProductsPan";
import { Strength } from "@/components/home/Strength";
import { Sustainability } from "@/components/home/Sustainability";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { capacity, company, offices } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Statically generated, revalidated daily (technical spec §2). Catalog edits
 * go live on the next revalidation without a full redeploy, while visitors
 * always get cached static HTML.
 */
export const revalidate = 86_400;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl(),
    email: company.email,
    telephone: company.phone,
    description: company.description,
    foundingDate: String(company.established),
    address: offices.map((office) => ({
      "@type": "PostalAddress",
      name: office.label,
      streetAddress: office.address,
    })),
    makesOffer: capacity.map((row) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: row.line },
    })),
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, developer-authored content — no user input reaches this.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organisationJsonLd()),
        }}
      />
      <UtilityBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <MaskReveal />
        <ProductsPan />
        <Strength />
        <Sustainability />
        <Certificates />
        <Factory />
        <Partners />
        <Footer />
      </main>
      {/* Mounted last so every section is in the DOM when the observer runs. */}
      <ScrollReveal />
    </>
  );
}
