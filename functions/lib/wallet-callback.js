// Google Wallet save/delete callback handler.
// Google POSTs JSON like:
//   { signature, intermediateSigningKey, protocolVersion: 'ECv2SigningOnly',
//     signedMessage: '{"classId":"...","objectId":"...","eventType":"save"|"del",
//                      "expTimeMillis":...,"count":1,"nonce":"..."}' }
// The signedMessage is a JSON STRING (not a JWT), signed with ECDSA.
//
// TODO(future): verify the ECDSA signature against intermediateSigningKey
// (which in turn is signed by Google's root key from https://pay.google.com/gp/m/issuer/keys).
// For now we just parse — low risk since the URL is private and worst-case spoofing
// only inflates our counter.

export function parseCallbackEvent(rawBody) {
  let body = rawBody
  if (typeof rawBody === 'string') {
    try { body = JSON.parse(rawBody) } catch { /* leave as string */ }
  }
  if (!body || typeof body !== 'object') {
    throw new Error('Callback body is not an object')
  }

  const protocolVersion = body.protocolVersion || null
  const signedMessage = body.signedMessage

  if (typeof signedMessage !== 'string') {
    throw new Error('No signedMessage string in callback body')
  }

  let event
  try {
    event = JSON.parse(signedMessage)
  } catch {
    throw new Error('signedMessage is not valid JSON')
  }

  return {
    protocolVersion,
    looksLegit: protocolVersion === 'ECv2SigningOnly' && !!event.classId && !!event.objectId,
    eventType: event.eventType,
    classId: event.classId,
    objectId: event.objectId,
    nonce: event.nonce,
    count: event.count,
    expTimeMillis: event.expTimeMillis,
    raw: event,
  }
}
