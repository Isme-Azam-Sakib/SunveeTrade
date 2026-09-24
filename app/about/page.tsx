import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { Conduct } from "@/components/about/Conduct";
import { Leadership } from "@/components/about/Leadership";
import { Machinery } from "@/components/about/Machinery";
import { MissionVision } from "@/components/about/MissionVision";
import { Story } from "@/components/about/Story";
import { Values } from "@/components/about/Values";
import { Certificates } from "@/components/home/Certificates";
import { Partners } from "@/components/home/Partners";
import { Strength } from "@/components/home/Strength";
import { Sustainability } from "@/components/home/Sustainability";
import { PageShell } from "@/components/layout/PageShell";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 86_400;

export const metadata: Metadata = {
  title: "About us",
  description:
    "Sunvee Trade International: a 100% export-oriented garment trims and accessories manufacturer in Gazipur, Bangladesh. Our story, values, leadership, manufacturing systems, sustainability and certifications.",
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
      <Strength />
      <Machinery />
      <Sustainability />
      <Conduct />
      <Certificates />
      <Partners />
      <ScrollReveal />
    </PageShell>
  );
}
