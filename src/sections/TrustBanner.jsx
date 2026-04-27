import { motion } from 'framer-motion'
import { ShieldCheck, Clock4, Scale } from 'lucide-react'

// Schmaler Trust-Streifen direkt unter dem Hero, vor Kapitel 1.
// Drei Versprechen — die direct-response-Antwort auf den story-driven Hero.
const items = [
  {
    icon: ShieldCheck,
    title: 'Kostenlos für Geschädigte',
    sub: 'Bei unverschuldetem Unfall',
  },
  {
    icon: Clock4,
    title: 'Vor Ort innerhalb 24 h',
    sub: 'Im Eilfall noch am selben Tag',
  },
  {
    icon: Scale,
    title: 'Direkte Abwicklung',
    sub: 'Mit Versicherung & Anwalt',
  },
]

export default function TrustBanner() {
  return (
    <section
      aria-label="Service-Versprechen"
      className="relative z-10 -mt-6 border-y border-ink/10 bg-cream"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-4 px-6 py-6 sm:grid-cols-3 sm:gap-x-8 sm:py-7">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3 sm:items-center"
          >
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold sm:mt-0">
              <it.icon size={18} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-tight text-ink">
                {it.title}
              </div>
              <div className="mt-0.5 text-xs text-ink/60">{it.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
