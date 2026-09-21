import Link from "next/link";

import { company } from "@/content/site";

export function Logo({
  withSuffix = false,
  className,
}: {
  withSuffix?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={className ? `logo ${className}` : "logo"}
      aria-label={`${company.name} home`}
    >
      <span className="logo-mark" aria-hidden="true">
        S
      </span>
      {company.shortName}
      {withSuffix ? <small>Trade International</small> : null}
    </Link>
  );
}
