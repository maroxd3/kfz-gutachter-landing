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
// erreichbar. Farbpalette lokal auf near-black + gold gezogen (matched
// das Logo besser als das Site-default-navy).
//
// /public/unfall-hero.webp wird als Hero-Bild geladen, sobald vorhanden.
// Fehlt die Datei, zeigt der Hero den gold-getönten Gradient-Fallback.
const NEAR_BLACK = '#0a0a0c'

export default function Unfall() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Header — Icon-Mark + serif Wordmark statt komplettem PNG mit
          unleserlichem Mini-Wordmark. Live-Dot rechts. */}
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3">
          <a href="/" className="flex items-center gap-3" aria-label={brand.name}>
            <img
              src={asset('logo/icon-512.png')}
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

      {/* Hero — near-black mit Foto-Background (oder Gradient-Fallback).
          Foto liegt unter /public/unfall-hero.webp. */}
      <section
        className="relative overflow-hidden text-cream"
        style={{ backgroundColor: NEAR_BLACK }}
      >
        <img
          src={asset('unfall-hero.webp')}
          alt=""
          aria-hidden
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.85) 60%, rgba(10,10,12,1) 100%), radial-gradient(circle at 18% 0%, rgba(184,145,94,0.45), transparent 55%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-5 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-soft backdrop-blur-sm sm:text-xs"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Soforthilfe
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-5 bg-gradient-to-b from-white to-neutral-400 bg-clip-text font-serif text-4xl font-semibold leading-[1.02] text-transparent sm:text-6xl"
          >
            Ruhig bleiben.
            <br />
            <span className="italic text-gold [-webkit-text-fill-color:initial]">
              Wir sind in 45 Min. bei Ihnen.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Aktionen — Anruf primär (überlappt Hero), WhatsApp + Standort darunter. */}
      <section className="relative z-10 -mt-10 px-5 sm:-mt-14">
        <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
          <motion.a
            href={brand.phoneHref}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            whileTap={{ scale: 0.985 }}
            style={{ backgroundColor: NEAR_BLACK }}
            className="group flex items-center gap-4 rounded-3xl p-5 text-cream shadow-2xl shadow-black/25 ring-1 ring-white/10 transition hover:brightness-110 sm:gap-5 sm:p-6"
          >
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold sm:h-16 sm:w-16">
              <Phone className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.1} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold-soft sm:text-xs">
                Sofort anrufen
              </div>
              <div className="mt-0.5 font-serif text-2xl leading-none sm:text-3xl">
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
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink-muted sm:text-xs">
                WhatsApp
              </div>
              <div className="mt-0.5 font-serif text-xl leading-tight sm:text-2xl">
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
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink-muted sm:text-xs">
                Unser Büro
              </div>
              <div className="mt-0.5 text-sm font-semibold sm:text-base">
                {brand.address.street} · {brand.address.zip} {brand.address.city}
              </div>
            </div>
            <span className="text-xs font-medium text-gold-dark">Route</span>
          </motion.a>
        </div>
      </section>

      {/* Wallet — derselbe near-black-Block wie der Anrufen-Button, damit es
          als „brand surface" durchgeht. Goldakzent oben rechts. */}
      <section className="px-5 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          style={{ backgroundColor: NEAR_BLACK }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl text-cream shadow-xl shadow-black/25 ring-1 ring-white/10"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(circle at 100% 0%, rgba(184,145,94,0.55), transparent 50%)',
            }}
            aria-hidden
          />
          <div className="relative p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold sm:text-xs">
              <Clock className="h-3.5 w-3.5" /> Für später speichern
            </div>
            <h2 className="mt-3 font-serif text-2xl leading-tight sm:text-3xl">
              Notfall-Karte für{' '}
              <span className="italic text-gold">Ihre Wallet</span>.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-300 sm:text-base">
              Anruf- und WhatsApp-Button direkt vom Sperrbildschirm — auch ohne Internet.
            </p>
            <WalletButton className="mt-5" />
          </div>
        </motion.div>
      </section>

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
