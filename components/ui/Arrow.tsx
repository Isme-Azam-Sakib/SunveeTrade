/** The CSS-drawn arrow used in buttons and stitch links. */
export function Arrow({ up = false }: { up?: boolean }) {
  return <i className={up ? "arr up" : "arr"} aria-hidden="true" />;
}
