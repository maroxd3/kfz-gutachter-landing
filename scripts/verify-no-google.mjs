import { chromium } from 'playwright'

const URLS = [
  'https://hannover-kfz-gutachter.de/',
  'https://hannover-kfz-gutachter.de/impressum.html',
  'https://hannover-kfz-gutachter.de/datenschutz.html',
  'https://hannover-kfz-gutachter.de/agb.html',
]

const SUSPECT = ['google', 'gstatic', 'doubleclick', 'facebook', 'analytics', 'hotjar', 'mixpanel']

const browser = await chromium.launch()

for (const url of URLS) {
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  const requests = []
  page.on('request', (req) => {
    const u = req.url()
    if (SUSPECT.some((s) => u.includes(s))) requests.push(`${req.method()} ${u}`)
  })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
  await page.waitForTimeout(1500)
  console.log(`\n${url}`)
  if (requests.length === 0) {
    console.log('  ✅ Keine Anfragen an Tracking/Google/Meta-Hosts')
  } else {
    console.log('  ❌ Verdächtige Requests:')
    requests.forEach((r) => console.log(`    - ${r}`))
  }
  await ctx.close()
}

await browser.close()
