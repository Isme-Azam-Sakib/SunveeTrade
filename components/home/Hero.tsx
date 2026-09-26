"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Arrow } from "@/components/ui/Arrow";
import { Media } from "@/components/ui/Media";
import { company } from "@/content/site";
import { mediaUrl } from "@/lib/images";
import { clamp, prefersReducedMotion } from "@/lib/scroll-frame";

import styles from "./Hero.module.css";

const HERO_IMAGE = {
  key: "home/crochet-elastic-roll.jpg",
  alt: "Rolls of crochet elastic in assorted colours",
};
const DETAIL_IMAGE = { key: "home/drawcord-detail.webp", alt: "" };

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLElement>(null);

  /**
   * Pointer parallax: the swing tag sways on its thread, the detail bubble and
   * the main photo drift against it. Mouse only — on touch there is no hover
   * state to respond to, and the effect would fight the scroll.
   */
  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage || prefersReducedMotion()) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let looping = false;

    const sway = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      tagRef.current?.style.setProperty("--tilt", `${-3 + current.x * 9}deg`);
      tagRef.current?.style.setProperty("--tx", `${current.x * 10}px`);
      if (floatRef.current) {
        floatRef.current.style.translate = `${current.x * -14}px ${current.y * -10}px`;
      }
      const img = mediaRef.current?.querySelector("img");
      if (img instanceof HTMLElement) {
        img.style.translate = `${current.x * -10}px ${current.y * -6}px`;
      }

      if (
        Math.abs(target.x - current.x) > 0.001 ||
        Math.abs(target.y - current.y) > 0.001
      ) {
        requestAnimationFrame(sway);
      } else {
        looping = false;
      }
    };

    const kick = () => {
      if (looping) return;
      looping = true;
      requestAnimationFrame(sway);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      target.x = clamp(
        (event.clientX - (rect.left + rect.width / 2)) / rect.width,
        -1,
        1,
      );
      target.y = clamp(
        (event.clientY - (rect.top + rect.height / 2)) / rect.height,
        -1,
        1,
      );
      kick();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      className={styles.hero}
      id="top"
      aria-labelledby="hero-title"
      ref={heroRef}
    >
      <div className="wrap">
        <p
          className="eyebrow"
          data-enter
          style={{ "--d": 0 } as React.CSSProperties}
        >
          {company.tagline}
        </p>
        <h1 className={styles.h1} id="hero-title">
          <span
            className={styles.ln}
            data-enter
            style={{ "--d": 1 } as React.CSSProperties}
          >
            Trims and accessories for
          </span>
          <span
            className={styles.ln}
            data-enter
            style={{ "--d": 2 } as React.CSSProperties}
          >
            <span className={styles.inlineImg} aria-hidden="true">
              <Image
                src={mediaUrl("home/lingerie-strap-trim.jpg")}
                alt=""
                fill
                sizes="140px"
                priority
              />
            </span>
            <em>global apparel brands.</em>
          </span>
        </h1>

        <div className={styles.low}>
          <div
            className={styles.copy}
            data-enter
            style={{ "--d": 3 } as React.CSSProperties}
          >
            <p className="lede">
              Garment trims, accessories and packaging from nine production
              units in Gazipur, supplying global brands since{" "}
              {company.established}.
            </p>
            <div className="ctas">
              <Link href="/#contact" className="btn btn-primary">
                Request a quote <Arrow />
              </Link>
              <Link href="/#products" className="btn btn-ghost">
                Explore products
              </Link>
            </div>
          </div>

          <div className={styles.stage} ref={stageRef}>
            <Media
              as="figure"
              media={HERO_IMAGE}
              className={styles.media}
              imgClassName={styles.mediaImg}
              sizes="(max-width: 1080px) 100vw, 55vw"
              priority
              style={{ margin: 0 }}
              ref={mediaRef}
            />
            <Media
              media={DETAIL_IMAGE}
              className={styles.float}
              sizes="132px"
              priority
              ref={floatRef}
            />
            <aside
              className={styles.tag}
              aria-label="Featured product"
              ref={tagRef}
            >
              <div className={styles.tagTop}>
                Swing tag <i />
              </div>
              <h3>Crochet elastic</h3>
              <p>
                Monofilament nylon yarn
                <br />
                UV resistant, high tensile
                <br />
                <b>24,70,000 pcs per month</b>
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
