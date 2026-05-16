import { motion } from 'framer-motion'
import {
  Phone,
  MessageCircle,
  MapPin,
  Camera,
  ShieldAlert,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { brand, certifications } from '../lib/content.js'
import { asset } from '../lib/utils.js'
import WalletButton from '../components/ui/wallet-button.jsx'

// Notfall-Landingpage. Ziel der QR-Codes auf Wallet/Flyer/Visitenkarte.
// Mobile-first für Panik-Situation: riesige Tap-Targets, eine klare
// Primär-Aktion (Anrufen), keine Ablenkung. Premium-Look matched
// die Hauptseite (ink/gold/cream, Cormorant Garamond, framer-motion).
export default function Unfall() {
  const waitingSteps = [
    {
      n: '01',
      icon: Camera,
      title: 'Fotos machen',
      body: 'Schaden aus 4 Richtungen, Kennzeichen beider Fahrzeuge, Unfallstelle aus Distanz.',
    },
    {
      n: '02',
      icon: ShieldAlert,
      title: 'Daten austauschen',
      body: 'Name, Adresse, Versicherung & Kennzeichen der Gegenseite. Keine Schuldfrage am Unfallort klären.',
    },
    {
      n: '03',
      icon: Phone,
      title: 'Nicht der Gegenseite anrufen',
      body: 'Lassen Sie uns das übernehmen — wir vertreten ausschließlich Ihre Interessen.',
    },
  ]

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Sticky Notfall-Header — bleibt beim Scrollen sichtbar.
          Logo links, Live-Dot + "Erreichbar"-Zeile rechts. */}
      <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3 sm:py-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src={asset('logo/logo-256.png')}
              alt=""
              className="h-9 w-9 sm:h-10 sm:w-10"
            />
            <div className="leading-tight">
              <div className="text-[13px] font-semibold sm:text-sm">{brand.name}</div>
              <div className="text-[11px] text-ink-muted sm:text-xs">Notfall-Hilfe</div>
            </div>
          </a>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span className="text-xs text-ink-muted">Sofort erreichbar</span>
          </div>
        </div>
      </header>

      {/* Hero — dunkler Ink-Block, serif H1 mit gold-italic Akzent.
          Auf Mobile bewusst kompakt, damit die Aktions-Buttons direkt sichtbar bleiben. */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 0%, rgba(184,145,94,0.55), transparent 55%), radial-gradient(circle at 80% 100%, rgba(184,145,94,0.35), transparent 60%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-5 pt-8 pb-10 sm:pt-12 sm:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-soft backdrop-blur-sm sm:text-xs"
          >
            <span className="relative flex h-1.5 w-1.5 sm:hidden">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Unfall — Soforthilfe
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 bg-gradient-to-b from-white to-neutral-400 bg-clip-text font-serif text-3xl font-semibold leading-[1.05] text-transparent sm:mt-5 sm:text-5xl"
          >
            Ruhig bleiben.
            <br />
            <span className="italic text-gold [-webkit-text-fill-color:initial]">
              Wir sind in 45 Minuten bei Ihnen.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-300 sm:text-base"
          >
            Tippen Sie unten auf <span className="text-gold-soft">Anrufen</span>.
            Wir nehmen sofort ab und begleiten Sie ab der ersten Minute —
            zur Unfallstelle, ins Gespräch mit der Versicherung, bis das Geld da ist.
          </motion.p>
        </div>
      </section>

      {/* Aktions-Block — primär Anrufen, sekundär WhatsApp, tertiär Standort.
          Negative Margin sorgt für eleganten Überlapp mit der Ink-Sektion. */}
      <section className="relative z-10 -mt-7 px-5 sm:-mt-10">
        <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
          <motion.a
            href={brand.phoneHref}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            whileTap={{ scale: 0.985 }}
            className="group flex items-center gap-4 rounded-3xl bg-ink p-5 text-cream shadow-2xl shadow-ink/25 ring-1 ring-white/10 transition hover:bg-ink-soft sm:gap-5 sm:p-6"
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
              <div className="mt-1.5 text-xs text-neutral-400">
                Wir gehen persönlich ran. Keine Warteschleife.
              </div>
            </div>
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold text-ink shadow-md shadow-gold/20 transition group-hover:bg-gold-soft sm:h-10 sm:w-10">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                WhatsApp schreiben
              </div>
              <div className="mt-0.5 font-serif text-xl leading-tight sm:text-2xl">
                Schaden in 30 Sek. melden
              </div>
              <div className="mt-1.5 text-xs text-ink-muted">
                Fotos + Standort direkt anhängen.
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

      {/* Während Sie warten — Chapter-Stil mit großen Gold-Nummern. */}
      <section className="px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold sm:text-xs">
              Bis wir da sind
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
              Drei Dinge, die jetzt helfen.
            </h2>
          </motion.div>

          <ol className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
            {waitingSteps.map(({ n, icon: Icon, title, body }, i) => (
              <motion.li
                key={n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative flex gap-4 rounded-2xl border border-line bg-card p-4 sm:gap-5 sm:p-5"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="font-serif text-3xl leading-none text-gold sm:text-4xl">
                    {n}
                  </span>
                  <Icon className="h-4 w-4 text-ink-muted" strokeWidth={2} />
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-serif text-lg leading-tight sm:text-xl">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Wallet-Card — dark premium block, sticht vom cream-Hintergrund ab. */}
      <section className="px-5 pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-ink text-cream shadow-xl shadow-ink/20 ring-1 ring-white/10"
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
              Eine Karte mit Anruf- und WhatsApp-Button — direkt vom Sperrbildschirm
              erreichbar, auch ohne Internet. Kein Konto, kein Abo.
            </p>
            <WalletButton className="mt-5" />
            <p className="mt-3 text-[11px] text-neutral-400 sm:text-xs">
              iPhone: Apple Wallet · Android: Google Wallet.
            </p>
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
