# AGENTS.md

Brochure site for Fernanda Gutiérrez, a makeup artist (Fer Gutierrez MakeUp), served at https://www.fernandagutierrez.es.
It presents her Services and Classes and sends every booking or enquiry to WhatsApp. **Nothing is sold on the site.**

## Read first

- [GLOSSARY.md](./GLOSSARY.md): the domain language. Use these terms in code, docs and conversations.
- [docs/backlog.md](./docs/backlog.md): known issues and planned improvements. Check it before proposing work and add new findings to it.
- [docs/migration.md](./docs/migration.md): how this repo was migrated from the eXa monorepo, the redirects and the Vercel cutover.
- [docs/adr/](./docs/adr/): architecture decisions.

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript 6 (strict), Tailwind CSS 4 (CSS-first config in `src/app/globals.css`, no `tailwind.config`), ESLint 9 + Prettier, pnpm, Node 24. Hosted on Vercel.

TypeScript and ESLint are deliberately pinned one major below latest (TS 7 / ESLint 10) because `eslint-config-next` doesn't support them yet. Don't upgrade them without checking that.

## Commands

```sh
pnpm dev            # dev server on :3000
pnpm build          # production build
pnpm lint           # ESLint (not run by `next build` in Next 16)
pnpm typecheck      # route types + tsc
pnpm format         # Prettier (also sorts Tailwind classes)
pnpm images:optimize  # downscale/recompress images in public/ (run after adding photos)
pnpm parity         # local-only visual comparison against production (see docs/migration.md)
```

CI (GitHub Actions) runs format check, lint and typecheck. Build and deploy are done by Vercel's GitHub integration.

## Conventions

- **Code is in English; visible UI copy is in Spanish.** Name things with the GLOSSARY terms (`Studio`, `Service`, `Class`, `Booking`, `Quote`…), never with the legacy e-commerce names (`Salon`, `Store`, `Course`, `Product`).
- All content is code: Contact Details, Services, Classes, Brands and Portfolio live in `src/data/`. There is no backend or CMS (see ADR 0001). The only runtime dependency is Google Places API (New) for Reviews (`src/lib/google-reviews.ts`). Reviews are cached and the home page regenerated at most once a day; this deliberately goes beyond Google's no-caching terms for speed and cost, as decided by the owner. Keep the Google Maps attribution in the Reviews section.
- Pages are Server Components and static. Only the header (mobile menu) and the Portfolio lightbox are Client Components.
- Mark only the largest above-the-fold image of each page with `loading='eager'` + `fetchPriority='high'` (`priority` is deprecated in Next 16), and give every `next/image` an accurate `sizes`.
- Named exports, kebab-case file names, `@/` for `src/` and `@public/` for static image imports.
- Removed routes must get a 301 in `next.config.ts`. Never let an old URL return a 404.

## React Compiler

It is **intentionally off**: today the site has only two small Client Components, so it would add build cost for no gain. **Turn it on (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`) as soon as the site becomes meaningfully interactive**, for example in the planned revamp. The `react-hooks` lint rules already enforce compiler-compatible code.

## Environment variables

| Name             | Where                | Purpose                                                                            |
| ---------------- | -------------------- | ---------------------------------------------------------------------------------- |
| `GOOGLE_API_KEY` | Vercel, `.env.local` | Google Places API key for Reviews. Without it the Reviews section is not rendered. |
