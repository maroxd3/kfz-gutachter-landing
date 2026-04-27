import { chromium, devices } from 'playwright'
import { resolve } from 'node:path'

const OUT = resolve(import.meta.dirname || new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), '..', 'screenshots')

const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['iPhone 14'] })
const page = await ctx.newPage()
await page.goto('https://hannover-kfz-gutachter.de/?nocache=' + Date.now(), { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
// Click first hotspot
const pins = await page.$$('button[aria-label^="Schaden:"]')
if (pins.length > 0) {
  await pins[0].click()
  await page.waitForTimeout(700)
  await page.screenshot({ path: resolve(OUT, '_popup-mobile.png'), fullPage: false })
  console.log('✓ popup screenshot taken')
}
await browser.close()
