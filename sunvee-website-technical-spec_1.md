# Sunvee Trade International — Website Technical Spec

**Status:** Draft v1
**Owner:** Isme Azam Sakib (developer, sole content editor)
**Scope:** Technical architecture only — no design system, page content, or sitemap in this document.

---

## 1. Objective

A static-first, image-heavy B2B showcase site for Sunvee Trade International. No ecommerce, no user accounts. Primary technical goals:

- Fast global page loads despite a large and growing product image catalog
- Content and catalog data fully version-controlled (single technical owner, no CMS)
- Reliable delivery of inbound quote-request leads to the sales team
- Low ongoing infra cost and low operational overhead

---

## 2. Framework & Rendering Strategy

- **Next.js, App Router**
- **Rendering mode:** Static Site Generation with Incremental Static Regeneration (ISR)
  - Product/category pages pre-rendered at build time via `generateStaticParams`
  - `revalidate` set per route (e.g. daily) so catalog edits go live without a full redeploy, while still serving cached static HTML to visitors
  - Do **not** use `next export` — it forfeits `next/image` optimization and ISR, both of which matter here
- **Language:** TypeScript throughout — catalog data, API routes, and components all typed
- **Styling framework:** left open in this doc (design-system decision, out of scope here); assume Tailwind CSS as default unless decided otherwise, since it pairs cleanly with the component structure

---

## 3. Content & Catalog Data Layer

Since there is a single technical content owner, a headless CMS is intentionally excluded. Content lives in the repo as typed data modules, deployed via normal git workflow.

- **Structure:** one TypeScript data module per product line (e.g. `content/narrow-fabrics.ts`, `content/rhinestones.ts`, `content/bra-cups.ts`)
- Each module exports a typed array of category objects; each category holds metadata + an array of item references (name, image URL(s), any spec fields)
- A shared `types.ts` defines the catalog schema (`Product`, `ProductCategory`, `ProductLine`) so all three product-line files conform to one shape and pages can be generated generically from it
- Catalog updates = edit data file → commit → push → CI deploy. No runtime admin, no database for catalog data.
- Content changes are reviewable via normal git diff/PR history, which also acts as a change log

**Not covered here:** actual field names, page layout, copywriting, or the specific category taxonomy — that's a content/sitemap task, not a technical spec item.

---

## 4. Image Storage & Delivery

Images are **not** committed to the git repository or placed in `/public` — repo size, clone/CI time, and Vercel deploy limits all degrade quickly with a large, growing photo catalog.

- **Object storage:** Cloudflare R2 (zero egress fees) — Bunny Storage as an equivalent fallback if preferred
- **Upload workflow:** CLI-based (e.g. `wrangler r2 object put`, `rclone`, or a small custom Node upload script) run manually or via a repo npm script whenever new product photography is added; not a hosted dashboard, since the developer is the only uploader
- **Naming/organization:** bucket paths mirror the product-line/category structure used in the data layer (exact convention to be finalized alongside content structure — out of scope here)
- **Delivery & optimization:** `next/image` configured with `images.remotePatterns` pointing at the R2 (or Bunny) public/custom domain
  - Automatic responsive `srcset` generation, lazy loading, and AVIF/WebP conversion handled by `next/image` — no separate image-transformation service needed
  - Confirm R2 public bucket or custom domain is configured with appropriate cache headers (long `max-age`, immutable where filenames are content-hashed)
- **CDN:** Cloudflare's edge network in front of R2 by default; if Bunny Storage is used instead, pair with Bunny CDN

---

## 5. Quote-Request Form

Low-volume, high-value B2B lead form — not user data at scale, so no dedicated database is required by default.

- **Submission endpoint:** Next.js Route Handler, e.g. `app/api/quote/route.ts`
- **Primary delivery:** transactional email via **Resend** (or Nodemailer + SMTP as an alternative), sent immediately on submission to the sales contact(s)
- **Backup record:** every submission also logged to a destination sales can read without dev involvement — **Google Sheets API** is the default choice (zero infra, no extra login for sales). Supabase/Postgres is the alternative if querying/filtering leads becomes a requirement later, at the cost of standing up and maintaining a database.
- **Spam mitigation:**
  - Honeypot hidden field (reject if populated)
  - Cloudflare Turnstile challenge on submit (free tier)
- **Validation:** server-side validation in the Route Handler in addition to client-side form validation (never trust client-only checks)
- **Rate limiting:** basic per-IP rate limit on the API route to prevent abuse (e.g. via Vercel's edge middleware or a lightweight in-memory/KV-based limiter)

---

## 6. Hosting & Deployment

- **Primary host:** Vercel (native Next.js support — ISR, image optimization, and Route Handlers work without extra configuration)
- **Fallback/alternative:** Cloudflare Pages + Workers, if image bandwidth costs or platform limits on Vercel's free/hobby tier become a concern later; would require re-implementing the API route as a Worker
- **CI/CD:** deploy on push to `main` (Vercel's default git integration); preview deployments on pull requests
- **Environment separation:** at minimum, Production and Preview environments with separate environment variables (see §7)

---

## 7. Environment Variables & Secrets

To be provisioned before launch:

| Variable | Purpose |
|---|---|
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME` | Image upload script auth (dev-side only, not exposed to client) |
| `NEXT_PUBLIC_IMAGE_CDN_DOMAIN` | Public image base URL for `next/image` remote patterns |
| `RESEND_API_KEY` | Transactional email delivery |
| `SALES_NOTIFICATION_EMAIL` | Destination address(es) for quote requests |
| `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_SPREADSHEET_ID` | Backup lead log |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Spam protection on the quote form |

All secrets stored in Vercel's environment variable manager (or Cloudflare's equivalent), scoped per environment — never committed to the repo.

---

## 8. Performance & SEO Baseline

- `next/image` for all catalog and hero imagery (no raw `<img>` tags)
- Static generation + ISR keeps Time-to-First-Byte low without per-request rendering cost
- `next-sitemap` (or equivalent) to auto-generate `sitemap.xml` from the generated routes
- Structured metadata via Next.js's Metadata API (`generateMetadata`) per product line/category page
- Target Core Web Vitals thresholds (LCP, CLS, INP) as a build-time or CI-time check (e.g. Lighthouse CI) given the image-heavy nature of the catalog

---

## 9. Tooling

- **Package manager:** pnpm (or npm — team preference; pnpm recommended for faster installs on CI)
- **Linting/formatting:** ESLint + Prettier, run in CI on every push
- **Type checking:** `tsc --noEmit` in CI to catch catalog schema violations before deploy
- **Testing:** minimal for a static showcase site — consider a smoke test (e.g. Playwright) verifying the quote form submits successfully and key pages render, rather than full unit test coverage

---

## 10. Open Items / Future Considerations

- Analytics: not yet specified — Vercel Analytics or a privacy-respecting alternative (e.g. Plausible) as a lightweight default
- If catalog size or update frequency grows to the point where git-based content management becomes cumbersome, revisit a headless CMS (Sanity was the prior candidate, chosen against for now due to single-editor workflow)
- If lead volume grows enough to need filtering/search/status-tracking, migrate the backup log from Google Sheets to Supabase
- Multi-language support (if targeting non-English-speaking buyer segments) is not currently in scope
