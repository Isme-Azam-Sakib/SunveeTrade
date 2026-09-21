# Sunvee Trade International

Static-first, image-heavy B2B showcase site. Next.js App Router, TypeScript,
catalog data in the repo, product photography in object storage.

Built against `sunvee-website-technical-spec.md` (Draft v1).

---

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at <http://localhost:3000> with no credentials configured:
images come from the local `public/media` staging directory, the Turnstile
challenge is skipped, and quote submissions are printed to the server console.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run check` | `tsc --noEmit` + ESLint + Prettier check — what CI runs |
| `npm run lint:fix` / `npm run format` | Autofix |
| `npm run media:upload` | Publish `public/media` to Cloudflare R2 |

---

## Architecture

### Rendering (spec §2)

Static generation with ISR. Every page exports `revalidate = 86_400`, so
catalog edits go live within a day without a redeploy while visitors are
always served cached static HTML. Product-line routes are pre-rendered by
`generateStaticParams`; `dynamicParams = false` makes an unknown slug a real
404 rather than an on-demand render.

`/api/quote` is the only dynamic route.

### Content (spec §3)

No CMS. `content/` holds one typed module per product line, all conforming to
the schema in [`content/types.ts`](content/types.ts):

```
content/
  types.ts                    ProductLine / ProductCategory / Product
  narrow-fabrics.ts           one module per product line
  lingerie-elastic.ts
  …
  products.ts                 registry: display order, lookup, slugs
  site.ts                     company facts, capacity, partners, certificates
```

Updating the catalog is: edit a data file, commit, push. The git history is
the change log. Adding a product line to `products.ts` automatically adds its
page, its homepage card, its footer link, its sitemap entry and its option in
the quote form.

### Images (spec §4)

Photography is **not committed to git** — repo size, clone/CI time and deploy
limits all degrade with a growing photo catalog. `public/media/` is
gitignored and acts as the local staging area.

`MediaRef.key` is a bucket-relative path (`product-lines/narrow-fabrics/cover.jpg`)
that [`lib/images.ts`](lib/images.ts) resolves against
`NEXT_PUBLIC_IMAGE_CDN_DOMAIN`, falling back to `/media/…` when it is unset.
The same key therefore works in both places; switching to the CDN is one
environment variable.

Workflow for new photography:

1. Drop files into `public/media/<line>/<category>/…`, mirroring the content structure.
2. `npm run dev` to check them.
3. `npm run media:upload` (`--dry` to preview, `--force` to re-upload everything).

The upload script skips unchanged objects by comparing MD5 to the object's
ETag and sets `Cache-Control: public, max-age=31536000, immutable`.

All imagery goes through `next/image` with `fill` + `sizes` — there are no raw
`<img>` tags — so responsive `srcset`, lazy loading and AVIF/WebP conversion
are handled without a separate transformation service.

### Quote form (spec §5)

`components/quote/QuoteForm.tsx` → `app/api/quote/route.ts`. The handler, in order:

1. **Rate limit** per IP (5 per 10 minutes) before doing any work.
2. **Validate** with the shared Zod schema. Client validation is never trusted.
3. **Honeypot** — a populated hidden `website` field returns a convincing
   `200` and drops the lead. The schema deliberately does *not* constrain this
   field, so a bot never gets a 400 naming it.
4. **Turnstile** verification. Skipped when no secret is set, except in
   production, where the handler refuses rather than accepting unverified input.
5. **Deliver** to Resend (primary) and Google Sheets (backup record) in
   parallel. The request only fails if the lead reached neither.

The Sheets log uses `google-auth-library` plus the Sheets REST endpoint rather
than the full `googleapis` package, which is far larger than one append call
warrants. Expected column order is `SHEET_HEADERS` in
[`lib/quote-sheet.ts`](lib/quote-sheet.ts).

### Scroll choreography

The homepage animates nine sections off scroll position. Rather than nine
scroll listeners and nine rAF loops, [`lib/scroll-frame.ts`](lib/scroll-frame.ts)
runs **one** loop that every section subscribes to via `useScrollFrame` /
`useBuild`. It parks itself when scrolling stops, so a still page costs nothing.

Sections are client components only where they need to be; content, layout and
the catalog pages stay server components.

Visitors who prefer reduced motion get `.rm` on `<html>`, every frame handler
is skipped, and each scene lands on its final state — the pinned horizontal
pan becomes a normal snap scroller, the mask reveal becomes a static panel.

### Styling

Design tokens from the approved mockup live in `:root` in
[`app/globals.css`](app/globals.css) and are re-exported through Tailwind's
`@theme inline`, so `--a600` and `bg-accent-600` are the same value. Shared
primitives (`.btn`, `.link`, `.ph`, `.wrap`) are global because several are
styled contextually from an ancestor (`.on-dark .link`); everything
section-specific is a CSS module beside its component.

---

## Environment variables

See [`.env.example`](.env.example) for the full annotated list. Nothing is
required for local development.

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, robots |
| `NEXT_PUBLIC_IMAGE_CDN_DOMAIN` | Serving images from R2 instead of `/media` |
| `R2_*` | `npm run media:upload` (dev-side only) |
| `RESEND_API_KEY`, `QUOTE_FROM_EMAIL`, `SALES_NOTIFICATION_EMAIL` | Quote emails |
| `GOOGLE_SHEETS_*` | Backup lead log |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Spam protection |

> The spec lists the Turnstile site key as `TURNSTILE_SITE_KEY`. A site key is
> public by definition and has to reach the browser, so it carries the
> `NEXT_PUBLIC_` prefix here. The secret key stays server-side.

---

## Deployment

Vercel, deploying on push to `main`, preview deployments on pull requests.
Set the environment variables per environment in Vercel's manager — never in
the repo.

Before launch:

- [ ] Create the R2 bucket and its public custom domain; set `NEXT_PUBLIC_IMAGE_CDN_DOMAIN`
- [ ] `npm run media:upload` with real photography
- [ ] Verify the Resend sending domain
- [ ] Share the leads spreadsheet with the Google service account address
- [ ] Add the production hostname to the Turnstile widget
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live origin

## CI

`.github/workflows/ci.yml` runs `tsc --noEmit`, ESLint, the Prettier check and
a production build on every push and pull request.
