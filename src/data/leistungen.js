// Service-Page Daten. Eine Source of Truth — die React-Komponente UND der
// Postbuild-Templating-Script lesen daraus.
//
// Wenn du eine Leistung änderst oder hinzufügst, hier ändern. Postbuild
// schreibt dann automatisch dist/leistungen/<slug>/index.html mit den
// passenden Meta-Tags + JSON-LD.

export const leistungen = [
  {
    slug: 'unfallgutachten',
    title: 'Unfallgutachten Hannover',
    titleLong: 'Unfallgutachten · Schadengutachten Hannover',
    titleH1: 'Unfallgutachten in Hannover und Langenhagen',
    tagline: 'Nach unverschuldetem Unfall: rechtssicheres Gutachten · in 48 h · 0 € für Sie',
    metaTitle: 'Unfallgutachten Hannover — kostenlos bei Haftpflicht · Kfz-Experten Hannover',
    metaDescription: 'Unabhängiges Unfallgutachten in Hannover, Langenhagen und Umkreis. Termin innerhalb 24 h, Gutachten in 48 h. Bei unverschuldetem Unfall trägt die gegnerische Versicherung die Kosten — 0 € für Sie. Persönlich, vor Ort, Sachverständiger nach DIN ISO/IEC 17024.',
    intro:
      'Nach einem Verkehrsunfall in Hannover oder Umkreis kommen wir zu Ihnen — zur Werkstatt, nach Hause oder zur Unfallstelle. Wir dokumentieren den Schaden vollständig, kalkulieren die Reparaturkosten rechtssicher und erfassen alle Ansprüche, die Ihnen zustehen: Wertminderung, Nutzungsausfall, Mietwagen.',
    sections: [
      {
        h2: 'Wer zahlt das Gutachten?',
        body:
          'Bei einem unverschuldeten Verkehrsunfall trägt die gegnerische Haftpflichtversicherung die vollständigen Gutachterkosten — auch in Hannover und im gesamten Umland. Für Sie entstehen in der Regel keine Kosten. Sie haben das gesetzliche Recht, einen unabhängigen Sachverständigen Ihrer Wahl zu beauftragen. Lassen Sie sich nicht von der Versicherung in einen Versicherungsgutachter drängen — der vertritt die Interessen der Versicherung, nicht Ihre.',
      },
      {
        h2: 'Was beinhaltet ein vollständiges Unfallgutachten?',
        list: [
          { strong: 'Beweissicherung vor Ort:', text: 'Fotodokumentation aus allen Perspektiven, Schadenvermessung, Erfassung der Unfallumstände.' },
          { strong: 'Reparaturkalkulation:', text: 'Detaillierte Auflistung aller Reparaturarbeiten und -teile nach Herstellerstandards.' },
          { strong: 'Wertminderung:', text: 'Ermittlung der merkantilen Wertminderung — der Unterschied zwischen Marktwert vorher und nachher, der Ihnen zusätzlich zusteht.' },
          { strong: 'Nutzungsausfall oder Mietwagen:', text: 'Berechnung der täglichen Nutzungsausfall-Pauschale oder Begründung eines angemessenen Mietwagens.' },
          { strong: 'Rest- und Wiederbeschaffungswert:', text: 'Bei wirtschaftlichem Totalschaden ermitteln wir, was Ihr Fahrzeug noch wert ist und was ein gleichwertiger Ersatz kostet.' },
        ],
      },
      {
        h2: 'Ablauf — Schritt für Schritt',
        list: [
          { strong: '01 · Anruf oder WhatsApp:', text: 'Sie melden den Schaden — in der Regel klären wir alles in wenigen Minuten.' },
          { strong: '02 · Termin innerhalb 24 h:', text: 'Wir kommen zu Ihnen, Raum Hannover bis 50 km ohne Anfahrtskosten.' },
          { strong: '03 · Besichtigung & Dokumentation:', text: 'Vollständige Aufnahme des Schadens vor Ort.' },
          { strong: '04 · Gutachten in 48 h:', text: 'Sie erhalten ein vollständiges, rechtssicheres Gutachten — digital und auf Wunsch in Papier.' },
          { strong: '05 · Weitergabe an Versicherung & Anwalt:', text: 'Auf Wunsch übernehmen wir die direkte Kommunikation.' },
        ],
      },
      {
        h2: 'Warum ein unabhängiger Sachverständiger und nicht der Versicherungsgutachter?',
        body:
          'Versicherungsgutachter werden von der gegnerischen Versicherung beauftragt und bezahlt. Ihr Auftrag ist es, die Schadenhöhe für die Versicherung möglichst niedrig zu halten. Ein unabhängiger Sachverständiger arbeitet ausschließlich in Ihrem Interesse — mit dem gleichen technischen Standard, aber dem klaren Auftrag, Ihren Anspruch vollständig und sauber zu dokumentieren. Die Schadenhöhe kann zwischen beiden Gutachten deutlich auseinandergehen.',
      },
    ],
    faqs: [
      {
        q: 'Wann sollte ich einen Sachverständigen beauftragen?',
        a: 'So früh wie möglich nach dem Unfall, idealerweise vor Beginn der Reparatur. Eine spätere Schadenaufnahme ist deutlich schwerer und kann zu Beweisproblemen führen.',
      },
      {
        q: 'Was kostet das Gutachten, wenn ich Schuld am Unfall habe?',
        a: 'Bei einem selbstverschuldeten Schaden zahlen Sie das Gutachten selbst oder Ihre Vollkaskoversicherung trägt es — abhängig von Ihrem Vertrag. Die Kosten richten sich nach der Schadenhöhe; für eine genaue Auskunft melden Sie sich bitte mit den Schadendaten.',
      },
      {
        q: 'Brauche ich einen Anwalt?',
        a: 'Bei einem unverschuldeten Unfall empfehlen wir grundsätzlich einen Verkehrsrechtsanwalt. Auch dessen Kosten trägt die gegnerische Versicherung. Wir kooperieren mit erfahrenen Anwaltskanzleien in Hannover und können bei Bedarf vermitteln.',
      },
      {
        q: 'Wie schnell bekomme ich mein Gutachten?',
        a: 'In der Regel innerhalb von 48 Stunden nach der Fahrzeugbesichtigung. Bei Eilfällen ist eine kurzfristigere Erstellung möglich.',
      },
    ],
  },

  {
    slug: 'wertgutachten',
    title: 'Wertgutachten',
    titleLong: 'Wertgutachten · Marktwertgutachten Hannover',
    titleH1: 'Wertgutachten für Fahrzeuge in Hannover',
    tagline: 'Marktwert · Wiederbeschaffungswert · Händlereinkaufswert · für Verkauf, Kauf, Scheidung, Erbschaft, Finanzamt',
    metaTitle: 'Wertgutachten Auto Hannover — Marktwert ermitteln · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Wertgutachten in Hannover und Langenhagen. Marktwert, Wiederbeschaffungswert oder Händlereinkaufswert für Verkauf, Kauf, Scheidung, Erbschaft oder Finanzamt. Rechtssicher, schriftlich, in 48 h.',
    intro:
      'Ein Wertgutachten ist die rechtssichere Ermittlung des Marktwerts Ihres Fahrzeugs zum Stichtag. Sie brauchen es, wenn beim Verkauf, Kauf, einer Scheidung, Erbschaft, Leasing-Rückgabe oder gegenüber dem Finanzamt ein verbindlicher Wert nachgewiesen werden muss. Wir bewerten Fahrzeuge aller Klassen — vom Kleinwagen bis zum Sportwagen.',
    sections: [
      {
        h2: 'Wann brauche ich ein Wertgutachten?',
        list: [
          { strong: 'Verkauf:', text: 'Belastbarer Marktwert als Argumentationsbasis für den Verkaufspreis — schützt vor Unterverkauf.' },
          { strong: 'Kauf:', text: 'Unabhängige Zweitmeinung vor dem Kauf — vor allem bei höherpreisigen Fahrzeugen, Importen oder ungewöhnlichen Modellen.' },
          { strong: 'Scheidung:', text: 'Bewertung des Fahrzeugs als Teil der Vermögensaufteilung.' },
          { strong: 'Erbschaft / Erbteilung:', text: 'Wertermittlung für die Erbmasse, oft vom Nachlassgericht gefordert.' },
          { strong: 'Finanzamt:', text: 'Bei Übertragung im Familienbesitz, Schenkung oder steuerlicher Geltendmachung.' },
          { strong: 'Leasing-Rückgabe:', text: 'Unabhängige Bewertung als Schutz gegen überzogene Restwert-Forderungen des Leasinggebers.' },
        ],
      },
      {
        h2: 'Welcher Wert ist gemeint? Die vier wichtigsten Begriffe',
        list: [
          { strong: 'Marktwert:', text: 'Der Preis, zu dem das Fahrzeug aktuell am Markt verkauft werden könnte. Standard für die meisten Anlässe.' },
          { strong: 'Wiederbeschaffungswert:', text: 'Was kostet ein gleichwertiges Ersatzfahrzeug auf dem Gebrauchtwagenmarkt? Relevant bei Totalschaden und Versicherung.' },
          { strong: 'Händlereinkaufswert:', text: 'Was würde ein Händler aktuell für das Fahrzeug bezahlen? Niedriger als der Marktwert, relevant bei Inzahlungnahme.' },
          { strong: 'Restwert:', text: 'Verkaufswert des beschädigten Fahrzeugs nach einem Schaden — relevant bei wirtschaftlichem Totalschaden.' },
        ],
      },
      {
        h2: 'Was leisten wir?',
        body:
          'Eine vollständige Bewertung umfasst die Begutachtung vor Ort, Erfassung von Ausstattung, Zustand und Laufleistung, Vergleich mit aktuellen Marktdaten (Schwacke, DAT, EurotaxGlass), Berücksichtigung von Sonderausstattung, Vorschäden und Wartungshistorie sowie ein schriftliches, unterzeichnetes Gutachten mit allen Quellen und Berechnungsgrundlagen — vor Gericht verwertbar und vom Finanzamt akzeptiert.',
      },
    ],
    faqs: [
      {
        q: 'Was kostet ein Wertgutachten in Hannover?',
        a: 'Die Kosten richten sich nach Fahrzeugklasse und Aufwand. Für eine konkrete Preisauskunft genügt ein kurzer Anruf oder eine WhatsApp-Nachricht mit Fahrzeugmodell und Anlass.',
      },
      {
        q: 'Wie lange dauert die Erstellung?',
        a: 'In der Regel 48 Stunden ab Besichtigung. Bei dringenden Anlässen (Gericht, Notartermin) ist eine schnellere Erstellung möglich.',
      },
      {
        q: 'Wird das Gutachten vom Finanzamt anerkannt?',
        a: 'Ja. Unsere Wertgutachten erfüllen die formalen Anforderungen und werden bei Erbschaft, Schenkung und Vermögensbewertung von deutschen Finanzämtern anerkannt.',
      },
      {
        q: 'Ist eine Online-Bewertung ohne Besichtigung möglich?',
        a: 'Für rechtssichere Wertgutachten ist die persönliche Begutachtung vor Ort erforderlich. Für eine erste unverbindliche Einschätzung können wir nach Übersendung von Fotos und Fahrzeugdaten eine grobe Range angeben — diese ersetzt aber kein vollwertiges Gutachten.',
      },
    ],
  },

  {
    slug: 'oldtimer-gutachten',
    title: 'Oldtimer-Gutachten',
    titleLong: 'Oldtimer-Gutachten · H-Kennzeichen Hannover',
    titleH1: 'Oldtimer-Gutachten und H-Kennzeichen in Hannover',
    tagline: 'Oldtimer-Bewertung · § 23 StVZO H-Kennzeichen · Zustandsnote 1–5 · Versicherungswert',
    metaTitle: 'Oldtimer-Gutachten Hannover · H-Kennzeichen § 23 StVZO · Kfz-Experten',
    metaDescription: 'Oldtimer-Gutachten in Hannover und Langenhagen für H-Kennzeichen-Antrag (§ 23 StVZO), Versicherungswert, Verkauf oder Wertermittlung. Zustandsnote 1–5, Marktwert, vollständige Dokumentation. Persönlich, vor Ort.',
    intro:
      'Klassische Fahrzeuge ab Baujahr vor 1995 verlangen Fachwissen und ein geübtes Auge. Wir bewerten Oldtimer und Youngtimer für H-Kennzeichen-Anträge nach § 23 StVZO, Versicherungs-Marktwertgutachten, Kauf- und Verkaufsentscheidungen oder Wertermittlung im Erb- oder Scheidungsfall.',
    sections: [
      {
        h2: 'H-Kennzeichen-Gutachten nach § 23 StVZO',
        body:
          'Für die Zulassung mit H-Kennzeichen muss Ihr Fahrzeug mindestens 30 Jahre alt sein und sich in einem originalgetreuen, gepflegten Zustand befinden. Unser § 23 StVZO-Gutachten dokumentiert Originalität, Zustand und Pflegezustand nach den Vorgaben der Zulassungsstelle. Das Gutachten ist Voraussetzung für die Zulassung mit H-Kennzeichen und die damit verbundenen Steuer- und Versicherungsvorteile.',
      },
      {
        h2: 'Marktwertgutachten für Versicherung und Verkauf',
        body:
          'Klassische Fahrzeuge unterliegen einem völlig anderen Markt als moderne Gebrauchtwagen. Wertfindung erfordert Kenntnis der Modellgeschichte, der Originalteile, der Zustandsstufen nach Classic-Data-Standard und der aktuellen Marktentwicklung in Auktionen und Fachhandel. Unsere Bewertung liefert Ihnen einen begründeten, marktbasierten Wert — verwendbar für die Oldtimer-Versicherung, einen anstehenden Verkauf oder die Vermögensbewertung.',
      },
      {
        h2: 'Zustandsnoten 1 bis 5',
        list: [
          { strong: 'Note 1 — Makellos:', text: 'Wie aus dem Werk, restauriert oder konserviert, keine Mängel.' },
          { strong: 'Note 2 — Gut:', text: 'Mängelfreier Originalzustand oder hochwertige Restaurierung, keine Reparaturen nötig.' },
          { strong: 'Note 3 — Gebraucht:', text: 'Mängelfrei fahrbereit, normale Gebrauchsspuren, leichte Reparaturen nötig.' },
          { strong: 'Note 4 — Verbraucht:', text: 'Verkehrssicher und fahrbereit, aber mit deutlichen Mängeln und Reparaturbedarf.' },
          { strong: 'Note 5 — Restaurierungsbedürftig:', text: 'Nicht fahrbereit, vollständige Restaurierung erforderlich.' },
        ],
      },
    ],
    faqs: [
      {
        q: 'Ab wann gilt ein Fahrzeug als Oldtimer?',
        a: 'Für das H-Kennzeichen nach § 23 StVZO muss das Fahrzeug mindestens 30 Jahre alt sein, sich in originalgetreuem Zustand befinden und ein bestimmtes Maß an Pflege aufweisen. Jüngere Fahrzeuge (15–29 Jahre) gelten als Youngtimer und können je nach Wert und Zustand ebenfalls gutachterlich bewertet werden.',
      },
      {
        q: 'Was kostet ein Oldtimer-Gutachten?',
        a: 'Der Aufwand hängt von Modell, Zustand und Umfang ab (reines Marktwertgutachten vs. vollständiges § 23 StVZO-Gutachten). Für eine konkrete Preisauskunft genügt ein kurzer Anruf mit Modell, Baujahr und Anliegen.',
      },
      {
        q: 'Was ist der Unterschied zwischen Marktwert und Wiederbeschaffungswert beim Oldtimer?',
        a: 'Der Marktwert ist der Preis, den ein interessierter Käufer aktuell zu zahlen bereit wäre. Der Wiederbeschaffungswert ist der Aufwand, ein vergleichbares Fahrzeug auf dem Markt zu erwerben — bei seltenen Oldtimern oft deutlich höher. Für die Versicherung ist meist der Wiederbeschaffungswert maßgeblich.',
      },
    ],
  },

  {
    slug: 'kurzgutachten',
    title: 'Kurzgutachten',
    titleLong: 'Kurzgutachten · Kostenvoranschlag Hannover',
    titleH1: 'Kurzgutachten und Kostenvoranschlag in Hannover',
    tagline: 'Bagatellschäden unter 750 € · Festpreis · 24-h-Termin · für Versicherung verwertbar',
    metaTitle: 'Kurzgutachten Hannover — Bagatellschaden · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Kurzgutachten und Kostenvoranschlag für Bagatellschäden in Hannover und Umkreis. Festpreis, Termin innerhalb 24 h, vollständige Fotodokumentation und Reparaturkalkulation. Auch für Versicherung verwertbar.',
    intro:
      'Bei kleineren Schäden bis ca. 750 € lohnt sich oft kein vollwertiges Schadengutachten. Wir erstellen einen fundierten Kostenvoranschlag mit Fotodokumentation und Reparaturkalkulation — zum Festpreis, in 24 Stunden, für die Versicherung verwertbar.',
    sections: [
      {
        h2: 'Wann reicht ein Kurzgutachten?',
        body:
          'Ein Kurzgutachten bzw. Kostenvoranschlag ist bei Bagatellschäden eine wirtschaftliche Alternative zum Vollgutachten. Typische Fälle: Parkplatzdellen, Lackkratzer, kleinere Streifschäden, beschädigte Stoßstangen, leichte Karosserieschäden ohne Strukturbeteiligung. Faustregel: Wenn der voraussichtliche Reparaturwert unter ca. 750 € liegt und kein Verdacht auf weitergehende Schäden besteht, reicht der Kostenvoranschlag.',
      },
      {
        h2: 'Wann ist ein Vollgutachten besser?',
        list: [
          { strong: 'Unfall mit Gegner:', text: 'Bei unverschuldetem Haftpflichtschaden grundsätzlich Vollgutachten — die gegnerische Versicherung trägt die Kosten ohnehin und der Anspruch auf Wertminderung und Nutzungsausfall geht sonst verloren.' },
          { strong: 'Schadenhöhe unklar:', text: 'Wenn beim Karosseriedrücken oder bei Strukturbeschädigung der wahre Aufwand größer sein könnte als auf den ersten Blick.' },
          { strong: 'Wertminderung erwartbar:', text: 'Bei neueren oder höherwertigen Fahrzeugen sollten Wertminderungs-Ansprüche gutachterlich erfasst werden.' },
          { strong: 'Streitfall absehbar:', text: 'Wenn die Versicherung die Schadenhöhe wahrscheinlich anzweifeln wird.' },
        ],
      },
      {
        h2: 'Was Sie bekommen',
        body:
          'Vollständige Fotodokumentation des Schadens aus mehreren Perspektiven, detaillierte Reparaturkalkulation nach Herstellervorgaben (Arbeitszeit, Ersatzteile, Lackmaterial), schriftliches Dokument zur Vorlage bei Versicherung oder Werkstatt — zum vereinbarten Festpreis, ohne Überraschungen.',
      },
    ],
    faqs: [
      {
        q: 'Was kostet ein Kurzgutachten in Hannover?',
        a: 'Wir arbeiten zum Festpreis abhängig von Fahrzeugklasse und Schadenumfang. Genaue Auskunft auf kurze Nachfrage per Telefon oder WhatsApp.',
      },
      {
        q: 'Wird der Kostenvoranschlag von der Versicherung anerkannt?',
        a: 'Für reine Bagatellschäden in der Vollkasko: ja. Für Haftpflichtschäden empfehlen wir grundsätzlich ein Vollgutachten — sonst entgehen Ihnen Ansprüche auf Wertminderung und Nutzungsausfall.',
      },
      {
        q: 'Wie schnell bekomme ich den Kostenvoranschlag?',
        a: 'In der Regel am selben oder nächsten Werktag nach der Besichtigung.',
      },
    ],
  },
]

