import Link from "next/link";

import { CoverParallax } from "@/components/products/CoverParallax";
import { Arrow } from "@/components/ui/Arrow";
import { Media } from "@/components/ui/Media";
import {
  aboutImages,
  capabilitiesFacts,
  capabilitiesIndex,
} from "@/content/about";
import { companyProfile } from "@/content/site";

import styles from "./CapabilitiesPage.module.css";

const enter = (d: number) => ({ "--d": d }) as React.CSSProperties;

export function CapabilitiesHero() {
  return (
    <>
      <section className={`wrap ${styles.head}`}>
        <div className={styles.copy}>
          <p className={styles.crumbs} data-enter style={enter(0)}>
            <Link href="/">Home</Link> / Capabilities
          </p>
          <h1 className={styles.title} data-enter style={enter(1)}>
            Manufacturing systems and <em>responsible supply.</em>
          </h1>
          <p className="lede" data-enter style={enter(2)}>
            Lean floors, audited process and a four-pillar sustainability
            framework — how Sunvee runs bulk trims for global brands from
            Gazipur.
          </p>
          <div className="ctas" data-enter style={enter(3)}>
            <a href="#manufacturing" className="btn btn-primary">
              Explore systems <Arrow />
            </a>
            <a
              href={companyProfile.href}
              className="btn btn-ghost"
              download={companyProfile.filename}
            >
              {companyProfile.label}
            </a>
          </div>

          <dl className={styles.facts} data-enter style={enter(4)}>
            {capabilitiesFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <CoverParallax className={styles.heroMedia}>
          <Media
            as="figure"
            media={{
              key: "manufacturing/machine-line.jpg",
              alt: "Needle loom line on the Sunvee factory floor",
            }}
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            className={styles.heroFrame}
            imgClassName={styles.heroImg}
          />
          <Media
            as="figure"
            media={{
              key: aboutImages.machineB.key,
              alt: "",
            }}
            sizes="(max-width: 900px) 40vw, 18vw"
            className={styles.heroFloat}
            imgClassName={styles.heroFloatImg}
          />
        </CoverParallax>
      </section>

      <nav className={`wrap ${styles.index}`} aria-label="On this page">
        <span>On this page</span>
        <ul>
          {capabilitiesIndex.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
