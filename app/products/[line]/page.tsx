import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { CoverParallax } from "@/components/products/CoverParallax";
import { LineGallery } from "@/components/products/LineGallery";
import { Media } from "@/components/ui/Media";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StitchLink } from "@/components/ui/StitchLink";
import { getProductLine, productLines } from "@/content/products";

import styles from "../products.module.css";

/** Pre-render every product line at build time (technical spec §2). */
export function generateStaticParams() {
  return productLines.map((line) => ({ line: line.slug }));
}

/** Catalog edits go live on the next revalidation, no redeploy needed. */
export const revalidate = 86_400;

/** Slugs come from the repo, so anything else is a genuine 404. */
export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/products/[line]">,
): Promise<Metadata> {
  const { line: slug } = await props.params;
  const line = getProductLine(slug);
  if (!line) return {};

  return {
    title: line.name,
    description: line.tagline,
    alternates: { canonical: `/products/${line.slug}` },
    openGraph: {
      title: line.name,
      description: line.tagline,
      type: "website",
    },
  };
}

export default async function ProductLinePage(
  props: PageProps<"/products/[line]">,
) {
  const { line: slug } = await props.params;
  const line = getProductLine(slug);
  if (!line) notFound();

  const productCount = line.categories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <PageShell>
      <section className={`wrap ${styles.head}`}>
        <p className={styles.crumbs}>
          <Link href="/">Home</Link> / <Link href="/products">Products</Link> /{" "}
          {line.name}
        </p>
        <h1 className={styles.title}>{line.name}</h1>
        <p className="lede">{line.intro}</p>

        <dl className={styles.facts}>
          <div>
            <dt>Products</dt>
            <dd>{String(productCount).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>Categories</dt>
            <dd>{String(line.categories.length).padStart(2, "0")}</dd>
          </div>
          {line.headlineFigure ? (
            <div>
              <dt>Capacity</dt>
              <dd>{line.headlineFigure}</dd>
            </div>
          ) : null}
        </dl>

        {line.materials?.length ? (
          <div className={styles.materials}>
            {line.materials.map((material) => (
              <span key={material}>{material}</span>
            ))}
          </div>
        ) : null}
      </section>

      <div className="wrap">
        <CoverParallax className={styles.cover}>
          <Media
            as="figure"
            media={line.cover}
            className={styles.coverFrame}
            imgClassName={styles.coverImg}
            sizes="(max-width: 1220px) 100vw, 1180px"
            priority
          />
        </CoverParallax>
      </div>

      <section
        className="wrap"
        style={{ paddingBottom: "clamp(96px,11vw,150px)" }}
        aria-label={`${line.name} catalogue`}
      >
        <LineGallery categories={line.categories} lineName={line.name} />

        <p className={styles.close}>
          <StitchLink href="/#contact">
            Request a quote for {line.name.toLowerCase()}
          </StitchLink>
        </p>
      </section>
      <ScrollReveal />
    </PageShell>
  );
}
