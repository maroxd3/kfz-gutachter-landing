import { chromium, devices } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const OUT = resolve(import.meta.dirname || new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), '..', 'screenshots')
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

// Desktop
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const dpage = await desktop.newPage()
await dpage.goto('https://hannover-kfz-gutachter.de/?nocache=' + Date.now(), { waitUntil: 'networkidle' })
await dpage.waitForTimeout(1500)
await dpage.screenshot({ path: resolve(OUT, '_logo-check-desktop.png'), fullPage: false })
console.log('✓ desktop screenshot')

// Mobile
const mobile = await browser.newContext({ ...devices['iPhone 14'] })
const mpage = await mobile.newPage()
await mpage.goto('https://hannover-kfz-gutachter.de/?nocache=' + Date.now(), { waitUntil: 'networkidle' })
await mpage.waitForTimeout(1500)
await mpage.screenshot({ path: resolve(OUT, '_logo-check-mobile.png'), fullPage: false })
console.log('✓ mobile screenshot')

await browser.close()
