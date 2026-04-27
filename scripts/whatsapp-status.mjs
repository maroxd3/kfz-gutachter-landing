import { chromium } from 'playwright'
import QRCode from 'qrcode'
import { mkdir, readFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { resolve } from 'node:path'

const OUT = resolve(homedir(), 'Desktop', 'KGH-Marketing', 'WhatsApp-Status')
await mkdir(OUT, { recursive: true })

const FONTS = resolve(import.meta.dirname || new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), '..', 'public', 'fonts').replace(/\\/g, '/')
const LOGO_PATH = resolve(import.meta.dirname || new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), '..', 'public', 'logo', 'logo-512.png')
const LOGO_DATAURL = `data:image/png;base64,${(await readFile(LOGO_PATH)).toString('base64')}`

const fontStyles = `
@font-face { font-family:'Inter';font-weight:400;src:url('file:///${FONTS}/inter-latin-400-normal.woff2') format('woff2'); }
@font-face { font-family:'Inter';font-weight:500;src:url('file:///${FONTS}/inter-latin-500-normal.woff2') format('woff2'); }
@font-face { font-family:'Inter';font-weight:600;src:url('file:///${FONTS}/inter-latin-600-normal.woff2') format('woff2'); }
@font-face { font-family:'Inter';font-weight:700;src:url('file:///${FONTS}/inter-latin-700-normal.woff2') format('woff2'); }
@font-face { font-family:'Cormorant Garamond';font-weight:500;src:url('file:///${FONTS}/cormorant-garamond-latin-500-normal.woff2') format('woff2'); }
@font-face { font-family:'Cormorant Garamond';font-weight:600;src:url('file:///${FONTS}/cormorant-garamond-latin-600-normal.woff2') format('woff2'); }
@font-face { font-family:'Cormorant Garamond';font-weight:700;src:url('file:///${FONTS}/cormorant-garamond-latin-700-normal.woff2') format('woff2'); }
`

