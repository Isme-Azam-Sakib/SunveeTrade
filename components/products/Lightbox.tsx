"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Media } from "@/components/ui/Media";

import styles from "./Lightbox.module.css";
import type { GalleryItem } from "./types";

interface Props {
  items: readonly GalleryItem[];
  index: number;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}

const FOCUSABLE =
  'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Lightbox({ items, index, onIndexChange, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [frame, setFrame] = useState(0);
  const [shownIndex, setShownIndex] = useState(index);

  const item = items[index];
  const total = items.length;

  /* A different product always opens on its first frame. Adjusted during
     render rather than in an effect, so there is no second paint. */
  if (shownIndex !== index) {
    setShownIndex(index);
    setFrame(0);
  }

  const step = useCallback(
    (delta: number) => onIndexChange((index + delta + total) % total),
    [index, total, onIndexChange],
  );

  /* Keyboard: Esc closes, arrows walk the board, Tab stays inside the panel. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  /* Hold the page still, and keep its width so the layout cannot jump. */
  useEffect(() => {
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const { overflow, paddingRight } = body.style;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = paddingRight;
    };
  }, []);

  /* Send focus in on open, and hand it back to the swatch on close. */
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  /* Only ever rendered from a click, so `document` exists; the guard is for
     the server pass, where this component is never reached. */
  if (typeof document === "undefined" || !item) return null;

  const images = item.images;
  const shot = images[frame];
  const titleId = "lightbox-title";

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <div className={styles.stage}>
          {shot ? (
            <Media
              media={shot}
              className={styles.shot}
              sizes="(max-width: 900px) 100vw, 60vw"
              priority
            />
          ) : (
            <p className={styles.stageEmpty}>
              Photography on request
              <br />
              Sample available
            </p>
          )}

          {images.length > 1 ? (
            <div className={styles.frames}>
              {images.map((image, i) => (
                <button
                  key={image.key}
                  type="button"
                  className={styles.frameDot}
                  aria-current={i === frame}
                  aria-label={`View image ${i + 1} of ${images.length}`}
                  onClick={() => setFrame(i)}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.info}>
          <p className={styles.eyebrow}>{item.categoryName}</p>
          <h2 className={styles.name} id={titleId}>
            {item.name}
          </h2>

          {item.description ? (
            <p className={styles.desc}>{item.description}</p>
          ) : null}

          {item.specs?.length ? (
            <dl className={styles.specs}>
              {item.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className={styles.meta}>
            <span className={styles.counter}>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <Link href="/#contact" className="link" onClick={onClose}>
              Request this sample
            </Link>
          </div>
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              className={`${styles.step} ${styles.prev}`}
              onClick={() => step(-1)}
              aria-label="Previous product"
            />
            <button
              type="button"
              className={`${styles.step} ${styles.next}`}
              onClick={() => step(1)}
              aria-label="Next product"
            />
          </>
        ) : null}

        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
          ref={closeRef}
        />
      </div>
    </div>,
    document.body,
  );
}
