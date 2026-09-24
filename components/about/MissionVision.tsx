import type { ReactNode } from "react";

import { Media } from "@/components/ui/Media";
import { aboutImages, mission, vision } from "@/content/about";

import styles from "./AboutPage.module.css";

function Column({
  eyebrow,
  title,
  items,
  index,
}: {
  eyebrow: string;
  title: ReactNode;
  items: readonly string[];
  index: number;
}) {
  return (
    <div
      className={styles.mvCol}
      data-rise
      style={{ "--i": index } as React.CSSProperties}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <ol>
        {items.map((item, i) => (
          <li key={item}>
            <span className="fig">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function MissionVision() {
  return (
    <section
      className={`sec ${styles.mv} on-dark`}
      id="mission"
      aria-labelledby="mv-title"
    >
      <div className="wrap">
        <div className="stack-head">
          <h2 className="h2" id="mv-title">
            What we do, and <em>where we are headed.</em>
          </h2>
        </div>

        <div className={styles.mvGrid}>
          <Column
            eyebrow="Our mission"
            title={
              <>
                Reliable, to the <em>letter of the order.</em>
              </>
            }
            items={mission}
            index={0}
          />
          <Column
            eyebrow="Our vision"
            title={
              <>
                A top name in <em>ready-made garments.</em>
              </>
            }
            items={vision}
            index={1}
          />
        </div>

        <Media
          as="figure"
          media={aboutImages.mission}
          sizes="(max-width: 1220px) 100vw, 1180px"
          className={styles.mvImg}
        />
      </div>
    </section>
  );
}
