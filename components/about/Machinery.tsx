import { Counter } from "@/components/ui/Counter";
import { Media } from "@/components/ui/Media";
import { aboutImages, machinery, siteFacts } from "@/content/about";
import { productionUnits } from "@/content/site";

import styles from "./AboutPage.module.css";

export function Machinery() {
  return (
    <section
      className={`sec ${styles.mach} on-dark`}
      id="machinery"
      aria-labelledby="mach-title"
    >
      <div className="wrap">
        <div className="stack-head">
          <p className="eyebrow" style={{ marginBottom: 0 }}>
            Machinery and facility
          </p>
          <h2 className="h2" id="mach-title">
            Human spirit, <em>technical excellence.</em>
          </h2>
          <p className="lede">
            People are the essence of Sunvee. We balance them with
            state-of-the-art machinery across nine production units.
          </p>
        </div>

        <div className={styles.machStats}>
          {siteFacts.map((fact) => (
            <div key={fact.label}>
              {"text" in fact ? (
                <b>{fact.text}</b>
              ) : (
                <Counter value={fact.value} />
              )}
              <span>{fact.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.machMosaic}>
          <Media
            media={aboutImages.machineA}
            sizes="(max-width: 720px) 100vw, 40vw"
            className={styles.m1}
            imgClassName={styles.zoom}
          />
          <Media
            media={aboutImages.machineB}
            sizes="(max-width: 720px) 50vw, 30vw"
            className={styles.m2}
            imgClassName={styles.zoom}
          />
          <Media
            media={aboutImages.machineC}
            sizes="(max-width: 720px) 50vw, 30vw"
            className={styles.m3}
            imgClassName={styles.zoom}
          />
        </div>

        <div className={styles.machGrid}>
          <div>
            <h3>Machine park</h3>
            <ul className={styles.machList}>
              {machinery.map((m, i) => (
                <li key={m}>
                  <span className="fig">{String(i + 1).padStart(2, "0")}</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Production units</h3>
            <ul className={styles.unitList}>
              {productionUnits.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
