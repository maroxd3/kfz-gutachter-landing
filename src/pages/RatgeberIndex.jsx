import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ChevronRight, Clock, Tag, BookOpen } from 'lucide-react'
import { brand } from '../lib/content.js'
import { asset } from '../lib/utils.js'
import { ratgeber } from '../data/ratgeber.js'

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const META_TITLE = 'Ratgeber für Kfz-Schäden in Hannover · Kfz-Experten Hannover'
const META_DESCRIPTION =
  'Praktische Ratgeber-Artikel zu Verkehrsunfall, Wertminderung, Nutzungsausfall und Versicherungsstreit. Vom Sachverständigen-Team Kfz-Experten Hannover.'

export default function RatgeberIndex() {
  useEffect(() => {
    document.title = META_TITLE
    setMeta('description', META_DESCRIPTION)
    setMeta('og:title', META_TITLE, 'property')
    setMeta('og:description', META_DESCRIPTION, 'property')
    setMeta('og:url', 'https://hannover-kfz-gutachter.de/ratgeber/', 'property')
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', 'https://hannover-kfz-gutachter.de/ratgeber/')
  }, [])

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-3">
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

      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
          <Link to="/" className="hover:text-gold-dark">Start</Link>
          <ChevronRight size={12} />
          <span className="text-ink">Ratgeber</span>
        </nav>

        <section className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold-dark">
            <BookOpen size={14} /> Ratgeber
          </div>
          <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-5xl">
            Was Sie wissen sollten — vor und nach dem Schaden
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-muted">
            Praktische Anleitungen aus der täglichen Arbeit unseres Sachverständigenbüros — was Sie nach einem Unfall tun, wie Versicherungs-Tricks aussehen, und worauf Sie achten sollten.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {ratgeber.map((r) => (
            <Link
              key={r.slug}
              to={`/ratgeber/${r.slug}/`}
              className="group block rounded-2xl border border-line bg-card p-6 transition hover:border-gold/60 hover:shadow-md"
            >
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 text-gold-dark"><Tag size={12} /> {r.category}</span>
                <span className="inline-flex items-center gap-1.5 text-ink-muted"><Clock size={12} /> {r.readTime}</span>
              </div>
              <h2 className="mt-3 font-serif text-xl leading-snug text-ink">{r.title}</h2>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{r.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark transition group-hover:text-ink">
                Artikel lesen <ChevronRight size={14} />
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-14 rounded-2xl bg-ink p-6 sm:p-8 text-cream">
          <h3 className="font-serif text-xl sm:text-2xl">Sie haben einen konkreten Fall?</h3>
          <p className="mt-2 text-sm sm:text-base text-cream/80">
            Wir kommen in 45 Minuten zu Ihnen — Raum Hannover bis 50 km ohne Anfahrtskosten. Erstes Telefonat oder WhatsApp ist immer kostenfrei.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={brand.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink hover:brightness-110">
              <Phone size={16} /> {brand.phone}
            </a>
            <a href={brand.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:brightness-110">
              WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8 text-center text-xs text-ink-muted">
        <p>
          {brand.legalOwner} · {brand.address.street}, {brand.address.zip} {brand.address.city}
        </p>
        <p className="mt-2">
          <Link to="/" className="hover:text-ink">Startseite</Link>{' · '}
          <a href="/impressum.html" className="hover:text-ink">Impressum</a>{' · '}
          <a href="/datenschutz.html" className="hover:text-ink">Datenschutz</a>{' · '}
          <a href="/agb.html" className="hover:text-ink">AGB</a>
        </p>
      </footer>
    </div>
  )
}
