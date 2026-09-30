import { Arrow } from "@/components/ui/Arrow";
import { company, companyProfile } from "@/content/site";

import styles from "./CapabilitiesPage.module.css";

export function ProfileDownload() {
  return (
    <section
      className={`sec ${styles.profile}`}
      id="profile"
      aria-labelledby="profile-title"
    >
      <div className={`wrap ${styles.profileInner}`}>
        <div className={styles.profileCopy} data-rise>
          <h2 className="h2" id="profile-title">
            Full company profile, <em>ready to share.</em>
          </h2>
          <p className="lede">
            Machinery lists, capacities, certifications, offices and bank
            details in one PDF — built for sourcing teams and compliance
            reviews.
          </p>
        </div>
        <div className={styles.profileAction} data-rise style={{ "--i": 1 } as React.CSSProperties}>
          <a
            href={companyProfile.href}
            className="btn btn-primary"
            download={companyProfile.filename}
          >
            {companyProfile.label} <Arrow />
          </a>
          <p>
            PDF · {company.name} · Updated for buyer diligence
          </p>
        </div>
      </div>
    </section>
  );
}
