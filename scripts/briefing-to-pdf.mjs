import { chromium } from 'playwright'
import { resolve } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'

const HTML = resolve(import.meta.dirname || new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), 'briefing-mustafa.html')
const OUT_DIR = resolve(homedir(), 'Desktop')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })
const OUT = resolve(OUT_DIR, 'Sachverstaendigenbuero-Hannover_Briefing-Mustafa.pdf')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('file:///' + HTML.replace(/\\/g, '/'), { waitUntil: 'networkidle' })
await page.emulateMedia({ media: 'print' })
await page.pdf({
  path: OUT,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
})
await browser.close()
console.log('PDF generated:', OUT)
