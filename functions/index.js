import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret, defineString } from 'firebase-functions/params'
import { createSaveJwt } from './lib/wallet.js'

const walletSaKey = defineSecret('GOOGLE_WALLET_SA_KEY')
const issuerId = defineString('WALLET_ISSUER_ID')
const classSuffix = defineString('WALLET_CLASS_SUFFIX', { default: 'unfallhilfe_v1' })
const origin = defineString('SITE_ORIGIN', { default: 'https://hannover-kfz-gutachter.de' })
const phone = defineString('CONTACT_PHONE', { default: '+4917680444241' })
const whatsapp = defineString('CONTACT_WHATSAPP', { default: 'https://wa.me/4917680444241' })

export const walletPass = onRequest(
  { cors: true, secrets: [walletSaKey], region: 'europe-west1', invoker: 'public' },
  (req, res) => {
    try {
      process.env.GOOGLE_WALLET_SA_KEY = walletSaKey.value()
      const objectSuffix = `obj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const unfallUrl = `${origin.value()}/unfall`
      const saveUrl = createSaveJwt({
        issuerId: issuerId.value(),
        classSuffix: classSuffix.value(),
        objectSuffix,
        phone: phone.value(),
        whatsapp: whatsapp.value(),
        unfallUrl,
        origin: origin.value(),
      })
      res.json({ saveUrl })
    } catch (err) {
      console.error('walletPass failed', err)
      res.status(500).json({ error: err.message })
    }
  }
)
