import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
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
  // Mobile vs. Desktop: auf Mobile rendern wir das Popup als bottom-sheet
  // via Portal (escape transformierter Eltern), auf Desktop als Popover am Pin.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  // Popup-Platzierung Desktop: liegt der Pin in der rechten Bildhälfte,
  // nach links ausklappen, sonst nach rechts.
  const popoverOnLeft = point.x > 55
  const popoverOnTop = point.y > 60

  // Pin-Position kommt entweder aus point.style (Pixel-Koordinaten von
  // Hero.jsx via objectCoverPoint) oder fallback auf x/y in Prozent.
  const positionStyle = point.style ?? { left: `${point.x}%`, top: `${point.y}%` }

  const popupContent = (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.95 }}
      transition={{ duration: 0.18 }}
      className={
        isMobile
          ? 'pointer-events-auto fixed inset-x-3 bottom-3 z-[60] rounded-xl border border-white/15 bg-black/95 p-4 text-left shadow-2xl backdrop-blur-md'
          : cn(
              'pointer-events-none absolute z-[6] w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-black/90 p-4 text-left shadow-2xl backdrop-blur-md',
              popoverOnLeft ? 'right-1/2 mr-3' : 'left-1/2 ml-3',
              popoverOnTop ? 'bottom-full mb-2' : 'top-full mt-2',
            )
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-serif text-lg font-semibold text-white md:text-base">
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
      <p className="mt-2 text-sm leading-relaxed text-neutral-300 md:text-xs">{point.damage}</p>
      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-neutral-500">
            Reparatur
          </div>
          <div className="mt-0.5 font-serif text-xl font-semibold text-gold md:text-lg">
            {point.repair}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-neutral-500">
            Wertminderung
          </div>
          <div className="mt-0.5 font-serif text-xl font-semibold text-gold md:text-lg">
            {point.depreciation}
          </div>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={onToggle}
          aria-label="Schließen"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition active:bg-white/10"
        >
          <X size={14} /> Schließen
        </button>
      )}
    </motion.div>
  )

  return (
    <div
      className="pointer-events-auto absolute z-[5] -translate-x-1/2 -translate-y-1/2"
      style={positionStyle}
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
          'relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/80 bg-gold text-ink shadow-lg transition hover:scale-110 md:h-7 md:w-7',
          isOpen && 'scale-110 bg-white',
        )}
        aria-label={`Schaden: ${point.label}`}
      >
        {isOpen ? <X size={11} className="md:hidden" /> : <Plus size={11} className="md:hidden" />}
        {isOpen ? <X size={14} className="hidden md:block" /> : <Plus size={14} className="hidden md:block" />}
      </button>

      {isMobile && typeof document !== 'undefined' ? (
        createPortal(
          <AnimatePresence>{isOpen && popupContent}</AnimatePresence>,
          document.body
        )
      ) : (
        <AnimatePresence>{isOpen && popupContent}</AnimatePresence>
      )}
    </div>
  )
}
