import { chromium } from 'playwright'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const HERE = (import.meta.dirname || new URL('.', import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1')
const ROOT = resolve(HERE, '..')
const SVG_SRC = resolve(ROOT, 'public/logo/logo-source.svg')
const OUT_DIR = resolve(ROOT, 'public/logo')

const sizes = [
  { name: 'logo-2400.png', w: 2400, scale: 2 }, // hero/print
  { name: 'logo-1200.png', w: 1200, scale: 2 }, // OG/social
  { name: 'logo-512.png',  w: 512,  scale: 2 }, // navbar large
  { name: 'logo-256.png',  w: 256,  scale: 2 }, // navbar
  { name: 'favicon-180.png', w: 180, scale: 1 }, // apple-touch
  { name: 'favicon-32.png',  w: 32,  scale: 1 }, // browser
]

const svgContent = await readFile(SVG_SRC, 'utf-8')

const browser = await chromium.launch()
for (const s of sizes) {
  const page = await browser.newPage({
    viewport: { width: s.w, height: Math.round(s.w * 0.75) },
    deviceScaleFactor: s.scale,
  })
  const html = `<!doctype html><html><head><style>
    html,body{margin:0;padding:0;background:transparent;}
    .wrap{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;}
    svg{max-width:100%;max-height:100%;height:auto;width:auto;}
  </style></head><body><div class="wrap">${svgContent}</div></body></html>`
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  await page.screenshot({
    path: resolve(OUT_DIR, s.name),
    omitBackground: true,
    fullPage: false,
  })
  console.log(`✓ ${s.name}`)
  await page.close()
}
await browser.close()
console.log(`\nGespeichert in: ${OUT_DIR}`)
