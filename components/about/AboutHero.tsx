import Link from "next/link";

import { CoverParallax } from "@/components/products/CoverParallax";
import { Media } from "@/components/ui/Media";
import { aboutFacts, aboutImages, aboutIndex } from "@/content/about";

import styles from "./AboutPage.module.css";

const enter = (d: number) => ({ "--d": d }) as React.CSSProperties;

export function AboutHero() {
  return (
    <>
      <section className={`wrap ${styles.head}`}>
        <p className={styles.crumbs} data-enter style={enter(0)}>
          <Link href="/">Home</Link> / About
        </p>
        <h1 className={styles.title} data-enter style={enter(1)}>
          The trims house behind <em>global brands.</em>
        </h1>
        <p className="lede" data-enter style={enter(2)}>
          Sunvee Trade International is a 100% export-oriented manufacturer of
          garment trims, accessories and packaging, run from Gazipur, Bangladesh
          since 2014.
        </p>

        <dl className={styles.facts} data-enter style={enter(3)}>
          {aboutFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CoverParallax className={`wrap ${styles.cover}`}>
        <Media
          as="figure"
          media={aboutImages.cover}
          priority
          sizes="(max-width: 1220px) 100vw, 1180px"
          className={styles.coverFrame}
          imgClassName={styles.coverImg}
        />
      </CoverParallax>

      <nav className={`wrap ${styles.index}`} aria-label="On this page">
        <span>On this page</span>
        <ul>
          {aboutIndex.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
