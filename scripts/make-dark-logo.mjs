import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const HERE = (import.meta.dirname || new URL('.', import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1')
const ROOT = resolve(HERE, '..')

// Read the source logo PNG and create dark version by swapping navy → cream
const sources = [
  { src: 'public/logo/logo-2400.png', out: 'public/logo/logo-2400-dark.png' },
  { src: 'public/logo/logo-1200.png', out: 'public/logo/logo-1200-dark.png' },
  { src: 'public/logo/logo-512.png',  out: 'public/logo/logo-512-dark.png' },
  { src: 'public/logo/logo-256.png',  out: 'public/logo/logo-256-dark.png' },
]

const browser = await chromium.launch()

for (const s of sources) {
  const buf = await readFile(resolve(ROOT, s.src))
  const dataUrl = `data:image/png;base64,${buf.toString('base64')}`

  // Get original dimensions by loading once
  const sizePage = await browser.newPage()
  await sizePage.setContent(`<img id="i" src="${dataUrl}">`)
  const dims = await sizePage.evaluate(() => {
    const i = document.getElementById('i')
    return { w: i.naturalWidth, h: i.naturalHeight }
  })
  await sizePage.close()

  const page = await browser.newPage({ viewport: { width: dims.w, height: dims.h }, deviceScaleFactor: 1 })
  await page.setContent(`
    <!doctype html><html><head><style>
      html,body{margin:0;padding:0;background:transparent;}
      canvas{display:block;}
    </style></head><body>
      <canvas id="c" width="${dims.w}" height="${dims.h}"></canvas>
      <script>
        const img = new Image()
        img.onload = () => {
          const c = document.getElementById('c')
          const ctx = c.getContext('2d')
          ctx.drawImage(img, 0, 0)
          const id = ctx.getImageData(0, 0, c.width, c.height)
          const d = id.data
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i], g = d[i+1], b = d[i+2], a = d[i+3]
            // Detect "navy-ish" pixels (dark blue)
            // Navy color #0A1F44 = (10, 31, 68). Wide tolerance for anti-aliased edges.
            const isNavy = (r < 90 && g < 90 && b > 30 && b > r && b > g && b - r > 15)
            // Detect black pixels (sometimes the M is rendered very dark)
            const isDark = (r < 30 && g < 30 && b < 80)
            if ((isNavy || isDark) && a > 30) {
              // Replace with cream #fafaf7 (250, 250, 247)
              d[i]     = 250
              d[i+1]   = 250
              d[i+2]   = 247
            }
          }
          ctx.putImageData(id, 0, 0)
          window.__done = true
        }
        img.src = "${dataUrl}"
      </script>
    </body></html>
  `, { waitUntil: 'load' })
  await page.waitForFunction('window.__done === true', { timeout: 15000 })
  const canvasHandle = await page.$('canvas')
  await canvasHandle.screenshot({ path: resolve(ROOT, s.out), omitBackground: true })
  console.log(`✓ ${s.out}`)
  await page.close()
}

await browser.close()
console.log('\nDark logos generated')
