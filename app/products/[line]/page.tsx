import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
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

  return (
    <PageShell>
      <section className={`wrap ${styles.head}`}>
        <p className={styles.crumbs}>
          <Link href="/">Home</Link> / <Link href="/products">Products</Link> /{" "}
          {line.name}
        </p>
        <h1 className={styles.title}>{line.name}</h1>
        <p className="lede">{line.intro}</p>

        {line.materials?.length ? (
          <div className={styles.materials}>
            {line.materials.map((material) => (
              <span key={material}>{material}</span>
            ))}
          </div>
        ) : null}
      </section>

      <div className="wrap">
        <Media
          as="figure"
          media={line.cover}
          className={styles.cover}
          sizes="(max-width: 1220px) 100vw, 1180px"
          priority
        />
      </div>

      <section
        className="wrap"
        style={{ paddingBottom: "clamp(96px,11vw,150px)" }}
        aria-label={`${line.name} categories`}
      >
        <div className={styles.categories}>
          {line.categories.map((category) => (
            <article className={styles.category} key={category.slug}>
              <div>
                <h3>{category.name}</h3>
                <p>{category.summary}</p>
              </div>

              <ul className={styles.items}>
                {category.items.map((item) => (
                  <li className={styles.item} key={item.slug}>
                    <b>{item.name}</b>
                    {item.description ? <p>{item.description}</p> : null}
                    {item.images?.length ? (
                      <div className={styles.itemGallery}>
                        {item.images.map((img, idx) => (
                          <Media
                            key={idx}
                            media={img}
                            className={styles.itemThumb}
                            sizes="(max-width: 768px) 80px, 100px"
                          />
                        ))}
                      </div>
                    ) : null}
                    {item.specs?.length ? (
                      <ul className={styles.specs}>
                        {item.specs.map((spec) => (
                          <li key={spec.label}>
                            <b>{spec.label}:</b> {spec.value}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p style={{ marginTop: 40 }}>
          <StitchLink href="/#contact">
            Request a quote for {line.name.toLowerCase()}
          </StitchLink>
        </p>
      </section>
      <ScrollReveal />
    </PageShell>
  );
}
