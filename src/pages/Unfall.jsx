import { motion } from 'framer-motion'
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { brand, certifications } from '../lib/content.js'
import { asset } from '../lib/utils.js'
import WalletButton from '../components/ui/wallet-button.jsx'

// Notfall-Landingpage. Ziel der QR-Codes auf Wallet/Flyer/Visitenkarte.
// Mobile-first: Anrufen ist die einzige Primär-Aktion und ohne Scrollen
// erreichbar.
//
// Brand-Farben sind LOKAL via CSS-Var-Overrides angepasst (Logo ist
// black + yellow-gold, nicht das Site-default navy + bronze). Wirkt
// dadurch nur auf /unfall — Homepage bleibt unverändert.
const UNFALL_THEME = {
  '--color-ink': '#0a0a0c',
  '--color-ink-soft': '#1a1a1c',
  '--color-gold': '#d6b204',
  '--color-gold-soft': '#f0d54e',
  '--color-gold-dark': '#a08502',
}

export default function Unfall() {
  return (
    <div style={UNFALL_THEME} className="min-h-screen bg-cream text-ink">
      {/* Header — Icon-Mark + serif Wordmark statt komplettem PNG mit
          unleserlichem Mini-Wordmark. Live-Dot rechts. */}
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3">
          <a href="/" className="flex items-center gap-3" aria-label={brand.name}>
            <img
              src={asset('logo/icon-black-transparent.png')}
              alt=""
              className="h-9 w-auto sm:h-10"
            />
            <div className="leading-none">
              <div className="font-serif text-base font-semibold tracking-tight sm:text-lg">
                Kfz-Experten Hannover
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gold-dark sm:text-[11px]">
                Sachverständigenbüro
              </div>
            </div>
          </a>
          <div className="flex flex-shrink-0 items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span className="hidden text-xs font-medium tracking-wide text-ink-muted sm:inline">
              Sofort erreichbar
            </span>
          </div>
        </div>
      </header>

      {/* Hero — das Banner-Foto trägt Logo + „Unfall-Soforthilfe"-Tagline
          schon in sich, also kein zusätzlicher Text-Overlay. Bild läuft
          full-bleed; bg-ink ist der Fallback wenn das Bild noch lädt. */}
      <section className="relative w-full bg-ink">
        <motion.img
          src={asset('unfall-hero.webp')}
          alt="Kfz-Experten Hannover — Unfall-Soforthilfe"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="block h-auto w-full"
        />
      </section>

      {/* Wallet-Card direkt nach dem Hero — Hauptzweck der Page: User soll
          die Karte speichern. Vor Anrufen, damit es als erstes auffällt. */}
      <section className="relative z-10 mt-6 px-5 sm:mt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-ink text-cream shadow-2xl shadow-black/25 ring-1 ring-white/10"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 100% 0%, rgba(214,178,4,0.55), transparent 50%)',
            }}
            aria-hidden
          />
          <div className="relative p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-xs">
              <Clock className="h-3.5 w-3.5" /> Jetzt für den Ernstfall speichern
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight leading-tight sm:text-3xl">
              Notfall-Karte in Ihre Wallet.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
              Anruf- und WhatsApp-Button direkt vom Sperrbildschirm — auch ohne Internet.
            </p>
            <WalletButton className="mt-5" />
          </div>
        </motion.div>
      </section>

      {/* Aktionen — Anruf primär, WhatsApp + Standort darunter. */}
      <section className="relative z-10 mt-4 px-5 sm:mt-6">
        <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
          <motion.a
            href={brand.phoneHref}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            whileTap={{ scale: 0.985 }}
            className="group flex items-center gap-4 rounded-3xl bg-ink p-5 text-cream shadow-2xl shadow-black/25 ring-1 ring-white/10 transition hover:bg-ink-soft sm:gap-5 sm:p-6"
          >
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold sm:h-16 sm:w-16">
              <Phone className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.1} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-soft sm:text-xs">
                Sofort anrufen
              </div>
              <div className="mt-0.5 text-2xl font-bold tracking-tight tabular-nums leading-none sm:text-3xl">
                {brand.phone}
              </div>
            </div>
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold text-black shadow-md shadow-gold/20 transition group-hover:bg-gold-soft sm:h-10 sm:w-10">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
          </motion.a>

          <motion.a
            href={brand.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileTap={{ scale: 0.985 }}
            className="flex items-center gap-4 rounded-3xl border border-line bg-card p-5 text-ink shadow-sm transition hover:border-ink/30 hover:shadow-md sm:gap-5 sm:p-6"
          >
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/12 text-[#1d9d52] sm:h-16 sm:w-16">
              <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.1} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted sm:text-xs">
                WhatsApp
              </div>
              <div className="mt-0.5 text-lg font-bold tracking-tight leading-tight sm:text-xl">
                Schaden in 30 Sek. melden
              </div>
            </div>
          </motion.a>

          <motion.a
            href={brand.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            whileTap={{ scale: 0.985 }}
            className="flex items-center gap-4 rounded-3xl border border-line bg-cream-dark p-4 text-ink transition hover:border-ink/30 sm:p-5"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold/12 text-gold sm:h-12 sm:w-12">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.1} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted sm:text-xs">
                Unser Büro
              </div>
              <div className="mt-0.5 text-sm font-semibold sm:text-base">
                {brand.address.street} · {brand.address.zip} {brand.address.city}
              </div>
            </div>
            <span className="text-xs font-semibold text-gold-dark">Route</span>
          </motion.a>
        </div>
      </section>

      <div className="pb-12 sm:pb-16" />

      {/* Trust + Footer — knapp, mit Zertifikaten und Legal-Pflichtdaten. */}
      <footer className="border-t border-line bg-cream-dark px-5 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <ShieldCheck className="h-4 w-4 text-gold" strokeWidth={2.2} />
            {certifications.map((c) => (
              <span key={c} className="text-xs font-medium text-ink-muted">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-5 text-xs leading-relaxed text-ink-muted">
            <div className="text-ink">{brand.legalOwner}</div>
            <div>
              {brand.address.street} · {brand.address.zip} {brand.address.city}
            </div>
            <div className="mt-1">{brand.hours}</div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <a href={brand.emailHref} className="underline-offset-4 hover:underline">
                {brand.email}
              </a>
              <a href="/impressum.html" className="underline-offset-4 hover:underline">
                Impressum
              </a>
              <a href="/datenschutz.html" className="underline-offset-4 hover:underline">
                Datenschutz
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
