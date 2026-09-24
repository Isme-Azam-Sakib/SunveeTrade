import { Media } from "@/components/ui/Media";
import { StitchLink } from "@/components/ui/StitchLink";
import { contactOffices } from "@/content/contact";

import styles from "./ContactPage.module.css";

const mapHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export function Offices() {
  return (
    <section
      className="sec"
      id="offices"
      aria-labelledby="offices-title"
      style={{ paddingTop: "clamp(64px, 8vw, 100px)" }}
    >
      <div className="wrap">
        <div className="stack-head">
          <p className="eyebrow">Offices and factory</p>
          <h2 className="h2" id="offices-title">
            Three places, <em>one team.</em>
          </h2>
        </div>

        <div className={styles.offices}>
          {contactOffices.map((office, i) => (
            <article
              className={styles.office}
              key={office.slug}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
            >
              <Media
                media={office.image}
                sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                imgClassName={styles.officeImg}
              />
              <div className={styles.officeBody}>
                <small>{office.role}</small>
                <h3>{office.label}</h3>
                <address>{office.address}</address>

                {office.people?.map((p) => (
                  <p className={styles.person} key={p.name}>
                    <b>{p.name}</b>
                    <span>{p.role}</span>
                  </p>
                ))}

                <ul className={styles.lines}>
                  {office.phones?.map((phone) => (
                    <li key={phone.href}>
                      <a href={phone.href}>{phone.label}</a>
                    </li>
                  ))}
                  {office.email ? (
                    <li>
                      <a href={`mailto:${office.email}`}>{office.email}</a>
                    </li>
                  ) : null}
                </ul>

                <StitchLink
                  href={mapHref(office.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in maps
                </StitchLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
