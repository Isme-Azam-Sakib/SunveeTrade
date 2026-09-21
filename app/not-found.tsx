import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section
        className="wrap"
        style={{ padding: "clamp(96px,14vw,180px) 0", textAlign: "center" }}
      >
        <p className="fig" style={{ marginBottom: 18 }}>
          404
        </p>
        <h1 className="h2" style={{ marginBottom: 20 }}>
          That page is not on the reel.
        </h1>
        <p className="lede" style={{ margin: "0 auto 32px" }}>
          The link may be out of date. The product catalogue is the best place
          to pick up the thread.
        </p>
        <Link href="/products" className="btn btn-primary">
          Browse products
        </Link>
      </section>
    </PageShell>
  );
}
