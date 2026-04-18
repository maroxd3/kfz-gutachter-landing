import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle, Phone, Car, Camera, Calculator as CalcIcon,
  ClipboardList, ShieldCheck, Award, UserCheck, CreditCard,
} from 'lucide-react'

// Jedes Kapitel mappt 1:1 auf eine <section> unter <main> (in Reihenfolge).
// <SectionConnector> sind <div>, also werden sie ignoriert.
const CHAPTERS = [
  { time: '08:15 Uhr', meta: 'Montag, 12. März',       title: 'Der Unfall',           sub: 'Ein Moment verändert alles.',             icon: AlertTriangle, tone: 'red' },
  { time: '08:22 Uhr', meta: '7 Minuten später',        title: 'Der Anruf',            sub: '„Herr Saleh — was jetzt?"',               icon: Phone,          tone: 'neutral' },
  { time: '08:30 Uhr', meta: 'Unsere Zusage',           title: 'Die Zusage',           sub: '45 Minuten, dann sind wir bei Ihnen.',    icon: Car,            tone: 'neutral' },
  { time: '10:02 Uhr', meta: 'Vor Ort',                 title: 'Die Besichtigung',     sub: 'Jeder Kratzer, jede Delle dokumentiert.', icon: Camera,         tone: 'gold' },
  { time: '10:08 Uhr', meta: 'Berechnung',              title: 'Die Kalkulation',      sub: 'Rechtssicher. Nachvollziehbar.',          icon: CalcIcon,       tone: 'neutral' },
  { time: '10:12 Uhr', meta: 'Ablauf dokumentiert',     title: 'Der Ablauf',           sub: 'Drei klare Schritte zum Gutachten.',      icon: ClipboardList,  tone: 'neutral' },
  { time: '10:15 Uhr', meta: 'Zusicherungen',           title: 'Die Zusicherungen',    sub: '48 h, 24 h, 50 km, 100 %.',               icon: ShieldCheck,    tone: 'neutral' },
  { time: '10:18 Uhr', meta: 'Qualifikation geprüft',   title: 'Die Qualifikation',    sub: 'Warum Mandanten bleiben.',                icon: Award,          tone: 'neutral' },
  { time: '10:22 Uhr', meta: 'Vorstellung',              title: 'Der Sachverständige',  sub: 'Der Mensch hinter dem Stempel.',          icon: UserCheck,      tone: 'neutral' },
  { time: 'Eine Woche', meta: 'Fall abgeschlossen',      title: 'Die Auszahlung',       sub: 'Sie tragen 0 €. Akte geschlossen.',       icon: CreditCard,     tone: 'gold' },
]

const toneStyle = {
  red:     { ring: 'ring-red-500/30',  bg: 'bg-red-500/10',  icon: 'text-red-500',     accent: 'text-red-500'     },
  gold:    { ring: 'ring-gold/40',     bg: 'bg-gold/10',     icon: 'text-gold-dark',   accent: 'text-gold-dark'   },
  neutral: { ring: 'ring-ink/10',      bg: 'bg-ink/5',       icon: 'text-ink',         accent: 'text-ink'         },
}

export default function ChapterOverlay() {
  const [activeIdx, setActiveIdx] = useState(-1)
  const [sectionProgress, setSectionProgress] = useState(0)
  const [expanded, setExpanded] = useState(true)
  const sectionsRef = useRef([])
  const expandTimerRef = useRef(null)

  // Sections sammeln + aktiven Index via IntersectionObserver
  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll('main > section'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionsRef.current.indexOf(entry.target)
            if (idx >= 0 && idx < CHAPTERS.length) {
              setActiveIdx(idx)
            }
          }
        })
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
    )
    sectionsRef.current.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Scroll-Progress INNERHALB der aktuellen Section berechnen
  useEffect(() => {
    function onScroll() {
      const section = sectionsRef.current[activeIdx]
      if (!section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const passed = vh - rect.top
      const p = Math.max(0, Math.min(1, passed / total))
      setSectionProgress(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [activeIdx])

  // Bei Kapitel-Wechsel kurz expandieren, dann kompakt
  useEffect(() => {
    if (activeIdx < 0) return
    setExpanded(true)
    if (expandTimerRef.current) clearTimeout(expandTimerRef.current)
    expandTimerRef.current = setTimeout(() => setExpanded(false), 2500)
    return () => clearTimeout(expandTimerRef.current)
  }, [activeIdx])

  const visible = activeIdx >= 0
  const chapter = CHAPTERS[activeIdx]
  const tone = chapter ? toneStyle[chapter.tone] : toneStyle.neutral

  return (
    <AnimatePresence>
      {visible && chapter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-5 left-5 z-40 hidden md:block"
          onMouseEnter={() => {
            clearTimeout(expandTimerRef.current)
            setExpanded(true)
          }}
          onMouseLeave={() => {
            expandTimerRef.current = setTimeout(() => setExpanded(false), 1000)
          }}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="overflow-hidden rounded-2xl border border-line bg-white/95 shadow-2xl shadow-ink/20 backdrop-blur-md"
          >
            {/* Scene-Progress-Bar oben */}
            <div className="h-0.5 w-full bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-dark to-gold"
                animate={{ width: `${sectionProgress * 100}%` }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {expanded ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex w-[320px] items-start gap-4 p-5"
                >
                  <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${tone.ring} ${tone.bg}`}>
                    <motion.div
                      key={`icon-${activeIdx}`}
                      initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={tone.icon}
                    >
                      <chapter.icon size={24} />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                      <span className={tone.accent}>Kapitel {activeIdx + 1}/{CHAPTERS.length}</span>
                      <span className="text-ink-muted/60">·</span>
                      <span className="text-ink-muted">{chapter.time}</span>
                    </div>
                    <motion.div
                      key={`title-${activeIdx}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className="mt-1 font-serif text-xl font-semibold text-ink"
                    >
                      {chapter.title}
                    </motion.div>
                    <motion.div
                      key={`sub-${activeIdx}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="mt-1 text-sm leading-snug text-ink-muted"
                    >
                      {chapter.sub}
                    </motion.div>
                    <div className="mt-2 text-[10px] text-ink-muted/70">{chapter.meta}</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="compact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tone.bg} ${tone.icon}`}>
                    <chapter.icon size={16} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold text-gold-dark">
                      {String(activeIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-sm font-semibold text-ink">
                      {chapter.title}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
