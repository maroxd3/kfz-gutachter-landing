import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  AlertTriangle, Phone, Car, MapPin, FileText,
  Camera, Calculator as CalcIcon, FileCheck, CreditCard,
} from 'lucide-react'

const SCENES = [
  {
    time: '08:15 Uhr',
    day: 'Montag, 12. März',
    title: 'Die Kreuzung.',
    body: 'Rot. Anhalten. Aufprall.\nEin Moment, der alles verändert.',
    icon: AlertTriangle,
    tone: 'red',
  },
  {
    time: '08:22 Uhr',
    day: '7 Minuten später',
    title: 'Der Anruf.',
    body: '„Herr Saleh — ich hatte einen Unfall. Was mache ich jetzt?"',
    icon: Phone,
  },
  {
    time: '08:30 Uhr',
    day: null,
    title: 'Die Zusage.',
    body: 'In 45 Minuten bin ich bei Ihnen.\nSie müssen nichts tun außer warten.',
    icon: Car,
  },
  {
    time: '09:15 Uhr',
    day: null,
    title: 'Vor Ort.',
    body: 'Werkstatt, Unfallstelle oder Ihr Büro.\nIch komme dorthin, wo Ihr Fahrzeug steht.',
    icon: MapPin,
  },
  {
    time: '09:47 Uhr',
    day: 'Akte wird eröffnet',
    title: 'MS-2026-0042.',
    body: 'Die Akte trägt ab jetzt Ihren Namen.\nJede Minute, jede Messung wird dokumentiert.',
    icon: FileText,
    tone: 'gold',
  },
  {
    time: '10:02 Uhr',
    day: null,
    title: 'Die Besichtigung.',
    body: 'Jeder Kratzer, jede Delle, jede Baugruppe —\nvermessen, fotografiert, eingetragen.',
    icon: Camera,
  },
  {
    time: '10:08 Uhr',
    day: null,
    title: 'Die Kalkulation.',
    body: 'Reparaturkosten. Wertminderung. Nutzungsausfall.\nAlles rechtssicher belegt.',
    icon: CalcIcon,
  },
  {
    time: 'Nächster Tag',
    day: '48 Stunden nach Besichtigung',
    title: 'Das Gutachten.',
    body: 'Rechtssicher, gerichtsverwertbar.\nDigital und auf Papier — in Ihrer Hand.',
    icon: FileCheck,
  },
  {
    time: 'Eine Woche später',
    day: 'Fall abgeschlossen',
    title: 'Die Auszahlung.',
    body: 'Die gegnerische Versicherung zahlt.\nSie tragen 0 €.',
    icon: CreditCard,
    tone: 'gold',
  },
]

function toneStyles(tone) {
  if (tone === 'gold') return { ring: 'border-gold', text: 'text-gold', bg: 'bg-gold/10' }
  if (tone === 'red') return { ring: 'border-red-500/60', text: 'text-red-400', bg: 'bg-red-500/10' }
  return { ring: 'border-white/15', text: 'text-neutral-400', bg: 'bg-white/5' }
}

function Scene({ scene, last }) {
  const t = toneStyles(scene.tone)
  const Icon = scene.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative pl-20 md:pl-28 ${last ? 'pb-0' : 'pb-20 md:pb-24'}`}
    >
      {/* Icon-Dot auf der Timeline */}
      <div
        className={`absolute left-8 top-0 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-ink shadow-lg shadow-black/40 md:left-12 md:h-16 md:w-16 ${t.ring} ${t.text}`}
      >
        <div className={`absolute inset-0 -z-10 rounded-full blur-xl ${t.bg}`} />
        <Icon size={22} />
      </div>

      <div className="max-w-xl">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em]">
          <span className={t.text}>{scene.time}</span>
          {scene.day && (
            <>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-500">{scene.day}</span>
            </>
          )}
        </div>
        <h3 className="mt-3 font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">
          {scene.title}
        </h3>
        <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-neutral-300">
          {scene.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function Story() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 30%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      id="geschichte"
      className="relative overflow-hidden bg-ink py-28 text-white md:py-36"
    >
      {/* Gold-Glow oben rechts */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-96 w-[40rem] rounded-full bg-gold/5 blur-3xl"
      />
      {/* Subtiles Punkt-Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-20 max-w-2xl md:mb-24">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">
            Die Geschichte eines Gutachtens
          </p>
          <h2 className="mt-3 font-serif text-5xl font-semibold leading-[1.05] md:text-6xl">
            Ein ganz normaler <span className="italic text-gold">Montagmorgen</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300">
            So sieht ein Fall aus — von der ersten Minute bis zum Geldeingang auf Ihrem Konto.
            Damit Sie wissen, was auf Sie zukommt.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Basis-Linie (grau) */}
          <div className="absolute left-8 top-0 h-full w-px bg-white/10 md:left-12" />
          {/* Gold-Progress-Linie (füllt sich beim Scrollen) */}
          <motion.div
            className="absolute left-8 top-0 w-px bg-gradient-to-b from-gold via-gold to-gold/0 md:left-12"
            style={{ height: lineHeight }}
          />

          {SCENES.map((s, i) => (
            <Scene key={i} scene={s} last={i === SCENES.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
