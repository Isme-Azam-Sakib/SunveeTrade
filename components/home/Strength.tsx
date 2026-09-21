"use client";

import { useRef, useState } from "react";

import { Media } from "@/components/ui/Media";
import { alsoInHouse, manufacturingSystems } from "@/content/site";
import { map, prefersReducedMotion } from "@/lib/scroll-frame";
import { useScrollFrame } from "@/lib/use-scroll-frame";

import styles from "./Strength.module.css";

export function Strength() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useScrollFrame(({ vh }) => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = Array.from(
      stack.querySelectorAll<HTMLElement>(`.${styles.card}`),
    );

    let current = 0;
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < vh * 0.5) current = i;

      // Recede under the card stacking on top of it.
      const next = cards[i + 1];
      if (next) {
        const cover = map(
          rect.bottom - next.getBoundingClientRect().top,
          0,
          rect.height,
        );
        card.style.setProperty("--sc", (1 - 0.05 * cover).toFixed(4));
      }
    });

    setActive((prev) => (prev === current ? prev : current));
  });

  const goTo = (index: number) => {
    const card = stackRef.current?.querySelectorAll<HTMLElement>(
      `.${styles.card}`,
    )[index];
    if (!card) return;
    const top =
      card.getBoundingClientRect().top + window.scrollY - 140 - index * 20;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <section
      className={`sec ${styles.strength}`}
      id="manufacturing"
      aria-labelledby="strength-title"
    >
      <div className={`wrap ${styles.split}`}>
        <div className={styles.left}>
          <p className="eyebrow">Why Sunvee</p>
          <h2 className="h2" id="strength-title">
            Systems that keep bulk orders <em>on time.</em>
          </h2>
          <p className="lede">
            What your QA team audits is how we already run the floor.
          </p>
          <ul className={styles.nav}>
            {manufacturingSystems.map((system, i) => (
              <li key={system.slug}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active}
                >
                  {system.title}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.also} aria-label="Also in-house">
            {alsoInHouse.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div className={styles.stack} ref={stackRef}>
          {manufacturingSystems.map((system, i) => (
            <article
              className={styles.card}
              key={system.slug}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Media
                media={system.image}
                sizes="(max-width: 720px) 100vw, 200px"
              />
              <div className={styles.txt}>
                <small>{system.kicker}</small>
                <h3>{system.title}</h3>
                <p>{system.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
