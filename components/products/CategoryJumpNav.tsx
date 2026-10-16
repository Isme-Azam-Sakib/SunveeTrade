"use client";

import type { ProductCategory } from "@/content/types";
import { prefersReducedMotion } from "@/lib/scroll-frame";

import styles from "./CategoryJumpNav.module.css";

interface Props {
  categories: readonly ProductCategory[];
  lineName: string;
}

export function CategoryJumpNav({ categories, lineName }: Props) {
  if (categories.length === 0) return null;

  const jumpTo = (slug: string) => {
    const target = document.getElementById(`cat-${slug}`);
    target?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <ul className={styles.jumpNav} aria-label={`${lineName} categories`}>
      {categories.map((category) => (
        <li key={category.slug}>
          <button
            type="button"
            className={styles.jumpLink}
            onClick={() => jumpTo(category.slug)}
          >
            <span>{category.name}</span>
            <span className={styles.jumpCount}>
              {String(category.items.length).padStart(2, "0")}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
