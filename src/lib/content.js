// Zentrale Stelle für alle Platzhalter-Inhalte.
// Hier anpassen, sobald echte Firmendaten feststehen.
import { asset } from './utils.js'

export const brand = {
  name: 'Kfz-Gutachter Hannover',
  nameShort: 'Kfz-Gutachter Hannover',
  tagline: 'Persönlich · Direkt · Vor Ort',
  city: 'Hannover',
  legalOwner: 'Mustafa Saleh',
  phone: '+49 176 80444241',
  phoneHref: 'tel:+4917680444241',
  whatsapp: '+49 176 80444241',
  whatsappHref: 'https://wa.me/4917680444241',
  email: 'kontakt@hannover-kfz-gutachter.de',
  emailHref: 'mailto:kontakt@hannover-kfz-gutachter.de',
  address: {
    street: 'Berliner Allee 51',
    zip: '30855',
    city: 'Langenhagen',
  },
  hours: 'Mo–Fr  08:00 – 18:00 · Sa nach Vereinbarung',
  googleMaps: 'https://www.google.com/maps/search/?api=1&query=Berliner+Allee+51+30855+Langenhagen',

  // 🖼️ ZWEI FOTOS für den Before/After-Slider:
  //   heroImageBefore  = sauberes Auto (vor dem Unfall)
  //   heroImageAfter   = dasselbe Auto mit Schaden (nach dem Unfall)
  //
  // Wenn du nur EIN Foto hast: beide URLs gleich lassen.
  // Ich lege synthetische Schaden-Glüher (rote Impact-Blobs) über das Nachher-Bild,
  // damit der Unterschied trotzdem sichtbar ist.
  //
  // Matching Pair mit KI generieren (Bing/Ideogram/Leonardo):
  //   Prompt 1: "Photorealistic silver sedan in empty parking lot, 3/4 angle, daylight, 16:9, no people"
  //   Prompt 2: "SAME silver sedan, SAME parking lot, SAME angle, now with front collision damage,
  //              crumpled bumper, broken right headlight, 16:9, photorealistic"
  heroImageBefore:
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2400&q=85',
  heroImageAfter:
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=2400&q=85',

  // Hero-Foto — eigenes 4K Schadenbild, liegt unter /public/hero.png
  heroImageUrl: asset('hero.webp'),
  heroImageAlt: 'Beschädigtes Fahrzeug — Schadenbeispiel',
}

// Interaktive Schaden-Markierungen — Hero (einzelnes Fahrzeug).
// x, y sind Prozent der Bildbreite/Höhe (0–100). Positionen kalibriert
// für /public/hero.png (graue Limousine, Fronthälfte rechts im Bild).
export const heroDamagePoints = [
  { id: 1, x: 60, y: 60, label: 'Kotflügel vorne links', damage: 'Tiefe Eindellung über Radlauf, Lack bis aufs Blech abgeschürft', repair: '2.400 €', depreciation: '620 €', severity: 'Schwer' },
  { id: 2, x: 66, y: 53, label: 'Scheinwerfer links', damage: 'Streuscheibe gerissen, Halterung gebrochen', repair: '1.180 €', depreciation: '—', severity: 'Mittel' },
  { id: 3, x: 58, y: 72, label: 'Front-Stoßfänger links', damage: 'Verformung, Lackschaden, Clip-Halter gerissen', repair: '1.650 €', depreciation: '290 €', severity: 'Mittel' },
  { id: 4, x: 68, y: 41, label: 'Motorhaube vorne links', damage: 'Knick an der Vorderkante, Lackplatzer', repair: '780 €', depreciation: '—', severity: 'Leicht' },
]

// Zwei-Fahrzeug-Szene für die Before/After-Sektion (Haftpflichtschaden).
// Linkes Auto = dein Mandant. Rechtes Auto = Gegner.
export const collisionScene = {
  imageBefore: asset('bfore.webp'),
  imageAfter: asset('after.webp'),
  client: {
    label: 'Ihr Fahrzeug',
    sublabel: 'Mercedes E-Klasse · Geschädigter',
    color: 'gold', // goldene Marker
    points: [
      { id: 'c1', x: 28, y: 54, label: 'Motorhaube', damage: 'Verformung durch Frontalaufprall, Lackschaden', repair: '2.100 €', depreciation: '380 €', severity: 'Schwer' },
      { id: 'c2', x: 39, y: 60, label: 'Scheinwerfer rechts', damage: 'Gehäuse gebrochen, Reflektor defekt', repair: '620 €', depreciation: '—', severity: 'Leicht' },
      { id: 'c3', x: 34, y: 73, label: 'Front-Stoßfänger', damage: 'Komplett eingedrückt, Halterungen gerissen', repair: '1.850 €', depreciation: '420 €', severity: 'Schwer' },
    ],
  },
  opponent: {
    label: 'Gegnerisches Fahrzeug',
    sublabel: 'Lamborghini Urus · Unfallverursacher',
    color: 'red', // rote Marker
    points: [
      { id: 'o1', x: 65, y: 52, label: 'Motorhaube', damage: 'Beule 60 cm, Knick, Lackschaden', repair: '1.900 €', depreciation: '410 €', severity: 'Mittel' },
      { id: 'o2', x: 57, y: 60, label: 'Scheinwerfer links', damage: 'Glas gebrochen, LED-Modul defekt', repair: '1.280 €', depreciation: '—', severity: 'Mittel' },
      { id: 'o3', x: 60, y: 76, label: 'Front-Stoßfänger', damage: 'Eingedrückt, Clip-Halter abgerissen, Kühler beschädigt', repair: '2.400 €', depreciation: '560 €', severity: 'Schwer' },
    ],
  },
}


