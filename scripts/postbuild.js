// GitHub Pages doesn't know about React Router routes — so /unfall returns
// HTTP 404 by default. Two fixes here:
//   1. For each known SPA route, write dist/<route>/index.html (copy of root
//      index.html). GitHub Pages then serves it with HTTP 200 and the
//      BrowserRouter picks up the path from there.
//   2. Also write dist/404.html so any OTHER unknown URL still loads the SPA
//      shell (returns 404 status but at least the user sees the site instead
//      of GitHub's default 404 page).
//
// When you add a new <Route path="/foo">, add 'foo' to ROUTES below.
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = resolve(__dirname, '..', 'dist')
const src = resolve(dist, 'index.html')

if (!existsSync(src)) {
  console.error('postbuild: dist/index.html not found — run vite build first')
  process.exit(1)
}

const ROUTES = ['unfall']

for (const route of ROUTES) {
  const target = resolve(dist, route, 'index.html')
  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(src, target)
  console.log(`postbuild: wrote dist/${route}/index.html`)
}

copyFileSync(src, resolve(dist, '404.html'))
console.log('postbuild: wrote dist/404.html (SPA fallback)')
