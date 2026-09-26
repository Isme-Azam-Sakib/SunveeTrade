"use client";

import { useRef } from "react";

import { Counter } from "@/components/ui/Counter";
import { Media } from "@/components/ui/Media";
import { StitchLink } from "@/components/ui/StitchLink";
import { capacity, factoryStats, productionUnits } from "@/content/site";
import { map } from "@/lib/scroll-frame";
import { useScrollFrame } from "@/lib/use-scroll-frame";

import styles from "./Factory.module.css";

const FACTORY_IMAGE = {
  key: "manufacturing/machine-line.jpg",
  alt: "Needle loom machine on the factory floor",
};

const peak = Math.max(...capacity.map((row) => row.perMonth));

export function Factory() {
  const imgRef = useRef<HTMLElement>(null);

  useScrollFrame(({ vh }) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;
    el.style.setProperty(
      "--s",
      (1.15 - 0.15 * map(vh - rect.top, 0, vh * 0.9)).toFixed(4),
    );
  });

  return (
    <section
      className={`sec ${styles.factory} on-dark`}
      aria-labelledby="fac-title"
    >
      <div className="wrap">
        <div className="stack-head">
          <p className="eyebrow" style={{ marginBottom: 0 }}>
            Factory at a glance
          </p>
          <h2 className="h2" id="fac-title">
            Built for bulk volume, <em>line by line.</em>
          </h2>
          <p className="lede">
            Human skill and machine precision across nine production units.
            Figures are monthly output per line.
          </p>
        </div>

        <div className={styles.grid}>
          <div>
            <Media
              as="figure"
              media={FACTORY_IMAGE}
              className={styles.img}
              imgClassName={styles.imgInner}
              sizes="(max-width: 1080px) 100vw, 50vw"
              style={{ margin: 0 }}
              ref={imgRef}
            />

            <div className={styles.stats}>
              {factoryStats.map((stat) => (
                <div key={stat.label}>
                  <Counter value={stat.value} />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.units}>
              <h4>Production units</h4>
              <ul>
                {productionUnits.map((unit) => (
                  <li key={unit}>{unit}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={styles.table}
            data-in
            role="table"
            aria-label="Monthly capacity by product line"
          >
            <div className={styles.tableHead} role="row">
              <span role="columnheader">Product line</span>
              <span role="columnheader">Per month</span>
            </div>

            {capacity.map((row, i) => (
              <div
                className={styles.row}
                role="row"
                key={row.line}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span role="cell">{row.line}</span>
                <i
                  className={styles.bar}
                  style={{
                    width: `${Math.round((row.perMonth / peak) * 100)}%`,
                  }}
                  aria-hidden="true"
                />
                <b role="cell">
                  <Counter value={row.perMonth} as="span" />
                  <small>{row.unit}</small>
                </b>
              </div>
            ))}

            <div className={styles.tableFoot}>
              <span>Full capacity sheet in the company profile</span>
              <StitchLink href="/#contact">Request the profile</StitchLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
