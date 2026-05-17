// Ratgeber-Blog. Long-Form-Content für AEO (KI-Empfehlungen) und Long-Tail-SEO.
// Diese Artikel werden gezielt von ChatGPT/Claude/Perplexity zitiert, wenn
// User nach Begriffen wie "Wertminderung berechnen", "Nutzungsausfall" oder
// "Was tun nach Unfall" fragen.
//
// Content-Struktur: blocks (mix aus paragraph, heading, list). Wird von
// Ratgeber.jsx gerendert UND von postbuild als Article-Schema umgesetzt.

export const ratgeber = [
  {
    slug: 'was-tun-nach-unfall-hannover',
    title: 'Was tun nach einem Verkehrsunfall? Schritt-für-Schritt-Anleitung für Hannover',
    excerpt:
      'Nach einem Unfall in Hannover oder Umkreis sind die ersten Minuten entscheidend — für Ihre Sicherheit und für Ihre späteren Versicherungs- und Schadensansprüche. Hier ist die geprüfte Schritt-für-Schritt-Anleitung.',
    metaTitle: 'Was tun nach Unfall in Hannover? Schritt-für-Schritt — Kfz-Experten Hannover',
    metaDescription: 'Schritt-für-Schritt-Anleitung nach einem Verkehrsunfall in Hannover: Unfallstelle sichern, Daten austauschen, Beweise sichern, Gutachter beauftragen. Mit Anwalt-Hinweisen und typischen Fehlern.',
    published: '2026-05-17',
    readTime: '6 Min',
    category: 'Soforthilfe',
    blocks: [
      { type: 'p', text: 'Ein Verkehrsunfall passiert in Sekunden — aber die nächsten 30 Minuten bestimmen, wie sauber die Sache abgewickelt wird. Dieser Leitfaden geht durch die wichtigsten Schritte, optimiert für Verkehrssituationen im Hannover-Raum.' },

      { type: 'h2', text: '1. Unfallstelle sichern (in den ersten 60 Sekunden)' },
      { type: 'p', text: 'Warnblinker an. Warnweste anziehen, BEVOR Sie aussteigen. Warndreieck aufstellen: innerorts ca. 50 Meter, auf Landstraßen ca. 100 Meter, auf Autobahnen 150–400 Meter vor der Unfallstelle. Bei verletzten Personen sofort Notruf 112.' },

      { type: 'h2', text: '2. Polizei rufen — ja oder nein?' },
      { type: 'p', text: 'In folgenden Fällen IMMER die Polizei (110) rufen:' },
      { type: 'list', items: [
        'Personen verletzt (auch leicht)',
        'Höherer Sachschaden (Faustregel: ab 2.000 €)',
        'Fahrerflucht des Gegners',
        'Verdacht auf Alkohol/Drogen beim Gegner',
        'Streit über den Hergang',
        'Beteiligung eines Mietwagens, Firmenfahrzeugs oder ausländischen Kennzeichens',
      ]},
      { type: 'p', text: 'Bei reinen Bagatellschäden zwischen erwachsenen Privatpersonen mit klarer Schuldfrage kann ein einvernehmliches Aufnehmen ohne Polizei reichen — aber Vorsicht: die Erfahrung zeigt, dass die spätere Versicherungsabwicklung dann oft komplizierter wird.' },

      { type: 'h2', text: '3. Daten austauschen — was Sie brauchen' },
      { type: 'p', text: 'Vollständig erfassen:' },
      { type: 'list', items: [
        'Name, Anschrift, Telefonnummer des Gegners',
        'Versicherungsname + Versicherungsschein-Nummer (vom Verband oder Versicherungs­karte)',
        'Kennzeichen beider Fahrzeuge',
        'Marke, Modell, Farbe',
        'Führerscheindaten (zumindest mit Foto)',
        'Bei Firmenfahrzeugen: Firmenname + Halter',
      ]},

      { type: 'h2', text: '4. Beweise sichern — der wichtigste Schritt' },
      { type: 'p', text: 'Hier entscheidet sich oft, wie viel Schaden später anerkannt wird. Fotografieren Sie:' },
      { type: 'list', items: [
        'Schaden aus 4 Richtungen (vorne, hinten, beide Seiten)',
        'Detail-Fotos der Schadenstellen',
        'Kennzeichen beider Fahrzeuge',
        'Unfallstelle aus 10–20 Metern Distanz (Übersicht)',
        'Verkehrsschilder, Ampelstellung (wenn relevant)',
        'Bremsspuren auf der Straße',
        'Wetter- und Sichtverhältnisse',
      ]},
      { type: 'p', text: 'Zeitstempel und GPS-Daten kommen automatisch aus dem Handy. Diese Bilder sind später Gold wert.' },

      { type: 'h2', text: '5. Was Sie NICHT tun sollten' },
      { type: 'list', items: [
        'KEINE Schuldanerkennung am Unfallort abgeben — auch nicht im Eifer "Es tut mir leid, ich war schuld."',
        'NICHT mit der gegnerischen Versicherung sprechen, bevor Sie einen eigenen Gutachter und idealerweise Anwalt beauftragt haben',
        'NICHT in die erstbeste Werkstatt, die die gegnerische Versicherung "empfiehlt" — Sie haben freie Werkstattwahl',
        'NICHT auf das angebotene "schnelle Geld ohne Gutachten" eingehen — Sie verschenken damit oft 30 % und mehr',
      ]},

      { type: 'h2', text: '6. Eigenen Sachverständigen beauftragen' },
      { type: 'p', text: 'Bei unverschuldetem Unfall haben Sie das gesetzliche Recht auf einen eigenen, unabhängigen Gutachter. Die Kosten trägt die gegnerische Haftpflichtversicherung. Ein guter Gutachter erfasst nicht nur die Reparaturkosten, sondern auch Wertminderung, Nutzungsausfall, Mietwagenanspruch und Restwert — Posten, die der Versicherungsgutachter typischerweise zu Ihren Ungunsten klein hält.' },

      { type: 'h2', text: '7. Anwalt — ja, fast immer' },
      { type: 'p', text: 'Bei unverschuldetem Unfall werden auch die Kosten eines Verkehrsrechtsanwalts von der gegnerischen Versicherung getragen. Es entstehen für Sie also keine zusätzlichen Kosten — aber eine zusätzliche Verhandlungsstärke. Wir kooperieren mit erfahrenen Verkehrsrechts-Kanzleien in Hannover und vermitteln bei Bedarf.' },

      { type: 'h2', text: '8. Wann sind wir vor Ort?' },
      { type: 'p', text: 'Nach Ihrem Anruf oder Ihrer WhatsApp-Nachricht kommen wir im Hannover-Raum in der Regel innerhalb 45 Minuten zu Ihnen — zur Werkstatt, nach Hause oder direkt zur Unfallstelle, wenn das Fahrzeug noch dort steht. Innerhalb von 48 Stunden nach der Besichtigung halten Sie das fertige Gutachten in der Hand.' },
    ],
  },

  {
    slug: 'wertminderung-berechnen',
    title: 'Wertminderung nach Autoschaden — wie wird sie berechnet?',
    excerpt:
      'Selbst nach perfekter Reparatur ist ein Unfallauto weniger wert als ein unfallfreies. Diese „merkantile Wertminderung" steht Ihnen bei unverschuldetem Unfall als zusätzlicher Anspruch zu — viele lassen sie unbeansprucht liegen.',
    metaTitle: 'Wertminderung nach Unfall — Berechnung, Anspruch, Beispiele · Kfz-Experten Hannover',
    metaDescription: 'Wertminderung beim Autoschaden: was sie ist, wie sie berechnet wird (Ruhkopf/Sahm, BVSK), wann sie Ihnen zusteht, typische Höhen pro Fahrzeugklasse — mit Beispielen aus Hannover.',
    published: '2026-05-17',
    readTime: '5 Min',
    category: 'Schadensregulierung',
    blocks: [
      { type: 'p', text: 'Auch nach einer fachgerechten Reparatur ist ein Fahrzeug, das einen erheblichen Unfallschaden hatte, am Markt weniger wert als ein unfallfreies. Dieser Wertverlust heißt "merkantile Wertminderung" — und Sie haben bei unverschuldetem Unfall einen rechtlichen Anspruch darauf, zusätzlich zur reinen Reparatur.' },

      { type: 'h2', text: 'Was ist merkantile Wertminderung?' },
      { type: 'p', text: 'Ein Käufer, der von einem Unfallfahrzeug weiß, ist nur bereit, einen geringeren Preis zu zahlen — auch wenn das Fahrzeug technisch einwandfrei repariert wurde. Diesen Preisabschlag müssen Sie nach dem Verkauf hinnehmen, obwohl Sie nichts dafür können. Genau diesen Wertverlust ersetzt Ihnen die gegnerische Versicherung als merkantile Wertminderung.' },

      { type: 'h2', text: 'Wann besteht ein Anspruch?' },
      { type: 'list', items: [
        'Es liegt ein unverschuldeter Unfall vor (Haftpflichtschaden)',
        'Das Fahrzeug ist in der Regel nicht älter als 5 Jahre (BGH-Rechtsprechung gibt es auch für ältere Fahrzeuge, mit Einschränkungen)',
        'Laufleistung typischerweise unter 100.000 km',
        'Der Schaden ist mehr als ein Bagatell (Faustregel: über 1.000 €)',
        'Es handelt sich nicht um reine Verschleißteile oder Lackschäden',
      ]},

      { type: 'h2', text: 'Wie wird die Wertminderung berechnet?' },
      { type: 'p', text: 'In Deutschland sind mehrere Berechnungsmethoden anerkannt — die häufigsten sind:' },
      { type: 'list', items: [
        'BVSK-Methode (Bundesverband der freiberuflichen und unabhängigen Sachverständigen für das Kraftfahrzeugwesen) — Marktstandard, sehr nahe an der Realität',
        'Ruhkopf/Sahm — älter, mathematische Formel auf Basis von Wiederbeschaffungswert + Reparaturkosten',
        'Halbgewachs/Berger — Variante davon',
      ]},
      { type: 'p', text: 'In der Praxis errechnen die meisten Sachverständigen mit der BVSK-Methode oder einer Kombination und plausibilisieren das Ergebnis am Markt. Wichtige Einflussfaktoren: Alter, Laufleistung, Marke, ursprünglicher Marktwert, Schadenumfang, betroffene Bauteile (Rahmen/Karosserie-Bauteile wirken stärker als Anbauteile).' },

      { type: 'h2', text: 'Typische Höhen pro Fahrzeugklasse (Beispiele)' },
      { type: 'p', text: 'Realistische Größenordnungen bei einem mittelschweren Heckschaden, 3 Jahre altes Fahrzeug, ca. 50.000 km:' },
      { type: 'list', items: [
        'Kleinwagen (z. B. Polo): 300–600 €',
        'Kompaktklasse (z. B. Golf, A3): 500–1.200 €',
        'Mittelklasse (z. B. 3er, C-Klasse): 800–2.000 €',
        'Oberklasse / SUV (z. B. 5er, X5): 1.500–4.000 €',
        'Premium / Sportwagen (z. B. AMG, M, RS): 3.000–8.000 €',
      ]},
      { type: 'p', text: 'Das sind Richtwerte. Die tatsächliche Wertminderung kann je nach Modell, Markt und Schadenbild deutlich abweichen.' },

      { type: 'h2', text: 'Warum die Versicherung das oft "vergisst"' },
      { type: 'p', text: 'Versicherungsgutachten setzen die merkantile Wertminderung in der Praxis häufig zu niedrig an oder lassen sie ganz weg. Ein unabhängiger Sachverständiger erfasst sie korrekt im Gutachten — und die gegnerische Versicherung muss zahlen.' },

      { type: 'h2', text: 'Was Sie tun sollten' },
      { type: 'p', text: 'Lassen Sie das Schadengutachten von einem unabhängigen Sachverständigen erstellen, nicht von einem Versicherungsgutachter. Die Kosten dafür trägt die gegnerische Versicherung — ebenso wie die ermittelte Wertminderung selbst.' },
    ],
  },

  {
    slug: 'mietwagen-oder-nutzungsausfall',
    title: 'Mietwagen oder Nutzungsausfall — was steht Ihnen zu?',
    excerpt:
      'Wenn Ihr Auto nach einem unverschuldeten Unfall in der Werkstatt steht, haben Sie zwei Optionen: einen Mietwagen nehmen oder eine Tagespauschale (Nutzungsausfall) kassieren. Wann lohnt sich welche Variante?',
    metaTitle: 'Mietwagen vs. Nutzungsausfall nach Unfall — was lohnt sich? · Kfz-Experten Hannover',
    metaDescription: 'Mietwagen oder Nutzungsausfall? Wann welche Wahl bei Haftpflichtschaden Sinn macht — mit Tagespauschalen-Tabelle nach Fahrzeugklasse und typischen Fallstricken.',
    published: '2026-05-17',
    readTime: '5 Min',
    category: 'Schadensregulierung',
    blocks: [
      { type: 'p', text: 'Nach einem unverschuldeten Unfall steht Ihr Fahrzeug in der Werkstatt — und Sie haben einen Anspruch darauf, in dieser Zeit nicht ohne Mobilität dazustehen. Zwei Wege sind möglich, beide werden von der gegnerischen Haftpflichtversicherung getragen.' },

      { type: 'h2', text: 'Option 1: Mietwagen' },
      { type: 'p', text: 'Sie nehmen für die Reparaturdauer einen Mietwagen. Die gegnerische Versicherung übernimmt die Mietkosten — aber Achtung: nicht in beliebiger Höhe.' },
      { type: 'p', text: 'Wichtige Regeln:' },
      { type: 'list', items: [
        'Mietwagen muss eine Klasse niedriger sein als das beschädigte Fahrzeug ("Niedrigertarif"). Manche Versicherungen akzeptieren auch dieselbe Klasse — vorher klären.',
        'Mietwagen muss zu marktüblichen Konditionen gebucht werden — nicht zu Spitzentarifen einer "Unfallersatz-Vermietung". Diese Tarife werden oft gekürzt.',
        'Die Mietdauer darf die angemessene Reparaturzeit nicht überschreiten (steht in Ihrem Gutachten).',
        'Sie sollten möglichst eine ähnliche Strecke wie sonst fahren — wenn Sie deutlich weniger fahren, wird die Versicherung das beanstanden.',
      ]},

      { type: 'h2', text: 'Option 2: Nutzungsausfall (Tagespauschale)' },
      { type: 'p', text: 'Sie nehmen KEINEN Mietwagen und kassieren stattdessen eine Tagespauschale für die Dauer der Reparatur (laut Gutachten). Diese Pauschale richtet sich nach Fahrzeugklasse und ist in der "Tabelle Sanden/Danner/Küppersbusch" festgelegt — dem deutschen Standard.' },
      { type: 'p', text: 'Typische Tagespauschalen (Auswahl, Stand 2026):' },
      { type: 'list', items: [
        'Kleinwagen (Polo, Corsa, Fiesta): ca. 23–35 € / Tag',
        'Kompaktklasse (Golf, A3, 1er): ca. 35–43 € / Tag',
        'Mittelklasse (3er, C-Klasse, Passat): ca. 43–59 € / Tag',
        'Oberklasse (5er, E-Klasse, A6): ca. 59–79 € / Tag',
        'SUV / Geländewagen (X5, GLC): ca. 65–85 € / Tag',
        'Sportwagen / Premium (911, AMG): ca. 100–175 € / Tag',
      ]},
      { type: 'p', text: 'Bei einer Reparaturdauer von z. B. 8 Werktagen und einem 3er BMW als Fahrzeug kommen so schnell 350–470 € Nutzungsausfall zusammen — als reine Pauschale, ohne dass Sie etwas einreichen müssen.' },

      { type: 'h2', text: 'Was lohnt sich?' },
      { type: 'p', text: 'Faustregel:' },
      { type: 'list', items: [
        'Sie brauchen das Auto täglich (Pendler, Familien-Logistik) → Mietwagen.',
        'Sie können die Tage gut überbrücken (Homeoffice, ÖPNV, anderes Familienfahrzeug) → Nutzungsausfall kassieren.',
      ]},
      { type: 'p', text: 'Viele Geschädigte unterschätzen den Nutzungsausfall — er ist oft die wirtschaftlich attraktivere Wahl, gerade wenn man kurz auf das Auto verzichten kann.' },

      { type: 'h2', text: 'Was Sie unbedingt brauchen' },
      { type: 'p', text: 'Beide Ansprüche (Mietwagen UND Nutzungsausfall) sind nur dann sauber durchsetzbar, wenn ein unabhängiges Gutachten die voraussichtliche Reparaturdauer fest dokumentiert. Ohne Gutachten kann die Versicherung die Dauer beliebig kürzen. Lassen Sie deshalb immer einen unabhängigen Sachverständigen — nicht den Versicherungsgutachter — den Schaden aufnehmen.' },
    ],
  },

  {
    slug: 'versicherung-kuerzt-gutachten',
    title: 'Versicherung will Ihr Gutachten kürzen — was tun?',
    excerpt:
      'Die gegnerische Versicherung zahlt nicht den vollen im Gutachten festgestellten Betrag, sondern kürzt einzelne Positionen oder den Stundenverrechnungssatz. Das ist ein klassisches Muster — und es ist meist nicht rechtens. So gehen Sie vor.',
    metaTitle: 'Versicherung kürzt Gutachten — Ihre Rechte und Vorgehen · Kfz-Experten Hannover',
    metaDescription: 'Wenn die gegnerische Versicherung das Schadengutachten kürzt: typische Kürzungs-Tricks (UPE-Aufschläge, Verbringungskosten, Stundensätze), wann sie unzulässig sind, wie Sie vorgehen.',
    published: '2026-05-17',
    readTime: '6 Min',
    category: 'Schadensregulierung',
    blocks: [
      { type: 'p', text: 'Sie haben ein sauberes Gutachten in der Hand — und die gegnerische Versicherung zahlt nur einen Teil davon. Das ist keine Ausnahme, das ist eine Strategie. In den meisten Fällen sind die Kürzungen rechtlich nicht haltbar. Hier sind die häufigsten Tricks und wie Sie darauf reagieren.' },

      { type: 'h2', text: 'Kürzung 1: Stundenverrechnungssatz' },
      { type: 'p', text: 'Die Versicherung argumentiert, die Stundensätze einer Markenwerkstatt seien zu hoch — die Reparatur sei auch in einer freien Werkstatt möglich. Diese Argumentation ist nicht zulässig, wenn:' },
      { type: 'list', items: [
        'Ihr Fahrzeug noch in der Herstellergarantie oder Anschlussgarantie steht',
        'Sie das Fahrzeug bisher in einer Markenwerkstatt gewartet haben (Scheckheft)',
        'Es sich um ein junges Fahrzeug handelt (BGH-Rechtsprechung: bis 3 Jahre regelmäßig zulässig, oft auch länger)',
      ]},
      { type: 'p', text: 'In diesen Fällen können Sie auf den vollen Stundenverrechnungssatz Ihrer Markenwerkstatt bestehen.' },

      { type: 'h2', text: 'Kürzung 2: UPE-Aufschläge (Ersatzteil-Aufschläge)' },
      { type: 'p', text: 'Hersteller verkaufen Originalersatzteile meist mit einem Aufschlag (UPE = Unverbindliche Preisempfehlung Plus). Werkstätten geben diesen Aufschlag durch — und Versicherungen versuchen, ihn herauszustreichen.' },
      { type: 'p', text: 'Auch hier gilt: Wenn die Reparatur in einer Markenwerkstatt mit Originalteilen erfolgt (oder erfolgen soll), sind die UPE-Aufschläge in der Regel zu erstatten. Die Rechtsprechung hierzu ist klar pro Geschädigte.' },

      { type: 'h2', text: 'Kürzung 3: Verbringungskosten' },
      { type: 'p', text: 'Wenn Ihre Werkstatt das Fahrzeug zum Lackieren oder für Spezialarbeiten in einen Fachbetrieb verbringen muss, fallen Verbringungskosten an. Versicherungen kürzen diese gern komplett. Sie sind aber zu erstatten, wenn diese Vorgehensweise marktüblich ist — was in Hannover bei den meisten Markenwerkstätten der Fall ist.' },

      { type: 'h2', text: 'Kürzung 4: Wertminderung' },
      { type: 'p', text: 'Ein klassischer Punkt: die Versicherung setzt die merkantile Wertminderung niedriger an oder verweigert sie ganz. Wenn das Gutachten die Wertminderung korrekt nach BVSK-Methode berechnet hat, ist die Kürzung in der Regel unzulässig. (Mehr dazu im Ratgeber-Artikel "Wertminderung berechnen".)' },

      { type: 'h2', text: 'Kürzung 5: Nutzungsausfall / Mietwagen' },
      { type: 'p', text: 'Die Reparaturdauer im Gutachten wird "auf X Tage angemessen reduziert" — oder der Mietwagentarif als zu hoch eingestuft. Beides sind häufige Streitpunkte. Wichtig: Wenn das Gutachten die Reparaturdauer technisch begründet, ist sie verbindlich.' },

      { type: 'h2', text: 'So gehen Sie vor' },
      { type: 'list', items: [
        '1. NICHT die Kürzung akzeptieren und nicht ein "Vergleichsangebot" unterschreiben.',
        '2. Schriftlich der Kürzung widersprechen — formlos reicht, aber mit Fristsetzung (z. B. 14 Tage).',
        '3. Verkehrsrechtsanwalt einbeziehen — bei unverschuldetem Unfall trägt die gegnerische Versicherung auch die Anwaltskosten.',
        '4. Bei Bedarf: Sachverständigen zur Nachbesserung einbinden — der Sachverständige kann fachlich gegen die Kürzungen Stellung nehmen, was vor Gericht hohes Gewicht hat.',
        '5. Wenn die Versicherung nicht einlenkt: Klage vor dem Amts- oder Landgericht. Die meisten Fälle werden vor Gericht zugunsten des Geschädigten entschieden, wenn die Kürzungen unbegründet waren.',
      ]},

      { type: 'h2', text: 'Warum das so läuft' },
      { type: 'p', text: 'Versicherungen wissen: die Mehrheit der Geschädigten gibt bei Kürzungen klein bei, weil der Aufwand zu groß erscheint. Mit dem richtigen Sachverständigen und einem erfahrenen Anwalt im Verkehrsrecht ist der Aufwand für Sie aber praktisch null — und der wirtschaftliche Effekt erheblich. Diese Strategie funktioniert für die Versicherung nur, wenn Geschädigte nicht widersprechen.' },

      { type: 'h2', text: 'Unsere Rolle' },
      { type: 'p', text: 'Wir erstellen Gutachten so, dass die typischen Kürzungspunkte bereits fachlich entkräftet sind, bevor sie aufkommen — saubere Stundensatz-Begründung, Markenwerkstatt-Zugehörigkeit, dokumentierte Wertminderung. Bei späteren Kürzungen unterstützen wir mit fachlichen Stellungnahmen direkt aus dem Gutachten.' },
    ],
  },
]

export function getRatgeberBySlug(slug) {
  return ratgeber.find((r) => r.slug === slug) || null
}

export function ratgeberArticleSchema(r, origin = 'https://hannover-kfz-gutachter.de') {
  const text = r.blocks
    .filter((b) => b.type === 'p' || b.type === 'h2')
    .map((b) => b.text)
    .join(' ')
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${origin}/ratgeber/${r.slug}/#article`,
    headline: r.title,
    description: r.metaDescription,
    image: `${origin}/logo/logo-1200.png`,
    datePublished: r.published,
    dateModified: r.published,
    author: {
      '@type': 'Organization',
      name: 'Kfz-Experten Hannover',
      url: `${origin}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kfz-Experten Hannover',
      logo: { '@type': 'ImageObject', url: `${origin}/logo/logo-1200.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${origin}/ratgeber/${r.slug}/` },
    articleSection: r.category,
    articleBody: text,
  }
}