// Animierte Social-Proof-Zahlen.
// WICHTIG: nur verifizierbare Service-Zusagen (§ 5 UWG), keine Kundenzahlen
// solange das Büro neu ist.
export const stats = [
  { value: 48,  suffix: 'h',  label: 'Max. Bearbeitungszeit', sub: 'Gutachten nach Besichtigung' },
  { value: 24,  suffix: 'h',  label: 'Rückruf-Zusage',        sub: 'Werktags garantiert' },
  { value: 50,  suffix: 'km', label: 'Einsatzradius',          sub: 'Ab Hannover, ohne Anfahrtskosten' },
  { value: 100, suffix: '%',  label: 'Unabhängig',             sub: 'DIN ISO 17024 zertifiziert' },
]

// Schaden-Schnellrechner: 4 Schritte → Schätzung
// Zahlen sind marktübliche Richtwerte (konservativ kalkuliert).
// Ergebnis ist IMMER eine Spanne, nie eine exakte Zahl.
export const calculator = {
  brands: [
    { id: 'vw',      label: 'Volkswagen', factor: 1.00 },
    { id: 'mercedes',label: 'Mercedes-Benz', factor: 1.55 },
    { id: 'bmw',     label: 'BMW', factor: 1.50 },
    { id: 'audi',    label: 'Audi', factor: 1.45 },
    { id: 'porsche', label: 'Porsche', factor: 2.30 },
    { id: 'opel',    label: 'Opel / Ford', factor: 0.85 },
    { id: 'jp_kr',   label: 'Toyota / Hyundai / Kia', factor: 0.90 },
    { id: 'other',   label: 'Andere Marke', factor: 1.00 },
  ],
  classes: [
    { id: 'small',   label: 'Kleinwagen',     sub: 'Polo, Corsa, Fiesta …',   factor: 0.75 },
    { id: 'mid',     label: 'Mittelklasse',   sub: 'Golf, A4, 3er, C-Klasse',  factor: 1.00 },
    { id: 'upper',   label: 'Oberklasse',     sub: 'E-Klasse, 5er, A6, Passat',factor: 1.35 },
    { id: 'suv',     label: 'SUV / Geländewagen', sub: 'X5, GLC, Q5, Tiguan',  factor: 1.30 },
    { id: 'sport',   label: 'Sportwagen',     sub: 'AMG, M, RS, 911 …',        factor: 1.80 },
    { id: 'oldtimer',label: 'Oldtimer',       sub: 'ab Baujahr vor 1995',      factor: 1.60 },
  ],
  types: [
    { id: 'park',    label: 'Parkschaden',       sub: 'Delle, Kratzer, Lack',       base: 900 },
    { id: 'rear',    label: 'Auffahrunfall',     sub: 'Heckschaden',                 base: 3200 },
    { id: 'side',    label: 'Seitenaufprall',    sub: 'Tür, Kotflügel, Säule',       base: 4800 },
    { id: 'front',   label: 'Frontalkollision',  sub: 'Motorhaube, Kühler, Airbag',  base: 6500 },
    { id: 'hagel',   label: 'Hagelschaden',      sub: 'viele kleine Dellen',         base: 2400 },
    { id: 'total',   label: 'Totalschaden?',     sub: 'Fahrzeug stark beschädigt',   base: 12000 },
  ],
  severities: [
    { id: 'light',  label: 'Leicht',  sub: 'nur Blech/Lack', factor: 0.60, depreciation: 0.05 },
    { id: 'medium', label: 'Mittel',  sub: 'mehrere Bauteile',factor: 1.00, depreciation: 0.12 },
    { id: 'heavy',  label: 'Schwer',  sub: 'Struktur betroffen', factor: 1.65, depreciation: 0.20 },
  ],
}

export const certifications = [
  'TÜV zertifiziert',
  'DEKRA geprüft',
  'DIN ISO 17024',
]

