import { formatCount } from "@/lib/format";

/**
 * A figure that counts up when it scrolls into view. The server renders the
 * final value so the page reads correctly without JavaScript, and
 * `ScrollReveal` animates it from there.
 */
export function Counter({
  value,
  plain = false,
  className,
  as: Tag = "b",
}: {
  value: number;
  /** Print the raw integer (a year) rather than grouped digits. */
  plain?: boolean;
  className?: string;
  /** Element to render. Use `span` where a `<b>` is already the parent. */
  as?: "b" | "span" | "em";
}) {
  return (
    <Tag
      className={className}
      data-count={value}
      data-plain={plain ? "" : undefined}
    >
      {plain ? value : formatCount(value)}
    </Tag>
  );
}
