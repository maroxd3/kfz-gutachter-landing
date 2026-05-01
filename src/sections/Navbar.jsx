import { Phone } from 'lucide-react'
import { brand } from '../lib/content.js'
import { asset } from '../lib/utils.js'

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" aria-label={brand.name} className="inline-flex items-center">
          <img
            src={asset('logo/logo-1200-dark.png')}
            alt={`${brand.name} — Sachverständigenbüro`}
            className="h-14 w-auto md:h-20"
            width="1200"
            height="900"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
          <a href="#leistungen" className="hover:text-gold">Leistungen</a>
          <a href="#ablauf" className="hover:text-gold">Ablauf</a>
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
