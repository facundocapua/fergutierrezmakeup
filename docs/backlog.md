# Backlog

Improvements found during the migration (October 2026). None of them are implemented yet.

Priority: **P1** do soon (legal, broken or data loss), **P2** valuable, **P3** nice to have. Effort: S (hours), M (a day or two), L (more).

## Epic: Site revamp

A redesign of the site is planned after the migration. Several items below are better done as part of it; they are tagged _(revamp)_.

- When the revamp makes the site meaningfully interactive, **enable the React Compiler** (`reactCompiler: true` + `babel-plugin-react-compiler`). See AGENTS.md.
- If the Artist needs to edit content without a developer, revisit [ADR 0001](./adr/0001-content-as-code-without-backend.md) and consider a headless CMS.

## Legal and compliance (Spain)

| #   | Item                                                                                                                                                                                                                                                                                                         | Priority | Effort |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------ |
| L1  | **Analytics with consent.** Create a new GA4 property owned by the Artist, add it through a `NEXT_PUBLIC_GA_ID` env var (not loaded when unset), and add a cookie consent banner with Google Consent Mode v2 (default `denied`). GA was removed in the migration, so nothing is measured until this is done. | P1       | M      |
| L2  | Add a legal notice ("Aviso legal") and a privacy policy that comply with LSSI-CE and GDPR, plus a cookie policy once L1 is done. Link them from the footer. The old e-commerce terms were removed.                                                                                                           | P1       | M      |

## Content

| #   | Item                                                                                                                                                                                                                                 | Priority | Effort |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------ |
| C1  | **Adapt the copy to Spain.** The business moved from Tandil (Argentina) to Benalmádena (Málaga), but the copy still uses Argentinian voseo ("podes", "querés", "dejame") and assumes Argentinian clients. Review it with the Artist. | P2       | M      |
| C2  | Decide whether to show prices. Classes and Social Makeup had prices in the code (ARS amounts, now removed) but they weren't displayed. If they are shown, use euros.                                                                 | P2       | S      |
| C3  | A real "Sobre mí" (About) page. The old `/sobre-mi` was an empty stub and now redirects to `/`. _(revamp)_                                                                                                                           | P3       | M      |
| C4  | Write a real meta description. Today it equals the site name ("Fer Gutierrez MakeUp"). Add per-page titles and descriptions too: every page shares the same title.                                                                   | P2       | S      |
| C5  | Consider bringing back Services and Classes that were commented out in the old code: "Makeup Express", "Makeup Full" (Social Makeup) and "Automaquillaje grupal" (group Class, up to 3 people).                                      | P3       | S      |
| C6  | Show Brow Design pricing/duration like Social Makeup does, for consistency.                                                                                                                                                          | P3       | S      |
| C7  | Wording inconsistency: the Brow Design page title is "Diseño de cejas", the card says "Diseño Cejas", the breadcrumb says "Cejas" and the WhatsApp message says "perfilado de cejas". Pick one.                                      | P3       | S      |

## Reviews

| #   | Item                                                                                                                                                                                                                                                                                  | Priority | Effort |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| R5  | Google Maps Platform terms don't allow caching Places content (only the place ID). Reviews are cached for up to 24 h via ISR, as the owner requested, to keep API cost bounded. Review whether that is acceptable, or fetch per request with a short cache if the terms are enforced. | P3       | S      |

## SEO

| #   | Item                                                                                                                                                | Priority | Effort |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| S1  | Add structured data (JSON-LD `BeautySalon`/`LocalBusiness` with address, phone, opening hours and social profiles).                                 | P2       | S      |
| S2  | Meaningful `alt` texts: Portfolio and Reviews images use empty `alt`, and the home page grids repeat "Servicios"/"Automaquillaje".                  | P2       | S      |
| S3  | Register `fernandagutierrez.es` in Google Search Console and submit the new sitemap. Check that the `.com.ar` → `.es` redirect is a single 301 hop. | P2       | S      |

## Performance

| #   | Item                                                                                                                                                                                                                | Priority | Effort |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| P1  | Compress the original images. `public/` still holds 14 MB, with several JPGs over 2 MB. `next/image` optimizes on the fly, but smaller originals mean faster builds, cheaper image optimization and a lighter repo. | P2       | S      |
| P2  | Review `sizes` on every `next/image` and use `priority` only for the LCP image of each page.                                                                                                                        | P3       | S      |
| P3  | The Portfolio gallery reads `?image=` with `useSearchParams`, so its grid is client-rendered behind a skeleton. Render the grid on the server and keep only the lightbox on the client.                             | P3       | S      |

## Accessibility and UX

| #   | Item                                                                                                                                                                                    | Priority | Effort |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| A1  | Portfolio images open the lightbox on click only; make them keyboard-focusable buttons. Add visible previous/next/close controls to the lightbox (today: arrow keys and click outside). | P2       | S      |
| A2  | The footer phone link uses `sms:`; `tel:` (or WhatsApp) fits a Spanish mobile better. Show the phone in international format (+34).                                                     | P3       | S      |
| A3  | Header nav labels and the floating WhatsApp button need visible focus styles.                                                                                                           | P3       | S      |
| A4  | Class cards are entirely links with a fake button inside; consider a card with a real CTA link.                                                                                         | P3       | S      |
| A5  | Add a custom 404 page that matches the site.                                                                                                                                            | P3       | S      |

## Engineering

| #   | Item                                                                                                                                                       | Priority | Effort |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| E1  | Upgrade to TypeScript 7 once `typescript-eslint` supports it (it supports `<6.1` today).                                                                   | P3       | S      |
| E2  | Upgrade to ESLint 10 once the plugins in `eslint-config-next` (`react`, `import`, `jsx-a11y`) support it.                                                  | P3       | S      |
| E3  | Run the Playwright parity/smoke suite against Vercel preview deployments in CI.                                                                            | P3       | M      |
| E4  | Pre-commit hooks (`simple-git-hooks` + `lint-staged`) if CI feedback becomes too slow.                                                                     | P3       | S      |
| E5  | Dependabot or Renovate for dependency updates.                                                                                                             | P3       | S      |
| E6  | Unify the CTA button styles (black "Reservar"/"Solicitar" buttons and grey "Más info" buttons are duplicated class strings) into one component. _(revamp)_ | P3       | S      |
