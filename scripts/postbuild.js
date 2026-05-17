// Post-build pipeline. Macht drei Sachen:
//
//   1. Für jede SPA-Route schreibt einen dist/<route>/index.html mit
//      Route-spezifischen <title>, meta description, OG-Tags, canonical
//      und passendem JSON-LD Schema (Service, FAQPage, Article, Breadcrumb).
//      Ohne diesen Schritt würden /unfall, /leistungen/* etc. HTTP 404
//      zurückgeben oder die Crawler nur die Homepage-Meta sehen.
//
//   2. Generiert dist/sitemap.xml automatisch aus den Daten-Files. Eine
//      Source of Truth — wenn man eine neue Leistung/Standort/Ratgeber
//      hinzufügt, kommt der Eintrag automatisch in den Sitemap.
//
//   3. Schreibt dist/404.html als SPA-Fallback (jede unbekannte URL lädt
//      die React-App, statt der GH-Pages-404-Seite).

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
const TODAY = new Date().toISOString().slice(0, 10)

// --------- Breadcrumb helper ---------

function breadcrumbSchema(items) {
  // items: [{ name, url? }]  — last item typically without url
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => {
      const li = { '@type': 'ListItem', position: i + 1, name: item.name }
      if (item.url) li.item = item.url
      return li
    }),
  }
}

function combineSchema(...graphs) {
  // Flatten: if a passed schema has '@graph', expand it. Otherwise wrap into a graph.
  const all = []
  for (const g of graphs) {
    if (!g) continue
    if (g['@graph']) all.push(...g['@graph'])
    else all.push(g)
  }
  return { '@context': 'https://schema.org', '@graph': all }
}

// --------- Route plan ---------

const routes = []

// /unfall
routes.push({
  path: 'unfall',
  title: 'Unfall in Hannover? Soforthilfe in 45 Minuten · Kfz-Experten Hannover',
  description:
    'Notfall-Soforthilfe nach Unfall in Hannover und Umkreis. 24/7 erreichbar, in 45 Minuten vor Ort. Anruf oder WhatsApp — Beweissicherung, Schadenaufnahme, Gutachten in 48 h. Bei Haftpflicht 0 € für Sie.',
  canonical: `${ORIGIN}/unfall/`,
  ogImage: `${ORIGIN}/logo/wallet-hero.png`,
  changefreq: 'weekly',
  priority: 0.9,
  extraSchema: combineSchema(
    breadcrumbSchema([
      { name: 'Start', url: `${ORIGIN}/` },
      { name: 'Unfall-Soforthilfe' },
    ])
  ),
})

// /leistungen/ index
routes.push({
  path: 'leistungen',
  title: 'Kfz-Gutachten in Hannover — alle Leistungen · Kfz-Experten Hannover',
  description:
    'Übersicht aller Gutachten-Leistungen unseres Sachverständigenbüros in Hannover: Unfallgutachten, Wertgutachten, Oldtimer-Gutachten, Kurzgutachten. Jeweils mit FAQ, Ablauf und Preisinfo.',
  canonical: `${ORIGIN}/leistungen/`,
  ogImage: `${ORIGIN}/logo/logo-1200.png`,
  changefreq: 'monthly',
  priority: 0.9,
  extraSchema: combineSchema(
    breadcrumbSchema([
      { name: 'Start', url: `${ORIGIN}/` },
      { name: 'Leistungen' },
    ]),
    {
      '@type': 'CollectionPage',
      '@id': `${ORIGIN}/leistungen/#collection`,
      name: 'Kfz-Gutachten-Leistungen Hannover',
      url: `${ORIGIN}/leistungen/`,
      hasPart: leistungen.map((l) => ({
        '@type': 'Service',
        name: l.titleH1,
        url: `${ORIGIN}/leistungen/${l.slug}/`,
      })),
    }
  ),
})

// /leistungen/<slug>
for (const l of leistungen) {
  routes.push({
    path: `leistungen/${l.slug}`,
    title: l.metaTitle,
    description: l.metaDescription,
    canonical: `${ORIGIN}/leistungen/${l.slug}/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    changefreq: 'monthly',
    priority: 0.9,
    extraSchema: combineSchema(
      breadcrumbSchema([
        { name: 'Start', url: `${ORIGIN}/` },
        { name: 'Leistungen', url: `${ORIGIN}/leistungen/` },
        { name: l.title },
      ]),
      leistungServiceSchema(l, ORIGIN),
      leistungFaqSchema(l, ORIGIN)
    ),
  })
}

// /standorte/ index
routes.push({
  path: 'standorte',
  title: 'Einsatzgebiet — Kfz-Gutachter im gesamten Hannover-Raum · Kfz-Experten Hannover',
  description:
    'Übersicht aller Städte und Hannover-Stadtteile, in denen wir als Kfz-Gutachter vor Ort sind: Hannover, Langenhagen, Garbsen, Wunstorf, Laatzen, Lehrte, Burgwedel, Wedemark, Sehnde — plus 5 Hannover-Stadtteile.',
  canonical: `${ORIGIN}/standorte/`,
  ogImage: `${ORIGIN}/logo/logo-1200.png`,
  changefreq: 'monthly',
  priority: 0.8,
  extraSchema: combineSchema(
    breadcrumbSchema([
      { name: 'Start', url: `${ORIGIN}/` },
      { name: 'Einsatzgebiet' },
    ]),
    {
      '@type': 'CollectionPage',
      '@id': `${ORIGIN}/standorte/#collection`,
      name: 'Einsatzgebiet Kfz-Experten Hannover',
      url: `${ORIGIN}/standorte/`,
      hasPart: standorte.map((s) => ({
        '@type': 'Place',
        name: s.city,
        url: `${ORIGIN}/standorte/${s.slug}/`,
      })),
    }
  ),
})