export function getLeistungBySlug(slug) {
  return leistungen.find((l) => l.slug === slug) || null
}

// Generic schema generator — used both at runtime (React) and at build time
// (postbuild templating). Returns a Service schema fragment per leistung.
export function leistungServiceSchema(l, origin = 'https://hannover-kfz-gutachter.de') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin}/leistungen/${l.slug}/#service`,
    serviceType: l.title,
    name: l.titleH1,
    description: l.metaDescription,
    provider: {
      '@type': 'AutomotiveBusiness',
      '@id': `${origin}/#business`,
      name: 'Kfz-Experten Hannover',
      url: `${origin}/`,
    },
    areaServed: [
      { '@type': 'City', name: 'Hannover' },
      { '@type': 'City', name: 'Langenhagen' },
      { '@type': 'City', name: 'Garbsen' },
      { '@type': 'City', name: 'Wunstorf' },
      { '@type': 'City', name: 'Laatzen' },
      { '@type': 'City', name: 'Lehrte' },
      { '@type': 'City', name: 'Sehnde' },
      { '@type': 'City', name: 'Burgwedel' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: '+4917680444241',
      serviceUrl: `${origin}/leistungen/${l.slug}/`,
    },
  }
}

export function leistungFaqSchema(l, origin = 'https://hannover-kfz-gutachter.de') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${origin}/leistungen/${l.slug}/#faq`,
    mainEntity: l.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
