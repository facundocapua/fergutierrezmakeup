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
| C5  | Consider bringing back Services and Classes that were commented out in the old code: "Makeup Express", "Makeup Full" (Social Makeup) and "Automaquillaje grupal" (group Class, up to 3 people).                                      | P3       | S      |
| C6  | Show Brow Design pricing/duration like Social Makeup does, for consistency.                                                                                                                                                          | P3       | S      |
| C7  | Wording inconsistency: the Brow Design page title is "Diseño de cejas", the card says "Diseño Cejas", the breadcrumb says "Cejas" and the WhatsApp message says "perfilado de cejas". Pick one.                                      | P3       | S      |

## AI assistants and agents

From [docs/research/llm-agents.md](./research/llm-agents.md), where each item is explained with its sources. IDs match the research's goals (O1 and O6 are done, O8 was discarded). Booking tools return the messages from `src/data`, never free text from an agent.

| #   | Item                                                                                                                                                                                           | Priority | Effort |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ |
| A2  | Keep the Google Business Profile consistent with `src/data/contact-details.ts`, and claim Bing Places and Apple Business Connect. Register the site in Bing Webmaster Tools. Needs the Artist. | P1       | S      |
| A3  | Measure AI assistant visits and crawler hits: a Vercel Firewall log rule per AI user agent, the Referrers panel and a WhatsApp click event. Depends on L1.                                     | P1       | S      |
| A4  | Key facts as visible HTML on every Service and Class page (what, duration, where, how to book), clearly labelled `<a href>` Booking links and the phone number as text. Fits with C1/C8.       | P2       | S      |
| A5  | JSON-LD for each Service and Class (`Service` with `provider` and `areaServed`) and `openingHoursSpecification` as an array. No reviews; prices only after C2.                                 | P2       | M      |
| A7  | `llms.txt` generated from `src/data`. Unproven: remove it if A3 shows no requests within 3 months.                                                                                             | P3       | S      |
| A9  | WebMCP experiment: register a `build_booking_link` tool on the page (Client Component, no backend). Draft API in a Chrome origin trial; check its status first. After A4.                      | P3       | S      |

## Engineering

| #   | Item                                                                                                      | Priority | Effort |
| --- | --------------------------------------------------------------------------------------------------------- | -------- | ------ |
| E1  | Upgrade to TypeScript 7 once `typescript-eslint` supports it (it supports `<6.1` today).                  | P3       | S      |
| E2  | Upgrade to ESLint 10 once the plugins in `eslint-config-next` (`react`, `import`, `jsx-a11y`) support it. | P3       | S      |
