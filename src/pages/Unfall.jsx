import { motion } from 'framer-motion'
import { Phone, MessageCircle, Camera, MapPin } from 'lucide-react'
import { brand } from '../lib/content.js'
import { asset } from '../lib/utils.js'
import WalletButton from '../components/ui/wallet-button.jsx'

// Notfall-Landingpage. Ziel der QR-Codes auf Flyer & Visitenkarte.
// Maximaler Fokus: Anrufen, WhatsApp, Pass speichern. Kein Marketing.
export default function Unfall() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-line bg-cream-dark">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
          <a href="/" className="flex items-center gap-3">
            <img src={asset('logo/logo-256.png')} alt="" className="h-10 w-10" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">{brand.name}</div>
              <div className="text-xs text-ink-muted">{brand.tagline}</div>
            </div>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Unfallhilfe</p>
          <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
            Ruhig bleiben. Wir helfen Ihnen — Schritt für Schritt.
          </h1>
          <p className="mt-3 text-ink-muted">
            Sie haben gerade einen Unfall? Drücken Sie einen der Knöpfe unten.
            Wir melden uns sofort und kommen zu Ihnen.
          </p>
        </motion.section>

        <section className="mt-8 grid gap-3">
          <a
            href={brand.phoneHref}
            className="flex items-center justify-between gap-4 rounded-2xl bg-ink p-5 text-cream shadow-lg shadow-black/10 transition hover:bg-ink-soft"
          >
            <div>
              <div className="text-xs uppercase tracking-wider text-gold">Sofort anrufen</div>
              <div className="mt-0.5 text-lg font-semibold sm:text-xl">{brand.phone}</div>
            </div>
            <Phone className="h-7 w-7 text-gold" strokeWidth={2.2} />
          </a>

          <a
            href={brand.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-2xl bg-[#25D366] p-5 text-white shadow-lg shadow-black/10 transition hover:brightness-110"
          >
            <div>
              <div className="text-xs uppercase tracking-wider opacity-90">WhatsApp schreiben</div>
              <div className="mt-0.5 text-lg font-semibold sm:text-xl">Schaden in 30 Sek. melden</div>
            </div>
            <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
          </a>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-xl sm:text-2xl">Während Sie warten</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <Camera className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
              <span>
                <strong className="font-semibold">Fotos machen:</strong> Schaden aus 4 Richtungen,
                Kennzeichen beider Fahrzeuge, Unfallstelle aus Distanz.
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
              <span>
                <strong className="font-semibold">Daten austauschen:</strong> Name, Adresse,
                Versicherung & Kennzeichen der Gegenseite. <em>Keine Schuldfrage am Unfallort klären.</em>
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
              <span>
                <strong className="font-semibold">Nicht der gegnerischen Versicherung anrufen:</strong>{' '}
                Lassen Sie uns das übernehmen — wir vertreten ausschließlich Ihre Interessen.
              </span>
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-line bg-card p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
            <span>Für später speichern</span>
          </div>
          <h2 className="mt-2 font-serif text-xl">Notfall-Karte in Google Wallet</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Diese Seite in Sekunden erreichen — auch ohne Internet. Wir landen direkt
            in Ihrer Wallet, mit Anruf- und WhatsApp-Knopf. Kein Konto, kein Abo.
          </p>
          <WalletButton className="mt-4" />
          <p className="mt-3 text-xs text-ink-muted">
            Funktioniert mit Google Wallet auf Android. Auf iPhone: bald als Apple Wallet Pass.
          </p>
        </section>

        <footer className="mt-12 border-t border-line pt-6 text-xs text-ink-muted">
          {brand.legalOwner} · {brand.address.street}, {brand.address.zip} {brand.address.city}
          <br />
          <a href={brand.emailHref} className="underline-offset-4 hover:underline">
            {brand.email}
          </a>
        </footer>
      </main>
    </div>
  )
}
