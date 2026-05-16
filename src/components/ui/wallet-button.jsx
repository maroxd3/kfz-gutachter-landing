import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Loader2 } from 'lucide-react'
import { brand } from '../../lib/content.js'

// Google-Wallet-Glyph nach Google-Brand-Guidelines: weißer Wallet-Body, oben
// eine Karte in den vier Google-Markenfarben. So erkennt der User sofort,
// dass er in Google Wallet landet (nicht in einer generischen Wallet-App).
function GoogleWalletGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="3" y="10" width="26" height="17" rx="3" fill="white" />
      <rect x="3" y="10" width="26" height="3.5" fill="rgba(0,0,0,0.08)" />
      <g>
        <rect x="18" y="5" width="11" height="9" rx="1.5" fill="#4285F4" />
        <rect x="18" y="5" width="2.75" height="9" fill="#EA4335" />
        <rect x="20.75" y="5" width="2.75" height="9" fill="#FBBC04" />
        <rect x="23.5" y="5" width="2.75" height="9" fill="#34A853" />
      </g>
    </svg>
  )
}

function detectPlatform() {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent || ''
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'desktop'
}

export default function WalletButton({ className = '' }) {
  const [platform, setPlatform] = useState('unknown')
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setPlatform(detectPlatform())
  }, [])

  async function addToGoogle() {
    setLoading('google')
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
      setLoading(null)
    }
  }

  async function addToApple() {
    setLoading('apple')
    setError(null)
    try {
      const resp = await fetch(brand.appleWalletApiUrl, { method: 'POST' })
      if (!resp.ok) throw new Error(`Server antwortet ${resp.status}`)
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      window.location.href = url
    } catch (e) {
      setError('Apple-Wallet-Pass konnte gerade nicht erstellt werden. Bitte später erneut versuchen.')
      console.error(e)
    } finally {
      setLoading(null)
    }
  }

  const showApple = platform === 'ios' || platform === 'desktop'
  const showGoogle = platform === 'android' || platform === 'desktop'

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {showApple && (
          <motion.button
            type="button"
            onClick={addToApple}
            disabled={loading !== null}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="flex items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition disabled:opacity-60"
          >
            {loading === 'apple' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Wallet className="h-5 w-5" strokeWidth={2.2} />
            )}
            <span className="text-sm font-medium tracking-wide sm:text-base">
              {loading === 'apple' ? 'Pass wird erstellt …' : 'Zu Apple Wallet hinzufügen'}
            </span>
          </motion.button>
        )}
        {showGoogle && (
          <motion.button
            type="button"
            onClick={addToGoogle}
            disabled={loading !== null}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-[#202124] shadow-lg shadow-black/30 ring-1 ring-black/5 transition disabled:opacity-60"
          >
            {loading === 'google' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <GoogleWalletGlyph className="h-6 w-6" />
            )}
            <span className="text-sm font-semibold tracking-wide sm:text-base">
              {loading === 'google' ? 'Pass wird erstellt …' : 'Zu Google Wallet hinzufügen'}
            </span>
          </motion.button>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
