import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { brand } from '../../lib/content.js'
import { asset } from '../../lib/utils.js'

// Original Google-Wallet-Icon (2022, Wikimedia Commons, public domain).
// Vier gestaffelte Karten in den Google-Markenfarben — identisch zum
// Play-Store-App-Icon.
function GoogleWalletIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 79 71" className={className} aria-hidden>
      <path
        fill="#4285f4"
        d="M 0,29.048546 49.575109,41.239 c 5.858191,1.427514 12.093461,0.129285 16.87967,-3.630731 L 78.109212,28.53141 v 28.528716 c 0,7.132179 -5.669651,12.968822 -12.597131,12.968822 H 12.597131 C 5.6696514,70.028948 0,64.192305 0,57.060126 Z"
      />
      <path
        fill="#fe2c25"
        d="m 12.597663,22.04492 c -4.9611601,0 -9.264,3.00129 -11.3144601,7.32031 L 49.574223,41.23828 c 5.85819,1.42751 12.09465,0.12916 16.88086,-3.63086 l 10.42773,-8.12109 c -2.02681,-4.38406 -6.36371,-7.44141 -11.37109,-7.44141 z"
      />
      <path
        fill="#ffbb00"
        d="M 12.597663,11.023438 C 5.6701829,11.023438 0,16.858055 0,23.990234 v 5.058594 l 1.2832,0.316406 c 2.0504601,-4.319025 6.3533,-7.320312 11.3144601,-7.320312 h 52.91406 c 5.00738,0 9.34428,3.057346 11.37109,7.441406 l 1.22657,-0.955078 v -4.541016 c 0,-7.132179 -5.67018,-12.9668 -12.59766,-12.9668 z"
      />
      <path
        fill="#34a853"
        d="M 12.597659,0 C 5.67018,0 0,5.836571 0,12.96875 v 11.021484 c 0,-7.132179 5.67017665,-12.9668 12.59765605,-12.9668 h 52.914063 c 6.92748,0 12.597656,5.834617 12.597656,12.9668 V 12.96875 C 78.109378,5.836571 72.439202,0 65.511722,0 Z"
      />
    </svg>
  )
}

export default function WalletButton({ className = '' }) {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

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

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <motion.button
          type="button"
          onClick={addToApple}
          disabled={loading !== null}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="flex items-center justify-center gap-3 rounded-full bg-black px-6 py-3.5 text-white shadow-lg shadow-black/30 ring-1 ring-white/10 transition disabled:opacity-60"
        >
          {loading === 'apple' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <img src={asset('apple-wallet.png')} alt="" className="h-6 w-6" />
          )}
          <span className="text-sm font-semibold tracking-wide sm:text-base">
            {loading === 'apple' ? 'Pass wird erstellt …' : 'Zu Apple Wallet hinzufügen'}
          </span>
        </motion.button>
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
            <GoogleWalletIcon className="h-6 w-6" />
          )}
          <span className="text-sm font-semibold tracking-wide sm:text-base">
            {loading === 'google' ? 'Pass wird erstellt …' : 'Zu Google Wallet hinzufügen'}
          </span>
        </motion.button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
