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
  return {
    id: objectId,
    classId,
    state: 'ACTIVE',
    cardTitle: {
      defaultValue: { language: 'de', value: 'Kfz-Experten Hannover' },
    },
    header: {
      defaultValue: { language: 'de', value: 'Unfallhilfe 24/7' },
    },
    subheader: {
      defaultValue: { language: 'de', value: 'Mustafa Saleh · Sachverständiger' },
    },
    hexBackgroundColor: '#0A1F44',
    logo: {
      sourceUri: { uri: `${unfallUrl.replace(/\/unfall$/, '')}/logo/logo-512.png` },
      contentDescription: {
        defaultValue: { language: 'de', value: 'Kfz-Experten Hannover Logo' },
      },
    },
    linksModuleData: {
      uris: [
        { uri: `tel:${phone.replace(/\s+/g, '')}`, description: 'Sofort anrufen', id: 'call' },
        { uri: whatsapp, description: 'WhatsApp', id: 'whatsapp' },
        { uri: unfallUrl, description: 'Unfallhilfe-Seite öffnen', id: 'unfall' },
      ],
    },
    textModulesData: [
      {
        header: 'Im Schadenfall',
        body: 'Anrufen oder WhatsApp — wir kommen zu Ihnen. Beweissicherung, Kalkulation, Gutachten in 48 h. Bei Haftpflichtschaden 0 € für Sie.',
        id: 'instructions',
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