const baseStyles = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1920px; overflow: hidden; font-family: 'Inter', sans-serif; }
:root {
  --ink: #0A1F44; --ink-soft: #1a2f5c;
  --gold: #B8915E; --gold-soft: #d4b584; --gold-dark: #8e6d43;
  --cream: #fafaf7; --cream-dark: #f2efe6;
}
.serif { font-family: 'Cormorant Garamond', serif; font-weight: 600; letter-spacing: -0.01em; }
.italic { font-style: italic; }
.eyebrow { font-size: 22px; font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase; }
.phone-bar {
  position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 14px;
  padding: 28px 64px; background: rgba(184,145,94,0.15);
  border: 2px solid var(--gold); border-radius: 999px;
  backdrop-filter: blur(8px);
}
.phone-bar .label { font-size: 24px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; }
.phone-bar .num   { font-family: 'Cormorant Garamond', serif; font-size: 76px; font-weight: 700; letter-spacing: 0.04em; }
.bottom-url {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  font-size: 22px; font-weight: 500; letter-spacing: 0.08em; opacity: 0.7;
}
.qr {
  position: absolute; top: 56px; right: 56px;
  width: 160px; height: 160px; padding: 16px;
  background: var(--cream); border-radius: 18px;
}
.logo-card {
  position: absolute; top: 48px; left: 48px;
  background: var(--cream); padding: 20px 28px; border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
}
.logo-card img { display: block; height: 90px; width: auto; }
.logo-naked {
  position: absolute; top: 48px; left: 48px;
}
.logo-naked img { display: block; height: 100px; width: auto; }
`

const qrDataUrl = await QRCode.toDataURL('https://hannover-kfz-gutachter.de/', {
  errorCorrectionLevel: 'M',
  margin: 1,
  width: 320,
  color: { dark: '#0A1F44', light: '#fafaf7' },
})

const logoTag = (mode) =>
  mode === 'dark'
    ? `<div class="logo-card"><img src="${LOGO_DATAURL}" alt="Kfz-Experten Hannover"></div>`
    : `<div class="logo-naked"><img src="${LOGO_DATAURL}" alt="Kfz-Experten Hannover"></div>`

const wrap = (bg, text, body, opts = {}) => `
<!doctype html>
<html><head><meta charset="utf-8"><style>${fontStyles}${baseStyles}
body { background: ${bg}; color: ${text}; }
${opts.extra || ''}
</style></head><body>${body}</body></html>`

const designs = [
  // 01 — HOOK: "Unfall?" (dark bg → logo on white card)
  {
    id: '01-unfall-hook',
    html: wrap('var(--ink)', 'var(--cream)', `
      ${logoTag('dark')}
      <img class="qr" src="${qrDataUrl}" alt="QR" />

      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 80px;">
        <div class="serif italic" style="font-size: 48px; color: var(--gold-soft); margin-bottom: 32px;">Schaden gerade passiert?</div>
        <div class="serif" style="font-size: 320px; line-height: 0.9; color: var(--gold);">Unfall?</div>
        <div class="serif" style="font-size: 76px; line-height: 1.15; margin-top: 56px; max-width: 920px;">
          Wir kümmern uns. <span class="italic" style="color: var(--gold-soft);">Kostenlos für Geschädigte.</span>
        </div>
      </div>

      <div class="phone-bar" style="color: var(--cream);">
        <div class="label">24 h erreichbar</div>
        <div class="num">+49 176 80444241</div>
      </div>
      <div class="bottom-url" style="color: var(--cream);">hannover-kfz-gutachter.de</div>
    `)
  },

  // 02 — PROMISE: Termin in 24h (light bg → logo direct)
  {
    id: '02-termin-24h',
    html: wrap('var(--cream)', 'var(--ink)', `
      ${logoTag('light')}

      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 80px;">
        <div class="eyebrow" style="color: var(--gold-dark); margin-bottom: 48px;">Unsere Zusage</div>

        <div style="display:flex;align-items:baseline;gap:24px;">
          <div class="serif" style="font-size: 480px; line-height: 0.85; color: var(--ink);">24</div>
          <div class="serif" style="font-size: 200px; line-height: 1; color: var(--gold);">h</div>
        </div>

        <div class="serif italic" style="font-size: 78px; line-height: 1.1; margin-top: 48px; color: var(--ink); max-width: 920px;">
          Termin vor Ort. Im Eilfall noch heute.
        </div>

        <div style="font-size: 30px; font-weight: 500; margin-top: 56px; color: var(--ink-soft); max-width: 800px; line-height: 1.5;">
          Wir kommen zur Werkstatt, nach Hause oder zur Unfallstelle —
          im Raum Hannover bis 50&nbsp;km ohne Anfahrtskosten.
        </div>
      </div>

      <div class="phone-bar" style="color: var(--ink); background: rgba(10,31,68,0.06); border-color: var(--ink);">
        <div class="label">Termin vereinbaren</div>
        <div class="num">+49 176 80444241</div>
      </div>
      <div class="bottom-url" style="color: var(--ink);">hannover-kfz-gutachter.de</div>
    `)
  },

  // 03 — LEISTUNGEN list (dark bg)
  {
    id: '03-leistungen',
    html: wrap('linear-gradient(180deg, var(--ink) 0%, #06152e 100%)', 'var(--cream)', `
      ${logoTag('dark')}
      <img class="qr" src="${qrDataUrl}" alt="QR" />

      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;text-align:left;padding:0 100px;">
        <div class="eyebrow" style="color: var(--gold-soft); margin-bottom: 40px;">Wir kümmern uns um</div>

        <div class="serif" style="font-size: 100px; line-height: 1.05; color: var(--cream); margin-bottom: 64px; max-width: 900px;">
          Alles, was nach dem Unfall <span class="italic" style="color: var(--gold);">passieren muss.</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 28px; font-size: 50px; font-weight: 500; line-height: 1.2;">
          <div style="display: flex; align-items: center; gap: 28px;">
            <span style="color: var(--gold); font-weight: 700;">✓</span>
            <span>Unfallgutachten</span>
          </div>
          <div style="display: flex; align-items: center; gap: 28px;">
            <span style="color: var(--gold); font-weight: 700;">✓</span>
            <span>Wertgutachten</span>
          </div>
          <div style="display: flex; align-items: center; gap: 28px;">
            <span style="color: var(--gold); font-weight: 700;">✓</span>
            <span>Oldtimer-Gutachten</span>
          </div>
          <div style="display: flex; align-items: center; gap: 28px;">
            <span style="color: var(--gold); font-weight: 700;">✓</span>
            <span>Schadensregulierung</span>
          </div>
          <div style="display: flex; align-items: center; gap: 28px;">
            <span style="color: var(--gold); font-weight: 700;">✓</span>
            <span style="opacity: 0.85;">Kurzgutachten · Kostenvoranschlag</span>
          </div>
        </div>

        <div style="margin-top: 64px; font-size: 28px; opacity: 0.7; font-weight: 500;">
          DIN ISO 17024 · TÜV-/DEKRA-zertifiziert
        </div>
      </div>

      <div class="bottom-url" style="color: var(--cream);">+49 176 80444241 · hannover-kfz-gutachter.de</div>
    `)
  },

  // 04 — "0 €" für Sie (light bg)
  {
    id: '04-0-euro-fuer-sie',
    html: wrap('var(--cream)', 'var(--ink)', `
      ${logoTag('light')}

      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 80px;">
        <div class="eyebrow" style="color: var(--gold-dark); margin-bottom: 32px;">Bei unverschuldetem Unfall</div>

        <div class="serif" style="font-size: 540px; line-height: 0.85; color: var(--gold-dark);">0 €</div>
        <div class="serif italic" style="font-size: 92px; line-height: 1; margin-top: 24px; color: var(--ink);">für Sie.</div>

        <div style="font-size: 36px; font-weight: 500; margin-top: 80px; color: var(--ink-soft); max-width: 880px; line-height: 1.45;">
          Gutachten, Anwalt und Nutzungsausfall trägt die <strong style="color: var(--ink);">gegnerische Versicherung</strong> — vollständig.
        </div>
      </div>

      <div class="phone-bar" style="color: var(--ink); background: rgba(10,31,68,0.06); border-color: var(--ink);">
        <div class="label">Sofort klären</div>
        <div class="num">+49 176 80444241</div>
      </div>
      <div class="bottom-url" style="color: var(--ink);">hannover-kfz-gutachter.de</div>
    `)
  },

  // 05 — Persönlich, kein Call-Center (dark bg)
  {
    id: '05-kein-callcenter',
    html: wrap('var(--ink)', 'var(--cream)', `
      ${logoTag('dark')}

      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 80px;">
        <div class="eyebrow" style="color: var(--gold-soft); margin-bottom: 56px;">Was uns unterscheidet</div>

        <div class="serif" style="font-size: 180px; line-height: 0.95; color: var(--cream); margin-bottom: 48px;">
          <span style="text-decoration: line-through; text-decoration-color: var(--gold); text-decoration-thickness: 12px; opacity: 0.6;">Call-Center.</span>
        </div>

        <div class="serif italic" style="font-size: 130px; line-height: 1; color: var(--gold);">Sondern wir.</div>

        <div style="font-size: 44px; font-weight: 500; margin-top: 100px; line-height: 1.4; max-width: 920px;">
          Wenn Sie anrufen, sprechen Sie direkt mit dem Sachverständigen.
          Keine Bandansage. Kein Vermittler. Keine Warteschleife.
        </div>
      </div>

      <div class="phone-bar" style="color: var(--cream);">
        <div class="label">Direkt erreichbar</div>
        <div class="num">+49 176 80444241</div>
      </div>
      <div class="bottom-url" style="color: var(--cream);">hannover-kfz-gutachter.de</div>
    `)
  },

  // 06 — Quote-style: "Was tun nach Unfall" (light bg)
  {
    id: '06-was-tun-checkliste',
    html: wrap('var(--cream-dark)', 'var(--ink)', `
      ${logoTag('light')}
      <img class="qr" src="${qrDataUrl}" alt="QR" />

      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:0 100px;">
        <div class="eyebrow" style="color: var(--gold-dark); margin-bottom: 32px;">Was tun nach dem Unfall</div>

        <div class="serif" style="font-size: 100px; line-height: 1.05; color: var(--ink); margin-bottom: 56px;">
          Drei Schritte. <span class="italic" style="color: var(--gold-dark);">Mehr nicht.</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 36px; font-size: 38px; line-height: 1.35;">
          <div style="display: flex; gap: 32px; align-items: flex-start;">
            <div class="serif" style="font-size: 80px; color: var(--gold-dark); line-height: 0.9; min-width: 80px;">01</div>
            <div>
              <div style="font-weight: 700; font-size: 42px;">Foto vom Schaden</div>
              <div style="opacity: 0.65; font-size: 30px; margin-top: 4px;">Auch vom gegnerischen Kennzeichen</div>
            </div>
          </div>
          <div style="display: flex; gap: 32px; align-items: flex-start;">
            <div class="serif" style="font-size: 80px; color: var(--gold-dark); line-height: 0.9; min-width: 80px;">02</div>
            <div>
              <div style="font-weight: 700; font-size: 42px;">Polizei nur bei Bedarf</div>
              <div style="opacity: 0.65; font-size: 30px; margin-top: 4px;">Bei Streit, Personenschaden oder Fahrerflucht</div>
            </div>
          </div>
          <div style="display: flex; gap: 32px; align-items: flex-start;">
            <div class="serif" style="font-size: 80px; color: var(--gold-dark); line-height: 0.9; min-width: 80px;">03</div>
            <div>
              <div style="font-weight: 700; font-size: 42px;">Uns anrufen</div>
              <div style="opacity: 0.65; font-size: 30px; margin-top: 4px;">Wir übernehmen alles Weitere</div>
            </div>
          </div>
        </div>

        <div style="margin-top: 80px; font-size: 32px; font-weight: 600; color: var(--gold-dark); letter-spacing: 0.04em;">
          → Nicht der Versicherung des Anderen vertrauen!
        </div>
      </div>

      <div class="bottom-url" style="color: var(--ink);">+49 176 80444241 · hannover-kfz-gutachter.de</div>
    `)
  },
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })

for (const d of designs) {
  await page.setContent(d.html, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: resolve(OUT, `${d.id}.png`), type: 'png', fullPage: false })
  console.log(`✓ ${d.id}.png`)
}

await browser.close()
console.log(`\nGespeichert in: ${OUT}`)
