"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Arrow } from "@/components/ui/Arrow";
import { Media } from "@/components/ui/Media";
import { StitchLink } from "@/components/ui/StitchLink";
import { productLines } from "@/content/products";
import { map } from "@/lib/scroll-frame";
import { useBuild, useScrollFrame } from "@/lib/use-scroll-frame";

import styles from "./ProductsPan.module.css";

/** Tick marks for the tape measure, in 100px steps. */
const TICKS = Array.from({ length: 161 }, (_, i) => i);

export function ProductsPan() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<HTMLDivElement>(null);
  const distanceRef = useRef(0);
  const [label, setLabel] = useState("Measure your range");

  /**
   * The section is as tall as the track's horizontal overflow plus one
   * viewport, so the pan finishes exactly as the sticky pane unpins.
   */
  useBuild((vw, vh) => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const distance = Math.max(0, track.scrollWidth - vw);
    distanceRef.current = distance;
    wrap.style.height = `${distance + vh}px`;
  });

  useScrollFrame(({ vw, vh }) => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const rect = wrap.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= vh) return;

    const distance = distanceRef.current;
    const progress = map(-rect.top, 0, distance);

    track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px,0,0)`;
    if (tapeRef.current) {
      tapeRef.current.style.transform = `translate3d(${(
        vw / 2 -
        progress * distance * 1.2
      ).toFixed(1)}px,0,0)`;
    }

    // The tape's needle names whichever card is closest to centre.
    let closest: HTMLElement | null = null;
    let closestDistance = Infinity;

    const cards = track.querySelectorAll<HTMLElement>(`.${styles.card}`);
    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      const offset = r.left + r.width / 2 - vw / 2;
      const img = card.querySelector("img");
      if (img instanceof HTMLElement) {
        img.style.setProperty("--px", `${(-offset * 0.08).toFixed(1)}px`);
      }
      if (Math.abs(offset) < closestDistance) {
        closestDistance = Math.abs(offset);
        closest = card;
      }
    });

    const next =
      closestDistance < vw * 0.3 && closest
        ? ((closest as HTMLElement).dataset.name ?? "Made to order")
        : progress < 0.1
          ? "Measure your range"
          : "Made to order";

    setLabel((current) => (current === next ? current : next));
  });

  return (
    <section
      className={`${styles.wrap} on-dark`}
      id="products"
      aria-labelledby="products-title"
      ref={wrapRef}
    >
      <div className={styles.stick}>
        <div className={styles.track} ref={trackRef}>
          <div className={styles.intro}>
            <h2 className="h2" id="products-title">
              What we make, <em>line by line.</em>
            </h2>
            <p className="lede">
              Each business unit runs its own machines and QA, so a single order
              can cover waistband, strap, trim and packing tape.
            </p>
            <StitchLink href="/products">View all products</StitchLink>
          </div>

          {productLines.map((line) => (
            <Link
              href={`/products/${line.slug}`}
              className={styles.card}
              key={line.slug}
              data-name={line.name}
            >
              <Media
                media={line.cover}
                sizes="(max-width: 720px) 78vw, 30vw"
                imgClassName={styles.cardImg}
              >
                <span className={styles.go} aria-hidden="true">
                  <Arrow up />
                </span>
              </Media>
              <div>
                <h3>{line.name}</h3>
                <p>{line.tagline}</p>
                {line.headlineFigure ? (
                  <span className="fig">{line.headlineFigure}</span>
                ) : null}
              </div>
            </Link>
          ))}

          <div className={styles.end}>
            <h3>Need a trim that is not on this list?</h3>
            <p className={`lede ${styles.endLede}`}>
              Send a swatch or tech pack. Our design team develops new
              constructions to order.
            </p>
            <div>
              <Link href="/#contact" className="btn btn-light">
                Request a quote <Arrow />
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.tape} aria-hidden="true">
          <div className={styles.tapeStrip} ref={tapeRef}>
            {TICKS.map((tick) => (
              <span key={tick} style={{ left: `${tick * 100}px` }}>
                {tick}
              </span>
            ))}
          </div>
          <span className={styles.needle} />
          <span className={styles.label}>{label}</span>
        </div>
      </div>
    </section>
  );
}
