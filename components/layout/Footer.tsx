"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { QuoteForm } from "@/components/quote/QuoteForm";
import { productLines } from "@/content/products";
import { company, offices } from "@/content/site";
import { mediaUrl } from "@/lib/images";
import { easeInOutCubic, map } from "@/lib/scroll-frame";
import { useScrollFrame } from "@/lib/use-scroll-frame";

import { Logo } from "./Logo";
import styles from "./Footer.module.css";

const COMPANY_LINKS = [
  { href: "/#about", label: "About us" },
  { href: "/#manufacturing", label: "Manufacturing" },
  { href: "/#sustainability", label: "Sustainability" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#partners", label: "Buying partners" },
];

export function Footer() {
  const closeRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bleedRef = useRef<HTMLParagraphElement>(null);

  useScrollFrame(({ vh }) => {
    const close = closeRef.current;
    if (close) {
      const rect = close.getBoundingClientRect();
      if (rect.top < vh * 1.1 && rect.top > -vh) {
        const progress = map(vh - rect.top, 0, vh * 0.85);
        close.style.setProperty(
          "--r",
          `${(6 + 144 * easeInOutCubic(progress)).toFixed(2)}%`,
        );
        bgRef.current?.style.setProperty(
          "--s",
          (1.2 - 0.2 * progress).toFixed(4),
        );
      }
    }

    const bleed = bleedRef.current;
    if (bleed) {
      const rect = bleed.getBoundingClientRect();
      if (rect.top < vh) {
        bleed.style.setProperty(
          "--by",
          `${(30 * (1 - map(vh - rect.top, 0, rect.height * 1.2))).toFixed(2)}%`,
        );
      }
    }
  });

  return (
    <section
      className={`${styles.close} on-dark`}
      id="contact"
      aria-labelledby="cta-title"
      ref={closeRef}
    >
      <div className={styles.cta}>
        <div className={styles.bg} ref={bgRef}>
          <Image
            src={mediaUrl("home/floral-applique-cta.jpg")}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
          />
        </div>

        <div className={`wrap ${styles.grid}`}>
          <div>
            <h2 id="cta-title">
              Partner with Sunvee.
              <br />
              <em>Send us your tech pack.</em>
            </h2>
            <p>
              Share the product line, quantity and target date. Our
              merchandising team replies with a costed quotation and sampling
              plan.
            </p>
            <div className="ctas">
              <a
                href={`mailto:${company.salesEmail}`}
                className="btn btn-light"
              >
                {company.salesEmail}
              </a>
              <a href={company.phoneHref} className="btn btn-outline-dark">
                Call {company.phone}
              </a>
            </div>
          </div>

          <QuoteForm />
        </div>
      </div>

      <footer className={`wrap ${styles.foot}`}>
        <div className={styles.footGrid}>
          <div>
            <Logo />
            <p>{company.description}</p>
            <div className={styles.badges}>
              <span>ISO 9001:2015</span>
              <span>OEKO-TEX 100</span>
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Products</h4>
            <ul>
              {productLines.map((line) => (
                <li key={line.slug}>
                  <Link href={`/products/${line.slug}`}>{line.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            {offices.map((office) => (
              <address className={styles.office} key={office.label}>
                <b>{office.label}</b>
                {office.address}
              </address>
            ))}
            <p className={styles.office}>
              <a href={company.phoneHref}>{company.phone}</a>
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            &copy; {new Date().getFullYear()} {company.name}. All rights
            reserved.
          </span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
          </nav>
        </div>

        <p className={styles.bleed} ref={bleedRef} aria-hidden="true">
          {company.shortName}
        </p>
      </footer>
    </section>
  );
}
