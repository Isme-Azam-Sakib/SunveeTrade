import Link from "next/link";
import type { ComponentProps } from "react";

import { Arrow } from "./Arrow";

type Props = ComponentProps<typeof Link> & {
  /** Append the trailing arrow. On by default. */
  arrow?: boolean;
};

/** Inline call-to-action whose dashed underline sews itself in on hover. */
export function StitchLink({
  children,
  arrow = true,
  className,
  ...rest
}: Props) {
  return (
    <Link className={className ? `link ${className}` : "link"} {...rest}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}
