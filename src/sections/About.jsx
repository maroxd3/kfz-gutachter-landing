import { User } from 'lucide-react'
import { brand, certifications } from '../lib/content.js'

export default function About() {
  return (
    <section id="ueber-mich" className="border-y border-line bg-cream-dark py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            {/* Platzhalter — wird durch echtes Foto ersetzt */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream-dark to-cream">
              <User size={64} className="text-ink-muted/40" strokeWidth={1} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Über mich</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">
            Ihr Gutachter. Persönlich.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
            <p>
              Seit Jahren beschäftige ich mich mit Kfz-Technik, Schadenbewertung und Marktanalyse.
              Als zertifizierter Kfz-Sachverständiger nach DIN ISO 17024 bin ich an höchste
              fachliche Standards gebunden.
            </p>
            <p>
              Mein Versprechen: Jedes Gutachten erstelle ich persönlich — nicht ein Assistent,
              kein externes Büro. Sie bekommen meine volle Aufmerksamkeit, mein Fachwissen und
              meine Unterschrift.
            </p>
            <p className="italic text-ink">— {brand.nameShort}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {certifications.map((c) => (
              <span
                key={c}
                className="rounded-full border border-gold/40 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-ink-soft"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
