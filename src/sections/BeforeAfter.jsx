import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronsLeftRight } from 'lucide-react'
import { collisionScene } from '../lib/content.js'
import { cn } from '../lib/utils.js'

function sumEuro(points) {
  return points.reduce((sum, p) => {
    const r = Number(p.repair.replace(/[^\d]/g, '') || 0)
    const w = Number(p.depreciation.replace(/[^\d]/g, '') || 0)
    return sum + r + w
  }, 0)
}

export default function BeforeAfter() {
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  const [position, setPosition] = useState(0)
  const [paused, setPaused] = useState(false)
  const [openPointId, setOpenPointId] = useState(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    const pct = ((clientX - left) / width) * 100
    setPosition(Math.max(0, Math.min(100, pct)))
  }, [])

  useEffect(() => {
    if (paused) return
    const start = performance.now()
    const tick = (now) => {
      const elapsed = (now - start) / 1000
      const cycle = 7
      const phase = (elapsed % cycle) / cycle
      const pos = 50 - 50 * Math.cos(phase * 2 * Math.PI)
      setPosition(pos)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused])

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current) return
      const x = e.touches ? e.touches[0].clientX : e.clientX
      updateFromClientX(x)
    }
    function onUp() {
      draggingRef.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [updateFromClientX])

  function startDrag(e) {
    setPaused(true)
    draggingRef.current = true
    document.body.style.cursor = 'ew-resize'
    document.body.style.userSelect = 'none'
    const x = e.touches ? e.touches[0].clientX : e.clientX
    updateFromClientX(x)
  }

  const clientTotal = sumEuro(collisionScene.client.points)
  const opponentTotal = sumEuro(collisionScene.opponent.points)
  const grandTotal = clientTotal + opponentTotal

  const allPoints = [
    ...collisionScene.client.points.map((p, i) => ({ ...p, party: 'client', number: i + 1 })),
    ...collisionScene.opponent.points.map((p, i) => ({ ...p, party: 'opponent', number: i + 1 })),
  ]

  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">Vom Unfall zum Gutachten</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            Zwei Fahrzeuge. Zwei Schadenbilder. Ein Gutachten.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-300">
            Bei einem Haftpflichtschaden bewerten wir beide Fahrzeuge — Ihres und das
            gegnerische. Ziehen Sie den Regler oder lassen Sie die Vorschau laufen.
          </p>
        </div>

        <div
          ref={containerRef}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          className="relative mt-14 aspect-[16/9] w-full cursor-ew-resize overflow-hidden rounded-2xl border border-white/10 select-none"
        >
          {/* BEFORE: Szene vor der Gutachter-Analyse */}
          <img
            src={collisionScene.imageBefore}
            alt="Unfallszene bei Ankunft"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 left-4 z-10 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
            Unfallszene · bei Ankunft
          </div>

          {/* AFTER: Szene mit Gutachter-Analyse */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
            aria-hidden
          >
            <img
              src={collisionScene.imageAfter}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: 'contrast(1.08) saturate(0.92) brightness(0.9)' }}
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-black/50" />

            {/* Impact-Glüher an allen Schadenstellen */}
            {allPoints.map((p) => (
              <motion.div
                key={`glow-${p.id}`}
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: '110px',
                  height: '110px',
                  transform: 'translate(-50%, -50%)',
                  background:
                    p.party === 'client'
                      ? 'radial-gradient(circle, rgba(184,145,94,0.55) 0%, rgba(184,145,94,0.15) 40%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(239,68,68,0.55) 0%, rgba(239,68,68,0.15) 40%, transparent 70%)',
                }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}

            {/* Scanner-Linie */}
            {!paused && (
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent shadow-[0_0_24px_rgba(184,145,94,0.8)]"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              />
            )}

            {/* Hotspot-Marker — klickbar, Popup nur bei geöffnetem Pin */}
            {allPoints.map((p) => {
              const isOpen = openPointId === p.id
              const popoverOnLeft = p.x > 55
              const popoverOnTop = p.y > 60
              return (
                <div
                  key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation()
                      setPaused(true)
                      setOpenPointId((cur) => (cur === p.id ? null : p.id))
                    }}
                    aria-label={`Schaden: ${p.label}`}
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full border-2 border-white font-serif text-[11px] font-bold shadow-lg shadow-black/40 transition hover:scale-110 md:h-9 md:w-9 md:text-sm',
                      p.party === 'client' ? 'bg-gold text-ink' : 'bg-red-500 text-white',
                      isOpen && 'scale-110 ring-2 ring-white/60',
                    )}
                  >
                    {p.number}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className={cn(
                          'pointer-events-none absolute z-20 w-[min(16rem,calc(100vw-2rem))] rounded-lg border border-white/10 bg-black/90 p-3 shadow-2xl backdrop-blur-md',
                          popoverOnLeft ? 'right-1/2 mr-3' : 'left-1/2 ml-3',
                          popoverOnTop ? 'bottom-full mb-2' : 'top-full mt-2',
                        )}
                      >
                        <div
                          className={cn(
                            'text-[10px] uppercase tracking-wider',
                            p.party === 'client' ? 'text-gold-soft' : 'text-red-300',
                          )}
                        >
                          {p.label}
                        </div>
                        <div className="mt-1 font-serif text-lg font-semibold text-white">
                          {p.repair}
                        </div>
                        {p.damage && (
                          <p className="mt-2 text-[11px] leading-relaxed text-neutral-300">
                            {p.damage}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* Zwei getrennte Summen-Badges */}
            <div className="absolute top-4 right-4 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-soft backdrop-blur">
              Gutachten abgeschlossen
            </div>

            <div className="absolute bottom-4 left-4 rounded-xl border border-gold/40 bg-black/85 px-5 py-3 backdrop-blur-md">
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold-soft">
                {collisionScene.client.label}
              </div>
              <div className="font-serif text-2xl font-semibold text-white md:text-3xl">
                {clientTotal.toLocaleString('de-DE')} €
              </div>
              <div className="mt-0.5 text-[10px] text-neutral-500">{collisionScene.client.sublabel}</div>
            </div>

            <div className="absolute right-4 bottom-4 rounded-xl border border-red-500/40 bg-black/85 px-5 py-3 backdrop-blur-md">
              <div className="text-[10px] uppercase tracking-[0.2em] text-red-300">
                {collisionScene.opponent.label}
              </div>
              <div className="font-serif text-2xl font-semibold text-white md:text-3xl">
                {opponentTotal.toLocaleString('de-DE')} €
              </div>
              <div className="mt-0.5 text-[10px] text-neutral-500">
                {collisionScene.opponent.sublabel}
              </div>
            </div>
          </div>

          {/* Drag-Handle */}
          <div
            className="absolute inset-y-0 z-20 flex items-center"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="h-full w-0.5 bg-white/90 shadow-[0_0_20px_rgba(184,145,94,0.8)]" />
            <motion.div
              className="absolute flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-gold text-ink shadow-xl"
              animate={{ scale: paused ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 1.8, repeat: paused ? Infinity : 0, ease: 'easeInOut' }}
            >
              <ChevronsLeftRight size={22} strokeWidth={2.5} />
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-5 text-xs">
            <span className="flex items-center gap-2 text-neutral-400">
              <span className="h-2.5 w-2.5 rounded-full bg-gold" />
              {collisionScene.client.label}
            </span>
            <span className="flex items-center gap-2 text-neutral-400">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              {collisionScene.opponent.label}
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400">
              Gesamt:{' '}
              <span className="font-serif text-base font-semibold text-white">
                {grandTotal.toLocaleString('de-DE')} €
              </span>
            </span>
          </div>
          {paused && (
            <button
              onClick={() => setPaused(false)}
              className="text-xs text-gold-soft hover:text-gold underline underline-offset-2"
            >
              Auto-Vorschau neu starten
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
