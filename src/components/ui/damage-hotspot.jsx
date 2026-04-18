import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { cn } from '../../lib/utils.js'

const severityColors = {
  Leicht: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  Mittel: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  Schwer: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
}

export default function DamageHotspot({ point, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="absolute z-[5] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      {/* Pulsierender Ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-gold"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
      />

      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/80 bg-gold text-ink shadow-lg transition hover:scale-110',
          open && 'scale-110 bg-white',
        )}
        aria-label={`Schaden: ${point.label}`}
      >
        {open ? <X size={16} /> : <Plus size={16} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute top-10 left-1/2 w-72 -translate-x-1/2 rounded-xl border border-white/10 bg-black/90 p-4 text-left shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-serif text-base font-semibold text-white">
                {point.label}
              </h4>
              <span
                className={cn(
                  'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                  severityColors[point.severity],
                )}
              >
                {point.severity}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-300">{point.damage}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Reparatur
                </div>
                <div className="mt-0.5 font-serif text-lg font-semibold text-gold">
                  {point.repair}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                  Wertminderung
                </div>
                <div className="mt-0.5 font-serif text-lg font-semibold text-gold">
                  {point.depreciation}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
