import { useState } from 'react'
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, Check } from 'lucide-react'
import { brand } from '../lib/content.js'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    // TODO: an Firestore `leads` Collection anbinden (wie bei gotakt).
    // Aktuell: fallback auf mailto:, damit Formular sofort funktioniert.
    const body = `Name: ${form.name}%0D%0ATelefon: ${form.phone}%0D%0A%0D%0A${form.message}`
    window.location.href = `mailto:${brand.email}?subject=Gutachten-Anfrage&body=${body}`
    setTimeout(() => setStatus('sent'), 400)
  }

  return (
    <section id="kontakt" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">Kontakt</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">
            Sprechen wir.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Ein kurzer Anruf, und wir klären alles Weitere. Bei Unfällen rund um die Uhr
            erreichbar — wir sind für Sie da, wenn Sie uns brauchen.
          </p>

          <div className="mt-10 space-y-5">
            <ContactLine icon={Phone} label="Telefon" value={brand.phone} href={brand.phoneHref} />
            <ContactLine icon={MessageCircle} label="WhatsApp" value={brand.whatsapp} href={brand.whatsappHref} />
            <ContactLine icon={Mail} label="E-Mail" value={brand.email} href={brand.emailHref} />
            <ContactLine
              icon={MapPin}
              label="Adresse"
              value={`${brand.address.street} · ${brand.address.zip} ${brand.address.city}`}
              href={brand.googleMaps}
            />
            <ContactLine icon={Clock} label="Öffnungszeiten" value={brand.hours} />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-line bg-white p-8 shadow-sm md:p-10"
        >
          <h3 className="font-serif text-2xl font-semibold text-ink">Gutachten anfordern</h3>
          <p className="mt-2 text-sm text-ink-muted">
            Wir melden uns innerhalb von 2 Stunden zurück.
          </p>

          <div className="mt-6 space-y-4">
            <Field label="Name">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </Field>
            <Field label="Telefon">
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </Field>
            <Field label="Ihr Anliegen">
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Kurze Beschreibung des Schadens oder der gewünschten Leistung"
                className="w-full resize-none rounded-lg border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-ink-soft disabled:opacity-60"
          >
            {status === 'sent' ? (
              <>
                <Check size={16} /> Anfrage gesendet
              </>
            ) : (
              <>
                <Send size={16} /> Anfrage senden
              </>
            )}
          </button>

          <p className="mt-4 text-xs text-ink-muted">
            Mit dem Absenden stimmen Sie unserer{' '}
            <a href="#datenschutz" className="underline hover:text-ink">Datenschutzerklärung</a> zu.
          </p>
        </form>
      </div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      {children}
    </label>
  )
}

function ContactLine({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line bg-white text-gold">
        <Icon size={18} />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-ink-muted">{label}</div>
        <div className="mt-0.5 font-medium text-ink">{value}</div>
      </div>
    </div>
  )
  return href ? (
    <a href={href} className="block transition hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  )
}
