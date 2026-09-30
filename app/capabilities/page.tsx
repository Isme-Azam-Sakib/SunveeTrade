import type { Metadata } from "next";

import { CapabilitiesHero } from "@/components/capabilities/CapabilitiesHero";
import { ProfileDownload } from "@/components/capabilities/ProfileDownload";
import { Conduct } from "@/components/about/Conduct";
import { Machinery } from "@/components/about/Machinery";
import { Certificates } from "@/components/home/Certificates";
import { Strength } from "@/components/home/Strength";
import { Sustainability } from "@/components/home/Sustainability";
import { PageShell } from "@/components/layout/PageShell";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 86_400;

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Sunvee manufacturing systems, machinery, sustainability framework, factory code of conduct and certifications. Download the full company profile PDF.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <PageShell>
      <CapabilitiesHero />
      <Strength />
      <Machinery />
      <Sustainability />
      <Conduct />
      <Certificates />
      <ProfileDownload />
      <ScrollReveal />
    </PageShell>
  );
}
