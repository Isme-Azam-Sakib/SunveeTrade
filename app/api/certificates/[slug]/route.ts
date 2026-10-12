import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

/** Certificate PDFs live outside `public/` so they are not statically downloadable. */
const FILES = {
  iso: "certificate-iso.pdf",
  oekotex: "certificate-oekotex.pdf",
} as const;

type CertSlug = keyof typeof FILES;

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  if (!(slug in FILES)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const file = FILES[slug as CertSlug];
  const absolute = path.join(
    process.cwd(),
    "private",
    "certificates",
    file,
  );

  try {
    const body = await readFile(absolute);
    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/pdf",
        // Inline only — never attachment — so browsers open a viewer, not a save dialog.
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
