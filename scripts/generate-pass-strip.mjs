import sharp from 'sharp'
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'

// Nimmt ein Landscape-Source-Bild und rendert daraus die Strip-Größen.
// Optional ein zweites Portrait-Bild für iOS-18-posterEventTicket
// (background.png). Wenn nur ein Source-Bild übergeben wird, nutzt
// background.png denselben Source, gecroppt auf Portrait.
//
// Usage:
//   node scripts/generate-pass-strip.mjs <landscape-src> [portrait-src]
const src = process.argv[2]
const portraitSrc = process.argv[3] ?? src
if (!src) {
  console.error('Usage: node scripts/generate-pass-strip.mjs <landscape-src> [portrait-src]')
  process.exit(1)
}
if (!existsSync(src) || !existsSync(portraitSrc)) {
  console.error(`File not found: ${!existsSync(src) ? src : portraitSrc}`)
  process.exit(1)
}

const outDir = resolve('functions/apple-pass/template.pass')

// Apple-spec coupon strip dimensions (PassKit Package Format Reference):
// 375 × 144 (1×) → 1125 × 432 (3×). Aspect 2.604:1.
// Wichtig: iOS skaliert kleinere Bilder hoch und croppt dann nach — also
// die Specs IMMER einhalten, sonst doppelter Crop.
const stripSizes = [
  { name: 'strip.png',    w: 375,  h: 144 },
  { name: 'strip@2x.png', w: 750,  h: 288 },
  { name: 'strip@3x.png', w: 1125, h: 432 },
]

// background.png hat zwei Verwendungen:
//   - Standard eventTicket: kleines blurred backdrop (180×220 @1x)
//   - iOS-18-posterEventTicket: full-bleed Portrait artwork
// Wenn portrait-src übergeben wird, wir gehen davon aus, dass der Pass im
// posterEventTicket-Modus läuft → größere Portrait-Maße (ca. 9:16).
const usePortraitBackground = portraitSrc !== src
const backgroundSizes = usePortraitBackground
  ? [
      { name: 'background.png',    w: 316,  h: 553  },
      { name: 'background@2x.png', w: 632,  h: 1106 },
      { name: 'background@3x.png', w: 948,  h: 1659 },
    ]
  : [
      { name: 'background.png',    w: 180, h: 220 },
      { name: 'background@2x.png', w: 360, h: 440 },
      { name: 'background@3x.png', w: 540, h: 660 },
    ]

const meta = await sharp(src).metadata()
console.log(`landscape src: ${meta.width}x${meta.height}`)
if (usePortraitBackground) {
  const pm = await sharp(portraitSrc).metadata()
  console.log(`portrait src:  ${pm.width}x${pm.height}`)
}

for (const { name, w, h } of stripSizes) {
  await sharp(src)
    .resize(w, h, { fit: 'cover', position: 'center' })
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, name))
  console.log(`✓ ${name} (${w}x${h})`)
}

for (const { name, w, h } of backgroundSizes) {
  await sharp(portraitSrc)
    .resize(w, h, { fit: 'cover', position: 'center' })
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, name))
  console.log(`✓ ${name} (${w}x${h})`)
}
