import Image from "next/image";
import type { CSSProperties, ReactNode, Ref } from "react";

import type { MediaRef } from "@/content/types";
import { mediaUrl } from "@/lib/images";

interface Props {
  media: MediaRef;
  /** Responsive `sizes` hint. Always pass one — these are large photos. */
  sizes: string;
  /** Above-the-fold imagery only. */
  priority?: boolean;
  quality?: number;
  className?: string;
  /** Extra class on the <img> itself, for per-section transforms. */
  imgClassName?: string;
  /** Rendered element for the frame. `figure` where it is a real figure. */
  as?: "div" | "figure" | "span";
  style?: CSSProperties;
  id?: string;
  /** Scroll choreography reads the frame's geometry through this. */
  ref?: Ref<HTMLElement>;
  /** Overlay content rendered inside the frame, above the photo. */
  children?: ReactNode;
  "data-scale"?: boolean | string;
  "data-rise"?: boolean | string;
}

/**
 * A photo in its frame. Every catalog and hero image goes through here so that
 * `next/image` handles the responsive srcset, lazy loading and AVIF/WebP
 * conversion (technical spec §8 — no raw <img> tags).
 */
export function Media({
  media,
  sizes,
  priority = false,
  quality,
  className,
  imgClassName,
  as: Tag = "div",
  style,
  id,
  ref,
  children,
  ...rest
}: Props) {
  return (
    <Tag
      className={className ? `ph ${className}` : "ph"}
      style={style}
      id={id}
      ref={ref as Ref<HTMLDivElement> & Ref<HTMLElement>}
      {...rest}
    >
      <Image
        src={mediaUrl(media.key)}
        alt={media.alt}
        aria-hidden={media.alt === "" ? true : undefined}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={quality}
        className={imgClassName}
      />
      {children}
    </Tag>
  );
}
