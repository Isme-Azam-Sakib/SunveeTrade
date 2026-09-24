import { Media } from "@/components/ui/Media";
import { aboutImages, managementFunctions } from "@/content/about";

import styles from "./AboutPage.module.css";

export function Leadership() {
  return (
    <section
      className={`sec ${styles.lead}`}
      id="leadership"
      aria-labelledby="lead-title"
    >
      <div className={`wrap ${styles.leadGrid}`}>
        <div>
          <p className="eyebrow">Management and organisation</p>
          <h2 className="h2" id="lead-title">
            Policy set by a board, <em>run by professionals.</em>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            The Management Board decides and formulates policy and gives
            guidance to managers, officers and executives. The Managing Director
            looks after overall management.
          </p>

          <ol className={styles.tree} data-in>
            <li>
              <b>Management Board</b>
              <span>Policy and guidelines</span>
            </li>
            <li>
              <b>Managing Director</b>
              <span>Overall management</span>
            </li>
            <li>
              <b>Managers, officers and executives</b>
              <span>Smooth day-to-day operation</span>
              <ul>
                {managementFunctions.map((fn) => (
                  <li key={fn}>{fn}</li>
                ))}
              </ul>
            </li>
          </ol>
        </div>

        <Media
          as="figure"
          media={aboutImages.management}
          sizes="(max-width: 1080px) 100vw, 45vw"
          className={styles.leadImg}
          data-rise
        />
      </div>
    </section>
  );
}
