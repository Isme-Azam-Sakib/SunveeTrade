"use client";

import Image from "next/image";
import { useRef } from "react";

import { mediaUrl } from "@/lib/images";
import { easeInCubic, easeOutCubic, map } from "@/lib/scroll-frame";
import { useBuild, useScrollFrame } from "@/lib/use-scroll-frame";

import styles from "./MaskReveal.module.css";

const CUT_TEXT = "Made to spec";

export function MaskReveal() {
  const wrapRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const paperRef = useRef<SVGRectElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLParagraphElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  /** Where the full stop sits, and how far it has to scale to clear the screen. */
  const dot = useRef({ x: 0, y: 0, r: 10 });
  const maxScale = useRef(60);

  useBuild((vw, vh) => {
    const svg = svgRef.current;
    const text = textRef.current;
    const circle = dotRef.current;
    if (!svg || !text || !circle) return;

    svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);

    // Measure at a nominal size, then scale the type to fit the viewport.
    let fontSize = 200;
    text.setAttribute("font-size", String(fontSize));
    text.setAttribute("x", "0");
    text.setAttribute("y", "0");

    let length = text.getComputedTextLength() || fontSize * 5.2;
    const r0 = fontSize * 0.085;
    let gap = fontSize * 0.07;
    fontSize *= Math.min(
      (vw * 0.86) / (length + gap + r0 * 2),
      (vh * 0.34) / 200,
    );

    text.setAttribute("font-size", String(fontSize));
    length = text.getComputedTextLength() || fontSize * 5.2;

    const r = fontSize * 0.085;
    gap = fontSize * 0.07;
    const total = length + gap + r * 2;
    const x0 = (vw - total) / 2;
    const baseline = vh * 0.46 + fontSize * 0.34;

    text.setAttribute("x", String(x0));
    text.setAttribute("y", String(baseline));

    dot.current = { x: x0 + length + gap + r, y: baseline - r, r };
    circle.setAttribute("cx", String(dot.current.x));
    circle.setAttribute("cy", String(dot.current.y));
    circle.setAttribute("r", String(r));

    maxScale.current = (Math.hypot(vw, vh) / r) * 1.15;
  });

  useScrollFrame(({ vh }) => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= vh) return;

    const progress = map(-rect.top, 0, rect.height - vh);
    const zoom = map(progress, 0.1, 0.8);
    const scale = 1 + (maxScale.current - 1) * easeInCubic(zoom);
    const { x, y } = dot.current;

    if (paperRef.current) {
      paperRef.current.style.opacity = (1 - map(zoom, 0.9, 1)).toFixed(3);
    }
    groupRef.current?.setAttribute(
      "transform",
      `translate(${x} ${y}) scale(${scale.toFixed(3)}) translate(${-x} ${-y})`,
    );

    const bg = bgRef.current;
    if (bg) {
      bg.style.setProperty(
        "--bs",
        (1.25 - 0.25 * easeOutCubic(progress)).toFixed(4),
      );
      bg.style.setProperty("--scrim", map(progress, 0.7, 0.9).toFixed(3));
    }

    const cap = capRef.current;
    if (cap) {
      const fade = map(progress, 0.04, 0.16);
      cap.style.setProperty("--co", (1 - fade).toFixed(3));
      cap.style.setProperty("--cy", `${-fade * 20}px`);
    }

    const final = finalRef.current;
    if (final) {
      final.style.setProperty("--fo", map(progress, 0.8, 0.95).toFixed(3));
      final.style.setProperty(
        "--fy",
        `${30 * (1 - easeOutCubic(map(progress, 0.8, 0.98)))}px`,
      );
    }
  });

  return (
    <section className={styles.wrap} aria-labelledby="mask-title" ref={wrapRef}>
      <div className={styles.stick}>
        <div className={styles.bg} ref={bgRef}>
          <Image
            src={mediaUrl("home/rhinestone-backdrop.jpg")}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
          />
        </div>

        <svg className={styles.svg} aria-hidden="true" ref={svgRef}>
          <defs>
            <mask id="cut" maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
              <g ref={groupRef}>
                <text ref={textRef} fill="#000">
                  {CUT_TEXT}
                </text>
                <circle ref={dotRef} fill="#000" r="10" />
              </g>
            </mask>
          </defs>
          <rect
            ref={paperRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#faf8f4"
            mask="url(#cut)"
          />
        </svg>

        <p className={styles.cap} ref={capRef}>
          Every trim starts from your spec sheet.
        </p>

        <div className={styles.final} ref={finalRef}>
          <div>
            <h2 id="mask-title">
              Six product lines, <em>one supplier.</em>
            </h2>
            <p>
              Sampled before bulk, then delivered on the dates in your order.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
