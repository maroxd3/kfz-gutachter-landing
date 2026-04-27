import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'

const SITE = 'https://hannover-kfz-gutachter.de/'
const OUT = new URL('../screenshots/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

const targets = [
  { name: 'iphone-se',           ...devices['iPhone SE'] },
  { name: 'iphone-12',           ...devices['iPhone 12'] },
  { name: 'iphone-14-pro-max',   ...devices['iPhone 14 Pro Max'] },
  { name: 'pixel-7',             ...devices['Pixel 7'] },
  { name: 'galaxy-s9',           ...devices['Galaxy S9+'] },
  { name: 'ipad-mini',           ...devices['iPad Mini'] },
  { name: 'ipad-pro',            ...devices['iPad Pro 11'] },
  { name: 'desktop-laptop',      viewport: { width: 1280, height: 800 }, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15', deviceScaleFactor: 2, isMobile: false, hasTouch: false },
  { name: 'desktop-fhd',         viewport: { width: 1920, height: 1080 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', deviceScaleFactor: 1, isMobile: false, hasTouch: false },
]

await mkdir(OUT, { recursive: true })
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
  await page.goto(SITE, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(800) // let animations settle

  // 1. Hero (above the fold)
  await page.screenshot({ path: `${OUT}${t.name}-1-hero.png`, fullPage: false })

  // 2. Trust banner + start of chapter 1
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.95))
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}${t.name}-2-trust+ch1.png`, fullPage: false })

  // 3. Calculator section
  const calc = await page.$('#rechner')
  if (calc) {
    await calc.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${OUT}${t.name}-3-calculator.png`, fullPage: false })
  }

  // 4. Footer area (where sticky CTA should hide)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}${t.name}-4-footer.png`, fullPage: false })

  console.log(`✓ ${t.name.padEnd(20)} ${t.viewport.width}×${t.viewport.height}`)
  await ctx.close()
}

await browser.close()
console.log(`\nScreenshots saved to ${OUT}`)
