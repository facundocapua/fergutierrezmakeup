# 0001. Content as code, without a backend

- Status: accepted
- Date: 2026-10-31

## Context

The site used to live in the eXa monorepo, which was built around a Medusa e-commerce backend. Although the site sells nothing, its Contact Details and WhatsApp number were read from Medusa at runtime through `getSalon()`. That Medusa instance is being shut down.

## Decision

All content (Contact Details, Services, Classes, Brands, Portfolio) is typed data in `src/data/`, versioned with the code. There is no backend, database or CMS. The only external runtime dependency is the Google Places API for Reviews.

## Consequences

- Every page is statically generated: fast, cheap to host, and nothing can break at runtime.
- Content changes need a commit and a deploy, so a developer has to make them. That is acceptable at the current change rate (a few times a year).
- If the planned revamp requires the Artist to edit content without a developer, revisit this decision and pick a headless CMS. Keep the `src/data/` types as the contract the CMS has to fill.
