// Lokaler Test: baut einen Pass aus den lokalen Zertifikaten/Template
// und schreibt ihn als test.pkpass raus.
// Run: node apple-pass/test-build.js
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { buildApplePass, newSerial } from '../lib/apple-wallet.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const certsDir = resolve(__dirname, '..', 'certs')

process.env.APPLE_PASS_SIGNER_CERT = readFileSync(resolve(certsDir, 'pass.cert.pem'), 'utf8')
process.env.APPLE_PASS_SIGNER_KEY = readFileSync(resolve(certsDir, 'pass.key'), 'utf8')

const buffer = await buildApplePass({
  teamId: 'K636NK48Y2',
  serialNumber: newSerial(),
})

const out = resolve(__dirname, 'test.pkpass')
writeFileSync(out, buffer)
console.log(`OK — wrote ${out} (${buffer.length} bytes)`)
