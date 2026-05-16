// Debug: fetch the current class state from Google Wallet API
import { GoogleAuth } from 'google-auth-library'

export async function fetchGoogleWalletClass({ issuerId, classSuffix }) {
  const classId = `${issuerId}.${classSuffix}`
  const raw = process.env.GOOGLE_WALLET_SA_KEY
  if (!raw) throw new Error('GOOGLE_WALLET_SA_KEY not set')
  const credentials = JSON.parse(raw)

  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
  })
  const client = await auth.getClient()

  const url = `https://walletobjects.googleapis.com/walletobjects/v1/genericClass/${encodeURIComponent(classId)}`
  const resp = await client.request({ url, method: 'GET', validateStatus: () => true })
  return { status: resp.status, data: resp.data }
}