export const audiences = [
  {
    title: 'Privatkunden',
    description: 'Nach einem unverschuldeten Unfall begleiten wir Sie vom ersten Schritt bis zur Auszahlung.',
  },
  {
    title: 'Versicherungen',
    description: 'Schnelle, rechtssichere Gutachten für Haftpflicht- und Kaskoschäden.',
  },
  {
    title: 'Rechtsanwälte',
    description: 'Verlässliche Beweissicherung und Gutachten für die anwaltliche Vertretung.',
  },
  {
    title: 'Gewerbe & Flotten',
    description: 'Firmenfahrzeuge, Leasingrückgaben und Flottenbewertungen aus einer Hand.',
  },
]

export const services = [
  {
    title: 'Haftpflicht-Schadengutachten',
    description:
      'Bei unverschuldetem Unfall haben Sie Anspruch auf ein unabhängiges Gutachten. Die Kosten trägt die gegnerische Versicherung — nicht Sie.',
    bullets: ['Beweissicherung', 'Reparaturkalkulation', 'Wertminderung', 'Nutzungsausfall'],
  },
  {
    title: 'Kurzgutachten',
    description:
      'Bei Bagatellschäden unter 750 € erstellen wir einen fundierten Kostenvoranschlag — schnell, präzise und zum Festpreis.',
    bullets: ['Schadenhöhe', 'Reparaturweg', 'Fotodokumentation', 'Festpreis'],
  },
  {
    title: 'Wertgutachten',
    description:
      'Ermittlung von Zeitwert, Marktwert oder Wiederbeschaffungswert — für Verkauf, Kauf, Scheidung, Erbschaft oder Finanzamt.',
    bullets: ['Marktwert', 'Händlereinkaufswert', 'Restwert', 'Wiederbeschaffungswert'],
  },
  {
    title: 'Oldtimer-Gutachten',
    description:
      'H-Kennzeichen, Versicherung, Marktwert: Klassische Fahrzeuge verlangen Fachwissen und ein geübtes Auge.',
    bullets: ['§ 23 StVZO (H-Kennzeichen)', 'Marktwert-Einstufung', 'Versicherungswert', 'Zustandsnoten 1–5'],
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Anfrage',
    description: 'Rufen Sie uns an oder senden Sie eine kurze Nachricht. Wir klären alles Wichtige in wenigen Minuten.',
  },
  {
    step: '02',
    title: 'Termin vor Ort',
    description: 'Wir kommen zu Ihnen — zur Werkstatt, nach Hause oder ins Büro. Raum Hannover bis 50 km.',
  },
  {
    step: '03',
    title: 'Gutachten in 48 h',
    description: 'Sie erhalten ein vollständiges, rechtssicheres Gutachten innerhalb von 48 Stunden nach der Besichtigung.',
  },
]

export const reasons = [
  {
    title: 'Unabhängig',
    description: 'Wir arbeiten ausschließlich in Ihrem Interesse — nicht für die Versicherung.',
  },
  {
    title: 'Zertifiziert',
    description: 'Nach DIN ISO 17024 geprüft. TÜV- und DEKRA-Qualifikationen im Hintergrund.',
  },
  {
    title: 'Kostenfrei bei Haftpflicht',
    description: 'Bei unverschuldetem Unfall trägt die gegnerische Versicherung die Gutachterkosten vollständig.',
  },
  {
    title: 'Schnell',
    description: 'Termin meist innerhalb von 24 h, Gutachten spätestens nach 48 h nach Besichtigung.',
  },
  {
    title: 'Regional',
    description: 'Hannover und Umkreis 50 km — wir kommen zu Ihnen, ohne Anfahrtskosten.',
  },
]

export const faq = [
  {
    q: 'Wer zahlt das Gutachten?',
    a: 'Bei einem unverschuldeten Unfall trägt die gegnerische Haftpflichtversicherung die vollständigen Gutachterkosten. Für Sie entstehen in der Regel keine Kosten.',
  },
  {
    q: 'Wie schnell bekomme ich mein Gutachten?',
    a: 'In der Regel innerhalb von 48 Stunden nach der Fahrzeugbesichtigung. Bei Eilfällen ist eine kurzfristigere Erstellung möglich — sprechen Sie uns an.',
  },
  {
    q: 'Muss ich zu Ihnen kommen?',
    a: 'Nein. Wir kommen zu Ihnen — zur Werkstatt, nach Hause, ins Büro oder zur Unfallstelle. Im Raum Hannover bis 50 km ohne Anfahrtskosten.',
  },
  {
    q: 'Was unterscheidet ein unabhängiges Gutachten vom Versicherungsgutachten?',
    a: 'Wir arbeiten ausschließlich in Ihrem Interesse. Ein von der gegnerischen Versicherung beauftragter Prüfer vertritt deren Interessen — das kann sich in der Schadenhöhe deutlich auswirken.',
  },
  {
    q: 'Welche Unterlagen benötige ich?',
    a: 'Fahrzeugschein, Führerschein und — falls vorhanden — polizeilicher Unfallbericht sowie gegnerische Versicherungsdaten. Alles andere übernehmen wir.',
  },
]
