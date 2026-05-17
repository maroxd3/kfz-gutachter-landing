// Standort-/Einsatzgebiet-Pages. Eine eigene Page pro Stadt im Hannover-Raum
// für Long-Tail-SEO: "Kfz-Gutachter [Ort]", "Sachverständiger [Ort]" etc.
//
// WICHTIG: Jede Stadt MUSS einzigartigen Content haben (lokale Bezugspunkte,
// Stadtteile, spezifische FAQs). Reiner Town-Name-Swap löst Duplicate-Content-
// Penalty bei Google aus.

export const standorte = [
  {
    slug: 'hannover',
    city: 'Hannover',
    titleH1: 'Kfz-Gutachter in Hannover',
    tagline: 'Sachverständigenbüro für alle Stadtteile · in 45 Min vor Ort · 24/7 Soforthilfe',
    metaTitle: 'Kfz-Gutachter Hannover — Sachverständiger für alle Stadtbezirke · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Gutachter und Sachverständiger in Hannover — von Mitte über List bis Misburg, Linden und Bothfeld. Unfallgutachten, Wertgutachten, Oldtimer-Gutachten. In 45 Min vor Ort, Termin innerhalb 24 h, Gutachten in 48 h.',
    intro:
      'Mit über 535.000 Einwohnern in 13 Stadtbezirken ist Hannover die größte Stadt Niedersachsens — und entsprechend hoch ist die Unfalldichte auf Schnellwegen wie dem Messeschnellweg, Westschnellweg und Südschnellweg sowie in Stadtbereichen mit hohem Pendlerverkehr. Wir kommen zu Ihnen in jeden Stadtteil, kennen die typischen Werkstattlandschaften und arbeiten regelmäßig mit Verkehrsrechtsanwälten in der Innenstadt zusammen.',
    sections: [
      {
        h2: 'Wir sind in allen Stadtbezirken vertreten',
        body:
          'Hannover ist groß und sehr unterschiedlich. Wir bedienen sämtliche Stadtbezirke und kommen je nach Verkehrslage in 30 bis 60 Minuten vor Ort.',
        list: [
          { strong: 'Mitte, Oststadt, Calenberger Neustadt:', text: 'Innenstadt-Schäden, Tiefgaragenunfälle, Begutachtungen bei Werkstätten und Wohnstraßen.' },
          { strong: 'Vahrenwald-List:', text: 'Hohes Pendleraufkommen, Schwerpunkt Auffahrunfälle und Parkschäden.' },
          { strong: 'Bothfeld-Vahrenheide, Buchholz-Kleefeld:', text: 'Wohngebiete, Familienfahrzeuge, häufig Bagatell- und Parkschäden.' },
          { strong: 'Misburg-Anderten, Kirchrode-Bemerode-Wülferode:', text: 'Verbindung zu Lehrte und A2/A37, oft Auffahrunfälle und Wildschäden.' },
          { strong: 'Linden-Limmer, Ricklingen, Ahlem-Badenstedt-Davenstedt:', text: 'Westen Hannovers, Gewerbegebiete, Liefer- und Firmenfahrzeuge.' },
          { strong: 'Herrenhausen-Stöcken, Nord:', text: 'VW-Standort-Nähe, viele Firmen- und Leasingfahrzeuge.' },
          { strong: 'Döhren-Wülfel, Südstadt-Bult:', text: 'Verbindung zum Messegelände und Süden, Pendlerverkehr.' },
        ],
      },
      {
        h2: 'Was wir in Hannover anbieten',
        body:
          'Alle Standard-Leistungen unseres Sachverständigenbüros — für Privatkunden, Anwaltskanzleien und Werkstätten im gesamten Stadtgebiet.',
      },
      {
        h2: 'Warum lokal beauftragen?',
        body:
          'Wer das Gebiet kennt, arbeitet schneller und genauer. Wir kennen die häufigsten Unfallstellen (Messeschnellweg, Schaufelder Straße, Vahrenwalder Straße), die Werkstattlandschaft und die Bezirksgerichte. Bei Streitigkeiten mit Versicherungen kann ein Gutachter aus dem Hannover-Raum kurzfristig zu Nachbegehungen einbestellt werden — externe Gutachter aus anderen Städten verzögern den Prozess.',
      },
    ],
    faqs: [
      {
        q: 'Wie lange dauert es, bis Sie in der Innenstadt von Hannover sind?',
        a: 'In der Regel 30 bis 45 Minuten ab Anruf, abhängig von der Tageszeit. In den Außenbezirken (Misburg, Bothfeld, Wülfel) etwa 45 bis 60 Minuten. Bei Notfällen priorisieren wir.',
      },
      {
        q: 'Kommen Sie auch in Tiefgaragen oder Parkhäuser?',
        a: 'Ja. Wir kommen zu jeder zugänglichen Begutachtungsstelle in Hannover — Tiefgarage, Parkhaus, Werkstatthof oder Straße. Bitte vorab kurz die Adresse und den Stellplatz durchgeben.',
      },
      {
        q: 'Gibt es einen Festpreis für Begutachtungen innerhalb Hannovers?',
        a: 'Unfallgutachten bei unverschuldetem Haftpflichtschaden werden von der gegnerischen Versicherung getragen, für Sie entstehen keine Kosten. Für Kurzgutachten und Wertgutachten arbeiten wir mit transparenten Festpreisen nach Fahrzeugklasse — ohne versteckte Anfahrtskosten innerhalb des Hannover-Stadtgebiets.',
      },
      {
        q: 'Arbeiten Sie mit Anwaltskanzleien in Hannover zusammen?',
        a: 'Ja, wir kooperieren mit mehreren Verkehrsrechts-Kanzleien in Hannover und können bei Bedarf vermitteln. Die Anwaltskosten bei unverschuldetem Unfall trägt ebenfalls die gegnerische Versicherung.',
      },
    ],
  },

  {
    slug: 'langenhagen',
    city: 'Langenhagen',
    titleH1: 'Kfz-Gutachter in Langenhagen',
    tagline: 'Unser Stammsitz · Berliner Allee 51 · Flughafen, Industriegebiete und Pendlerverkehr',
    metaTitle: 'Kfz-Gutachter Langenhagen — direkter Standort · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Sachverständiger in Langenhagen — unser Stammsitz an der Berliner Allee 51. Unfallgutachten, Wertgutachten, Oldtimer-Bewertungen für Langenhagen und Umkreis. Schnelle Anfahrt, persönlicher Ansprechpartner.',
    intro:
      'Langenhagen ist unser Stammsitz — die Berliner Allee 51 liegt direkt im Stadtgebiet. Mit dem Flughafen Hannover, mehreren großen Industriegebieten (Godshorn, Krähenwinkel, Kaltenweide) und einer der höchsten Pendlerquoten Niedersachsens hat Langenhagen einen besonderen Mix aus Privat-, Geschäfts- und Flottenverkehr — und entsprechend vielfältige Schadenfälle.',
    sections: [
      {
        h2: 'Vor Ort in jedem Langenhagener Ortsteil',
        body:
          'Wir sind in Langenhagen-Mitte, Brink-Hafen, Wiesenau, Krähenwinkel, Engelbostel, Kaltenweide, Godshorn und Schulenburg innerhalb kürzester Zeit erreichbar.',
        list: [
          { strong: 'Langenhagen-Mitte und Brink-Hafen:', text: 'Stadtkern, Wohnstraßen, Pendlerverkehr Richtung Hannover.' },
          { strong: 'Wiesenau und Schulenburg:', text: 'Wohngebiete mit höherem Familienfahrzeugaufkommen.' },
          { strong: 'Godshorn und Krähenwinkel:', text: 'Industriegebiete, Speditionsverkehr, Firmen- und Lieferfahrzeuge.' },
          { strong: 'Kaltenweide und Engelbostel:', text: 'Randbereiche, Anbindung an A2/A352, Wildschäden möglich.' },
          { strong: 'Flughafen Hannover (Flughafen-Bezirk):', text: 'Park-and-Ride-Schäden, Mietwagen-Bagatellen, Geschäftsreisende-Fälle.' },
        ],
      },
      {
        h2: 'Besondere Schadenlagen in Langenhagen',
        body:
          'Durch den Flughafenbetrieb und die hohe Pendlerdichte sehen wir hier überdurchschnittlich oft Parkschäden in P+R-Anlagen, Wildunfälle in den Randbereichen Richtung Wedemark und Auffahrunfälle an den Schnellweg-Auffahrten. Für jede dieser Schadenarten erstellen wir das passende Gutachten mit der erforderlichen Tiefe.',
      },
      {
        h2: 'Warum unser Standort hier sitzt',
        body:
          'Langenhagen liegt strategisch zwischen Hannover-Nord, dem Flughafen und der Wedemark. Von hier aus erreichen wir Hannover (allesamt Bezirke) in 15 bis 30 Minuten, Wedemark und Burgwedel in 20 Minuten, und auch Garbsen, Isernhagen oder Burgdorf in unter 30 Minuten. Das ist der schnellste Aktionsradius im Hannover-Raum.',
      },
    ],
    faqs: [
      {
        q: 'Wo genau sitzt Ihr Büro in Langenhagen?',
        a: 'Berliner Allee 51, 30855 Langenhagen. Wir bedienen Termine grundsätzlich mobil — d.h. wir kommen zu Ihnen. Eine Vorbeikunft an der Geschäftsadresse ist nur nach Terminvereinbarung sinnvoll.',
      },
      {
        q: 'Ich hatte einen Schaden am Flughafen — was tun?',
        a: 'Notieren Sie die Stellplatznummer und das Datum, fotografieren Sie den Schaden mit Übersicht und Detail. Wir kommen direkt zum Flughafen-Parkhaus oder Park-and-Ride und nehmen den Schaden auf. Bei Mietwagenschäden bitte auch den Mietvertrag bereithalten.',
      },
      {
        q: 'Bedienen Sie auch Wedemark und Burgwedel?',
        a: 'Ja. Wedemark, Burgwedel, Isernhagen und Resse sind unsere klassischen Umkreis-Gebiete — keine Anfahrtskosten innerhalb 50 km ab Langenhagen.',
      },
      {
        q: 'Kann ich auch zu Ihnen nach Langenhagen kommen?',
        a: 'Nach Vereinbarung gern — wir empfehlen aber den Vor-Ort-Service: Bei einem Schaden ist die Begutachtung dort, wo das Fahrzeug steht (Werkstatt, Wohnung, Unfallstelle), regelmäßig effizienter.',
      },
    ],
  },

  {
    slug: 'garbsen',
    city: 'Garbsen',
    titleH1: 'Kfz-Gutachter in Garbsen',
    tagline: 'Sachverständigenbüro für Garbsen, Berenbostel, Frielingen und alle Ortsteile',
    metaTitle: 'Kfz-Gutachter Garbsen — Sachverständiger vor Ort · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Gutachter in Garbsen, Berenbostel, Frielingen, Stelingen und allen Ortsteilen. Unfallgutachten, Wertgutachten, Oldtimer-Bewertungen. Schnelle Anfahrt vom Stammsitz Langenhagen, kein Aufpreis bis 50 km.',
    intro:
      'Garbsen ist mit über 60.000 Einwohnern und 13 Ortsteilen die zweitgrößte Stadt der Region Hannover-West. Durch den Maschinenbau-Campus der Leibniz Universität Hannover und mehrere Industriegebiete sehen wir hier eine besondere Mischung aus Studenten-, Familien- und Firmenfahrzeugen — alle mit unterschiedlichen Begutachtungs-Schwerpunkten.',
    sections: [
      {
        h2: 'Alle Ortsteile von Garbsen',
        body:
          'Wir bedienen sämtliche Garbsener Ortsteile mit derselben Geschwindigkeit wie Hannover-Stadt — Anfahrt vom Stammsitz Langenhagen in 20 bis 30 Minuten.',
        list: [
          { strong: 'Garbsen-Mitte, Auf der Horst:', text: 'Stadtkern, Wohnviertel, Einkaufszentrum.' },
          { strong: 'Berenbostel:', text: 'Größter Ortsteil, hoher Pendleranteil Richtung Hannover und Wunstorf.' },
          { strong: 'Frielingen, Stelingen, Heitlingen:', text: 'Ländliche Ortsteile, häufiger Wildschäden, Pkw + Anhänger.' },
          { strong: 'Havelse, Osterwald:', text: 'Anbindung an A2 / A352, Pendlerverkehr.' },
          { strong: 'Schloss Ricklingen, Meyenfeld:', text: 'Wohn- und Mischgebiete, klassische Stadtschäden.' },
          { strong: 'Garbsen-Campus (Leibniz Uni Maschinenbau):', text: 'Studenten- und Universitätsfahrzeuge.' },
        ],
      },
      {
        h2: 'Häufige Schadenlagen in Garbsen',
        body:
          'Die Anbindung an A2 und A352 bringt überdurchschnittlich viele Autobahn-Auffahrunfälle. In den ländlichen Ortsteilen Frielingen, Stelingen und Heitlingen kommen Wildschäden häufiger vor — diese erfordern ein spezielles Vorgehen bei der Wildschaden-Bescheinigung und der Versicherungsabwicklung. Für beide Schadenarten haben wir die passenden Prozesse.',
      },
      {
        h2: 'Anfahrt und Verfügbarkeit',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Garbsen-Mitte in etwa 20 Minuten, Berenbostel in 25 Minuten, die ländlichen Ortsteile in 30 bis 40 Minuten. Anfahrtskosten fallen innerhalb 50 km nicht an — Garbsen liegt komplett in unserem regulären Einsatzradius.',
      },
    ],
    faqs: [
      {
        q: 'Was tun bei einem Wildschaden in den Garbsener Ortsteilen?',
        a: 'Rufen Sie zuerst die Polizei (110) — die Wildschaden-Bescheinigung ist Voraussetzung für die Versicherungsabwicklung. Danach kontaktieren Sie uns, wir nehmen den Schaden auf und erstellen das Gutachten für Ihre Teilkasko oder Vollkasko. Bei richtig dokumentiertem Wildschaden besteht in der Regel voller Anspruch.',
      },
      {
        q: 'Bedienen Sie auch Seelze und Wunstorf?',
        a: 'Ja, Seelze, Wunstorf, Neustadt am Rübenberge und Wedemark sind alle in unserem 50-km-Radius. Keine Anfahrtskosten.',
      },
      {
        q: 'Wie schnell sind Sie in Berenbostel oder Frielingen?',
        a: 'Berenbostel etwa 25 Minuten ab Anruf, Frielingen 30 bis 40 Minuten je nach Verkehr. In Eilfällen priorisieren wir.',
      },
    ],
  },
]

export function getStandortBySlug(slug) {
  return standorte.find((s) => s.slug === slug) || null
}

export function standortServiceSchema(s, origin = 'https://hannover-kfz-gutachter.de') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin}/standorte/${s.slug}/#service`,
    serviceType: 'Kfz-Gutachten und Fahrzeugbewertung',
    name: s.titleH1,
    description: s.metaDescription,
    provider: {
      '@type': 'AutomotiveBusiness',
      '@id': `${origin}/#business`,
      name: 'Kfz-Experten Hannover',
      url: `${origin}/`,
    },
    areaServed: { '@type': 'City', name: s.city },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: '+4917680444241',
      serviceUrl: `${origin}/standorte/${s.slug}/`,
    },
  }
}

export function standortFaqSchema(s, origin = 'https://hannover-kfz-gutachter.de') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${origin}/standorte/${s.slug}/#faq`,
    mainEntity: s.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
