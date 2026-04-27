import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

const targets = [
  { in: 'hero.png',  out: 'hero.webp',  width: 2400, quality: 78 },
  { in: 'bfore.png', out: 'bfore.webp', width: 1800, quality: 80 },
  { in: 'after.png', out: 'after.webp', width: 1800, quality: 80 },
  { in: 'k01.png',   out: 'k01.webp',   width: 1800, quality: 80 },
  { in: 'k02.png',   out: 'k02.webp',   width: 1800, quality: 80 },
  { in: 'k03.png',   out: 'k03.webp',   width: 1800, quality: 80 },
  { in: 'k04.png',   out: 'k04.webp',   width: 1800, quality: 80 },
  { in: 'k05.png',   out: 'k05.webp',   width: 1800, quality: 80 },
]

const fmt = (b) => (b / 1024 / 1024).toFixed(2) + ' MB'

for (const t of targets) {
  const src = join(PUBLIC_DIR, t.in)
  const dst = join(PUBLIC_DIR, t.out)
  const srcSize = (await stat(src)).size
  await sharp(src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6 })
    .toFile(dst)
  const dstSize = (await stat(dst)).size
  const reduction = ((1 - dstSize / srcSize) * 100).toFixed(1)
  console.log(`${t.in.padEnd(12)} ${fmt(srcSize).padStart(10)}  →  ${t.out.padEnd(12)} ${fmt(dstSize).padStart(10)}  (-${reduction}%)`)
}
