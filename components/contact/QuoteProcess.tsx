import { Icon } from "@/components/ui/Icon";
import { banks, quoteSteps } from "@/content/contact";

import styles from "./ContactPage.module.css";

export function QuoteProcess() {
  return (
    <section
      className={`sec ${styles.process}`}
      aria-labelledby="process-title"
    >
      <div className="wrap">
        <div className="stack-head">
          <p className="eyebrow">
            <Icon name="fi-rr-clipboard-list" /> How an enquiry works
          </p>
          <h2 className="h2" id="process-title">
            From tech pack to <em>shipment.</em>
          </h2>
          <p className="lede">
            One point of contact carries your order through four steps.
          </p>
        </div>

        <ol className={styles.steps} data-in>
          {quoteSteps.map((step, i) => (
            <li key={step.title} style={{ "--i": i } as React.CSSProperties}>
              <span className={styles.num} aria-hidden="true">
                <Icon name={step.icon} />
              </span>
              <h3>
                <span className="sr">
                  Step {String(i + 1).padStart(2, "0")}.{" "}
                </span>
                {step.title}
              </h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.banks} data-rise>
          <h3>
            <Icon name="fi-rr-building" className={styles.bankIcon} /> Banking
            partners
          </h3>
          <ul>
            {banks.map((bank) => (
              <li key={bank.name}>
                <b>{bank.name}</b>
                <span>{bank.branch}</span>
              </li>
            ))}
          </ul>
          <p>Full bank details are shared with the first proforma invoice.</p>
        </div>
      </div>
    </section>
  );
}
