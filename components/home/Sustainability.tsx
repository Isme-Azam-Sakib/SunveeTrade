"use client";

import { useState } from "react";

import { Media } from "@/components/ui/Media";
import { sustainabilityPillars } from "@/content/site";

import styles from "./Sustainability.module.css";

export function Sustainability() {
  const [open, setOpen] = useState(sustainabilityPillars[0].slug);

  return (
    <section
      className={`sec ${styles.sus} on-dark`}
      id="sustainability"
      aria-labelledby="sus-title"
    >
      <div className="wrap">
        <div className="stack-head">
          <h2 className="h2" id="sus-title">
            Traceable, transparent, <em>responsible.</em>
          </h2>
          <p className="lede">
            Buyers now ask where every component comes from and how it was made.
            Our framework answers on four fronts.
          </p>
        </div>

        <div className={styles.acc}>
          {sustainabilityPillars.map((pillar) => {
            const isOpen = pillar.slug === open;
            const panelId = `sus-panel-${pillar.slug}`;
            return (
              <div className={styles.pane} key={pillar.slug} data-open={isOpen}>
                <Media
                  media={pillar.image}
                  sizes="(max-width: 720px) 100vw, 40vw"
                  imgClassName={styles.paneImg}
                />

                {/* The whole pane is the control. Keeping it a real <button>
                    that sits over the artwork means the panel content below
                    can stay proper headings and lists. */}
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onMouseEnter={() => setOpen(pillar.slug)}
                  onFocus={() => setOpen(pillar.slug)}
                  onClick={() => setOpen(pillar.slug)}
                >
                  <span className="sr">{pillar.name}</span>
                </button>

                <span className={styles.label} aria-hidden="true">
                  {pillar.name}
                </span>

                <div className={styles.body} id={panelId}>
                  <h3>{pillar.name}</h3>
                  <p>{pillar.description}</p>
                  <ul>
                    {pillar.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
