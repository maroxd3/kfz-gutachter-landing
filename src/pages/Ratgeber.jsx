import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Phone, MessageCircle, ChevronRight, Clock, Tag } from 'lucide-react'
import { brand } from '../lib/content.js'
import { asset } from '../lib/utils.js'
import { ratgeber, getRatgeberBySlug, ratgeberArticleSchema } from '../data/ratgeber.js'
import { leistungen } from '../data/leistungen.js'

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function RenderBlock({ block }) {
  if (block.type === 'p') {
    return <p className="mt-4 text-base leading-relaxed text-ink-soft">{block.text}</p>
  }
  if (block.type === 'h2') {
    return <h2 className="mt-10 font-serif text-2xl sm:text-3xl text-ink">{block.text}</h2>
  }
  if (block.type === 'list') {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-soft">
            <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }
  return null
}

export default function Ratgeber() {
  const { slug } = useParams()
  const data = getRatgeberBySlug(slug)

  useEffect(() => {
    if (!data) return
    const origin = 'https://hannover-kfz-gutachter.de'
    const url = `${origin}/ratgeber/${data.slug}/`
    document.title = data.metaTitle
    setMeta('description', data.metaDescription)
    setMeta('og:title', data.metaTitle, 'property')
    setMeta('og:description', data.metaDescription, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:type', 'article', 'property')
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', url)
  }, [data])

  if (!data) {
    return (
      <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-3xl mb-4">Artikel nicht gefunden</h1>
          <Link to="/ratgeber/" className="text-gold-dark underline">Zur Ratgeber-Übersicht</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3">
          <Link to="/" className="flex items-center gap-3" aria-label={brand.name}>
            <img src={asset('logo/logo-512.png')} alt={brand.name} className="h-10 w-auto sm:h-11" />
            <div className="leading-tight hidden sm:block">
              <div className="text-sm font-semibold">{brand.name}</div>
              <div className="text-xs text-ink-muted">Ratgeber</div>
            </div>
          </Link>
          <a href={brand.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition hover:bg-ink-soft">
            <Phone size={15} />
            <span className="hidden sm:inline">{brand.phone}</span>
            <span className="sm:hidden">Anrufen</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-gold-dark">Start</Link>
          <ChevronRight size={12} />
          <Link to="/ratgeber/" className="hover:text-gold-dark">Ratgeber</Link>
          <ChevronRight size={12} />
          <span className="text-ink line-clamp-1">{data.title}</span>
        </nav>

        <article>
          <div className="mb-6 flex items-center gap-4 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><Tag size={12} className="text-gold-dark" />{data.category}</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={12} />{data.readTime} Lesezeit</span>
          </div>
          <h1 className="font-serif text-3xl leading-tight sm:text-5xl">{data.title}</h1>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">{data.excerpt}</p>

          <div className="mt-10">
            {data.blocks.map((b, i) => <RenderBlock key={i} block={b} />)}
          </div>
        </article>

        {/* Verwandte Leistungen — kontextueller Internal-Link Block */}
        {data.relatedLeistungen && data.relatedLeistungen.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif text-xl sm:text-2xl mb-4">Passende Leistungen zu diesem Thema</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.relatedLeistungen
                .map((slug) => leistungen.find((l) => l.slug === slug))
                .filter(Boolean)
                .map((l) => (
                  <Link
                    key={l.slug}
                    to={`/leistungen/${l.slug}/`}
                    className="block rounded-xl border border-line bg-card p-4 transition hover:border-gold/60 hover:shadow-sm"
                  >
                    <div className="text-xs uppercase tracking-wider text-gold-dark">{l.title}</div>
                    <div className="mt-1 font-serif text-base text-ink">{l.titleH1}</div>
                    <div className="mt-1 text-sm text-ink-muted leading-snug">{l.tagline}</div>
                  </Link>
                ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-14 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h3 className="font-serif text-xl sm:text-2xl">Brauchen Sie ein Gutachten?</h3>
          <p className="mt-2 text-sm text-ink-muted">Wir kommen in 45 Minuten zu Ihnen — Raum Hannover bis 50 km ohne Anfahrtskosten.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={brand.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream hover:bg-ink-soft">
              <Phone size={16} /> {brand.phone}
            </a>
            <a href={brand.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:brightness-110">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </section>

        {/* Weitere Artikel */}
        <section className="mt-14">
          <h2 className="font-serif text-xl sm:text-2xl mb-4">Weitere Ratgeber-Artikel</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {ratgeber.filter((r) => r.slug !== data.slug).map((r) => (
              <Link key={r.slug} to={`/ratgeber/${r.slug}/`} className="block rounded-xl border border-line bg-card p-4 transition hover:border-gold/60 hover:shadow-sm">
                <div className="text-xs uppercase tracking-wider text-gold-dark">{r.category}</div>
                <div className="mt-1 font-serif text-base leading-snug">{r.title}</div>
                <div className="mt-2 text-xs text-ink-muted">{r.readTime} Lesezeit</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8 text-center text-xs text-ink-muted">
        <p>
          {brand.legalOwner} · {brand.address.street}, {brand.address.zip} {brand.address.city} ·{' '}
          <a href={brand.emailHref} className="underline-offset-4 hover:underline">{brand.email}</a>
        </p>
        <p className="mt-2">
          <Link to="/" className="hover:text-ink">Startseite</Link>{' · '}
          <Link to="/ratgeber/" className="hover:text-ink">Ratgeber</Link>{' · '}
          <a href="/impressum.html" className="hover:text-ink">Impressum</a>{' · '}
          <a href="/datenschutz.html" className="hover:text-ink">Datenschutz</a>{' · '}
          <a href="/agb.html" className="hover:text-ink">AGB</a>
        </p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratgeberArticleSchema(data)) }}
      />
    </div>
  )
}
