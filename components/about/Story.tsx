"use client";

import { Fragment, useRef } from "react";

import { Media } from "@/components/ui/Media";
import { aboutImages, offerings } from "@/content/about";
import { clamp, map } from "@/lib/scroll-frame";
import { useScrollFrame } from "@/lib/use-scroll-frame";

import styles from "./AboutPage.module.css";

const STATEMENT: readonly { text: string; em?: boolean }[] = [
  { text: "We began as a machine-led trims unit. Today we are a " },
  { text: "one-stop accessory hub", em: true },
  {
    text: " that partners with global brands and manufacturers, adding value to every step of the supply chain.",
  },
];

export function Story() {
  const revealRef = useRef<HTMLParagraphElement>(null);
  const figRef = useRef<HTMLDivElement>(null);

  useScrollFrame(({ vh }) => {
    const reveal = revealRef.current;
    if (reveal) {
      const spans = reveal.querySelectorAll<HTMLElement>("[data-w]");
      const progress = map(
        vh - reveal.getBoundingClientRect().top,
        vh * 0.15,
        vh * 0.8,
      );
      spans.forEach((span, i) => {
        const o = 0.14 + 0.86 * clamp(progress * spans.length - i, 0, 1);
        span.style.setProperty("--o", o.toFixed(3));
      });
    }

    // The two photographs drift at different rates so they slide past each
    // other as the section scrolls.
    const fig = figRef.current;
    if (fig) {
      const rect = fig.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < vh) {
        fig.style.setProperty(
          "--p",
          map(rect.top, vh, -rect.height).toFixed(4),
        );
      }
    }
  });

  let n = 0;

  return (
    <section
      className={`sec ${styles.story}`}
      id="story"
      aria-labelledby="story-title"
    >
      <div className="wrap">
        <p className="eyebrow">Our story</p>
        <h2 className="sr" id="story-title">
          Our story
        </h2>

        <p className={styles.statement} ref={revealRef}>
          {STATEMENT.map((seg, si) => {
            const words = seg.text
              .split(/(\s+)/)
              .filter(Boolean)
              .map((w) =>
                /^\s+$/.test(w) ? (
                  <Fragment key={n++}> </Fragment>
                ) : (
                  <span data-w key={n++}>
                    {w}
                  </span>
                ),
              );
            return seg.em ? (
              <em key={si}>{words}</em>
            ) : (
              <Fragment key={si}>{words}</Fragment>
            );
          })}
        </p>

        <div className={styles.storyGrid}>
          <div className={styles.storyCopy} data-rise>
            <p>
              Sunvee Trade International was established in 2014 as a
              high-class, machine-oriented trims and accessories unit. It has
              since expanded its accessories hub to deliver complete packaging,
              apparel branding and supply chain solutions.
            </p>
            <p>
              We aspire to be the accessory partner buyers do not have to think
              about: consistent quality, honest lead times and a single point of
              accountability from tech pack to shipment.
            </p>
          </div>

          <div className={styles.duo} ref={figRef}>
            <Media
              as="figure"
              media={aboutImages.story}
              sizes="(max-width: 1080px) 60vw, 380px"
              className={styles.duoA}
            />
            <Media
              as="figure"
              media={aboutImages.storyAlt}
              sizes="(max-width: 1080px) 50vw, 300px"
              className={styles.duoB}
            />
          </div>
        </div>

        <div className={styles.offers}>
          {offerings.map((o, i) => (
            <article
              className={styles.offer}
              key={o.title}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
            >
              <svg className={styles.stitch} aria-hidden="true">
                <rect x="0" y="0" width="100%" height="100%" rx="30" />
              </svg>
              <span className="fig">{o.kicker}</span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
