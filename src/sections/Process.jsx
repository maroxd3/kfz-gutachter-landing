import { processSteps } from '../lib/content.js'

export default function Process() {
  return (
    <section id="ablauf" className="bg-ink py-24 text-cream md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">Ablauf</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            In drei Schritten zum Gutachten.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {processSteps.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="font-serif text-6xl font-semibold text-gold/70">{s.step}</div>
              <h3 className="mt-4 font-serif text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{s.description}</p>
              {i < processSteps.length - 1 && (
                <div className="absolute top-9 left-20 hidden h-px w-full bg-gradient-to-r from-gold/40 to-transparent md:block" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
