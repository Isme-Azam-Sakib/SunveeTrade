import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/site";

const ASSETS = {
  full: {
    color: { src: "/logo_full.png", width: 2909, height: 200 },
    black: { src: "/logo_full_black.png", width: 2909, height: 200 },
    white: { src: "/logo_full_white.png", width: 2909, height: 200 },
  },
  mark: {
    color: { src: "/logo_brandmark.png", width: 356, height: 200 },
    black: { src: "/logo_brandmark_black.png", width: 356, height: 200 },
    white: { src: "/logo_brandmark_white.png", width: 356, height: 200 },
  },
} as const;

export type LogoVariant = keyof typeof ASSETS;
export type LogoTone = keyof (typeof ASSETS)["full"];

/**
 * Brand logo.
 * - `full` = STI mark + wordmark (nav, footer)
 * - `mark` = STI brandmark only (compact / favicon contexts)
 * - `black` on light surfaces, `white` or `color` on dark
 */
export function Logo({
  variant = "full",
  tone = "black",
  priority = false,
  className,
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  priority?: boolean;
  className?: string;
}) {
  const asset = ASSETS[variant][tone];

  return (
    <Link
      href="/"
      className={["logo", className].filter(Boolean).join(" ")}
      data-variant={variant}
      aria-label={`${company.name} home`}
    >
      <Image
        src={asset.src}
        alt=""
        width={asset.width}
        height={asset.height}
        className="logo-img"
        priority={priority}
      />
    </Link>
  );
}
