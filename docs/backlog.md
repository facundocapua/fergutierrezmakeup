# Backlog

Improvements found during the migration (October 2026) and in later reviews. Done items are removed; their notes live in the commits and in docs/research/.

Priority: **P1** do soon (legal, broken or data loss), **P2** valuable, **P3** nice to have. Effort: S (hours), M (a day or two), L (more).

## Epic: Site revamp

A redesign of the site is planned after the migration. Several items below are better done as part of it; they are tagged _(revamp)_.

- When the revamp makes the site meaningfully interactive, **enable the React Compiler** (`reactCompiler: true` + `babel-plugin-react-compiler`). See AGENTS.md.
- If the Artist needs to edit content without a developer, revisit [ADR 0001](./adr/0001-content-as-code-without-backend.md) and consider a headless CMS.

## Legal and compliance (Spain)

| #   | Item                                                                                                                                                                                                                                                                                                                                                                                                      | Priority | Effort |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| L2  | The legal notice (`/aviso-legal`) and privacy policy (`/privacidad`) exist and are linked from the footer; they are a reasonable draft, not legal advice, so have them reviewed. Still to do outside the repo: sign Pirsch's data processing agreement and cap retention at 25 months in Pirsch (the policy promises both). Update `LEGAL_LAST_UPDATED` in `src/data/legal.ts` whenever the pages change. | P1       | S      |

## Content

| #   | Item                                                                                                                                                                                                                                 | Priority | Effort |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------ |
| C1  | **Adapt the copy to Spain.** The business moved from Tandil (Argentina) to Benalmádena (Málaga), but the copy still uses Argentinian voseo ("podes", "querés", "dejame") and assumes Argentinian clients. Review it with the Artist. | P2       | M      |
| C2  | Decide whether to show prices. Classes and Social Makeup had prices in the code (ARS amounts, now removed) but they weren't displayed. If they are shown, use euros.                                                                 | P2       | S      |
| C3  | A real "Sobre mí" (About) page. The old `/sobre-mi` was an empty stub and now redirects to `/`. _(revamp)_                                                                                                                           | P3       | M      |
| C5  | Consider bringing back Services and Classes that were commented out in the old code: "Makeup Express", "Makeup Full" (Social Makeup) and "Automaquillaje grupal" (group Class, up to 3 people).                                      | P3       | S      |
| C6  | Show Brow Design pricing/duration like Social Makeup does, for consistency.                                                                                                                                                          | P3       | S      |
| C7  | Wording inconsistency: the Brow Design page title is "Diseño de cejas", the card says "Diseño Cejas", the breadcrumb says "Cejas" and the WhatsApp message says "perfilado de cejas". Pick one.                                      | P3       | S      |

## AI assistants and agents

From [docs/research/llm-agents.md](./research/llm-agents.md), where each item is explained with its sources. IDs match the research's goals (O1, O4 and O6 are done, O8 was discarded). Booking tools return the messages from `src/data`, never free text from an agent.

| #   | Item                                                                                                                                                                                                                                                                                                                                                                                                                  | Priority | Effort |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| A2  | Keep the Google Business Profile consistent with `src/data/contact-details.ts`, and claim Bing Places and Apple Business Connect. Register the site in Bing Webmaster Tools. Needs the Artist.                                                                                                                                                                                                                        | P1       | S      |
| A3  | Measure AI assistant visits and crawler hits: watch Pirsch's "AI" channel and referrers, and create the Vercel Firewall rule `Log AI crawlers` (User Agent matches the regex in [the research](./research/pirsch-proxy-and-crawler-logs.md), action Log) plus the Observability "AI Traffic" tab. Logs last 1 day on Pro, so record what shows up in docs/research/llm-agents.md.                                     | P1       | S      |
| A5  | JSON-LD for each Service and Class (`Service` with `provider` and `areaServed`) and `openingHoursSpecification` as an array. No reviews; prices only after C2.                                                                                                                                                                                                                                                        | P2       | M      |
| A7  | `llms.txt` generated from `src/data`. Unproven: remove it if A3 shows no requests within 3 months.                                                                                                                                                                                                                                                                                                                    | P3       | S      |
| A9  | WebMCP experiment: register a `build_booking_link` tool on the page (Client Component, no backend). Draft API in a Chrome origin trial; check its status first. After A4.                                                                                                                                                                                                                                             | P3       | S      |
| A10 | Count visitors with ad blockers by serving Pirsch from our own domain. A Vercel rewrite is not supported by Pirsch (it loses the visitor IP); it needs a Route Handler that forwards the IP with an access key, or Pirsch's custom domain on the Plus plan. Neither is guaranteed to get past Adblock Plus. Needs an owner decision and an ADR note; see [the research](./research/pirsch-proxy-and-crawler-logs.md). | P3       | M      |

## Engineering

| #   | Item                                                                                                      | Priority | Effort |
| --- | --------------------------------------------------------------------------------------------------------- | -------- | ------ |
| E1  | Upgrade to TypeScript 7 once `typescript-eslint` supports it (it supports `<6.1` today).                  | P3       | S      |
| E2  | Upgrade to ESLint 10 once the plugins in `eslint-config-next` (`react`, `import`, `jsx-a11y`) support it. | P3       | S      |
