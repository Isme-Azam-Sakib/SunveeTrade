"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Media } from "@/components/ui/Media";
import type { ProductCategory } from "@/content/types";
import { map, prefersReducedMotion } from "@/lib/scroll-frame";
import { useScrollFrame } from "@/lib/use-scroll-frame";

import styles from "./LineGallery.module.css";
import { Lightbox } from "./Lightbox";
import type { GalleryItem } from "./types";

interface Props {
  categories: readonly ProductCategory[];
  /** Used to label the board for assistive tech. */
  lineName: string;
}

/** Specs are a caption on the card; the rest waits in the viewer. */
const SPECS_ON_CARD = 2;

export function LineGallery({ categories, lineName }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const [open, setOpen] = useState<number | null>(null);

  /** One flat list so the viewer can walk the whole board, not just a group. */
  const items = useMemo<GalleryItem[]>(
    () =>
      categories.flatMap((category) =>
        category.items.map((item) => ({
          key: `${category.slug}/${item.slug}`,
          categorySlug: category.slug,
          categoryName: category.name,
          name: item.name,
          description: item.description,
          images: item.images,
          specs: item.specs,
        })),
      ),
    [categories],
  );

  /** Flat index by key, so a card knows where it sits in the viewer's order. */
  const indexOf = useMemo(() => {
    const lookup = new Map<string, number>();
    items.forEach((item, i) => lookup.set(item.key, i));
    return lookup;
  }, [items]);

  /* Which group is being read. Deliberately off the animation loop: this is
     navigation state, so it has to keep working under reduced motion.

     Picking the last group that has crossed the reading line — rather than
     whichever one intersects a band — is what keeps the final group selectable
     once the board bottoms out and no section sits on the line any more. */
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const sections = [
      ...board.querySelectorAll<HTMLElement>("[data-category]"),
    ];
    if (sections.length === 0) return;

    let queued = false;

    const pick = () => {
      queued = false;
      const line = window.innerHeight * 0.32;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top > line) break;
        current = section;
      }
      const slug = current.dataset.category;
      if (slug) setActive((previous) => (previous === slug ? previous : slug));
    };

    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [categories]);

  /* The seam: stitching drawn down the rail in step with the board. */
  useScrollFrame(({ vh }) => {
    const board = boardRef.current;
    const rail = railRef.current;
    if (!board || !rail) return;

    const rect = board.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;

    const progress = map(vh * 0.5 - rect.top, 0, rect.height);
    rail.style.setProperty("--seam", progress.toFixed(4));
  });

  const jumpTo = (slug: string) => {
    const target = boardRef.current?.querySelector<HTMLElement>(
      `[data-category="${slug}"]`,
    );
    target?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  const activeIndex = Math.max(
    0,
    categories.findIndex((category) => category.slug === active),
  );

  return (
    <div className={styles.layout}>
      <div className={styles.rail} ref={railRef}>
        <nav aria-label={`${lineName} categories`}>
          <ul className={styles.railList}>
            {categories.map((category) => (
              <li key={category.slug}>
                <button
                  type="button"
                  className={styles.railLink}
                  aria-current={category.slug === active}
                  onClick={() => jumpTo(category.slug)}
                >
                  <span>{category.name}</span>
                  <span className={styles.railCount}>
                    {String(category.items.length).padStart(2, "0")}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.seam} aria-hidden="true">
          <div className={styles.seamTrack}>
            <span className={styles.seamDrawn} />
            <span className={styles.seamNeedle} />
          </div>
          <p className={styles.seamRead}>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(categories.length).padStart(2, "0")}
            <b>{categories[activeIndex]?.name}</b>
          </p>
        </div>
      </div>

      <div className={styles.board} ref={boardRef}>
        {categories.map((category) => (
          <section
            key={category.slug}
            id={`cat-${category.slug}`}
            className={styles.category}
            data-category={category.slug}
            aria-labelledby={`cat-${category.slug}-title`}
          >
            <header className={styles.catHead}>
              <div>
                <h2 id={`cat-${category.slug}-title`}>{category.name}</h2>
                {category.summary ? <p>{category.summary}</p> : null}
              </div>
              <span className={styles.catCount}>
                {category.items.length}{" "}
                {category.items.length === 1 ? "product" : "products"}
              </span>
            </header>

            <div className={styles.grid}>
              {category.items.map((item, i) => {
                const key = `${category.slug}/${item.slug}`;
                const cover = item.images[0];
                const hasDetail =
                  item.images.length > 0 ||
                  Boolean(item.description) ||
                  Boolean(item.specs?.length);
                const specs = item.specs?.slice(0, SPECS_ON_CARD) ?? [];
                const hidden = (item.specs?.length ?? 0) - specs.length;

                const body = (
                  <>
                    {cover ? (
                      <Media
                        media={cover}
                        className={styles.thumb}
                        imgClassName={styles.thumbImg}
                        sizes="(max-width: 560px) 45vw, (max-width: 1080px) 30vw, 230px"
                      />
                    ) : (
                      <div className={styles.empty}>
                        <span>Sample on request</span>
                      </div>
                    )}

                    <div className={styles.cardBody}>
                      <p className={styles.cardName}>{item.name}</p>

                      {specs.length ? (
                        <ul className={styles.cardSpecs}>
                          {specs.map((spec) => (
                            <li key={spec.label}>
                              <b>{spec.label}</b>
                              <span>{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {hasDetail ? (
                        <span className={styles.more}>
                          {item.description
                            ? "Details"
                            : hidden > 0
                              ? `${hidden} more spec${hidden === 1 ? "" : "s"}`
                              : item.images.length > 1
                                ? `${item.images.length} images`
                                : "View"}
                        </span>
                      ) : null}
                    </div>
                  </>
                );

                if (!hasDetail) {
                  return (
                    <div className={styles.card} key={key} data-rise>
                      {body}
                    </div>
                  );
                }

                return (
                  <button
                    type="button"
                    className={styles.card}
                    key={key}
                    data-rise
                    style={{ "--i": i % 4 } as React.CSSProperties}
                    onClick={() => setOpen(indexOf.get(key) ?? 0)}
                    aria-haspopup="dialog"
                  >
                    {body}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {open !== null ? (
        <Lightbox
          items={items}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </div>
  );
}
