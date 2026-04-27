import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const OUT = resolve(import.meta.dirname || new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), '..', 'screenshots')
await mkdir(OUT, { recursive: true })

const targets = [
  { name: 'iphone-se',           ...devices['iPhone SE'] },
  { name: 'iphone-12',           ...devices['iPhone 12'] },
  { name: 'iphone-14-pro-max',   ...devices['iPhone 14 Pro Max'] },
  { name: 'iphone-17-sim',       viewport: { width: 410, height: 900 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 19_0 like Mac OS X) AppleWebKit/605.1.15 Version/19.0 Mobile/15E148 Safari/604.1' },
  { name: 'pixel-7',             ...devices['Pixel 7'] },
  { name: 'ipad-mini',           ...devices['iPad Mini'] },
  { name: 'desktop-1440',        viewport: { width: 1440, height: 900 } },
]

const browser = await chromium.launch()
for (const t of targets) {
  const ctx = await browser.newContext({
    viewport: t.viewport,
    userAgent: t.userAgent,
    deviceScaleFactor: t.deviceScaleFactor || 1,
    isMobile: t.isMobile,
    hasTouch: t.hasTouch,
  })
  const page = await ctx.newPage()
  await page.goto('https://hannover-kfz-gutachter.de/?nocache=' + Date.now(), { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: resolve(OUT, `_pins-${t.name}.png`), fullPage: false })
  console.log(`✓ ${t.name} ${t.viewport.width}×${t.viewport.height}`)
  await ctx.close()
}
await browser.close()
