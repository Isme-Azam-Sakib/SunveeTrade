"use client";

import Image from "next/image";
import { useRef } from "react";

import { partnerLogos as logos } from "@/content/partner-logos";
import { StitchLink } from "@/components/ui/StitchLink";
import { clamp } from "@/lib/scroll-frame";
import { useScrollFrame } from "@/lib/use-scroll-frame";

import styles from "./Marquee.module.css";

export function Marquee() {
  const stretchRef = useRef<HTMLDivElement>(null);

  useScrollFrame(({ vel }) => {
    const el = stretchRef.current;
    if (!el) return;
    const v = clamp(vel, -60, 60);
    el.style.transform = `skewX(${(-v * 0.18).toFixed(2)}deg) scaleX(${(
      1 +
      Math.abs(v) * 0.0025
    ).toFixed(4)})`;
  });

  return (
    <section className={styles.marquee} aria-label="Brands we supply">
      <div className={`wrap ${styles.head}`}>
        <p>Trusted by sourcing teams at</p>
        <StitchLink href="/#partners">All buying partners</StitchLink>
      </div>
      <div className={styles.stretch} ref={stretchRef}>
        {/* Duplicated so the -50% translate loops seamlessly. */}
        <div className={styles.track} aria-hidden="true">
          {[...logos, ...logos].map((logo, index) => (
            <span key={`${logo.file}-${index}`}>
              <Image
                src={`/media/partners/${logo.file}.png`}
                alt=""
                width={logo.w}
                height={logo.h}
                className={styles.logo}
                style={{ width: `${logo.w * 0.62}px`, height: "auto" }}
              />
            </span>
          ))}
        </div>
      </div>
      <p className="sr">{logos.map((l) => l.name).join(", ")}</p>
    </section>
  );
}
