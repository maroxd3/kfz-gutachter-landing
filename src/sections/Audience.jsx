import { audiences } from '../lib/content.js'

export default function Audience() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Für wen wir arbeiten</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">
            Ein Ansprechpartner für alle Fälle.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="border-l-2 border-gold pl-5">
              <h3 className="font-serif text-2xl font-semibold text-ink">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
