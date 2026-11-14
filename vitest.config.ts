import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

/** Unit tests. Visual parity tests are Playwright's (playwright.config.ts). */
export default defineConfig({
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
      '@public/': fileURLToPath(new URL('./public/', import.meta.url))
    }
  },
  test: { include: ['tests/unit/**/*.test.ts'] }
})
