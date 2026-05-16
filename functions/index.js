import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret, defineString } from 'firebase-functions/params'
import { createSaveJwt } from './lib/wallet.js'
import { upsertGoogleWalletClass } from './lib/wallet-class-setup.js'
import { buildApplePass, newSerial } from './lib/apple-wallet.js'

const walletSaKey = defineSecret('GOOGLE_WALLET_SA_KEY')
const issuerId = defineString('WALLET_ISSUER_ID')
const classSuffix = defineString('WALLET_CLASS_SUFFIX', { default: 'unfallhilfe_v1' })
const origin = defineString('SITE_ORIGIN', { default: 'https://hannover-kfz-gutachter.de' })
const phone = defineString('CONTACT_PHONE', { default: '+4917680444241' })
const whatsapp = defineString('CONTACT_WHATSAPP', { default: 'https://wa.me/4917680444241' })

const applePassCert = defineSecret('APPLE_PASS_SIGNER_CERT')
const applePassKey = defineSecret('APPLE_PASS_SIGNER_KEY')
const appleTeamId = defineString('APPLE_TEAM_ID', { default: 'K636NK48Y2' })

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

// Temporary one-shot: re-deploys the Google Wallet Class so existing+future passes
// pick up the new card-template layout. Hit it once after deploy, then remove.
export const setupWalletClass = onRequest(
  { cors: true, secrets: [walletSaKey], region: 'europe-west1', invoker: 'public' },
  async (req, res) => {
    try {
      process.env.GOOGLE_WALLET_SA_KEY = walletSaKey.value()
      const result = await upsertGoogleWalletClass({
        issuerId: issuerId.value(),
        classSuffix: classSuffix.value(),
        origin: origin.value(),
      })
      res.json({ ok: true, ...result })
    } catch (err) {
      console.error('setupWalletClass failed', err)
      res.status(500).json({ error: err.message })
    }
  }
)

export const applePass = onRequest(
  {
    cors: true,
    secrets: [applePassCert, applePassKey],
    region: 'europe-west1',
    invoker: 'public',
  },
  async (req, res) => {
    try {
      process.env.APPLE_PASS_SIGNER_CERT = applePassCert.value()
      process.env.APPLE_PASS_SIGNER_KEY = applePassKey.value()

      const buffer = await buildApplePass({
        teamId: appleTeamId.value(),
        serialNumber: newSerial(),
      })

      res.set('Content-Type', 'application/vnd.apple.pkpass')
      res.set('Content-Disposition', 'attachment; filename="unfallhilfe.pkpass"')
      res.set('Cache-Control', 'no-store')
      res.status(200).send(buffer)
    } catch (err) {
      console.error('applePass failed', err)
      res.status(500).json({ error: err.message })
    }
  }
)
