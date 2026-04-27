import { chromium, devices } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['iPhone SE'] })
const page = await ctx.newPage()

await page.goto('https://hannover-kfz-gutachter.de/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

// Trigger all whileInView animations by scrolling through entire page slowly
const totalHeight = await page.evaluate(() => document.body.scrollHeight)
const viewportHeight = await page.evaluate(() => window.innerHeight)
console.log(`Total page height: ${totalHeight}px`)
console.log(`Viewport height: ${viewportHeight}px`)

// Scroll in chunks
const chunks = Math.ceil(totalHeight / (viewportHeight * 0.8))
for (let i = 0; i <= chunks; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * viewportHeight * 0.8)
  await page.waitForTimeout(120)
}

// Now check footer specifically
const footerInfo = await page.evaluate(() => {
  const footers = document.querySelectorAll('footer')
  return Array.from(footers).map((f) => {
    const rect = f.getBoundingClientRect()
    const cs = getComputedStyle(f)
    return {
      tag: f.tagName,
      class: f.className.substring(0, 80),
      offsetTop: f.offsetTop,
      offsetHeight: f.offsetHeight,
      rectTop: rect.top,
      rectHeight: rect.height,
      bg: cs.backgroundColor,
      display: cs.display,
      hasContent: f.textContent.trim().substring(0, 100),
    }
  })
})
console.log('\nFooter elements found:', footerInfo.length)
footerInfo.forEach((f, i) => {
  console.log(`\n[${i}]`, JSON.stringify(f, null, 2))
})

// Check what's actually at the bottom of the page
const bottomElement = await page.evaluate(() => {
  const allEls = Array.from(document.querySelectorAll('body *'))
  const sorted = allEls
    .map((el) => ({ el, bottom: el.getBoundingClientRect().bottom + window.scrollY }))
    .sort((a, b) => b.bottom - a.bottom)
  return sorted.slice(0, 5).map((s) => ({
    tag: s.el.tagName,
    class: s.el.className.substring(0, 60),
    bottom: Math.round(s.bottom),
  }))
})
console.log('\nBottom 5 elements:', JSON.stringify(bottomElement, null, 2))

// Now scroll footer into view and screenshot
await page.evaluate(() => {
  const f = document.querySelector('footer')
  if (f) f.scrollIntoView({ behavior: 'instant', block: 'start' })
})
await page.waitForTimeout(800)
await page.screenshot({ path: 'screenshots/_debug-footer-iphone-se.png', fullPage: false })

await browser.close()
console.log('\nDebug screenshot saved')
