import { chromium, devices } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:5180/unfall'
const out = process.argv[3] ?? 'screenshots'

const browser = await chromium.launch()

const shots = [
  { name: 'mobile-iphone14', device: devices['iPhone 14'] },
  { name: 'mobile-pixel7', device: devices['Pixel 7'] },
  { name: 'tablet', viewport: { width: 834, height: 1112 }, deviceScaleFactor: 2 },
  { name: 'desktop', viewport: { width: 1440, height: 900 } },
]

for (const s of shots) {
  const ctx = await browser.newContext(s.device ?? s)
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  // Trigger all framer-motion `whileInView` by scrolling through the page first.
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight
    const step = window.innerHeight * 0.6
    for (let y = 0; y <= h; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 200))
  })
  await page.waitForTimeout(500)
  await page.screenshot({
    path: `${out}/unfall-${s.name}.png`,
    fullPage: true,
  })
  console.log(`✓ ${s.name}`)
  await ctx.close()
}

await browser.close()
