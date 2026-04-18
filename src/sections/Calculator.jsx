import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Check, Phone, RotateCcw,
  Calculator as CalcIcon, Info, Car, Gauge, Wrench, AlertTriangle,
} from 'lucide-react'
import { calculator, brand } from '../lib/content.js'
import { cn } from '../lib/utils.js'

const steps = [
  { key: 'brand',    title: 'Welche Marke?',     subtitle: 'Fahrzeugmarke auswählen', icon: Car,          options: calculator.brands },
  { key: 'class',    title: 'Fahrzeugklasse?',   subtitle: 'Welches Segment?',         icon: Gauge,        options: calculator.classes },
  { key: 'type',     title: 'Art des Schadens?', subtitle: 'Was ist passiert?',        icon: Wrench,       options: calculator.types },
  { key: 'severity', title: 'Wie schwer?',       subtitle: 'Umfang einschätzen',       icon: AlertTriangle,options: calculator.severities },
]

function snap(n) {
  return Math.round(n / 50) * 50
}

/** Animated integer counter: 0 → target over ~900 ms. */
function useAnimatedNumber(target, duration = 900) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  useEffect(() => {
    const start = performance.now()
    const from = 0
    const to = target
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])
  return value
}

function AnimatedEuro({ value, className }) {
  const v = useAnimatedNumber(value)
  return <span className={className}>{v.toLocaleString('de-DE')} €</span>
}

