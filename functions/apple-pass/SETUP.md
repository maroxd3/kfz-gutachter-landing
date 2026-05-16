# Apple Wallet Pass — Setup nach Erhalt der Apple-Bestätigung

Reihenfolge ab dem Moment, in dem die Apple-Mail "Welcome to the Apple Developer Program" da ist.

---

## 1. Pass Type ID anlegen

1. https://developer.apple.com/account → **Certificates, IDs & Profiles** → **Identifiers**
2. **+** klicken → **Pass Type IDs** → Continue
3. Felder:
   - Description: `Kfz-Experten Hannover Unfallhilfe`
   - Identifier: `pass.de.hannover-kfz-gutachter.unfall` (muss exakt so sein — steht im pass.json)
4. Continue → Register

## 2. Team ID notieren

Oben rechts im Apple Developer Portal steht die 10-stellige Team ID, z.B. `A1B2C3D4E5`.

```bash
# Lokal in functions/.env eintragen für Emulator-Tests:
APPLE_TEAM_ID=A1B2C3D4E5
```

Plus in Firebase Function Config setzen für Production:
```bash
firebase functions:config:set --project kfz-gutachter-wallet apple.team_id="A1B2C3D4E5"
# Oder einfacher: APPLE_TEAM_ID als Function param-string setzen.
```

## 3. Pass-Zertifikat von Apple signieren lassen

1. Im Portal: **Identifiers** → die eben erstellte Pass Type ID anklicken → **Create Certificate**
2. CSR hochladen: `functions/certs/pass.csr` (haben wir schon mit OpenSSL generiert — Private Key liegt sicher in `functions/certs/pass.key`, nicht in Git)
3. Continue → **Download** → Datei heißt `pass.cer` (DER-Format)
4. Datei ablegen unter `functions/certs/pass.cer`

## 4. .cer in PEM konvertieren

```bash
cd functions/certs
openssl x509 -in pass.cer -inform DER -out pass.cert.pem -outform PEM
```

Jetzt hast du in `functions/certs/`:
- `AppleWWDRCAG4.cer` + `AppleWWDRCAG4.pem` (Apple WWDR Intermediate, im Repo committed — public)
- `pass.csr` (gitignored)
- `pass.key` (gitignored — **NIEMALS teilen**)
- `pass.cer` + `pass.cert.pem` (gitignored — Signer Cert)

## 5. Firebase Secrets setzen

```bash
# Aus dem Projekt-Root:
firebase functions:secrets:set APPLE_PASS_SIGNER_CERT --project kfz-gutachter-wallet
# → Inhalt von functions/certs/pass.cert.pem einfügen (Strg+V), dann Enter, dann Strg+D

firebase functions:secrets:set APPLE_PASS_SIGNER_KEY --project kfz-gutachter-wallet
# → Inhalt von functions/certs/pass.key einfügen

# Nur wenn du beim CSR-Generieren eine Passphrase gesetzt hättest (haben wir nicht):
# firebase functions:secrets:set APPLE_PASS_SIGNER_KEY_PASSPHRASE --project kfz-gutachter-wallet
```

## 6. APPLE_TEAM_ID als Function param setzen

Beim Deploy fragt Firebase nach Werten für `defineString`-Params. Antworte bei `APPLE_TEAM_ID` mit der 10-stelligen ID.

Alternativ via `.env.kfz-gutachter-wallet` im `functions/`-Verzeichnis:
```
APPLE_TEAM_ID=A1B2C3D4E5
```

## 7. Deployen

```bash
cd functions
npm run deploy
# oder vom root:
firebase deploy --only functions:applePass --project kfz-gutachter-wallet
```

## 8. Testen

```bash
# Direkt die Function aufrufen — sollte .pkpass-binary zurückgeben:
curl -X POST https://europe-west1-kfz-gutachter-wallet.cloudfunctions.net/applePass -o test.pkpass
file test.pkpass
# Erwartet: "Zip archive data" (.pkpass IST ein ZIP)

# Auf iPhone testen: test.pkpass via AirDrop/iCloud auf iPhone schicken → öffnet sich in Wallet.
# Oder: hannover-kfz-gutachter.de/unfall auf iPhone öffnen → "Zu Apple Wallet hinzufügen" tippen.
```

---

## Code-Übersicht (was schon da ist)

| Datei | Zweck |
|---|---|
| `functions/apple-pass/template/pass.json` | Pass-Layout (Header, Felder, Farben, QR) |
| `functions/apple-pass/template/icon{,@2x,@3x}.png` | Required Pass-Icons (29/58/87 px) |
| `functions/apple-pass/template/logo{,@2x,@3x}.png` | Pass-Logo (max-Höhe 50/100/150 px) |
| `functions/lib/apple-wallet.js` | passkit-generator-Wrapper, baut signed Buffer |
| `functions/index.js` → `applePass` | HTTPS-Endpoint, gibt `.pkpass` zurück |
| `src/components/ui/wallet-button.jsx` | iOS-Detection → ruft `/applePass`, sonst Google |
| `functions/certs/AppleWWDRCAG4.{cer,pem}` | Apple WWDR G4 Intermediate (public, im Repo) |

## Wenn etwas schief geht

- **"Apple Pass signer not configured"** → Secrets nicht gesetzt oder Function nicht redeployed nach Secret-Set.
- **"APPLE_TEAM_ID not set"** → Team ID nicht gesetzt, siehe Schritt 6.
- **iPhone sagt "Pass kann nicht hinzugefügt werden"** → meistens: passTypeIdentifier in pass.json passt nicht zum Cert. Beide müssen exakt `pass.de.hannover-kfz-gutachter.unfall` sein.
- **passkit-generator wirft "invalid signer cert"** → PEM-Format prüfen (`-----BEGIN CERTIFICATE-----` am Anfang) und ob du nicht aus Versehen pass.csr statt pass.cer hochgeladen hast.

## Sicherheits-Checkliste

- [ ] `functions/certs/pass.key` ist in `.gitignore` (✅ schon eingetragen)
- [ ] `pass.cert.pem` / `pass.cer` sind in `.gitignore` (✅ schon eingetragen)
- [ ] Secrets in Firebase, nicht im Code
- [ ] Wenn das Zertifikat irgendwann leakt: in Apple Developer Portal revoken, neues CSR/Cert generieren, Secrets ersetzen.
