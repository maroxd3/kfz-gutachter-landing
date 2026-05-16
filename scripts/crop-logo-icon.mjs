import sharp from 'sharp'
import { resolve } from 'node:path'

// Cropt aus dem Komplett-Logo (Icon + Wordmark + Tagline) nur das Icon-
// Element (M-Buchstabe im goldenen O-Ring) raus, damit es im Header als
// klare quadratische Marke verwendet werden kann.
const root = resolve('public/logo')

async function crop(src, out) {
  // 1. Trimme zuerst die weiße Außenleere weg.
  // 2. Schneide den oberen Teil (vor dem Wordmark) raus — der Icon-Block
  //    ist nach Trim etwa 64% der Höhe.
  // 3. Trimme nochmal, damit das Endergebnis tight an der Icon-Form klebt.
  const trimmed = await sharp(`${root}/${src}`).trim({ threshold: 10 }).toBuffer()
  const meta = await sharp(trimmed).metadata()
  const iconH = Math.round(meta.height * 0.64)
  const iconW = meta.width
  await sharp(trimmed)
    .extract({ left: 0, top: 0, width: iconW, height: iconH })
    .trim({ threshold: 10 })
    .png({ compressionLevel: 9 })
    .toFile(`${root}/${out}`)
  const final = await sharp(`${root}/${out}`).metadata()
  console.log(`✓ ${out} (${final.width}×${final.height})`)
}

await crop('logo-2400.png', 'icon-512.png')
await crop('logo-2400-dark.png', 'icon-512-dark.png')
