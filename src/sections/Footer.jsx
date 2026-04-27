import { brand } from '../lib/content.js'
import { asset } from '../lib/utils.js'

export default function Footer() {
  return (
    <footer className="bg-ink py-14 text-cream/70">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-flex items-center rounded-2xl bg-cream px-5 py-4 shadow-xl shadow-black/30">
              <img
                src={asset('logo/logo-512.png')}
                alt={brand.name}
                className="h-24 w-auto md:h-28"
                width="512"
                height="384"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Unabhängige Kfz-Gutachten für Privatkunden, Versicherungen, Anwälte und Gewerbe
              im Raum Hannover.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-soft">Kontakt</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={brand.phoneHref} className="hover:text-cream">{brand.phone}</a></li>
              <li><a href={brand.emailHref} className="hover:text-cream">{brand.email}</a></li>
              <li>{brand.address.street}</li>
              <li>{brand.address.zip} {brand.address.city}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-soft">Rechtliches</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/impressum.html" className="hover:text-cream">Impressum</a></li>
              <li><a href="/datenschutz.html" className="hover:text-cream">Datenschutzerklärung</a></li>
              <li><a href="/agb.html" className="hover:text-cream">AGB</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {brand.name}. Alle Rechte vorbehalten.</span>
          <span>{brand.hours}</span>
        </div>
      </div>
    </footer>
  )
}
