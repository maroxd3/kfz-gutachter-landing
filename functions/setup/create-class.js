// One-time script: registers the Generic Pass class with Google Wallet.
// Run once: `npm run setup:class` (after .env is filled in and service-account.json is in place).
// Re-run to update the class (PUT semantics).

import { GoogleAuth } from 'google-auth-library'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env')
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const ISSUER_ID = process.env.ISSUER_ID
const CLASS_SUFFIX = process.env.CLASS_SUFFIX || 'unfallhilfe_v1'
const ORIGIN = process.env.ORIGIN || 'https://hannover-kfz-gutachter.de'

if (!ISSUER_ID || ISSUER_ID.startsWith('0000')) {
  console.error('ISSUER_ID not set in functions/.env')
  process.exit(1)
}

const classId = `${ISSUER_ID}.${CLASS_SUFFIX}`

const classBody = {
  id: classId,
  classTemplateInfo: {
    cardTemplateOverride: {
      cardRowTemplateInfos: [
        {
          oneItem: {
            item: {
              firstValue: {
                fields: [{ fieldPath: "object.textModulesData['instructions']" }],
              },
            },
          },
        },
      ],
    },
  },
  logo: {
    sourceUri: { uri: `${ORIGIN}/logo/logo-512.png` },
    contentDescription: {
      defaultValue: { language: 'de', value: 'Kfz-Gutachter Hannover Logo' },
    },
  },
  cardTitle: {
    defaultValue: { language: 'de', value: 'Kfz-Experten Hannover' },
  },
  subheader: {
    defaultValue: { language: 'de', value: 'Unfallhilfe — Mustafa Saleh' },
  },
  header: {
    defaultValue: { language: 'de', value: 'Im Schadenfall sofort scannen' },
  },
  hexBackgroundColor: '#0A1F44',
  heroImage: {
    sourceUri: { uri: `${ORIGIN}/logo/logo-1200.png` },
  },
}

const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
})

const url = `https://walletobjects.googleapis.com/walletobjects/v1/genericClass/${encodeURIComponent(classId)}`

async function run() {
  const client = await auth.getClient()
  const getResp = await client.request({ url, method: 'GET', validateStatus: () => true })
  const method = getResp.status === 200 ? 'PUT' : 'POST'
  const target = method === 'POST'
    ? 'https://walletobjects.googleapis.com/walletobjects/v1/genericClass'
    : url
  const resp = await client.request({
    url: target,
    method,
    data: classBody,
    validateStatus: () => true,
  })
  if (resp.status >= 300) {
    console.error(`Class ${method} failed:`, resp.status, JSON.stringify(resp.data, null, 2))
    process.exit(1)
  }
  console.log(`Pass class ${method === 'POST' ? 'created' : 'updated'}: ${classId}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
