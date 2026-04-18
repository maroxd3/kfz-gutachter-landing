import { Phone } from 'lucide-react'
import { brand } from '../lib/content.js'

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold tracking-tight text-white">
            {brand.nameShort}
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-gold-soft sm:inline">
            {brand.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
          <a href="#leistungen" className="hover:text-gold">Leistungen</a>
          <a href="#ablauf" className="hover:text-gold">Ablauf</a>
          <a href="#ueber-mich" className="hover:text-gold">Über mich</a>
          <a href="#kontakt" className="hover:text-gold">Kontakt</a>
        </nav>

        <a
          href={brand.phoneHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:border-gold hover:bg-white/15"
        >
          <Phone size={16} />
          <span className="hidden sm:inline">{brand.phone}</span>
          <span className="sm:hidden">Anrufen</span>
        </a>
      </div>
    </header>
  )
}
