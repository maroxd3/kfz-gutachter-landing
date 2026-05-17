import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret, defineString } from 'firebase-functions/params'
import admin from 'firebase-admin'
import { createSaveJwt } from './lib/wallet.js'
import { upsertGoogleWalletClass } from './lib/wallet-class-setup.js'
import { fetchGoogleWalletClass } from './lib/debug-class-fetch.js'
import { parseCallbackEvent } from './lib/wallet-callback.js'
import { buildApplePass, newSerial } from './lib/apple-wallet.js'

if (!admin.apps.length) admin.initializeApp()
const db = admin.firestore()

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

// Debug: read current class state from Google
export const debugWalletClass = onRequest(
  { cors: true, secrets: [walletSaKey], region: 'europe-west1', invoker: 'public' },
  async (req, res) => {
    try {
      process.env.GOOGLE_WALLET_SA_KEY = walletSaKey.value()
      const result = await fetchGoogleWalletClass({
        issuerId: issuerId.value(),
        classSuffix: classSuffix.value(),
      })
      res.json(result)
    } catch (err) {
      console.error('debugWalletClass failed', err)
      res.status(500).json({ error: err.message })
    }
  }
)

// Google calls this whenever a user saves or deletes our Wallet pass.
// We record every event in Firestore for analytics.
export const walletCallback = onRequest(
  { cors: false, region: 'europe-west1', invoker: 'public' },
  async (req, res) => {
    try {
      const event = parseCallbackEvent(req.body)
      await db.collection('wallet_events').add({
        ts: admin.firestore.FieldValue.serverTimestamp(),
        platform: 'google',
        eventType: event.eventType || 'unknown',
        classId: event.classId || null,
        objectId: event.objectId || null,
        protocolVersion: event.protocolVersion || null,
        looksLegit: event.looksLegit,
        count: event.count || null,
        nonce: event.nonce || null,
      })
      res.status(200).json({ ok: true })
    } catch (err) {
      console.error('walletCallback failed', err, 'body=', typeof req.body === 'string' ? req.body.slice(0, 200) : req.body)
      // Always return 200 so Google doesn't retry-storm us on parse errors
      res.status(200).json({ ok: false, error: err.message })
    }
  }
)

// Read aggregate save/delete stats for the Wallet pass.
export const walletStats = onRequest(
  { cors: true, region: 'europe-west1', invoker: 'public' },
  async (req, res) => {
    try {
      const snap = await db.collection('wallet_events').get()
      let googleSaves = 0, googleDeletes = 0, appleDownloads = 0, other = 0
      snap.forEach((doc) => {
        const d = doc.data()
        const platform = d.platform || (d.classId ? 'google' : 'unknown')
        if (platform === 'google' && d.eventType === 'save') googleSaves++
        else if (platform === 'google' && d.eventType === 'del') googleDeletes++
        else if (platform === 'apple' && d.eventType === 'download') appleDownloads++
        else other++
      })
      res.json({
        google: {
          saves: googleSaves,
          deletes: googleDeletes,
          currentlySaved: googleSaves - googleDeletes,
        },
        apple: {
          downloads: appleDownloads,
        },
        totalReach: googleSaves + appleDownloads,
        totalEvents: snap.size,
        other,
      })
    } catch (err) {
      console.error('walletStats failed', err)
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

      const serial = newSerial()
      const buffer = await buildApplePass({
        teamId: appleTeamId.value(),
        serialNumber: serial,
      })

      res.set('Content-Type', 'application/vnd.apple.pkpass')
      res.set('Content-Disposition', 'attachment; filename="unfallhilfe.pkpass"')
      res.set('Cache-Control', 'no-store')
      res.status(200).send(buffer)

      // Fire-and-forget analytics — anonymous, no PII (no IP, no UA, no device id).
      // "download" = user clicked Add-to-Apple-Wallet and we delivered the .pkpass.
      // Doesn't guarantee user kept it in Wallet (Apple gives no save callback).
      db.collection('wallet_events').add({
        ts: admin.firestore.FieldValue.serverTimestamp(),
        platform: 'apple',
        eventType: 'download',
        serial,
      }).catch((e) => console.error('apple analytics write failed', e))
    } catch (err) {
      console.error('applePass failed', err)
      res.status(500).json({ error: err.message })
    }
  }
)
