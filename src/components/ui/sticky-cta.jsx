import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { brand } from '../../lib/content.js'

// Sichtbar erst NACH dem Hero (vermeidet Duplikat zu den Hero-CTAs).
// Bleibt dann fix unten rechts. Mobile-first, auf Desktop dezent kleiner.
export default function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 bottom-4 z-[60] flex flex-col gap-3 sm:right-6 sm:bottom-6"
          aria-label="Schnellkontakt"
        >
          <a
            href={brand.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Per WhatsApp Kontakt aufnehmen"
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition hover:scale-105 hover:shadow-2xl"
          >
            <MessageCircle size={26} strokeWidth={2.2} className="drop-shadow-sm" />
            <span className="sr-only">WhatsApp</span>
          </a>
          <a
            href={brand.phoneHref}
            aria-label={`Anrufen: ${brand.phone}`}
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-xl shadow-black/30 ring-2 ring-gold/30 transition hover:scale-105 hover:bg-gold-soft hover:shadow-2xl"
          >
            <Phone size={26} strokeWidth={2.4} />
            <span className="sr-only">{brand.phone}</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
