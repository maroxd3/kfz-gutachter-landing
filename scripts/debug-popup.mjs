import { chromium, devices } from 'playwright'
import { resolve } from 'node:path'

const OUT = resolve(import.meta.dirname || new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), '..', 'screenshots')

const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['iPhone 14'] })
const page = await ctx.newPage()
await page.goto('https://hannover-kfz-gutachter.de/?nocache=' + Date.now(), { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)

// Click first pin
const pins = await page.$$('button[aria-label^="Schaden:"]')
console.log(`Found ${pins.length} pins`)
if (pins.length > 0) {
  await pins[0].click()
  await page.waitForTimeout(1200)

  // Diagnose: count motion divs in body, find the popup
  const diag = await page.evaluate(() => {
    const allMotion = document.querySelectorAll('div.fixed')
    const result = []
    allMotion.forEach((el) => {
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      result.push({
        text: el.textContent.substring(0, 50),
        position: cs.position,
        zIndex: cs.zIndex,
        width: r.width,
        height: r.height,
        left: r.left,
        top: r.top,
        bottom: r.bottom,
        viewportH: window.innerHeight,
        viewportW: window.innerWidth,
      })
    })
    return result
  })
  console.log('Fixed elements:', JSON.stringify(diag, null, 2))

  await page.screenshot({ path: resolve(OUT, '_popup-debug.png'), fullPage: false })
}
await browser.close()
