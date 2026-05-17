// Hannover-Stadtteile (Unter-Pages von /standorte/hannover/).
// URL-Pattern: /standorte/hannover/<slug>/
// Diese Pages zielen auf sehr lokale Long-Tail-Queries wie
// "Kfz-Gutachter Hannover List" oder "Sachverständiger Linden".
//
// WICHTIG: Jede Page muss einzigartigen, ortsspezifischen Content haben.
// Reine Stadtteil-Namens-Variationen ohne echten lokalen Bezug triggern
// Google "Doorway Pages"-Penalty.

export const stadtteile = [
  {
    slug: 'list',
    name: 'List',
    bezirk: 'Vahrenwald-List',
    titleH1: 'Kfz-Gutachter in Hannover-List',
    tagline: 'Sachverständigenbüro für List, Lister Meile und Eilenriede-Rand',
    metaTitle: 'Kfz-Gutachter Hannover-List — Sachverständiger vor Ort · Kfz-Experten',
    metaDescription: 'Kfz-Gutachter im Hannoverschen Stadtteil List (Bezirk Vahrenwald-List). Lister Meile, Eilenriede-Rand, Welfenplatz. Unfallgutachten, Wertgutachten, Kurzgutachten — in 30 Min vor Ort.',
    intro:
      'List ist einer der bevölkerungsdichtesten Stadtteile Hannovers, geprägt durch die Lister Meile als Einkaufsstraße, die Nähe zur Eilenriede und einen hohen Anteil junger Familien sowie Studenten. Die Mischung aus Wohngebiet, Einkaufsstraßen und Pendlerverkehr Richtung Innenstadt bringt überdurchschnittlich viele Park-, Auffahr- und Bagatellschäden.',
    sections: [
      {
        h2: 'Typische Schadenfälle in List',
        body:
          'Auf der Lister Meile und in den Nebenstraßen kommt es regelmäßig zu Parkschäden — sowohl in den Querparkbereichen als auch in den Wohnstraßen. Am Welfenplatz und an der Lister Platz-Kreuzung sehen wir häufig Auffahrunfälle im Berufsverkehr. In der Eilenriede selbst sind Wildunfälle selten, aber im Übergangsbereich zu Bothfeld kommt das vor.',
      },
      {
        h2: 'Anfahrt aus Langenhagen',
        body:
          'Vom Stammsitz Langenhagen erreichen wir List über die Vahrenwalder Straße in etwa 15–20 Minuten. Wir kommen zu jeder Adresse — auch in die engen Seitenstraßen der Lister Meile.',
      },
    ],
    faqs: [
      {
        q: 'Parkschaden auf der Lister Meile — wer zahlt?',
        a: 'Wenn der Verursacher bekannt ist (Notiz unter dem Scheibenwischer, Polizei dazu gerufen), zahlt dessen Haftpflicht. Bei Fahrerflucht zahlt Ihre Vollkasko (wenn vorhanden) gegen Selbstbeteiligung. In beiden Fällen erstellen wir das Gutachten — bei Haftpflicht trägt die Versicherung die Kosten.',
      },
      {
        q: 'Mein Auto steht in einer Tiefgarage in List — kommen Sie?',
        a: 'Ja, gern. Bitte vorab Adresse und ungefähre Stellplatz-Lage durchgeben, damit wir die Begutachtung effizient planen können.',
      },
      {
        q: 'Wie lange dauert ein Kurzgutachten für einen Bagatellschaden in List?',
        a: 'Termin meist am selben oder nächsten Werktag, Dokumentation in der Regel innerhalb 24 Stunden danach. Festpreis vorher klar besprochen.',
      },
    ],
  },

  {
    slug: 'linden',
    name: 'Linden',
    bezirk: 'Linden-Limmer',
    titleH1: 'Kfz-Gutachter in Hannover-Linden',
    tagline: 'Sachverständigenbüro für Linden-Nord, -Mitte, -Süd und Limmer',
    metaTitle: 'Kfz-Gutachter Hannover-Linden — Sachverständiger vor Ort · Kfz-Experten',
    metaDescription: 'Kfz-Gutachter im Stadtteil Linden (Hannover) — Linden-Nord, Linden-Mitte, Linden-Süd und Limmer. Unfallgutachten und Wertgutachten vor Ort, schnell und persönlich.',
    intro:
      'Linden ist das wohl bekannteste Szene-Viertel Hannovers — bunt gemischt aus Studierenden, Kreativen, jungen Familien und einer aktiven Gastronomie- und Einkaufsszene rund um Limmerstraße, Lindener Marktplatz und Küchengarten. Die hohe Bevölkerungs- und Parkplatzdichte sorgt für viele Bagatell- und Parkschäden — gerade in den engen Wohnstraßen.',
    sections: [
      {
        h2: 'Schadenhotspots in Linden',
        body:
          'Die Limmerstraße und die Posthornstraße sind klassische Park-Hotspots: enge Parkbuchten, viel Fußgängerverkehr, Lieferverkehr — entsprechend häufig Anstoß- und Streifschäden. Am Allerweg, an der Deisterstraße und auf dem Stephanusplatz sehen wir regelmäßig Auffahrunfälle im Berufsverkehr.',
      },
      {
        h2: 'Anfahrt aus Langenhagen',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Linden über den Westschnellweg in etwa 20–30 Minuten. Wir kommen auch in die engsten Hinterhof-Adressen.',
      },
    ],
    faqs: [
      {
        q: 'Parkschaden in der Limmerstraße — was tun wenn der Verursacher weg ist?',
        a: 'Sofort Polizei (110) rufen und Verkehrsunfallflucht-Anzeige stellen. Bilder vom Schaden, Zeugen ansprechen, Umgebungsfotos. Wir nehmen den Schaden danach auf. Bei nachgewiesener Fahrerflucht trägt Ihre Vollkasko (wenn vorhanden) gegen Selbstbeteiligung — oder im Glücksfall der ermittelte Verursacher.',
      },
      {
        q: 'Mein Auto steht in einem Hinterhof in Linden-Nord — kommen Sie?',
        a: 'Ja. Bitte Adresse + Hinweis zum Zugang (Klingelschild, Tor, Durchfahrt) vorab durchgeben, damit wir nichts suchen müssen.',
      },
      {
        q: 'Gibt es Unterschiede zwischen Gutachten für ältere und neuere Fahrzeuge?',
        a: 'Ja — bei älteren Fahrzeugen ist die Wertminderung oft prozentual kleiner, der Restwert wird wichtiger und die Reparaturkosten können den Wiederbeschaffungswert übersteigen (wirtschaftlicher Totalschaden). Wir berücksichtigen das gerade in Linden mit viel Alt-Bestand entsprechend.',
      },
    ],
  },

  {
    slug: 'misburg',
    name: 'Misburg',
    bezirk: 'Misburg-Anderten',
    titleH1: 'Kfz-Gutachter in Hannover-Misburg',
    tagline: 'Sachverständigenbüro für Misburg-Nord, -Süd, Anderten · Nähe A2 und A37',
    metaTitle: 'Kfz-Gutachter Hannover-Misburg — Sachverständiger vor Ort · Kfz-Experten',
    metaDescription: 'Kfz-Gutachter in Misburg und Anderten — direkter Bezug zu A2 und A37, viele Auffahr- und Lieferverkehrsschäden. Unfallgutachten, Wertgutachten, Bagatell-Kurzgutachten.',
    intro:
      'Misburg-Anderten im Nordosten Hannovers ist durch direkte Anbindung an A2 und A37, große Industriegebiete und das Mittellandkanalufer geprägt. Der gewerbliche Verkehr ist hoch — Lieferfahrzeuge, Speditionen, Pendlerverkehr. Entsprechend bei den Schäden: Auffahrunfälle, Schäden bei der Anlieferung, PKW-LKW-Kollisionen.',
    sections: [
      {
        h2: 'Schadenhotspots in Misburg-Anderten',
        body:
          'Die Anschlussstellen Hannover-Anderten (A37) und Misburg/Hannover-Ost (A2) sehen regelmäßig Auffahrunfälle in den Stau-Phasen. Im Industriegebiet Misburg-Nord kommen Park- und Rangierschäden mit gewerblichen Fahrzeugen häufiger vor. Am Mittellandkanal gelegen, kommen im Sommer auch vereinzelt Anhänger- und Bootsanhänger-Schäden vor.',
      },
      {
        h2: 'Anfahrt aus Langenhagen',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Misburg-Mitte über die A7/A2 in etwa 25 Minuten, Anderten in 25–30 Minuten. Bei Schäden auf der A2 oder A37 direkt kommen wir zur Abschleppstelle oder Werkstatt.',
      },
    ],
    faqs: [
      {
        q: 'A2-Auffahrunfall bei Misburg — wann sind Sie da?',
        a: '25–35 Minuten ab Anruf. Bei Notfällen priorisieren wir die Anfahrt zur Abschleppstelle oder Werkstatt, wo Ihr Fahrzeug nach dem Unfall steht.',
      },
      {
        q: 'Schaden mit einem LKW oder Lieferfahrzeug — was zu beachten?',
        a: 'Bei PKW-Nutzfahrzeug-Schäden ist die Beweisaufnahme aufwendiger (Tachoscheibe / digitaler Tacho, Frachtpapiere, Sichtverhältnisse). Wir dokumentieren umfassend und empfehlen frühe Einbindung eines Verkehrsrechtsanwalts.',
      },
      {
        q: 'Bedienen Sie auch die anliegenden Lehrte-Ortsteile?',
        a: 'Ja, Ahlten, Steinwedel und Lehrte selbst liegen in unserem 50-km-Radius — keine Anfahrtskosten.',
      },
    ],
  },

  {
    slug: 'bothfeld',
    name: 'Bothfeld',
    bezirk: 'Bothfeld-Vahrenheide',
    titleH1: 'Kfz-Gutachter in Hannover-Bothfeld',
    tagline: 'Sachverständigenbüro für Bothfeld, Vahrenheide, Lahe, Sahlkamp',
    metaTitle: 'Kfz-Gutachter Hannover-Bothfeld — Sachverständiger vor Ort · Kfz-Experten',
    metaDescription: 'Kfz-Gutachter in Bothfeld, Vahrenheide, Lahe und Sahlkamp (Hannover). Unfallgutachten, Wertgutachten, Oldtimer-Gutachten — vor Ort, persönlich, in 30 Min.',
    intro:
      'Bothfeld-Vahrenheide gehört zu den großflächigsten Hannoverschen Stadtbezirken im Norden, mit Bothfeld, Vahrenheide, Lahe und Sahlkamp als Hauptstadtteile. Vorwiegend Wohngebiete mit Familienfahrzeugen, dazu kommen die Anschlussstellen Hannover-Bothfeld und -Vahrenheide an die A2 — und damit auch entsprechende Schadenfälle.',
    sections: [
      {
        h2: 'Schadenfälle in Bothfeld und Umgebung',
        body:
          'Die Anbindung an die A2 (Anschluss Bothfeld) bringt Pendler- und Berufsverkehr — Auffahrunfälle in Stoßzeiten. In den Wohnstraßen rund um die Sutelstraße und die Schubertstraße sind Park- und Bagatellschäden häufig. Am Sahlkamp und in Vahrenheide-Heideviertel sehen wir regelmäßig Schäden in den Quartiers-Parkgaragen.',
      },
      {
        h2: 'Anfahrt aus Langenhagen',
        body:
          'Bothfeld ist direkter Nachbarstadtteil von Langenhagen — wir erreichen Bothfeld-Mitte in etwa 10–15 Minuten, Lahe und Sahlkamp in 20 Minuten. Schnellster Aktionsradius im Hannover-Norden.',
      },
    ],
    faqs: [
      {
        q: 'Wie schnell sind Sie in Bothfeld?',
        a: 'Bothfeld-Mitte 10–15 Minuten ab Anruf — wir sind der direkte Nachbar. Vahrenheide, Lahe, Sahlkamp in 15–20 Minuten.',
      },
      {
        q: 'Quartiers-Parkgarage in Vahrenheide — können Sie dort begutachten?',
        a: 'Ja. Bitte Adresse + Zugangsdetails (Schlüssel, Codenummer, oder Treffpunkt vor der Garage) vorab durchgeben.',
      },
      {
        q: 'Familienfahrzeug-Schaden — was ist zu beachten?',
        a: 'Bei Familienfahrzeugen (Vans, größere Limousinen) ist die Wertminderung oft deutlich, weil der Fahrzeugtyp länger gehalten wird. Wir berücksichtigen das im Gutachten korrekt.',
      },
    ],
  },

  {
    slug: 'suedstadt',
    name: 'Südstadt',
    bezirk: 'Südstadt-Bult',
    titleH1: 'Kfz-Gutachter in Hannover-Südstadt',
    tagline: 'Sachverständigenbüro für Südstadt, Bult, Maschsee-Nähe',
    metaTitle: 'Kfz-Gutachter Hannover-Südstadt — Sachverständiger vor Ort · Kfz-Experten',
    metaDescription: 'Kfz-Gutachter in der Hannoverschen Südstadt und am Bult — Wohngebiete, Maschsee-Nähe, hochwertige Fahrzeuge. Unfallgutachten, Wertgutachten, Premium-Fahrzeug-Bewertung.',
    intro:
      'Die Südstadt mit dem Bult zählt zu den begehrtesten Wohnvierteln Hannovers — gediegene Altbauten, Maschsee-Nähe, hochwertige Fahrzeuge in den Wohnstraßen. Die Mischung aus dichter Wohnbebauung, knappen Parkplätzen und hochwertigen Pkw bringt einen spezifischen Schadenmix: viele Bagatellschäden, aber mit überdurchschnittlich hoher Schadensumme pro Fall.',
    sections: [
      {
        h2: 'Schadenfälle in Südstadt und Bult',
        body:
          'In den Wohnstraßen rund um Hildesheimer Straße, Stresemannallee und Sallstraße sehen wir regelmäßig Parkschäden — oft an Premium-Fahrzeugen. Am Maschsee-Ring sind Tourist:innen-bedingte Bagatellschäden saisonal häufiger. Die Geibelstraße und der Aegidientorplatz sind klassische Verkehrsknoten mit häufigen Auffahrunfällen.',
      },
      {
        h2: 'Anfahrt aus Langenhagen',
        body:
          'Vom Stammsitz Langenhagen erreichen wir die Südstadt über den Westschnellweg in etwa 25 Minuten. Bei kurzfristigen Notfällen am Maschsee oder am Aegi sind wir entsprechend schneller priorisierbar.',
      },
    ],
    faqs: [
      {
        q: 'Premium-Fahrzeug parkt in der Südstadt und wurde verkratzt — was tun?',
        a: 'Polizei zur Verkehrsunfallflucht-Anzeige rufen (wenn Verursacher weg). Schadenfotos machen, Umgebungsfotos sichern. Wir nehmen den Schaden auf und erstellen ein vollständiges Gutachten mit korrekter Wertminderungs-Berechnung — bei Premium-Fahrzeugen oft 4-stellig.',
      },
      {
        q: 'Mein Auto steht in einer Tiefgarage am Maschsee — kommen Sie?',
        a: 'Ja. Bitte vorab Tiefgaragen-Adresse + Stellplatznummer durchgeben.',
      },
      {
        q: 'Sind Sie auch nachts oder am Wochenende erreichbar?',
        a: 'Ja, 24/7 für Notfälle. Bei Bagatellfällen können wir auch flexibel auf werktags-Termine ausweichen.',
      },
    ],
  },
]

export function getStadtteilBySlug(slug) {
  return stadtteile.find((s) => s.slug === slug) || null
}

export function stadtteilServiceSchema(s, origin = 'https://hannover-kfz-gutachter.de') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin}/standorte/hannover/${s.slug}/#service`,
    serviceType: 'Kfz-Gutachten',
    name: s.titleH1,
    description: s.metaDescription,
    provider: {
      '@type': 'AutomotiveBusiness',
      '@id': `${origin}/#business`,
      name: 'Kfz-Experten Hannover',
      url: `${origin}/`,
    },
    areaServed: {
      '@type': 'Place',
      name: `${s.name}, Hannover`,
      containedInPlace: { '@type': 'City', name: 'Hannover' },
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: '+4917680444241',
      serviceUrl: `${origin}/standorte/hannover/${s.slug}/`,
    },
  }
}

export function stadtteilFaqSchema(s, origin = 'https://hannover-kfz-gutachter.de') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${origin}/standorte/hannover/${s.slug}/#faq`,
    mainEntity: s.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
