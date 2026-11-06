# Visual parity check

`tests/parity` takes full-page screenshots of every page (desktop 1440px and Pixel 7) and compares them with production, with a 1% tolerance.

## On preview deployments

`.github/workflows/parity.yml` runs when Vercel reports a successful preview deployment. It records the baseline from production and compares the preview with it, both on the same runner. Production deployments don't trigger it.

A failure means the preview looks different from production. That is expected when a change is meant to be visual, so read it as a diff to review: the `parity-report` artifact of the run has the screenshots. The check isn't required for merging.

Other causes of a failure:

- **New Reviews in production or missing `GOOGLE_API_KEY`:** the home page differs if the preview shows other Reviews, or none. The key must be set for the Preview environment in Vercel.
- **"Preview returned HTTP 401/403":** the secret below is missing or wrong.

### Setup

If Deployment Protection is on for previews, generate a secret in Vercel → Settings → Deployment Protection → Protection Bypass for Automation, and save it as the `VERCEL_BYPASS_SECRET` repository secret in GitHub.

## Locally

```sh
pnpm exec playwright install chromium   # once
pnpm parity:baseline                    # record screenshots from production
pnpm build && pnpm parity               # compare the local build
PARITY_URL=https://… VERCEL_BYPASS_SECRET=… pnpm parity  # compare a deployment
PARITY_MAX_DIFF=0 pnpm parity           # zero tolerance, to inspect every diff
```
