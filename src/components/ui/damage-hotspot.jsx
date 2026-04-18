import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { cn } from '../../lib/utils.js'

const severityColors = {
  Leicht: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  Mittel: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  Schwer: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
}

// Kontrolliert — open/onToggle kommt vom Parent, damit nur EIN Hotspot
// gleichzeitig auf ist. Das Popup ist pointer-events-none, damit Klicks
// auf darunter liegende Pins durchgehen.
export default function DamageHotspot({ point, index, isOpen, onToggle }) {
  // Popup-Platzierung: liegt der Pin in der rechten Bildhälfte, nach links
  // ausklappen, sonst nach rechts — verhindert Overflow auf kleinen Viewports.
  const popoverOnLeft = point.x > 55
  // Vertikal: Pins in der oberen Bildhälfte → Popup unten, sonst oben.
  const popoverOnTop = point.y > 60

  return (
    <div
      className="absolute z-[5] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-gold"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
      />

      <button
        onClick={onToggle}
        className={cn(
          'relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/80 bg-gold text-ink shadow-lg transition hover:scale-110 md:h-8 md:w-8',
          isOpen && 'scale-110 bg-white',
        )}
        aria-label={`Schaden: ${point.label}`}
      >
        {isOpen ? <X size={14} className="md:hidden" /> : <Plus size={14} className="md:hidden" />}
        {isOpen ? <X size={16} className="hidden md:block" /> : <Plus size={16} className="hidden md:block" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'pointer-events-none absolute z-[6] w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-black/90 p-4 text-left shadow-2xl backdrop-blur-md',
              popoverOnLeft ? 'right-1/2 mr-3' : 'left-1/2 ml-3',
              popoverOnTop ? 'bottom-full mb-2' : 'top-full mt-2',
            )}
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
