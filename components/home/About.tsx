"use client";

import { Fragment, useRef } from "react";

import { Counter } from "@/components/ui/Counter";
import { Media } from "@/components/ui/Media";
import { StitchLink } from "@/components/ui/StitchLink";
import { companyStats } from "@/content/site";
import { clamp, map } from "@/lib/scroll-frame";
import { useBuild, useScrollFrame } from "@/lib/use-scroll-frame";

import styles from "./About.module.css";

const ABOUT_IMAGE = {
  key: "home/factory-floor-wides.jpg",
  alt: "Narrow fabric weaving machines running on the factory floor",
};

/**
 * The headline sentence, pre-split into words on the server. The mockup split
 * text nodes in JavaScript at runtime; doing it at render time means the copy
 * is intact without JavaScript and there is no reflow on hydration.
 */
const HEADLINE: readonly { text: string; em?: boolean }[] = [
  { text: "Since 2014 we have grown from a machine-led trims unit into a " },
  { text: "one-stop accessory hub", em: true },
  { text: ", adding brand value at every stitch of the supply chain." },
];

function words(segment: string): string[] {
  return segment.split(/(\s+)/).filter(Boolean);
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLParagraphElement>(null);
  const wideRef = useRef<HTMLElement>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGPathElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const lengthRef = useRef(0);

  /** Redraw the thread whenever the section's box changes. */
  useBuild(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const mask = maskRef.current;
    if (!section || !svg || !path || !mask) return;

    const w = section.offsetWidth;
    const h = section.offsetHeight;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

    const d =
      `M -20 ${h * 0.08} C ${w * 0.22} ${h * 0.02}, ${w * 0.06} ${h * 0.34}, ${w * 0.3} ${h * 0.4}` +
      ` S ${w * 0.8} ${h * 0.3}, ${w * 0.9} ${h * 0.46} S ${w * 0.55} ${h * 0.62}, ${w * 0.18} ${h * 0.66}` +
      ` S ${w * 0.08} ${h * 0.98}, ${w * 0.5} ${h * 1.02}`;

    for (const p of [path, ghostRef.current, mask]) p?.setAttribute("d", d);

    const length = path.getTotalLength();
    lengthRef.current = length;
    mask.style.strokeDasharray = String(length);
    mask.style.strokeDashoffset = String(length);
  });

  useScrollFrame(({ vh }) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= vh) return;

    // Words light up in sequence as the thread reaches them.
    const reveal = revealRef.current;
    if (reveal) {
      const spans = reveal.querySelectorAll<HTMLElement>(`.${styles.w}`);
      const progress = map(
        vh - reveal.getBoundingClientRect().top,
        vh * 0.15,
        vh * 0.75,
      );
      spans.forEach((span, i) => {
        const o = 0.14 + 0.86 * clamp(progress * spans.length - i, 0, 1);
        span.style.setProperty("--o", o.toFixed(3));
      });
    }

    // Thread sews itself in; the needle rides the leading tip.
    const path = pathRef.current;
    const mask = maskRef.current;
    const length = lengthRef.current;
    if (path && mask && length > 0) {
      const t = map(vh - rect.top, vh * 0.2, rect.height + vh * 0.2);
      mask.style.strokeDashoffset = (length * (1 - t)).toFixed(1);

      const tip = path.getPointAtLength(length * t);
      const behind = path.getPointAtLength(Math.max(0, length * t - 4));
      const angle =
        (Math.atan2(tip.y - behind.y, tip.x - behind.x) * 180) / Math.PI;
      needleRef.current?.setAttribute(
        "transform",
        `translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)}) rotate(${angle.toFixed(1)})`,
      );
    }

    // Wide photo settles from a slight zoom as it enters.
    const wide = wideRef.current;
    if (wide) {
      const r = wide.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh) {
        wide.style.setProperty(
          "--s",
          (1.15 - 0.15 * map(vh - r.top, 0, vh * 0.9)).toFixed(4),
        );
      }
    }
  });

  let wordIndex = 0;

  return (
    <section
      className={`sec ${styles.about}`}
      id="about"
      aria-labelledby="about-title"
      ref={sectionRef}
    >
      <svg className={styles.threadSvg} aria-hidden="true" ref={svgRef}>
        <defs>
          <mask id="threadMask" maskUnits="userSpaceOnUse">
            <path
              ref={maskRef}
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </mask>
        </defs>
        <path
          ref={ghostRef}
          fill="none"
          stroke="#d5cfc3"
          strokeWidth="1.2"
          strokeDasharray="2 9"
          opacity=".7"
        />
        <path
          ref={pathRef}
          fill="none"
          stroke="#d9541e"
          strokeWidth="1.8"
          strokeDasharray="9 7"
          mask="url(#threadMask)"
        />
        <g ref={needleRef}>
          <line
            x1="0"
            y1="0"
            x2="-26"
            y2="0"
            stroke="#5a6068"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="0"
            cy="0"
            r="4.5"
            fill="#fff"
            stroke="#b8460f"
            strokeWidth="2"
          />
        </g>
      </svg>

      <div className="wrap">
        <h2 className="sr" id="about-title">
          About Sunvee
        </h2>

        <div className={styles.grid}>
          <p className={styles.reveal} ref={revealRef}>
            {HEADLINE.map((segment, si) => {
              const content = words(segment.text).map((word) =>
                /^\s+$/.test(word) ? (
                  <Fragment key={`s-${si}-${wordIndex++}`}> </Fragment>
                ) : (
                  <span className={styles.w} key={`w-${si}-${wordIndex++}`}>
                    {word}
                  </span>
                ),
              );
              return segment.em ? (
                <em key={si}>{content}</em>
              ) : (
                <Fragment key={si}>{content}</Fragment>
              );
            })}
          </p>

          <div className={styles.side} data-rise>
            <p>
              Elastics, lingerie trims, embossed ribbons, moulded cups,
              rhinestones and packaging tape are made under one roof. Our
              management board, engineers and QA teams keep every consignment to
              the buyer&rsquo;s terms, deadline included.
            </p>
            <StitchLink href="/about">Read our story</StitchLink>
          </div>
        </div>

        <div className={styles.stats}>
          {companyStats.map((stat, i) => (
            <div
              className={styles.stat}
              key={stat.label}
              data-rise
              style={{ "--i": i } as React.CSSProperties}
            >
              <Counter value={stat.value} plain={stat.plain} />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <Media
          as="figure"
          media={ABOUT_IMAGE}
          className={styles.wideImg}
          imgClassName={styles.wideImgInner}
          sizes="(max-width: 1220px) 100vw, 1180px"
          ref={wideRef}
        />
      </div>
    </section>
  );
}
