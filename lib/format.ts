/**
 * The company reports output in the Indian grouping convention
 * (24,96,000 rather than 2,496,000), which is what buyers see on the
 * capacity sheet. Keep display formatting consistent with that.
 */
export function formatCount(value: number): string {
  return Math.round(value).toLocaleString("en-IN");
}
