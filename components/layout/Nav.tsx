"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Arrow } from "@/components/ui/Arrow";
import { company, primaryNav } from "@/content/site";
import { useScrollFrame } from "@/lib/use-scroll-frame";

import { Logo } from "./Logo";
import styles from "./Nav.module.css";

export function Nav() {
  const shellRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollFrame(({ y, dy, docH }) => {
    const thread = threadRef.current;
    if (thread) {
      thread.style.setProperty("--p", (docH > 0 ? y / docH : 0).toFixed(4));
    }

    // Hide the pill while scrolling down past the fold, bring it back on any
    // upward movement. The 2px gate stops it flickering on sub-pixel deltas.
    const shell = shellRef.current;
    if (shell && Math.abs(dy) > 2) {
      shell.dataset.hidden = String(dy > 0 && y > 400);
    }
  });

  const close = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, close]);

  return (
    <>
      <div className={styles.shell} ref={shellRef} data-hidden="false">
        <nav className={styles.nav} aria-label="Primary">
          <Logo withSuffix />
          <ul className={styles.links}>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#contact"
            className={`btn btn-primary ${styles.quoteBtn}`}
          >
            Request a quote <Arrow />
          </Link>
          <button
            className={`btn btn-ghost ${styles.menuBtn}`}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
          <span className={styles.thread} ref={threadRef} aria-hidden="true" />
        </nav>
      </div>

      {menuOpen ? (
        <div className={styles.drawer} id="mobile-menu">
          <div className={styles.drawerTop}>
            <Logo />
            <button
              className="btn btn-ghost"
              type="button"
              onClick={close}
              autoFocus
            >
              Close
            </button>
          </div>
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#contact" className="btn btn-primary" onClick={close}>
            Request a quote <Arrow />
          </Link>
          <div className={styles.drawerFoot}>
            <a href={company.phoneHref}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </div>
      ) : null}
    </>
  );
}
