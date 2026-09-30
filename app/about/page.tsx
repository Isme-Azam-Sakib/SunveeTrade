import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { Leadership } from "@/components/about/Leadership";
import { MissionVision } from "@/components/about/MissionVision";
import { Story } from "@/components/about/Story";
import { Values } from "@/components/about/Values";
import { CapabilitiesBridge } from "@/components/capabilities/CapabilitiesBridge";
import { Partners } from "@/components/home/Partners";
import { PageShell } from "@/components/layout/PageShell";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 86_400;

export const metadata: Metadata = {
  title: "About us",
  description:
    "Sunvee Trade International: a 100% export-oriented garment trims and accessories manufacturer in Gazipur, Bangladesh. Our story, values, leadership and buying partners.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutHero />
      <Story />
      <MissionVision />
      <Values />
      <Leadership />
      <CapabilitiesBridge />
      <Partners />
      <ScrollReveal />
    </PageShell>
  );
}
