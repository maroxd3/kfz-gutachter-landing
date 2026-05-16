import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves static files only — unknown routes (e.g. /unfall) hit 404
// before React Router can resolve them. Copying index.html → 404.html makes
// GH Pages serve the SPA shell for any unknown path, letting the router take over.
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'))
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), spaFallback()],
})
