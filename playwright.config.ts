import { defineConfig, devices } from '@playwright/test'

/**
 * Local-only visual parity check used during the migration (see docs/migration.md).
 * 1. Record the baseline from production:  pnpm parity:baseline
 * 2. Compare the local build against it:    pnpm parity
 * 3. Compare a deployment instead:          PARITY_URL=https://… VERCEL_BYPASS_SECRET=… pnpm parity
 */
const PRODUCTION_URL = 'https://www.fernandagutierrez.es'
const LOCAL_URL = 'http://localhost:3000'
const isBaseline = process.env.PARITY_BASELINE === '1'
const remoteUrl = process.env.PARITY_URL
const bypassSecret = process.env.VERCEL_BYPASS_SECRET

export default defineConfig({
  testDir: './tests/parity',
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: Number(process.env.PARITY_MAX_DIFF ?? 0.01),
      animations: 'disabled',
      caret: 'hide'
    }
  },
  use: {
    baseURL: isBaseline ? PRODUCTION_URL : (remoteUrl ?? LOCAL_URL),
    // Lets Playwright through Vercel Deployment Protection on preview deployments.
    extraHTTPHeaders: bypassSecret
      ? { 'x-vercel-protection-bypass': bypassSecret, 'x-vercel-set-bypass-cookie': 'true' }
      : undefined
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ],
  webServer:
    isBaseline || remoteUrl
      ? undefined
      : { command: 'pnpm start', url: LOCAL_URL, reuseExistingServer: true, timeout: 60_000 }
})
