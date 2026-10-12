"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import type { Certificate } from "@/content/types";

import styles from "./CertificatePreview.module.css";

interface Props {
  certificate: Certificate;
  onClose: () => void;
}

/**
 * In-page certificate viewer. PDFs are streamed inline from the API and the
 * chrome download controls are suppressed where the browser allows it.
 */
export function CertificatePreview({ certificate, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const slug = certificate.previewSlug;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

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

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  if (typeof document === "undefined" || !slug) return null;

  const title = `${certificate.mark} ${certificate.standard}`;
  // toolbar=0 / navpanes=0 hide Chrome/Edge PDF chrome (including Download).
  const src = `/api/certificates/${slug}#toolbar=0&navpanes=0&scrollbar=0`;

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onContextMenu={(event) => event.preventDefault()}
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-preview-title"
        ref={panelRef}
      >
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>Certificate preview</p>
            <h2 id="certificate-preview-title" className={styles.title}>
              {title}
            </h2>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close certificate preview"
            ref={closeRef}
          />
        </header>

        <div className={styles.stage}>
          <iframe
            className={styles.frame}
            src={src}
            title={title}
          />
        </div>

        <p className={styles.note}>
          Preview only. Official copies are issued with your quotation on
          request.
        </p>
      </div>
    </div>,
    document.body,
  );
}
