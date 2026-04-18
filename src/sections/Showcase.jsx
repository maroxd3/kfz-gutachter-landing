import { SplineScene } from '../components/ui/splite.jsx'
import { Card } from '../components/ui/card.jsx'
import { Spotlight } from '../components/ui/spotlight.jsx'

export default function Showcase() {
  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Card className="relative h-[560px] w-full overflow-hidden border-0 bg-black/[0.96] text-white">
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#B8915E" />

          <div className="flex h-full flex-col md:flex-row">
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-14">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-soft">
                Ihr Fahrzeug · 360° bewertet
              </span>
              <h2 className="mt-4 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text font-serif text-4xl font-semibold leading-[1.05] text-transparent md:text-6xl">
                Jedes Detail zählt.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-300 md:text-lg">
                Wir dokumentieren Ihren Schaden in 3D-Präzision. Jede Delle, jeder Kratzer,
                jeder Lackschaden — lückenlos erfasst, rechtssicher bewertet.
              </p>
              <div className="mt-8 flex flex-wrap gap-6 text-xs uppercase tracking-wider text-neutral-400">
                <span>· 360° Dokumentation</span>
                <span>· Fotoprotokoll</span>
                <span>· Rechtssicher</span>
              </div>
            </div>

            <div className="relative flex-1">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
