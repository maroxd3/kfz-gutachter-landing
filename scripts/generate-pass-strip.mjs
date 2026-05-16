import sharp from 'sharp'
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'

// Nimmt ein Source-Bild und rendert die drei Strip-Größen für den Apple Wallet
// eventTicket Pass (mit auxiliaryFields, ohne primaryFields). Source sollte
// >= 1125x534 sein. Aspect ~2.1:1; alles drumherum wird via object-cover beschnitten.
//
// Usage: node scripts/generate-pass-strip.mjs <source-image-path>
const src = process.argv[2]
if (!src) {
  console.error('Usage: node scripts/generate-pass-strip.mjs <source-image>')
  process.exit(1)
}
if (!existsSync(src)) {
  console.error(`File not found: ${src}`)
  process.exit(1)
}

const outDir = resolve('functions/apple-pass/template.pass')

const sizes = [
  { name: 'strip.png',    w: 375,  h: 178 },
  { name: 'strip@2x.png', w: 750,  h: 356 },
  { name: 'strip@3x.png', w: 1125, h: 534 },
]

const meta = await sharp(src).metadata()
console.log(`source: ${meta.width}x${meta.height}`)

for (const { name, w, h } of sizes) {
  await sharp(src)
    .resize(w, h, { fit: 'cover', position: 'center' })
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, name))
  console.log(`✓ ${name} (${w}x${h})`)
}
