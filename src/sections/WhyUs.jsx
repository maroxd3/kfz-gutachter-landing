import { useRef } from 'react'
import { reasons } from '../lib/content.js'

export default function WhyUs() {
  const sectionRef = useRef(null)

  function onMouseMove(e) {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden bg-ink py-24 text-cream md:py-32"
      style={{ '--mx': '50%', '--my': '50%' }}
    >
      {/* Mouse-Spotlight (goldener Glow folgt dem Cursor) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx) var(--my), rgba(184,145,94,0.18), transparent 45%)',
        }}
      />
      {/* Basis-Gradient unten für Tiefe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent"
      />
      {/* Grid-Punkte */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">Warum wir</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            Fünf Gründe, warum unsere Mandanten <span className="italic text-gold">bleiben</span>.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">
            Bewegen Sie die Maus — und sehen Sie, was uns ausmacht.
          </p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="group relative flex gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition hover:border-gold/30"
            >
              <span className="font-serif text-3xl font-semibold text-gold/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
