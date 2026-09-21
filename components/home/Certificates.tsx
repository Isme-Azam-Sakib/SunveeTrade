import { StitchLink } from "@/components/ui/StitchLink";
import { certificates } from "@/content/site";

import styles from "./Certificates.module.css";

export function Certificates() {
  return (
    <section className="sec" id="certificates" aria-labelledby="cert-title">
      <div className="wrap">
        <div className="stack-head">
          <h2 className="h2" id="cert-title">
            Audited by <em>named issuers.</em>
          </h2>
          <p className="lede">
            Certificate copies and test reports are sent with the first
            quotation, or on request.
          </p>
        </div>

        <div className={styles.certs}>
          {certificates.map((certificate, i) => (
            <article
              className={styles.cert}
              key={certificate.standard}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
            >
              <svg className={styles.stitch} aria-hidden="true">
                <rect x="0" y="0" width="100%" height="100%" rx="30" />
              </svg>
              <div className={styles.seal}>
                <div>
                  <b>{certificate.mark}</b>
                  <span>{certificate.standard}</span>
                </div>
              </div>
              <div className={styles.body}>
                <small>Certified by {certificate.issuer}</small>
                <h3>{certificate.title}</h3>
                <p>{certificate.description}</p>
                <div className={styles.foot}>
                  <span className="fig">
                    {certificate.mark} {certificate.standard}
                  </span>
                  <StitchLink href="/#contact">Request a copy</StitchLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
