import { company } from "@/content/site";

import styles from "./Nav.module.css";

export function UtilityBar() {
  return (
    <div className={styles.utility}>
      <div className="wrap">
        <span className={styles.left}>
          ISO 9001:2015 &nbsp;/&nbsp; OEKO-TEX STANDARD 100 &nbsp;/&nbsp; 100%
          EXPORT ORIENTED
        </span>
        <div className={styles.contact}>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>
    </div>
  );
}
