// GitHub Pages doesn't know about React Router routes — so /unfall and
// /leistungen/* would return HTTP 404 by default. This script fixes that
// and also injects per-route SEO meta tags + JSON-LD into each generated
// dist/<route>/index.html.
//
// Why this matters: client-side meta updates (via React useEffect) work for
// users in browsers, but Google/ChatGPT/Perplexity crawlers often don't run
// JS — they only see what's in the raw HTML. So we MUST bake meta + schema
// into the static HTML files at build time. That's what this script does.
//
// To add a new route:
//   1. Add it to src/main.jsx as a <Route>
//   2. Add the page data here (or for leistungen: in src/data/leistungen.js)
//   3. Rebuild — script auto-emits dist/<route>/index.html with correct meta

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = resolve(__dirname, '..', 'dist')
const src = resolve(dist, 'index.html')

if (!existsSync(src)) {
  console.error('postbuild: dist/index.html not found — run vite build first')
  process.exit(1)
}

// Pull the leistungen + standorte + stadtteile + ratgeber data — same source
// the React components use. One source of truth.
const { leistungen, leistungServiceSchema, leistungFaqSchema } =
  await import('../src/data/leistungen.js')
const { standorte, standortServiceSchema, standortFaqSchema } =
  await import('../src/data/standorte.js')
const { stadtteile, stadtteilServiceSchema, stadtteilFaqSchema } =
  await import('../src/data/stadtteile.js')
const { ratgeber, ratgeberArticleSchema } =
  await import('../src/data/ratgeber.js')

const ORIGIN = 'https://hannover-kfz-gutachter.de'
const TEMPLATE = readFileSync(src, 'utf8')

// Build the route plan
const routes = [
  {
    path: 'unfall',
    title: 'Unfall in Hannover? Soforthilfe in 45 Minuten · Kfz-Experten Hannover',
    description:
      'Notfall-Soforthilfe nach Unfall in Hannover und Umkreis. 24/7 erreichbar, in 45 Minuten vor Ort. Anruf oder WhatsApp — Beweissicherung, Schadenaufnahme, Gutachten in 48 h. Bei Haftpflicht 0 € für Sie.',
    canonical: `${ORIGIN}/unfall/`,
    ogImage: `${ORIGIN}/logo/wallet-hero.png`,
    extraSchema: null,
  },
  ...leistungen.map((l) => ({
    path: `leistungen/${l.slug}`,
    title: l.metaTitle,
    description: l.metaDescription,
    canonical: `${ORIGIN}/leistungen/${l.slug}/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    extraSchema: {
      '@context': 'https://schema.org',
      '@graph': [leistungServiceSchema(l, ORIGIN), leistungFaqSchema(l, ORIGIN)],
    },
  })),
  ...standorte.map((s) => ({
    path: `standorte/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
    canonical: `${ORIGIN}/standorte/${s.slug}/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    extraSchema: {
      '@context': 'https://schema.org',
      '@graph': [standortServiceSchema(s, ORIGIN), standortFaqSchema(s, ORIGIN)],
    },
  })),
  ...stadtteile.map((s) => ({
    path: `standorte/hannover/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
    canonical: `${ORIGIN}/standorte/hannover/${s.slug}/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    extraSchema: {
      '@context': 'https://schema.org',
      '@graph': [stadtteilServiceSchema(s, ORIGIN), stadtteilFaqSchema(s, ORIGIN)],
    },
  })),
  {
    path: 'ratgeber',
    title: 'Ratgeber für Kfz-Schäden in Hannover · Kfz-Experten Hannover',
    description: 'Praktische Ratgeber-Artikel zu Verkehrsunfall, Wertminderung, Nutzungsausfall und Versicherungsstreit. Vom Sachverständigen-Team Kfz-Experten Hannover.',
    canonical: `${ORIGIN}/ratgeber/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    extraSchema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${ORIGIN}/ratgeber/#collection`,
      name: 'Ratgeber Kfz-Experten Hannover',
      url: `${ORIGIN}/ratgeber/`,
      hasPart: ratgeber.map((r) => ({
        '@type': 'Article',
        headline: r.title,
        url: `${ORIGIN}/ratgeber/${r.slug}/`,
      })),
    },
  },
  ...ratgeber.map((r) => ({
    path: `ratgeber/${r.slug}`,
    title: r.metaTitle,
    description: r.metaDescription,
    canonical: `${ORIGIN}/ratgeber/${r.slug}/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    extraSchema: ratgeberArticleSchema(r, ORIGIN),
  })),
]

function applyMeta(html, route) {
  let out = html

  // <title>
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)

  // <meta name="description">
  out = replaceMeta(out, 'name', 'description', route.description)

  // OG tags
  out = replaceMeta(out, 'property', 'og:title', route.title)
  out = replaceMeta(out, 'property', 'og:description', route.description)
  out = replaceMeta(out, 'property', 'og:url', route.canonical)
  out = replaceMeta(out, 'property', 'og:image', route.ogImage)

  // Twitter
  out = replaceMeta(out, 'name', 'twitter:title', route.title)
  out = replaceMeta(out, 'name', 'twitter:description', route.description)
  out = replaceMeta(out, 'name', 'twitter:image', route.ogImage)

  // Canonical
  out = out.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${escapeAttr(route.canonical)}" />`
  )

  // Extra JSON-LD schema, injected before </head>. The existing inline schema
  // (LocalBusiness + FAQPage) stays for the homepage; we add an EXTRA <script>
  // with the route-specific Service + FAQ schema. Google merges multiple
  // JSON-LD blocks fine.
  if (route.extraSchema) {
    const json = JSON.stringify(route.extraSchema)
    out = out.replace(
      /<\/head>/i,
      `<script type="application/ld+json">${json}</script>\n  </head>`
    )
  }

  return out
}

function replaceMeta(html, attr, name, content) {
  const re = new RegExp(`<meta\\s+${attr}="${escapeRegex(name)}"[^>]*>`, 'i')
  const tag = `<meta ${attr}="${name}" content="${escapeAttr(content)}" />`
  if (re.test(html)) return html.replace(re, tag)
  // If the tag doesn't exist, inject before </head>
  return html.replace(/<\/head>/i, `${tag}\n  </head>`)
}

function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
}
function escapeAttr(s) {
  return String(s).replace(/[&"<>]/g, (c) => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' }[c]))
}
function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Write each route
for (const route of routes) {
  const html = applyMeta(TEMPLATE, route)
  const target = resolve(dist, route.path, 'index.html')
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, html, 'utf8')
  console.log(`postbuild: ${route.path}/index.html (title: "${route.title.slice(0, 60)}…")`)
}

// SPA fallback for any other unknown URL: serves the React shell with the
// homepage meta (not ideal but at least the app loads instead of GH 404 page)
writeFileSync(resolve(dist, '404.html'), TEMPLATE, 'utf8')
console.log('postbuild: 404.html (SPA fallback)')
