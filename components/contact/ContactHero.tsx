import Link from "next/link";

import { Arrow } from "@/components/ui/Arrow";
import { channels } from "@/content/contact";

import styles from "./ContactPage.module.css";

const enter = (d: number) => ({ "--d": d }) as React.CSSProperties;

export function ContactHero() {
  return (
    <section className={`wrap ${styles.head}`}>
      <p className={styles.crumbs} data-enter style={enter(0)}>
        <Link href="/">Home</Link> / Contact
      </p>
      <h1 className={styles.title} data-enter style={enter(1)}>
        Talk to the people who <em>make your trims.</em>
      </h1>
      <p className="lede" data-enter style={enter(2)}>
        Reach our merchandising team in Dhaka, our office in Guangzhou, or visit
        the factory in Gazipur. Send a tech pack and we reply with a costed
        quotation and sampling plan.
      </p>
      <div className="ctas" data-enter style={enter(3)}>
        <a href="#contact" className="btn btn-primary">
          Send a tech pack <Arrow />
        </a>
        <a href="#offices" className="btn btn-ghost">
          Find an office
        </a>
      </div>

      <ul className={styles.channels}>
        {channels.map((channel, i) => (
          <li
            key={channel.kicker}
            data-rise
            style={{ "--i": i } as React.CSSProperties}
          >
            <a href={channel.href}>
              <svg className={styles.stitch} aria-hidden="true">
                <rect x="0" y="0" width="100%" height="100%" rx="30" />
              </svg>
              <small>{channel.kicker}</small>
              <b>{channel.value}</b>
              <Arrow />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
