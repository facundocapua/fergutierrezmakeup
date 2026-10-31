# Fer Gutierrez MakeUp

Website of Fernanda Gutiérrez, makeup artist: https://www.fernandagutierrez.es

## Getting started

Requirements: Node 24 (`nvm use`) and pnpm (`corepack enable`).

```sh
pnpm install
cp .env.example .env.local   # then fill in GOOGLE_API_KEY (optional, only needed for Reviews)
pnpm dev
```

Open http://localhost:3000.

## Editing content

All content lives in `src/data/`:

| File                 | Content                                          |
| -------------------- | ------------------------------------------------ |
| `contact-details.ts` | Email, phone, address, map link, social networks |
| `services.ts`        | Services and their WhatsApp messages             |
| `classes.ts`         | Classes and their WhatsApp messages              |
| `brands.ts`          | Brands shown on the home and services pages      |
| `portfolio.ts`       | Portfolio images and their layout                |

Images go in `public/`. After adding photos, run `pnpm images:optimize`: it caps them at 2400px and recompresses them in place (camera photos are often 3–4 MB).

## Deploy

Every push to `main` deploys to production on Vercel; pull requests get preview deployments.

## Documentation

- [AGENTS.md](./AGENTS.md): project context and conventions (for humans and AI agents).
- [GLOSSARY.md](./GLOSSARY.md): domain language.
- [docs/backlog.md](./docs/backlog.md): improvements to do.
- [docs/migration.md](./docs/migration.md): migration from the eXa monorepo.
