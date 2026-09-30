import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";

import styles from "./CapabilitiesPage.module.css";

/** Points About visitors to the dedicated manufacturing + sustainability page. */
export function CapabilitiesBridge() {
  return (
    <section
      className={`sec ${styles.bridge}`}
      aria-labelledby="bridge-title"
    >
      <div className={`wrap ${styles.bridgeInner}`}>
        <div data-rise>
          <h2 className="h2" id="bridge-title">
            See how the floor <em>actually runs.</em>
          </h2>
          <p className="lede">
            Manufacturing systems, machinery, sustainability pillars and our
            factory code of conduct live on the capabilities page — with the
            full company profile for download.
          </p>
        </div>
        <Link
          href="/capabilities"
          className="btn btn-primary"
          data-rise
          style={{ "--i": 1 } as React.CSSProperties}
        >
          View capabilities <Arrow />
        </Link>
      </div>
    </section>
  );
}
