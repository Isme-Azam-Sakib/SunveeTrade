import Image from "next/image";
import Link from "next/link";

import { partnerLogos } from "@/content/partner-logos";

import styles from "./Partners.module.css";

export function Partners() {
  return (
    <section className="sec" id="partners" aria-labelledby="partners-title">
      <div className="wrap">
        <div className="stack-head">
          <h2 className="h2" id="partners-title">
            Global brands <em>we serve.</em>
          </h2>
          <p className="lede">
            Trims from our Gazipur lines go into collections for these brands
            and their manufacturing partners.
          </p>
        </div>

        <div className={styles.wall}>
          {partnerLogos.map((logo, i) => (
            <div
              key={logo.file}
              data-rise
              style={{ "--i": i % 8 } as React.CSSProperties}
            >
              <Image
                src={`/media/partners/${logo.file}.png`}
                alt={logo.name}
                width={logo.w}
                height={logo.h}
                className={styles.logo}
                style={{ width: `${logo.w * 0.6}px`, height: "auto" }}
              />
            </div>
          ))}
          <Link
            href="/#contact"
            className={styles.you}
            data-rise
            style={{ "--i": 7 } as React.CSSProperties}
          >
            Your brand next.
            <br />
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
