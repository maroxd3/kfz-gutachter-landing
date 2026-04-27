import { chromium } from 'playwright'
import { resolve } from 'node:path'
import { homedir } from 'node:os'

const HERE = (import.meta.dirname || new URL('.', import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1')
const HTML = resolve(HERE, 'mustafa-aktionsliste.html')
const OUT = resolve(homedir(), 'Desktop', 'Mustafa_Was-zu-tun_NEU.pdf')

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
console.log('PDF gespeichert:', OUT)
