import { useRef, useState, useEffect } from 'react'
import { stats } from '../lib/content.js'

function useCountUp(target, shouldStart, duration = 1600) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, shouldStart, duration])
  return value
}

function StatItem({ stat, visible, delay }) {
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [visible, delay])

  const value = useCountUp(stat.value, started)

  return (
    <div
      className={`group relative flex flex-col border-l border-line pl-6 transition-opacity duration-500 md:border-l-0 md:border-t-0 md:pl-0 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-baseline gap-1 font-serif text-5xl font-semibold leading-none text-ink md:text-6xl lg:text-7xl">
        <span className="tabular-nums">{value}</span>
        <span className="text-3xl text-gold-dark md:text-4xl lg:text-5xl">{stat.suffix}</span>
      </div>
      <div className="mt-4 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
      <div className="mt-3 font-serif text-lg font-semibold text-ink">{stat.label}</div>
      <div className="mt-1 text-sm text-ink-muted">{stat.sub}</div>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative bg-cream-dark/40 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Unsere Zusagen</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-ink md:text-4xl">
            Vier Zahlen, auf die Sie sich verlassen können.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} visible={visible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  )
}
