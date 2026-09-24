import { Media } from "@/components/ui/Media";
import { aboutImages, conduct } from "@/content/about";

import styles from "./AboutPage.module.css";

export function Conduct() {
  return (
    <section
      className={`sec ${styles.conduct}`}
      id="conduct"
      aria-labelledby="conduct-title"
    >
      <div className={`wrap ${styles.conductGrid}`}>
        <div>
          <p className="eyebrow">Factory code of conduct</p>
          <h2 className="h2" id="conduct-title">
            Commitments we <em>hold on site.</em>
          </h2>
          <Media
            as="figure"
            media={aboutImages.logistics}
            sizes="(max-width: 1080px) 100vw, 40vw"
            className={styles.conductImg}
            data-rise
          />
        </div>
        <ul className={styles.conductList}>
          {conduct.map((item, i) => (
            <li
              key={item}
              data-rise
              style={{ "--i": i % 4 } as React.CSSProperties}
            >
              <i aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