export default function Calculator() {
  const [stepIndex, setStepIndex] = useState(0)
  const [selections, setSelections] = useState({})
  const [done, setDone] = useState(false)
  const [showNotes, setShowNotes] = useState(false)

  const current = steps[stepIndex]
  const selected = selections[current?.key]

  const result = useMemo(() => {
    if (!done) return null
    const brandF = calculator.brands.find((b) => b.id === selections.brand)?.factor ?? 1
    const classF = calculator.classes.find((c) => c.id === selections.class)?.factor ?? 1
    const typeBase = calculator.types.find((t) => t.id === selections.type)?.base ?? 1000
    const sev = calculator.severities.find((s) => s.id === selections.severity)
    const sevF = sev?.factor ?? 1
    const depRate = sev?.depreciation ?? 0.1

    const mid = typeBase * brandF * classF * sevF
    const low = snap(mid * 0.8)
    const high = snap(mid * 1.25)
    const depreciation = snap(mid * depRate)
    const isBagatell = high < 750
    const isTotal = selections.type === 'total'

    return { low, high, depreciation, isBagatell, isTotal }
  }, [done, selections])

  function pick(optId) {
    const next = { ...selections, [current.key]: optId }
    setSelections(next)
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      setDone(true)
    }
  }

  function back() {
    if (done) {
      setDone(false)
      return
    }
    if (stepIndex > 0) setStepIndex(stepIndex - 1)
  }

  function reset() {
    setSelections({})
    setStepIndex(0)
    setDone(false)
    setShowNotes(false)
  }

  const progress = done ? 100 : (stepIndex / steps.length) * 100

  return (
    <section id="rechner" className="relative overflow-hidden bg-cream py-24 md:py-32">
      {/* Subtiles Grid-Muster im Hintergrund */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--color-ink) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Gold-Glow oben */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-gold-dark backdrop-blur">
            <CalcIcon size={13} />
            Schaden-Schnellrechner
          </div>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
            In 30 Sekunden zur <span className="italic text-gold-dark">ersten Einschätzung</span>.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Vier Fragen — und Sie kennen die Größenordnung Ihres Schadens.
            Unverbindlich, ohne Anmeldung, keine Datenspeicherung.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-[260px_1fr]">
          {/* VERTIKALER STEPPER (links, Desktop) */}
          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-2">
              {steps.map((s, i) => {
                const Icon = s.icon
                const status = done
                  ? 'done'
                  : i < stepIndex
                    ? 'done'
                    : i === stepIndex
                      ? 'current'
                      : 'pending'
                return (
                  <div
                    key={s.key}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border px-4 py-3 transition',
                      status === 'current' && 'border-gold bg-white shadow-sm',
                      status === 'done' && 'border-line bg-white/60',
                      status === 'pending' && 'border-line/60 bg-transparent',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition',
                        status === 'current' && 'bg-gold text-ink',
                        status === 'done' && 'bg-ink text-white',
                        status === 'pending' && 'bg-line text-ink-muted',
                      )}
                    >
                      {status === 'done' ? <Check size={16} strokeWidth={3} /> : <Icon size={15} />}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div
                        className={cn(
                          'text-[10px] font-semibold uppercase tracking-wider',
                          status === 'current' ? 'text-gold-dark' : 'text-ink-muted',
                        )}
                      >
                        Schritt {i + 1}
                      </div>
                      <div
                        className={cn(
                          'mt-0.5 text-sm font-semibold',
                          status === 'pending' ? 'text-ink-muted' : 'text-ink',
                        )}
                      >
                        {s.subtitle}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </aside>

          {/* KARTE */}
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-ink/5">
            <div className="h-1 w-full bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-dark to-gold"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div
                    key={`step-${stepIndex}`}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold-dark md:hidden">
                      Schritt {stepIndex + 1}/{steps.length}
                    </div>
                    <h3 className="mt-1 font-serif text-3xl font-semibold text-ink md:text-4xl">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">{current.subtitle}</p>

                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {current.options.map((opt, idx) => (
                        <motion.button
                          key={opt.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: idx * 0.03 }}
                          onClick={() => pick(opt.id)}
                          className={cn(
                            'group relative flex items-start justify-between gap-4 overflow-hidden rounded-2xl border-2 bg-cream-dark/40 p-5 text-left transition-all duration-200',
                            'hover:-translate-y-0.5 hover:border-gold hover:bg-white hover:shadow-md hover:shadow-gold/10',
                            selected === opt.id
                              ? 'border-gold bg-white shadow-md shadow-gold/10'
                              : 'border-line',
                          )}
                        >
                          <div className="flex-1">
                            <div className="font-serif text-lg font-semibold text-ink">
                              {opt.label}
                            </div>
                            {opt.sub && (
                              <div className="mt-1 text-xs leading-relaxed text-ink-muted">
                                {opt.sub}
                              </div>
                            )}
                          </div>
                          <div
                            className={cn(
                              'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition',
                              selected === opt.id
                                ? 'border-gold bg-gold text-white'
                                : 'border-line text-transparent group-hover:border-gold',
                            )}
                          >
                            <Check size={14} strokeWidth={3} />
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {stepIndex > 0 && (
                      <div className="mt-8">
                        <button
                          onClick={back}
                          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink"
                        >
                          <ArrowLeft size={16} />
                          Zurück
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-dark">
                      <Check size={14} />
                      Ihre Einschätzung
                    </div>
                    <h3 className="mt-2 font-serif text-3xl font-semibold text-ink md:text-4xl">
                      Voraussichtliche <span className="italic text-gold-dark">Schadenhöhe</span>
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      Richtwert auf Basis Ihrer Angaben — kein Gutachten, kein Kostenvoranschlag.
                    </p>

                    {/* Bagatell-Warnung */}
                    {result.isBagatell && (
                      <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-50 p-4 text-sm text-amber-900">
                        <Info size={18} className="mt-0.5 shrink-0 text-amber-600" />
                        <div>
                          <strong>Bagatellschadengrenze:</strong> Bei geschätzter Schadenhöhe unter
                          ~750 € netto übernimmt die gegnerische Haftpflicht in der Regel nur einen
                          <strong> Kostenvoranschlag</strong>, kein vollständiges Gutachten.
                          Wir bieten dafür ein günstiges Kurzgutachten an.
                        </div>
                      </div>
                    )}
                    {result.isTotal && (
                      <div className="mt-6 flex items-start gap-3 rounded-xl border border-rose-400/40 bg-rose-50 p-4 text-sm text-rose-900">
                        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-rose-600" />
                        <div>
                          <strong>Totalschaden-Verdacht:</strong> Bei Totalschaden wird zusätzlich
                          Wiederbeschaffungswert und Restwert ermittelt. Die tatsächliche Abrechnung
                          erfordert zwingend ein vollständiges Gutachten.
                        </div>
                      </div>
                    )}

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <div className="rounded-2xl border border-line bg-gradient-to-br from-cream-dark/60 to-white p-6">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-muted">
                          <Wrench size={12} />
                          Reparaturkosten
                        </div>
                        <div className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
                          <AnimatedEuro value={result.low} />
                          <span className="mx-2 text-ink-muted">–</span>
                          <AnimatedEuro value={result.high} />
                        </div>
                        <div className="mt-2 text-sm text-ink-muted">
                          Netto, inkl. Material & Arbeitslohn
                        </div>
                      </div>

                      <div className="rounded-2xl border border-line bg-gradient-to-br from-cream-dark/60 to-white p-6">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-muted">
                          <Gauge size={12} />
                          Merkantile Wertminderung
                        </div>
                        <div className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
                          ca. <AnimatedEuro value={result.depreciation} />
                        </div>
                        <div className="mt-2 text-sm text-ink-muted">
                          Je nach Alter/Laufleistung abweichend
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-gold/10 via-white to-gold/5 p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-lg">
                          <div className="font-serif text-xl font-semibold text-ink">
                            Bei unverschuldetem Unfall
                          </div>
                          <div className="mt-1 text-sm leading-relaxed text-ink-muted">
                            Gutachten-, Anwalts- und Nutzungsausfallkosten trägt in der Regel die
                            gegnerische Haftpflichtversicherung — <strong className="text-ink">
                            voraussichtlich 0 € für Sie</strong>. Details prüfen wir im Einzelfall.
                          </div>
                        </div>
                        <div className="font-serif text-5xl font-semibold text-gold-dark">0 €*</div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={brand.phoneHref}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-ink-soft"
                      >
                        <Phone size={16} />
                        Jetzt anrufen · {brand.phone}
                      </a>
                      <a
                        href="#kontakt"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-semibold text-ink shadow-lg shadow-gold/20 transition hover:bg-gold-soft"
                      >
                        Kostenloses Gutachten anfordern
                        <ArrowRight size={16} />
                      </a>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-xs text-ink-muted">
                      <button
                        onClick={back}
                        className="inline-flex items-center gap-2 hover:text-ink"
                      >
                        <ArrowLeft size={14} />
                        Auswahl anpassen
                      </button>
                      <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 hover:text-ink"
                      >
                        <RotateCcw size={14} />
                        Neu berechnen
                      </button>
                    </div>

                    {/* Wichtige Hinweise (einklappbar) */}
                    <div className="mt-6 rounded-xl border border-line bg-cream-dark/40">
                      <button
                        onClick={() => setShowNotes((v) => !v)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted hover:text-ink"
                      >
                        <span className="flex items-center gap-2">
                          <Info size={14} />
                          Wichtige Hinweise & rechtlicher Rahmen
                        </span>
                        <span>{showNotes ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {showNotes && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-3 border-t border-line px-4 py-4 text-[12px] leading-relaxed text-ink-muted">
                              <p>
                                <strong className="text-ink">Unverbindliche Schätzung:</strong> Alle
                                Angaben sind statistische Richtwerte auf Basis marktüblicher Reparaturpreise
                                und Ihrer Auswahl. Sie stellen <strong>kein Gutachten</strong>,
                                keinen Kostenvoranschlag und keine verbindliche Kostenzusage dar.
                              </p>
                              <p>
                                <strong className="text-ink">Verbindliche Werte:</strong> Die tatsächliche
                                Schadenhöhe, Wertminderung und Nutzungsausfallentschädigung werden erst
                                nach persönlicher Fahrzeugbesichtigung ermittelt.
                              </p>
                              <p>
                                <strong className="text-ink">„0 € für Sie":</strong> gilt bei unverschuldetem
                                Haftpflichtschaden mit vollständiger Haftung der Gegenseite. Bei
                                Mitverschulden trägt die Haftpflicht nur den entsprechenden Anteil.
                                Bei Kaskoschäden/Eigenverschulden greifen die jeweiligen Versicherungsbedingungen.
                              </p>
                              <p>
                                <strong className="text-ink">Wertminderung:</strong> Merkantile Wertminderung
                                wird in der Regel nur bis zu einem bestimmten Fahrzeugalter und Laufleistung
                                anerkannt (häufig &lt; 5 Jahre / &lt; 100.000 km). Oldtimer werden gesondert bewertet.
                              </p>
                              <p>
                                <strong className="text-ink">Datenschutz:</strong> Dieser Rechner speichert
                                keine Eingaben. Es erfolgt keine Datenübertragung an Dritte. Erst bei
                                aktiver Kontaktaufnahme werden Ihre Angaben im Rahmen unserer
                                Datenschutzerklärung verarbeitet.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
