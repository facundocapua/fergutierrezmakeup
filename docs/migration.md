# Migration from the eXa monorepo

In October 2026 the site moved out of `exa/front` (`apps/pros/fergutierrez`, a pnpm/turbo monorepo built around a Medusa e-commerce backend) into this standalone repository.

## Goals

1. Keep the site visually and functionally identical, minus the e-commerce parts, which had already been hidden.
2. Remove every dependency on Medusa and on eXa infrastructure, so the Medusa instance can be shut down.
3. Move to the latest stable compatible stack.
4. Fix bugs that are invisible to users; send everything else to the [backlog](./backlog.md).

## What changed

### Removed

- All e-commerce: shop, product, brand, search, cart, checkout, MercadoPago, order confirmation, return ("arrepentimiento") pages, Google Shopping checkout route and order e-mail templates.
- The search box in the header (desktop: already hidden; mobile menu: visible). It searched products, which no longer exist.
- `/sobre-mi` (an empty stub) and `/terminos-y-condiciones` (eXa's e-commerce terms under Argentinian law). Neither was linked from anywhere.
- Google Analytics and a misconfigured Google Tag Manager call. Analytics returns with a new GA4 property and a consent banner; see the backlog.
- Commented-out and dead code, and unused images (53 MB → 14 MB in `public/`).
- The `Inter` font. It was loaded but never displayed, because the body uses `Rubik`.

### Replaced

| Before                                              | After                                                      |
| --------------------------------------------------- | ---------------------------------------------------------- |
| `getSalon()` (Medusa) for Contact Details/WhatsApp  | `src/data/contact-details.ts`                              |
| Shared `ui`, `utils` and `tailwind-config` packages | Local components, `src/lib/whatsapp.ts`, Tailwind `@theme` |
| OG image on `cdn.exabeauty.com.ar`                  | `src/app/opengraph-image.jpg`                              |
| `siteName: 'eXa Pro'`, Twitter `@eXaBeautyOk`       | `siteName: 'Fer Gutierrez MakeUp'`, no Twitter card        |
| `locale: es_AR`                                     | `locale: es_ES`                                            |

### Fixed (invisible or near-invisible)

- Canonical URLs, sitemap and robots pointed at `fernandagutierrez.com.ar`; they now use `https://www.fernandagutierrez.es`.
- The sitemap listed non-existent pages (`/studio`, `/automaquillaje`), the shop and products, and was missing `/clases` and `/portfolio`.
- The Portfolio canonical pointed at `/porfolio`.
- The `/clases` breadcrumb read "Servicios › Clases Automaquillaje" and linked to the non-existent `/servicios/automaquillaje`. It now reads "Clases".
- The home page had three `<h1>`s; the Services and Classes blocks are now `<h2>`s, with the same styling.
- Class cards nested a `<button>` inside a link (invalid HTML). The button is now a styled `<span>`.
- Typo in the Bridal Makeup WhatsApp message ("presupueso" → "presupuesto").
- No-op Tailwind classes left over from v3 plugins that were never installed (`aspect-w-*`, `bg-opacity-*`) and unused `dark:` variants.

### Kept as is (on purpose)

- Reviews are still fetched at runtime from the legacy Google Places API with daily revalidation. At migration time the configured place was the old Tandil (Argentina) business, which has no reviews, so the section was hidden. Right after the cutover it was pointed at the Benalmádena place (`ChIJKfwidF79cg0RB7y7JlmiVQI`), and the section now shows. The code was then moved to Places API (New).
- All copy, including Argentinian wording (voseo), stays as it was.

## Redirects (301)

Defined in `next.config.ts`.

| Source                                                                                                                              | Destination  | Reason                                              |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------- |
| `/tienda/*`, `/product/*`, `/brand/*`, `/search/*`, `/checkout/*`, `/mercadopago/*`, `/order/*`, `/account/*`, `/arrepentimiento/*` | `/`          | E-commerce removed                                  |
| `/sobre-mi`, `/terminos-y-condiciones`                                                                                              | `/`          | Orphan pages removed                                |
| `/studio`                                                                                                                           | `/`          | Was in the sitemap, never existed                   |
| `/automaquillaje`, `/servicios/automaquillaje`                                                                                      | `/clases`    | Advertised in the sitemap/breadcrumb, never existed |
| `/porfolio`                                                                                                                         | `/portfolio` | Wrong canonical                                     |

`*` covers the bare path and any sub-path.

Outside this repository, `www.fernandagutierrez.com.ar` keeps redirecting (301, path preserved) to `www.fernandagutierrez.es`. That redirect isn't configured here.

## Visual parity check

`tests/parity` holds a local-only Playwright suite that takes full-page screenshots of every page (desktop 1440px and Pixel 7) and compares them with production.

```sh
pnpm exec playwright install chromium   # once
pnpm parity:baseline                    # record screenshots from production
pnpm build && pnpm parity               # compare the local build (1% tolerance)
PARITY_URL=https://… VERCEL_BYPASS_SECRET=… pnpm parity  # compare a (protected) deployment
PARITY_MAX_DIFF=0 pnpm parity           # zero tolerance, to inspect every diff
```

Result at migration time: all pages within 1%. With zero tolerance the only diffs were the `/clases` breadcrumb, the removed mobile search box, and image resampling noise.

## Vercel cutover checklist

1. [x] Build the site and pass the parity check against production.
2. [x] Push to `github.com/facundocapua/fergutierrezmakeup` (`main`).
3. [x] **(Owner)** Vercel project → Settings → Git: disconnect the monorepo and connect `fergutierrezmakeup`.
4. [x] **(Owner)** Vercel project → Settings → Build & Deployment: Framework preset Next.js, root directory `/`, default install/build commands, Node.js 24.x. Clear any monorepo/turbo overrides (custom root directory, `turbo` build/ignore commands).
5. [x] **(Owner)** Vercel project → Settings → Environment Variables: delete `MEDUSA_BACKEND_URL`, `MEDUSA_REGION_ID`, `MEDUSA_SALES_CHANNEL_ID`, `NEXT_PUBLIC_STORE_ID` and `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`; keep `GOOGLE_API_KEY`.
6. [x] Open a pull request to get a preview deployment, then rerun the parity check against the preview URL: `PARITY_URL=<preview-url> VERCEL_BYPASS_SECRET=<secret> pnpm parity`. The secret comes from Vercel → Settings → Deployment Protection → Protection Bypass for Automation.
7. [x] Merge to `main` → production deploy. The domains stay attached to the project.
8. [x] Smoke test production: all pages, the redirects above, `/sitemap.xml`, `/robots.txt`, WhatsApp links.
9. [x] **(Owner)** Shut down Medusa.
10. [x] **(Owner)** Move the Vercel project from the `exabeauty` team to the owner's account and revoke the bypass secret used for the parity check.
