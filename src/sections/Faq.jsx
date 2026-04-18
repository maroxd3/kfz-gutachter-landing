import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faq } from '../lib/content.js'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Häufige Fragen</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">
            Das sollten Sie wissen.
          </h2>
        </div>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-xl font-medium text-ink">{item.q}</span>
                  <span className="mt-1 flex-shrink-0 text-gold">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-10 text-base leading-relaxed text-ink-soft">
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
