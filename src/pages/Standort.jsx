import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Phone, MessageCircle, ChevronRight, MapPin } from 'lucide-react'
import { brand } from '../lib/content.js'
import { asset } from '../lib/utils.js'
import {
  standorte,
  getStandortBySlug,
  standortServiceSchema,
  standortFaqSchema,
} from '../data/standorte.js'
import { leistungen } from '../data/leistungen.js'

// Dynamische Standort-Page. URL: /standorte/:slug
// Daten kommen aus src/data/standorte.js. Postbuild schreibt zusätzlich
// statisches dist/standorte/<slug>/index.html mit per-Route Meta-Tags.

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function Standort() {
  const { slug } = useParams()
  const data = getStandortBySlug(slug)

  useEffect(() => {
    if (!data) return
    const origin = 'https://hannover-kfz-gutachter.de'
    const url = `${origin}/standorte/${data.slug}/`
    document.title = data.metaTitle
    setMeta('description', data.metaDescription)
    setMeta('og:title', data.metaTitle, 'property')
    setMeta('og:description', data.metaDescription, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:type', 'website', 'property')
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
          <h1 className="font-serif text-3xl mb-4">Standort nicht gefunden</h1>
          <Link to="/" className="text-gold-dark underline">Zur Startseite</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-3">
          <Link to="/" className="flex items-center gap-3" aria-label={brand.name}>
            <img src={asset('logo/logo-512.png')} alt={brand.name} className="h-10 w-auto sm:h-11" />
            <div className="leading-tight hidden sm:block">
              <div className="text-sm font-semibold">{brand.name}</div>
              <div className="text-xs text-ink-muted">{brand.tagline}</div>
            </div>
          </Link>
          <a
            href={brand.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition hover:bg-ink-soft"
          >
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
          <span>Standorte</span>
          <ChevronRight size={12} />
          <span className="text-ink">{data.city}</span>
        </nav>

        <section className="mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold-dark">
            <MapPin size={14} /> Einsatzgebiet
          </div>
          <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-5xl">
            {data.titleH1}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-muted">{data.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={brand.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream shadow-md transition hover:bg-ink-soft"
            >
              <Phone size={16} />
              {brand.phone}
            </a>
            <a
              href={brand.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:brightness-110"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </section>

        <section className="mb-10 max-w-3xl">
          <p className="text-base sm:text-lg leading-relaxed">{data.intro}</p>
        </section>

        {data.sections.map((s, i) => (
          <section key={i} className="mb-10 max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl mb-3">{s.h2}</h2>
            {s.body && (
              <p className="text-base leading-relaxed text-ink-soft">{s.body}</p>
            )}
            {s.list && (
              <ul className="mt-3 space-y-2.5">
                {s.list.map((item, j) => (
                  <li key={j} className="flex gap-3 text-base leading-relaxed">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <span>
                      <strong className="font-semibold">{item.strong}</strong>{' '}
                      <span className="text-ink-soft">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* Unsere Leistungen — Link-Block zu allen 4 Service-Pages */}
        <section className="mb-12 max-w-3xl">
          <h2 className="font-serif text-2xl sm:text-3xl mb-4">
            Unsere Leistungen in {data.city}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {leistungen.map((l) => (
              <Link
                key={l.slug}
                to={`/leistungen/${l.slug}/`}
                className="block rounded-xl border border-line bg-card p-4 transition hover:border-gold/60 hover:shadow-sm"
              >
                <div className="text-xs uppercase tracking-wider text-gold-dark">{l.title}</div>
                <div className="mt-1 font-serif text-base">{l.titleH1}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12 max-w-3xl">
          <h2 className="font-serif text-2xl sm:text-3xl mb-5">Häufige Fragen für {data.city}</h2>
          <div className="space-y-4">
            {data.faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-line bg-card p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-3">
                  <span className="font-medium text-base sm:text-lg">{f.q}</span>
                  <ChevronRight size={18} className="text-ink-muted transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm sm:text-base text-ink-soft leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 max-w-3xl rounded-2xl bg-ink p-6 sm:p-8 text-cream">
          <h3 className="font-serif text-xl sm:text-2xl">
            Aviation-Engineering-Background im Team
          </h3>
          <p className="mt-2 text-sm sm:text-base text-cream/80 leading-relaxed">
            Wartungsstandards aus der zivilen Luftfahrt, übertragen aufs Auto.
            Ein Ingenieur-Team aus dem Raum Hannover — persönlich, direkt, vor Ort.
            Sachverständiger nach DIN ISO/IEC 17024.
          </p>
        </section>

        {/* Andere Standorte */}
        <section className="mb-12">
          <h2 className="font-serif text-xl sm:text-2xl mb-4">Weitere Einsatzgebiete</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {standorte.filter((s) => s.slug !== data.slug).map((s) => (
              <Link
                key={s.slug}
                to={`/standorte/${s.slug}/`}
                className="block rounded-xl border border-line bg-card p-4 transition hover:border-gold/60 hover:shadow-sm"
              >
                <div className="text-xs uppercase tracking-wider text-gold-dark flex items-center gap-1.5">
                  <MapPin size={12} /> {s.city}
                </div>
                <div className="mt-1 font-serif text-base">{s.titleH1}</div>
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
          <a href="/impressum.html" className="hover:text-ink">Impressum</a>{' · '}
          <a href="/datenschutz.html" className="hover:text-ink">Datenschutz</a>{' · '}
          <a href="/agb.html" className="hover:text-ink">AGB</a>
        </p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [standortServiceSchema(data), standortFaqSchema(data)],
          }),
        }}
      />
    </div>
  )
}
