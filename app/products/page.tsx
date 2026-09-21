import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { Media } from "@/components/ui/Media";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { productLines } from "@/content/products";

import styles from "./products.module.css";

export const revalidate = 86_400;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Six product lines: narrow fabrics and elastics, lingerie elastic, ribbon and embossed elastic, rhinestones and studs, bra cups and padding, gum tape and packaging.",
  alternates: { canonical: "/products" },
};

export default function ProductsIndexPage() {
  return (
    <PageShell>
      <section className={`wrap ${styles.head}`}>
        <p className={styles.crumbs}>
          <Link href="/">Home</Link> / Products
        </p>
        <h1 className={styles.title}>
          Six product lines, <em>one supplier.</em>
        </h1>
        <p className="lede">
          Each business unit runs its own machines and QA, so a single order can
          cover waistband, strap, trim and packing tape.
        </p>
      </section>

      <section
        className="wrap"
        style={{ paddingBottom: "clamp(96px,11vw,150px)" }}
      >
        <div className={styles.grid}>
          {productLines.map((line, i) => (
            <Link
              href={`/products/${line.slug}`}
              className={styles.card}
              key={line.slug}
              data-rise
              style={{ "--i": i % 3 } as React.CSSProperties}
            >
              <Media
                media={line.cover}
                sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                imgClassName={styles.cardImg}
              />
              <div>
                <h2>{line.name}</h2>
                <p>{line.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ScrollReveal />
    </PageShell>
  );
}
