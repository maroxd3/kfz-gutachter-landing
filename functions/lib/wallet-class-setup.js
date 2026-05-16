// Server-side setup: PUT-or-POST the Generic Pass class to Google Wallet API.
// Reuses the SA key already configured for walletPass. Idempotent — safe to re-run.
import { GoogleAuth } from 'google-auth-library'

export async function upsertGoogleWalletClass({ issuerId, classSuffix, origin }) {
  const classId = `${issuerId}.${classSuffix}`
  const classBody = {
    id: classId,
    classTemplateInfo: {
      cardTemplateOverride: {
        cardRowTemplateInfos: [
          {
            twoItems: {
              startItem: {
                firstValue: {
                  fields: [{ fieldPath: "object.textModulesData['call_front']" }],
                },
              },
              endItem: {
                firstValue: {
                  fields: [{ fieldPath: "object.textModulesData['whatsapp_front']" }],
                },
              },
            },
          },
          {
            oneItem: {
              item: {
                firstValue: {
                  fields: [{ fieldPath: "object.textModulesData['service_front']" }],
                },
              },
            },
          },
        ],
      },
    },
    logo: {
      sourceUri: { uri: `${origin}/logo/logo-512.png` },
      contentDescription: {
        defaultValue: { language: 'de', value: 'Kfz-Experten Hannover Logo' },
      },
    },
    cardTitle: {
      defaultValue: { language: 'de', value: 'Kfz-Experten Hannover' },
    },
    subheader: {
      defaultValue: { language: 'de', value: 'Unfall-Soforthilfe' },
    },
    header: {
      defaultValue: { language: 'de', value: 'Unfall? Wir helfen sofort.' },
    },
    hexBackgroundColor: '#0B0B0D',
    heroImage: {
      sourceUri: { uri: `${origin}/logo/wallet-hero.png` },
      contentDescription: {
        defaultValue: { language: 'de', value: 'Kfz-Experten Hannover Unfall-Soforthilfe' },
      },
    },
  }

  const raw = process.env.GOOGLE_WALLET_SA_KEY
  if (!raw) throw new Error('GOOGLE_WALLET_SA_KEY not set')
  const credentials = JSON.parse(raw)

  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
  })
  const client = await auth.getClient()

  const url = `https://walletobjects.googleapis.com/walletobjects/v1/genericClass/${encodeURIComponent(classId)}`
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
    throw new Error(`Class ${method} failed (${resp.status}): ${JSON.stringify(resp.data)}`)
  }
  return { method, classId, status: resp.status }
}
