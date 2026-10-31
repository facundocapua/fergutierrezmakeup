import { expect, test } from '@playwright/test'

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/servicios' },
  { name: 'social-makeup', path: '/servicios/social' },
  { name: 'bridal-makeup', path: '/servicios/novias' },
  { name: 'brow-design', path: '/servicios/cejas' },
  { name: 'classes', path: '/clases' },
  { name: 'portfolio', path: '/portfolio' }
]

for (const { name, path } of PAGES) {
  test(`${name} matches production`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' })
    // Force lazy images to load before the full-page capture.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y)
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true })
  })
}

test('mobile menu matches production', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'The menu button only exists on mobile')
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir menú principal' }).click()
  await page.getByRole('button', { name: 'Cerrar menu' }).waitFor()
  await page.waitForTimeout(400)
  await expect(page).toHaveScreenshot('mobile-menu.png')
})
