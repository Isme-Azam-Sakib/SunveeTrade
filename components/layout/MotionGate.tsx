"use client";

import { useEffect } from "react";

/**
 * Mirrors the visitor's motion preference onto <html> as `.rm`, which the
 * stylesheets use to land every scroll-driven scene on its final state rather
 * than animating it. Applied from JavaScript rather than a media query alone
 * because several scenes need structural changes (a sticky track becomes a
 * normal scroller), not just shorter transitions.
 */
export function MotionGate() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      document.documentElement.classList.toggle("rm", query.matches);
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return null;
}
