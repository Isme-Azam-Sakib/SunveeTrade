"use client";

import { useEffect } from "react";

import { formatCount } from "@/lib/format";
import { map, prefersReducedMotion } from "@/lib/scroll-frame";

/**
 * One IntersectionObserver for the whole page.
 *
 * Elements opt in declaratively, so sections stay server components and only
 * this single client component carries the behaviour:
 *
 *   data-rise   — fade and rise into place (styles live in globals.css)
 *   data-count  — animate a number up to `data-count` when it scrolls in
 *   data-plain  — with data-count: print the raw integer (a year), not grouped
 *   data-in     — just get the `in` class, for CSS to react to
 *
 * Mount once, after the sections, so everything is in the DOM when it runs.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    const runCount = (el: HTMLElement) => {
      const to = Number(el.dataset.count);
      if (!Number.isFinite(to)) return;

      const plain = el.hasAttribute("data-plain");
      if (reduced) {
        el.textContent = plain ? String(to) : formatCount(to);
        return;
      }

      // Years tick up from just below rather than from zero — counting a date
      // up from 0 reads as a bug, not a flourish.
      const from = plain ? to - 40 : 0;
      const start = performance.now();
      const duration = 1400;

      const step = (now: number) => {
        const t = map(now - start, 0, duration);
        const value = from + (to - from) * (1 - Math.pow(2, -10 * t));
        el.textContent = plain ? String(Math.round(value)) : formatCount(value);
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = plain ? String(to) : formatCount(to);
        }
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("in");
          if (el.hasAttribute("data-count")) runCount(el);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    const targets = document.querySelectorAll<HTMLElement>(
      "[data-rise],[data-count],[data-in]",
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
