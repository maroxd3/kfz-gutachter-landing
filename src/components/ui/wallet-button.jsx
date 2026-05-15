import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Loader2 } from 'lucide-react'
import { brand } from '../../lib/content.js'

// Holt einen signierten Save-to-Wallet Link von der Firebase Function und
// öffnet den Google-Wallet-Save-Flow. Funktioniert auf Android nativ
// (Wallet-App), auf iOS und Desktop landet der User auf der Google-Save-
// Seite (dort steht "QR mit Handy scannen").
export default function WalletButton({ className = '' }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function addToWallet() {
    setLoading(true)
    setError(null)
    try {
      const resp = await fetch(brand.walletApiUrl, { method: 'POST' })
      if (!resp.ok) throw new Error(`Server antwortet ${resp.status}`)
      const { saveUrl } = await resp.json()
      if (!saveUrl) throw new Error('Kein Save-Link erhalten')
      window.location.href = saveUrl
    } catch (e) {
      setError('Pass konnte gerade nicht erstellt werden. Bitte später erneut versuchen.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <motion.button
        type="button"
        onClick={addToWallet}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3 text-cream shadow-lg shadow-black/20 ring-1 ring-white/10 transition disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Wallet className="h-5 w-5 text-gold" strokeWidth={2.2} />
        )}
        <span className="text-sm font-medium tracking-wide sm:text-base">
          {loading ? 'Pass wird erstellt …' : 'Zu Google Wallet hinzufügen'}
        </span>
      </motion.button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
