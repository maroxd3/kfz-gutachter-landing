import { GoogleAuth } from 'google-auth-library'
import jwt from 'jsonwebtoken'

const SCOPES = ['https://www.googleapis.com/auth/wallet_object.issuer']

let cachedCredentials = null
function loadCredentials() {
  if (cachedCredentials) return cachedCredentials
  const raw = process.env.GOOGLE_WALLET_SA_KEY
  if (raw) {
    cachedCredentials = JSON.parse(raw)
    return cachedCredentials
  }
  const auth = new GoogleAuth({ scopes: SCOPES })
  return auth
}

function getServiceAccount() {
  const c = loadCredentials()
  if (c?.client_email && c?.private_key) return c
  throw new Error('No GOOGLE_WALLET_SA_KEY env var set — cannot sign wallet JWT')
}

export function buildPassObject({ issuerId, classSuffix, objectSuffix, phone, whatsapp, unfallUrl }) {
  const classId = `${issuerId}.${classSuffix}`
  const objectId = `${issuerId}.${objectSuffix}`
  const origin = unfallUrl.replace(/\/unfall$/, '')
  const phoneClean = phone.replace(/\s+/g, '')
  const phoneDisplay = phone.startsWith('+49') ? `0${phone.slice(3).replace(/^\s*/, '').trim()}` : phone
  return {
    id: objectId,
    classId,
    state: 'ACTIVE',
    genericType: 'GENERIC_AUTO_INSURANCE',
    cardTitle: {
      defaultValue: { language: 'de', value: 'Kfz-Experten Hannover' },
    },
    header: {
      defaultValue: { language: 'de', value: 'Unfall? Wir helfen sofort.' },
    },
    subheader: {
      defaultValue: { language: 'de', value: '24/7 Unfall-Soforthilfe' },
    },
    hexBackgroundColor: '#000000',
    logo: {
      sourceUri: { uri: `${origin}/logo/wallet-logo.png` },
      contentDescription: {
        defaultValue: { language: 'de', value: 'Kfz-Experten Hannover Logo' },
      },
    },
    heroImage: {
      sourceUri: { uri: `${origin}/logo/wallet-hero.png` },
      contentDescription: {
        defaultValue: { language: 'de', value: 'Kfz-Experten Hannover Unfall-Soforthilfe' },
      },
    },
    barcode: {
      type: 'QR_CODE',
      value: unfallUrl,
      alternateText: 'Unfallhilfe öffnen',
    },
    appLinkData: {
      webAppLinkInfo: {
        appTarget: {
          targetUri: {
            uri: whatsapp,
            description: 'WhatsApp Kontakt',
          },
        },
      },
      displayText: {
        defaultValue: { language: 'de', value: 'WhatsApp schreiben' },
      },
    },
    linksModuleData: {
      uris: [
        { uri: `tel:${phoneClean}`, description: 'Sofort anrufen', id: 'call' },
        { uri: whatsapp, description: 'WhatsApp öffnen', id: 'whatsapp' },
        { uri: unfallUrl, description: 'Unfallhilfe-Seite öffnen', id: 'unfall' },
      ],
    },
    textModulesData: [
      {
        header: '📞 Direkt anrufen',
        body: phoneDisplay,
        id: 'call_front',
      },
      {
        header: '💬 WhatsApp',
        body: 'Schaden senden',
        id: 'whatsapp_front',
      },
      {
        header: 'Soforthilfe',
        body: '24/7 · Persönlich · Direkt · Vor Ort',
        id: 'service_front',
      },
      {
        header: 'Im Schadenfall',
        body: 'Anrufen oder WhatsApp schreiben — wir helfen direkt weiter. Beweissicherung, Kalkulation und Gutachten in der Regel innerhalb von 48 Stunden.',
        id: 'instructions',
      },
      {
        header: 'Haftpflichtschaden',
        body: 'Bei unverschuldetem Haftpflichtschaden werden die Gutachterkosten in der Regel von der gegnerischen Versicherung übernommen.',
        id: 'cost_info',
      },
      {
        header: 'Ihr Sachverständiger',
        body: 'Mustafa Saleh · Kfz-Experten Hannover · Berliner Allee 51, 30855 Langenhagen',
        id: 'about',
      },
    ],
  }
}

export function createSaveJwt({ issuerId, classSuffix, objectSuffix, phone, whatsapp, unfallUrl, origin }) {
  const sa = getServiceAccount()
  const passObject = buildPassObject({ issuerId, classSuffix, objectSuffix, phone, whatsapp, unfallUrl })
  const payload = {
    iss: sa.client_email,
    aud: 'google',
    typ: 'savetowallet',
    iat: Math.floor(Date.now() / 1000),
    origins: [origin],
    payload: {
      genericObjects: [passObject],
    },
  }
  const token = jwt.sign(payload, sa.private_key, { algorithm: 'RS256' })
  return `https://pay.google.com/gp/v/save/${token}`
}