// /standorte/<slug>
for (const s of standorte) {
  routes.push({
    path: `standorte/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
    canonical: `${ORIGIN}/standorte/${s.slug}/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    changefreq: 'monthly',
    priority: s.slug === 'hannover' ? 0.9 : s.slug === 'langenhagen' ? 0.8 : 0.6,
    extraSchema: combineSchema(
      breadcrumbSchema([
        { name: 'Start', url: `${ORIGIN}/` },
        { name: 'Einsatzgebiet', url: `${ORIGIN}/standorte/` },
        { name: s.city },
      ]),
      standortServiceSchema(s, ORIGIN),
      standortFaqSchema(s, ORIGIN)
    ),
  })
}

// /standorte/hannover/<stadtteil>
for (const s of stadtteile) {
  routes.push({
    path: `standorte/hannover/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
    canonical: `${ORIGIN}/standorte/hannover/${s.slug}/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    changefreq: 'monthly',
    priority: 0.5,
    extraSchema: combineSchema(
      breadcrumbSchema([
        { name: 'Start', url: `${ORIGIN}/` },
        { name: 'Einsatzgebiet', url: `${ORIGIN}/standorte/` },
        { name: 'Hannover', url: `${ORIGIN}/standorte/hannover/` },
        { name: s.name },
      ]),
      stadtteilServiceSchema(s, ORIGIN),
      stadtteilFaqSchema(s, ORIGIN)
    ),
  })
}

// /ratgeber/ index
routes.push({
  path: 'ratgeber',
  title: 'Ratgeber für Kfz-Schäden in Hannover · Kfz-Experten Hannover',
  description:
    'Praktische Ratgeber-Artikel zu Verkehrsunfall, Wertminderung, Nutzungsausfall und Versicherungsstreit. Vom Sachverständigen-Team Kfz-Experten Hannover.',
  canonical: `${ORIGIN}/ratgeber/`,
  ogImage: `${ORIGIN}/logo/logo-1200.png`,
  changefreq: 'weekly',
  priority: 0.8,
  extraSchema: combineSchema(
    breadcrumbSchema([
      { name: 'Start', url: `${ORIGIN}/` },
      { name: 'Ratgeber' },
    ]),
    {
      '@type': 'CollectionPage',
      '@id': `${ORIGIN}/ratgeber/#collection`,
      name: 'Ratgeber Kfz-Experten Hannover',
      url: `${ORIGIN}/ratgeber/`,
      hasPart: ratgeber.map((r) => ({
        '@type': 'Article',
        headline: r.title,
        url: `${ORIGIN}/ratgeber/${r.slug}/`,
      })),
    }
  ),
})

// /ratgeber/<slug>
for (const r of ratgeber) {
  routes.push({
    path: `ratgeber/${r.slug}`,
    title: r.metaTitle,
    description: r.metaDescription,
    canonical: `${ORIGIN}/ratgeber/${r.slug}/`,
    ogImage: `${ORIGIN}/logo/logo-1200.png`,
    changefreq: 'monthly',
    priority: 0.7,
    extraSchema: combineSchema(
      breadcrumbSchema([
        { name: 'Start', url: `${ORIGIN}/` },
        { name: 'Ratgeber', url: `${ORIGIN}/ratgeber/` },
        { name: r.title },
      ]),
      ratgeberArticleSchema(r, ORIGIN)
    ),
  })
}

// --------- Inject per-route meta + schema into the SPA shell ---------

function applyMeta(html, route) {
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`)
  out = replaceMeta(out, 'name', 'description', route.description)
  out = replaceMeta(out, 'property', 'og:title', route.title)
  out = replaceMeta(out, 'property', 'og:description', route.description)
  out = replaceMeta(out, 'property', 'og:url', route.canonical)
  out = replaceMeta(out, 'property', 'og:image', route.ogImage)
  out = replaceMeta(out, 'name', 'twitter:title', route.title)
  out = replaceMeta(out, 'name', 'twitter:description', route.description)
  out = replaceMeta(out, 'name', 'twitter:image', route.ogImage)
  out = out.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${escapeAttr(route.canonical)}" />`
  )
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

// --------- Write per-route HTML ---------

for (const route of routes) {
  const html = applyMeta(TEMPLATE, route)
  const target = resolve(dist, route.path, 'index.html')
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, html, 'utf8')
  console.log(`postbuild: ${route.path}/index.html`)
}

// --------- SPA fallback ---------

writeFileSync(resolve(dist, '404.html'), TEMPLATE, 'utf8')
console.log('postbuild: 404.html (SPA fallback)')

// --------- Auto-generated sitemap.xml ---------

// Static legal pages — kept manually since they're not in data files
const STATIC_URLS = [
  { loc: `${ORIGIN}/`, lastmod: TODAY, changefreq: 'weekly', priority: 1.0 },
  { loc: `${ORIGIN}/impressum.html`, lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
  { loc: `${ORIGIN}/datenschutz.html`, lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
  { loc: `${ORIGIN}/agb.html`, lastmod: TODAY, changefreq: 'yearly', priority: 0.3 },
]

const sitemapUrls = [
  ...STATIC_URLS,
  ...routes.map((r) => ({
    loc: r.canonical,
    lastmod: TODAY,
    changefreq: r.changefreq,
    priority: r.priority,
  })),
]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(resolve(dist, 'sitemap.xml'), sitemapXml, 'utf8')
console.log(`postbuild: sitemap.xml (${sitemapUrls.length} URLs)`)
