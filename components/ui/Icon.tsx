/**
 * Flaticon Uicons class wrapper. Pass the full class stem, e.g. `fi-rr-envelope`.
 */
export function Icon({
  name,
  className,
}: {
  name: `fi-rr-${string}`;
  className?: string;
}) {
  return (
    <i
      className={["fi", name, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    />
  );
}
