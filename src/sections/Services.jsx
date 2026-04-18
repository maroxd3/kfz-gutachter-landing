import { useRef } from 'react'
import { Check } from 'lucide-react'
import { services } from '../lib/content.js'

function SpotlightCard({ service }) {
  const ref = useRef(null)

  function onMouseMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-line bg-white p-8 transition hover:border-gold/60 hover:shadow-lg"
      style={{ '--mx': '-200px', '--my': '-200px' }}
    >
      {/* Cursor-Spotlight (sichtbar beim Hover) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--mx) var(--my), rgba(184,145,94,0.14), transparent 55%)',
        }}
      />
      {/* Dünner Gold-Border-Glow, der dem Cursor folgt */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(220px circle at var(--mx) var(--my), rgba(184,145,94,0.35), transparent 60%)',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      <div className="relative">
        <h3 className="font-serif text-2xl font-semibold text-ink">{service.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">{service.description}</p>
        <ul className="mt-6 grid grid-cols-2 gap-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-ink-soft">
              <Check size={16} className="mt-0.5 flex-shrink-0 text-gold" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <section id="leistungen" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Leistungen</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">
            Gutachten für jeden Fall.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Vom Bagatellschaden bis zum Oldtimer — wir liefern das Gutachten, das vor Gericht,
            bei der Versicherung und im Verkauf Bestand hat.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <SpotlightCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
