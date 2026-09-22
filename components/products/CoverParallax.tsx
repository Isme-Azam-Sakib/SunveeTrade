"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { map } from "@/lib/scroll-frame";
import { useScrollFrame } from "@/lib/use-scroll-frame";

/**
 * Publishes the frame's travel through the viewport as `--cover` (0 to 1) so
 * the photograph inside can drift against the page. Server-rendered children
 * keep the cover eligible for LCP.
 */
export function CoverParallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(({ vh }) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;

    el.style.setProperty("--cover", map(rect.top, vh, -rect.height).toFixed(4));
  });

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
