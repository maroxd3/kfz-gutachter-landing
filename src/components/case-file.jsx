import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Check, ChevronDown, ChevronUp } from 'lucide-react'

// Die Akte erzählt die Story Schritt für Schritt. Jede Section triggert
// genau einen Eintrag. Die Uhrzeiten suggerieren einen realen Arbeitstag.
// Jeder Eintrag mappt exakt auf eine <section> unter <main> (Reihenfolge zählt).
// SectionConnector-Divs werden ignoriert, da wir nur <section> beobachten.
// Uhrzeiten synchron mit ChapterOverlay.
const ENTRIES = [
  { label: 'Unfallmeldung · Anruf',        time: '08:22' }, // Hero
  { label: 'Zusage erteilt',               time: '08:30' }, // Audience
  { label: 'Leistungsumfang definiert',    time: '08:35' }, // Services
  { label: 'Vor Ort · Schaden lokalisiert',time: '10:02' }, // BeforeAfter
  { label: 'Kalkulation erstellt',         time: '10:08' }, // Calculator
  { label: 'Ablauf mit Mandant geprüft',   time: '10:12' }, // Process
  { label: 'Zusicherungen dokumentiert',   time: '10:15' }, // Stats
  { label: 'Qualifikation bestätigt',      time: '10:18' }, // WhyUs
  { label: 'Sachverständiger vorgestellt', time: '10:22' }, // About
  { label: 'Akte zur Übergabe bereit',     time: '10:30', final: true }, // Contact
]

export default function CaseFile() {
  const [completed, setCompleted] = useState(() => new Set())
  const [collapsed, setCollapsed] = useState(false)
  const [visible, setVisible] = useState(false)
  const prevSizeRef = useRef(0)

  // Erscheint erst nach Hero (sonst konkurriert es mit dem Hero-Stats-Badge)
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Beobachtet alle direkten Section-Kinder von <main> und aktiviert
  // den passenden Eintrag, sobald sie in den Viewport scrollen.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main > section'))
    const observers = sections.map((section, i) => {
      if (i >= ENTRIES.length) return null
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCompleted((prev) => {
              if (prev.has(i)) return prev
              const next = new Set(prev)
              next.add(i)
              return next
            })
          }
        },
        { threshold: 0.35 },
      )
      io.observe(section)
      return io
    })
    return () => observers.forEach((io) => io?.disconnect())
  }, [])

  const count = completed.size
  const allDone = count >= ENTRIES.length

  // Memo des letzten neu hinzugekommenen Eintrags für die „ding"-Animation
  const latestEntryIdx = (() => {
    let latest = -1
    completed.forEach((i) => {
      if (i > latest) latest = i
    })
    return latest
  })()

  // Pulse bei neuem Eintrag
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    if (count > prevSizeRef.current) {
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 700)
      prevSizeRef.current = count
      return () => clearTimeout(t)
    }
  }, [count])

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-24 right-6 z-40 hidden w-[280px] xl:block"
        >
          {/* Akten-Tab oben (Ohr-Effekt) */}
          <div className="absolute -top-2.5 left-5 h-5 w-16 rounded-t-md bg-ink" />

          <div className="relative overflow-hidden rounded-xl border border-line bg-white shadow-2xl shadow-ink/20">
            {/* Header */}
            <div className="flex items-center justify-between bg-ink px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <motion.div
                  animate={pulse ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <FileText size={15} className="text-gold" />
                </motion.div>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gold-soft">
                    Die Akte
                  </div>
                  <div className="font-mono text-xs font-semibold">MS-2026-0042</div>
                </div>
              </div>
              <button
                onClick={() => setCollapsed((v) => !v)}
                className="rounded p-1 text-neutral-400 transition hover:bg-white/10 hover:text-white"
                aria-label={collapsed ? 'Akte öffnen' : 'Akte schließen'}
              >
                {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
              </button>
            </div>

            {/* Progress-Band */}
            <div className="h-0.5 w-full bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-dark to-gold"
                animate={{ width: `${(count / ENTRIES.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Sub-header mit Eröffnungszeit */}
                  <div className="flex items-center justify-between border-b border-line bg-cream-dark/40 px-4 py-2">
                    <span className="font-mono text-[10px] text-ink-muted">
                      Eröffnet · 09:47 Uhr
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-gold-dark">
                      {count}/{ENTRIES.length}
                    </span>
                  </div>

                  {/* Einträge */}
                  <ul className="max-h-[54vh] space-y-0.5 overflow-y-auto px-3 py-3">
                    {ENTRIES.map((entry, i) => {
                      const done = completed.has(i)
                      const isLatest = i === latestEntryIdx && done
                      return (
                        <motion.li
                          key={i}
                          animate={
                            isLatest && pulse
                              ? { backgroundColor: ['rgba(184,145,94,0.18)', 'rgba(184,145,94,0)'] }
                              : {}
                          }
                          transition={{ duration: 0.9 }}
                          className="flex items-start gap-2.5 rounded px-2 py-1.5"
                        >
                          <div
                            className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition ${
                              done
                                ? 'border-gold bg-gold text-white'
                                : 'border-line bg-white'
                            }`}
                          >
                            {done && <Check size={10} strokeWidth={3} />}
                          </div>
                          <div className="flex-1">
                            <div
                              className={`text-[11px] leading-tight transition ${
                                done ? 'font-medium text-ink' : 'text-ink-muted/50'
                              }`}
                            >
                              {entry.label}
                            </div>
                            <div
                              className={`mt-0.5 font-mono text-[9px] transition ${
                                done ? 'text-gold-dark' : 'text-ink-muted/40'
                              }`}
                            >
                              {entry.time} Uhr
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </ul>

                  {/* FREIGEGEBEN-Stempel */}
                  <AnimatePresence>
                    {allDone && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden border-t border-dashed border-gold/30 bg-gradient-to-br from-gold/5 to-transparent"
                      >
                        <div className="flex justify-center px-4 py-5">
                          <motion.div
                            initial={{ scale: 0, rotate: -45, opacity: 0 }}
                            animate={{ scale: 1, rotate: -6, opacity: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 180,
                              damping: 12,
                              delay: 0.15,
                            }}
                            className="rounded border-[3px] border-gold-dark/70 bg-white/60 px-5 py-2 text-center shadow-inner"
                            style={{
                              boxShadow: 'inset 0 0 0 1px rgba(142, 109, 67, 0.3)',
                            }}
                          >
                            <div className="font-serif text-xl font-bold uppercase tracking-[0.25em] text-gold-dark">
                              Freigegeben
                            </div>
                            <div className="mt-0.5 font-mono text-[9px] text-gold-dark/70">
                              10:30 · Akte abgeschlossen
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
