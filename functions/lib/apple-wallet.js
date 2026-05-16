import { PKPass } from 'passkit-generator'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATE_DIR = resolve(__dirname, '..', 'apple-pass', 'template.pass')
const WWDR_PATH = resolve(__dirname, '..', 'certs', 'AppleWWDRCAG4.pem')

let cachedWwdr = null
function loadWwdr() {
  if (cachedWwdr) return cachedWwdr
  cachedWwdr = readFileSync(WWDR_PATH)
  return cachedWwdr
}

function loadSigner() {
  const cert = process.env.APPLE_PASS_SIGNER_CERT
  const key = process.env.APPLE_PASS_SIGNER_KEY
  if (!cert || !key) {
    throw new Error(
      'Apple Pass signer not configured. ' +
      'Set APPLE_PASS_SIGNER_CERT (PEM of Pass Type ID cert from Apple) ' +
      'and APPLE_PASS_SIGNER_KEY (PEM of pass.key) as Firebase secrets.'
    )
  }
  return { cert, key }
}

export async function buildApplePass({ teamId, serialNumber }) {
  if (!teamId || teamId === '__TEAM_ID__') {
    throw new Error('APPLE_TEAM_ID not set — get the 10-char Team ID from developer.apple.com/account.')
  }

  const { cert, key } = loadSigner()
  const wwdr = loadWwdr()

  const pass = await PKPass.from(
    {
      model: TEMPLATE_DIR,
      certificates: {
        wwdr,
        signerCert: cert,
        signerKey: key,
        signerKeyPassphrase: process.env.APPLE_PASS_SIGNER_KEY_PASSPHRASE || undefined,
      },
    },
    {
      serialNumber,
      teamIdentifier: teamId,
    }
  )

  return pass.getAsBuffer()
}

export function newSerial() {
  return `unfall_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
