import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ChevronRight, MapPin } from 'lucide-react'
import { brand } from '../lib/content.js'
import { asset } from '../lib/utils.js'
import { standorte } from '../data/standorte.js'
import { stadtteile } from '../data/stadtteile.js'

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const META_TITLE = 'Einsatzgebiet — Kfz-Gutachter im gesamten Hannover-Raum · Kfz-Experten Hannover'
const META_DESCRIPTION =
  'Übersicht aller Städte und Hannover-Stadtteile, in denen wir als Kfz-Gutachter vor Ort sind: Hannover, Langenhagen, Garbsen, Wunstorf, Laatzen, Lehrte, Burgwedel, Wedemark, Sehnde — plus 5 Hannover-Stadtteile.'

export default function StandorteIndex() {
  useEffect(() => {
    document.title = META_TITLE
    setMeta('description', META_DESCRIPTION)
    setMeta('og:title', META_TITLE, 'property')
    setMeta('og:description', META_DESCRIPTION, 'property')
    setMeta('og:url', 'https://hannover-kfz-gutachter.de/standorte/', 'property')
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', 'https://hannover-kfz-gutachter.de/standorte/')
  }, [])

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-3">
          <Link to="/" className="flex items-center gap-3" aria-label={brand.name}>
            <img src={asset('logo/logo-512.png')} alt={brand.name} className="h-10 w-auto sm:h-11" />
            <div className="leading-tight hidden sm:block">
              <div className="text-sm font-semibold">{brand.name}</div>
              <div className="text-xs text-ink-muted">Einsatzgebiet</div>
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
          <span className="text-ink">Einsatzgebiet</span>
        </nav>

        <section className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold-dark">
            <MapPin size={14} /> Einsatzgebiet
          </div>
          <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-5xl">
            Kfz-Gutachter im gesamten Hannover-Raum
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-muted">
            Stammsitz Langenhagen — Einsatz im gesamten Hannover-Raum bis 50 km ohne Anfahrtskosten. Wir kommen zu Ihnen in jede der folgenden Städte und Stadtteile, in der Regel innerhalb 45 Minuten.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-4">Städte und Gemeinden</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {standorte.map((s) => (
              <Link
                key={s.slug}
                to={`/standorte/${s.slug}/`}
                className="group block rounded-xl border border-line bg-card p-4 transition hover:border-gold/60 hover:shadow-sm"
              >
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold-dark">
                  <MapPin size={12} /> {s.city}
                </div>
                <div className="mt-1 font-serif text-base text-ink">{s.titleH1}</div>
                <div className="mt-1 text-sm text-ink-muted leading-snug">{s.tagline}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl mb-2">Hannover — nach Stadtteil</h2>
          <p className="text-sm text-ink-muted mb-4">Eigene Page für jeden der größten Hannover-Stadtteile mit lokalen Schadenfällen und Anfahrtszeiten.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {stadtteile.map((s) => (
              <Link
                key={s.slug}
                to={`/standorte/hannover/${s.slug}/`}
                className="group block rounded-xl border border-line bg-card p-4 transition hover:border-gold/60 hover:shadow-sm"
              >
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold-dark">
                  <MapPin size={12} /> Hannover · {s.bezirk}
                </div>
                <div className="mt-1 font-serif text-base text-ink">{s.titleH1}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl bg-ink p-6 sm:p-8 text-cream">
          <h3 className="font-serif text-xl sm:text-2xl">Ihre Stadt nicht dabei?</h3>
          <p className="mt-2 text-sm sm:text-base text-cream/80">
            Rufen Sie uns an — wir bedienen den gesamten Hannover-Raum bis 50 km. Falls Ihre Stadt etwas weiter weg liegt, klären wir Anfahrt + Kosten direkt am Telefon.
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
        <p>{brand.legalOwner} · {brand.address.street}, {brand.address.zip} {brand.address.city}</p>
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
