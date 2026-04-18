import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, ArrowRight, ShieldCheck, MousePointerClick } from 'lucide-react'
import { Spotlight } from '../components/ui/spotlight.jsx'
import DamageHotspot from '../components/ui/damage-hotspot.jsx'
import { brand, certifications, heroDamagePoints } from '../lib/content.js'

export default function Hero() {
  const [openId, setOpenId] = useState(null)
  const totalRepair = heroDamagePoints.reduce(
    (sum, p) => sum + Number(p.repair.replace(/[^\d]/g, '') || 0),
    0,
  )
  const totalDepreciation = heroDamagePoints.reduce(
    (sum, p) => sum + Number(p.depreciation.replace(/[^\d]/g, '') || 0),
    0,
  )
  const totalSum = totalRepair + totalDepreciation

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink text-cream">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#B8915E" />

      {/* Hintergrund-Foto mit Ken-Burns Zoom. Auf Mobile wird das Auto
          mittig fokussiert, damit die Hotspots sichtbar bleiben. */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 14, ease: 'easeOut' }}
      >
        <img
          src={brand.heroImageUrl}
          alt={brand.heroImageAlt}
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Gradient-Overlay für Text-Lesbarkeit. Auf Mobile nur unten,
          damit das Auto samt Hotspots im oberen Bildteil sichtbar ist. */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/40 via-black/50 to-black md:bg-gradient-to-r md:from-black md:via-black/60 md:to-black/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-52 bg-gradient-to-t from-black via-black/80 to-transparent"
        aria-hidden
      />

      {/* Interaktive Hotspots auf dem Foto — auch auf Mobile sichtbar */}
      <div
        className="absolute inset-0 z-[3]"
        onClick={(e) => {
          // Klick außerhalb eines Pins schließt geöffnetes Popup
          if (e.target === e.currentTarget) setOpenId(null)
        }}
      >
        {heroDamagePoints.map((p, i) => (
          <DamageHotspot
            key={p.id}
            point={p}
            index={i}
            isOpen={openId === p.id}
            onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
          />
        ))}
      </div>

      {/* Inhalt */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-28 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold-soft backdrop-blur-sm"
        >
          <ShieldCheck size={14} className="text-gold" />
          Zertifiziert nach DIN ISO 17024
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 max-w-3xl bg-gradient-to-b from-white to-neutral-400 bg-clip-text font-serif text-5xl font-semibold leading-[1.02] text-transparent md:text-7xl lg:text-[5.5rem]"
        >
          Jeder Schaden hat einen <span className="italic text-gold">Wert</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300 md:text-xl"
        >
          Wir dokumentieren, bewerten und quantifizieren — rechtssicher und unabhängig.
          Klicken Sie auf die Markierungen und sehen Sie, wie ein Gutachten entsteht.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 hidden items-center gap-2 text-xs uppercase tracking-wider text-gold-soft md:flex"
        >
          <MousePointerClick size={14} />
          Klicken Sie auf die Schadenpunkte im Bild
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={brand.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-ink shadow-lg shadow-gold/20 transition hover:bg-gold-soft"
          >
            <Phone size={18} />
            Jetzt anrufen · {brand.phone}
          </a>
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/50"
          >
            Gutachten anfordern
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Qualifikationen
          </span>
          {certifications.map((c) => (
            <span key={c} className="text-sm font-medium text-neutral-300">
              {c}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Live-Summe aus den Hotspots (unten rechts schwebt) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute right-6 bottom-10 z-[4] hidden rounded-2xl border border-gold/30 bg-black/70 p-5 backdrop-blur-md lg:block"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] text-gold-soft">
          Beispielhafter Gesamtschaden
        </div>
        <div className="mt-2 font-serif text-4xl font-semibold text-white">
          {totalSum.toLocaleString('de-DE')} €
        </div>
        <div className="mt-1 text-xs text-neutral-400">
          {heroDamagePoints.length} Schadenpunkte · {totalRepair.toLocaleString('de-DE')} € Reparatur
          + {totalDepreciation.toLocaleString('de-DE')} € Wertminderung
        </div>
      </motion.div>
    </section>
  )
}
