import { coreValues } from "@/content/about";

import styles from "./AboutPage.module.css";

export function Values() {
  return (
    <section
      className={`sec ${styles.values}`}
      id="values"
      aria-labelledby="values-title"
    >
      <div className="wrap">
        <div className="stack-head">
          <p className="eyebrow">Core values</p>
          <h2 className="h2" id="values-title">
            Six principles we <em>work by.</em>
          </h2>
          <p className="lede">
            They shape how we treat buyers, colleagues and the people on the
            floor.
          </p>
        </div>

        <ul className={styles.valueGrid}>
          {coreValues.map((value, i) => (
            <li
              key={value.name}
              data-rise
              style={{ "--i": i % 3 } as React.CSSProperties}
            >
              <span className="fig">{String(i + 1).padStart(2, "0")}</span>
              <b>{value.name}</b>
              <p>{value.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
