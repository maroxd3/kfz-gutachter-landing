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

  {
    slug: 'wunstorf',
    city: 'Wunstorf',
    titleH1: 'Kfz-Gutachter in Wunstorf',
    tagline: 'Sachverständigenbüro für Wunstorf, Steinhuder Meer und Umland',
    metaTitle: 'Kfz-Gutachter Wunstorf — Sachverständiger vor Ort · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Gutachten in Wunstorf, Luthe, Bokeloh und am Steinhuder Meer. Unfallgutachten, Wertgutachten, Oldtimer-Bewertung. Anfahrt vom Stammsitz Langenhagen in 30 Minuten, kein Aufpreis bis 50 km.',
    intro:
      'Wunstorf liegt rund 25 km westlich von Hannover am Steinhuder Meer und ist mit den Ortsteilen Luthe, Bokeloh, Idensen, Klein Heidorn, Großenheidorn und Steinhude eine touristisch wie wirtschaftlich vielfältige Gemeinde. Durch die Nähe zur A2 und zur B441 sehen wir hier vor allem Autobahn-Auffahrunfälle und Fahrzeugschäden auf den Bundesstraßen.',
    sections: [
      {
        h2: 'Vor Ort in allen Ortsteilen',
        list: [
          { strong: 'Wunstorf-Mitte und Luthe:', text: 'Stadtkern, Wohngebiete, Schulen, klassische Stadtschäden.' },
          { strong: 'Bokeloh und Idensen:', text: 'Wohngebiete mit Anbindung an die A2.' },
          { strong: 'Steinhude, Großenheidorn, Klein Heidorn:', text: 'Touristisch geprägter Bereich am Steinhuder Meer, im Sommer überdurchschnittlich viele Camper- und Anhänger-Schäden.' },
        ],
      },
      {
        h2: 'Typische Schadenlagen',
        body:
          'Die Anbindung an die A2 (Anschlussstelle Wunstorf-Luthe) bringt klassische Autobahnschäden — Auffahrunfälle und Wildunfälle nach Wildwechsel im Naturpark Steinhuder Meer. Der Tourismus am See sorgt im Sommer für mehr Wohnwagen- und Bootsanhänger-Schäden, die wir ebenfalls fachgerecht begutachten.',
      },
      {
        h2: 'Anfahrt und Verfügbarkeit',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Wunstorf-Mitte in etwa 25–30 Minuten über die A352/A2, Steinhude in 35 Minuten. Anfahrtskosten fallen innerhalb 50 km nicht an.',
      },
    ],
    faqs: [
      {
        q: 'Begutachten Sie auch Wohnwagen, Wohnmobile und Bootsanhänger?',
        a: 'Ja. Wohnwagen, Wohnmobile, PKW-Anhänger und Bootsanhänger gehören zu unserem Standard-Repertoire — gerade rund um das Steinhuder Meer ist das eine häufige Schadenkategorie.',
      },
      {
        q: 'Wildschaden auf der B441 oder am Steinhuder Meer — was tun?',
        a: 'Polizei (110) rufen für die Wildschaden-Bescheinigung. Danach uns kontaktieren — wir erstellen das Gutachten für Ihre Teilkasko oder Vollkasko.',
      },
      {
        q: 'Wie schnell sind Sie in Steinhude?',
        a: 'In der Regel 30–40 Minuten ab Anruf, abhängig von Saison und Tageszeit. In Eilfällen priorisieren wir.',
      },
    ],
  },

  {
    slug: 'laatzen',
    city: 'Laatzen',
    titleH1: 'Kfz-Gutachter in Laatzen',
    tagline: 'Sachverständigenbüro für Laatzen, Rethen, Gleidingen und Umkreis',
    metaTitle: 'Kfz-Gutachter Laatzen — Sachverständiger vor Ort · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Gutachter in Laatzen, Rethen, Gleidingen und Grasdorf. Unfallgutachten, Wertgutachten, Oldtimer-Gutachten. Schnelle Anfahrt vom Stammsitz Langenhagen, kein Aufpreis bis 50 km.',
    intro:
      'Laatzen liegt direkt südlich von Hannover und ist durch die A7 sowie das Messegelände Hannover-Laatzen geprägt. Mit knapp 40.000 Einwohnern in den Stadtteilen Laatzen-Mitte, Rethen, Gleidingen, Grasdorf und Ingeln-Oesselse ist das Verkehrsaufkommen besonders rund um Messezeiten und im Berufsverkehr hoch — und damit auch die Schadenhäufigkeit.',
    sections: [
      {
        h2: 'Stadtteile, die wir bedienen',
        list: [
          { strong: 'Laatzen-Mitte:', text: 'Stadtkern, Einkaufszentrum, Wohnstraßen.' },
          { strong: 'Rethen (Leine) und Grasdorf:', text: 'Verbindung zur A7, Pendlerverkehr und Auffahrunfälle.' },
          { strong: 'Gleidingen und Ingeln-Oesselse:', text: 'Wohngebiete, Familienfahrzeuge.' },
          { strong: 'Messegelände Hannover-Laatzen:', text: 'Während Messen erhöhtes Stau- und Parkschadensaufkommen.' },
        ],
      },
      {
        h2: 'A7-Schäden — was zu beachten ist',
        body:
          'Die A7 zwischen Hannover-Süd und der Anschlussstelle Laatzen ist eine der unfallreichsten Strecken im Hannover-Raum. Bei Autobahn-Schäden sind drei Dinge wichtig: schnelle Beweissicherung vor der Reparatur, vollständige Fotodokumentation auch bei zunächst klein wirkenden Schäden, und rechtzeitige Klärung des Schuldverhältnisses. Wir sind kurzfristig vor Ort.',
      },
      {
        h2: 'Anfahrt',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Laatzen-Mitte in etwa 30 Minuten über den Südschnellweg und die A7. Rethen und Gleidingen in 30–35 Minuten. Keine Anfahrtskosten innerhalb 50 km.',
      },
    ],
    faqs: [
      {
        q: 'Schaden während der Hannover-Messe — kommen Sie trotz Stau?',
        a: 'Ja. Während Messezeiten priorisieren wir Anfahrten in den Messebereich und planen genug Puffer ein. Bitte rufen Sie uns möglichst früh an, damit wir die Anfahrt entsprechend timen können.',
      },
      {
        q: 'Werkstatt in Rethen — kommen Sie dorthin?',
        a: 'Selbstverständlich. Wir kommen zu jeder Werkstatt in Laatzen, Rethen oder Gleidingen. Bitte vorab kurz Werkstattname und Adresse durchgeben.',
      },
      {
        q: 'A7-Unfall — was tun?',
        a: 'Wenn möglich Bilder von der Unfallstelle machen (Position der Fahrzeuge, Bremsspuren, Schaden, Schilder), Daten der Beteiligten austauschen und uns sofort anrufen. Wir kommen zur Werkstatt oder zur Abschleppstelle, wo das Fahrzeug nach dem Unfall steht.',
      },
    ],
  },

  {
    slug: 'lehrte',
    city: 'Lehrte',
    titleH1: 'Kfz-Gutachter in Lehrte',
    tagline: 'Sachverständigenbüro für Lehrte, Sievershausen, Aligse und Umkreis',
    metaTitle: 'Kfz-Gutachter Lehrte — Sachverständiger vor Ort · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Gutachter in Lehrte, Sievershausen, Aligse, Steinwedel und Hämelerwald. Unfallgutachten, Wertgutachten, Oldtimer-Bewertung. Anfahrt von Langenhagen, kein Aufpreis bis 50 km.',
    intro:
      'Lehrte ist östlich von Hannover ein wichtiger Verkehrsknoten — durch den Bahnhof, die A2 und die B65 als Pendler- und Güterverkehrsroute. Mit den Ortsteilen Lehrte-Stadt, Sievershausen, Aligse, Steinwedel, Hämelerwald, Arpke, Ahlten und Kolshorn sehen wir hier viele Auffahr- und Wildunfälle.',
    sections: [
      {
        h2: 'Ortsteile mit höherer Schadenhäufigkeit',
        list: [
          { strong: 'Lehrte-Stadt:', text: 'Stadtkern mit Bahnhof, Einzelhandel, Parkschäden häufig.' },
          { strong: 'Ahlten und Steinwedel:', text: 'Direkter Anschluss an A2, Pendlerverkehr.' },
          { strong: 'Sievershausen und Aligse:', text: 'Ländlicher, häufiger Wildwechsel, B-Straßen-Schäden.' },
          { strong: 'Hämelerwald und Arpke:', text: 'Wohngebiete mit Familienfahrzeugen.' },
        ],
      },
      {
        h2: 'Wildunfälle in den ländlichen Ortsteilen',
        body:
          'Sievershausen, Aligse und Hämelerwald grenzen an Waldgebiete — Wildunfälle sind hier überdurchschnittlich häufig. Wichtig: nach einem Wildunfall sofort die Polizei (110) für die Wildschaden-Bescheinigung verständigen, das tote Wild NICHT mitnehmen (Wilderei-Vorwurf vermeiden), und dann uns für die Schadenaufnahme rufen.',
      },
      {
        h2: 'Anfahrt',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Lehrte-Stadt in etwa 25 Minuten über die A2. Sievershausen und die ländlicheren Ortsteile in 30–35 Minuten. Keine Anfahrtskosten innerhalb 50 km.',
      },
    ],
    faqs: [
      {
        q: 'Wildschaden in Sievershausen — wer zahlt?',
        a: 'Bei Wildunfällen mit Haarwild (Rehe, Wildschweine, Hirsche etc.) zahlt Ihre Teilkasko (wenn vorhanden). Voraussetzung ist die Wildschaden-Bescheinigung der Polizei. Wir erstellen das Gutachten für die Versicherung.',
      },
      {
        q: 'Bedienen Sie auch Sehnde und Burgdorf?',
        a: 'Ja, beide liegen in unserem 50-km-Radius — keine Anfahrtskosten.',
      },
      {
        q: 'A2-Auffahrunfall bei Lehrte — wann sind Sie da?',
        a: '25–35 Minuten ab Anruf, je nach Tageszeit. Bei Notfällen priorisieren wir.',
      },
    ],
  },

  {
    slug: 'burgwedel',
    city: 'Burgwedel',
    titleH1: 'Kfz-Gutachter in Burgwedel',
    tagline: 'Sachverständigenbüro für Großburgwedel, Engensen, Fuhrberg und Umkreis',
    metaTitle: 'Kfz-Gutachter Burgwedel — Sachverständiger vor Ort · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Gutachter in Burgwedel und Großburgwedel — Sachverständigenbüro für Unfallgutachten, Wertgutachten, Oldtimer-Bewertung. Schnelle Anfahrt von Langenhagen.',
    intro:
      'Burgwedel liegt nördlich von Hannover und ist mit Großburgwedel, Engensen, Fuhrberg, Kleinburgwedel, Oldhorst, Thönse und Wettmar geprägt durch Wohnortqualität und höherwertige Fahrzeuge. Aufgrund der Lage an der A7 und der ländlichen Umgebung sehen wir hier eine spezifische Mischung aus Premium-Fahrzeug-Schäden und Wildunfällen.',
    sections: [
      {
        h2: 'Stadtteile von Burgwedel',
        list: [
          { strong: 'Großburgwedel:', text: 'Stadtkern mit Einzelhandel und Bahnhof, klassische Stadtschäden.' },
          { strong: 'Engensen, Fuhrberg, Kleinburgwedel:', text: 'Ländliche Ortsteile, höhere Wildunfall-Quote.' },
          { strong: 'Oldhorst, Thönse, Wettmar:', text: 'Wohnortgeprägt, viele Familien- und Premium-Fahrzeuge.' },
        ],
      },
      {
        h2: 'Höherwertige Fahrzeuge — höhere Anforderungen',
        body:
          'Burgwedel hat überdurchschnittlich viele Premium-Fahrzeuge (Mercedes, BMW, Audi, Porsche). Bei diesen Fahrzeugen sind drei Punkte besonders wichtig: korrekte Wertminderungs-Berechnung (hoher absoluter Betrag), markenkonforme Reparaturwege (Originalteile), und vollständige Erfassung der Sonderausstattung im Gutachten. Wir arbeiten regelmäßig mit Premium-Fahrzeugen.',
      },
      {
        h2: 'Anfahrt',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Großburgwedel in etwa 20 Minuten, die ländlichen Ortsteile in 25–30 Minuten. Keine Anfahrtskosten innerhalb 50 km.',
      },
    ],
    faqs: [
      {
        q: 'Premium-Fahrzeug-Gutachten — gibt es Besonderheiten?',
        a: 'Ja, in zwei Punkten: die Wertminderung ist absolut höher (oft 4-stellig), und die Versicherungen versuchen häufig, auf günstigere Werkstattalternativen zu verweisen. Bei werkstattgebundenen Premium-Fahrzeugen (oft in Garantie- oder Servicevertragsbindung) ist das nicht zulässig — das setzen wir im Gutachten klar fest.',
      },
      {
        q: 'Bedienen Sie auch Wedemark und Isernhagen?',
        a: 'Ja, beide liegen in unserem 50-km-Radius — keine Anfahrtskosten.',
      },
      {
        q: 'Wildunfall in Fuhrberg — was zu tun?',
        a: 'Polizei (110) rufen für die Wildschaden-Bescheinigung, danach uns kontaktieren. Wir erstellen das Gutachten für Ihre Teilkasko.',
      },
    ],
  },

  {
    slug: 'wedemark',
    city: 'Wedemark',
    titleH1: 'Kfz-Gutachter in der Wedemark',
    tagline: 'Sachverständigenbüro für Mellendorf, Bissendorf, Resse und alle Ortsteile',
    metaTitle: 'Kfz-Gutachter Wedemark — Mellendorf, Bissendorf · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Gutachter in der Wedemark — Mellendorf, Bissendorf, Resse, Berkhof und alle Ortsteile. Unfallgutachten, Wertgutachten, Oldtimer-Bewertung. Anfahrt vom Stammsitz Langenhagen.',
    intro:
      'Die Wedemark ist eine flächengroße Gemeinde nordöstlich von Hannover mit 14 Ortsteilen, darunter Mellendorf (Verwaltungssitz), Bissendorf, Resse, Berkhof, Brelingen, Elze, Gailhof, Hellendorf, Meitze, Negenborn, Oegenbostel, Plumhof, Scherenbostel und Sprockhof. Ländlich geprägt mit großen Waldflächen — Wildunfälle sind hier eine zentrale Schadenkategorie.',
    sections: [
      {
        h2: 'Größte Ortsteile mit höherer Verkehrsdichte',
        list: [
          { strong: 'Mellendorf:', text: 'Verwaltungssitz, größter Ortsteil, Einkaufs- und Schulzentrum.' },
          { strong: 'Bissendorf und Bissendorf-Wietze:', text: 'Wohngebiete mit Anschluss an die B6 nach Hannover.' },
          { strong: 'Resse und Berkhof:', text: 'Mittelgroße Ortsteile, viel Pendlerverkehr Richtung Hannover/Langenhagen.' },
          { strong: 'Brelingen, Elze, Gailhof, Hellendorf:', text: 'Ländliche Ortsteile, überdurchschnittlich häufig Wildunfälle.' },
        ],
      },
      {
        h2: 'Wildunfall-Schwerpunkt',
        body:
          'Mit den großen Waldflächen rund um Brelingen, Elze und Gailhof ist die Wedemark einer der wildreichsten Bereiche der Region Hannover. Im Herbst und Frühjahr (Dämmerung, Brunftzeit, Jagdsaison) steigt die Unfallhäufigkeit deutlich. Wir kennen die Versicherungs-Prozesse für Wildschäden und erstellen Gutachten, die ohne Nachfragen anerkannt werden.',
      },
      {
        h2: 'Anfahrt',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Mellendorf in etwa 25 Minuten, Bissendorf in 20 Minuten, die abgelegeneren Ortsteile (Brelingen, Hellendorf) in 30–40 Minuten. Keine Anfahrtskosten innerhalb 50 km.',
      },
    ],
    faqs: [
      {
        q: 'Wann ist Wildunfall-Saison in der Wedemark?',
        a: 'Hauptzeiten sind Oktober/November (Brunftzeit beim Rotwild) und März/April (Jungtiere). Auch die Dämmerungsphasen im Sommer haben erhöhte Wildaktivität. Vorsicht besonders auf den L-Straßen zwischen den Ortsteilen.',
      },
      {
        q: 'Schaden am Wochenende oder feiertags — sind Sie erreichbar?',
        a: 'Ja, wir sind 24/7 erreichbar. Bei Wildunfällen empfehlen wir, zuerst die Polizei (110) für die Wildschaden-Bescheinigung zu rufen, dann uns.',
      },
      {
        q: 'Bedienen Sie auch Burgwedel und Isernhagen?',
        a: 'Ja, beide liegen in unserem 50-km-Radius — keine Anfahrtskosten.',
      },
    ],
  },

  {
    slug: 'sehnde',
    city: 'Sehnde',
    titleH1: 'Kfz-Gutachter in Sehnde',
    tagline: 'Sachverständigenbüro für Sehnde, Höver, Rethmar und alle Ortsteile',
    metaTitle: 'Kfz-Gutachter Sehnde — Sachverständiger vor Ort · Kfz-Experten Hannover',
    metaDescription: 'Kfz-Gutachter in Sehnde, Höver, Rethmar, Ilten und allen Ortsteilen. Unfallgutachten, Wertgutachten, Oldtimer-Bewertung. Anfahrt vom Stammsitz Langenhagen, kein Aufpreis bis 50 km.',
    intro:
      'Sehnde liegt südöstlich von Hannover und ist mit Höver, Rethmar, Ilten, Bolzum, Wassel, Bilm, Müllingen, Wirringen, Klein Lobke, Evern und Haimar von ländlich-wohnortgeprägter Struktur. Die Nähe zur A7 und zur B65 bringt typischen Pendler- und Lieferverkehr — sowie entsprechende Schadenfälle.',
    sections: [
      {
        h2: 'Ortsteile von Sehnde',
        list: [
          { strong: 'Sehnde-Mitte:', text: 'Stadtkern mit Einkaufszentrum und Verwaltung.' },
          { strong: 'Höver:', text: 'Industriegebiet (Zementwerk), Schwerlast- und LKW-Verkehr.' },
          { strong: 'Ilten, Rethmar, Bolzum, Wassel:', text: 'Wohnortgeprägte Ortsteile.' },
          { strong: 'Müllingen, Wirringen, Evern, Klein Lobke:', text: 'Kleinere ländliche Ortsteile.' },
        ],
      },
      {
        h2: 'Höver — Industrie-Standort mit besonderer Verkehrslage',
        body:
          'Das Zementwerk in Höver bringt täglich erheblichen Schwerlastverkehr. Bei Schäden zwischen LKW und PKW sind oft besondere Beweisaufnahmen nötig (Tachoscheiben, EVB-Auswertung). Wir arbeiten mit erfahrenen Verkehrsrechtsanwälten zusammen, die solche Fälle regelmäßig betreuen.',
      },
      {
        h2: 'Anfahrt',
        body:
          'Vom Stammsitz Langenhagen erreichen wir Sehnde-Mitte in etwa 30 Minuten über den Südschnellweg und die A7. Die kleineren Ortsteile in 30–40 Minuten. Keine Anfahrtskosten innerhalb 50 km.',
      },
    ],
    faqs: [
      {
        q: 'PKW vs. LKW-Schaden — was ist zu beachten?',
        a: 'Bei PKW-LKW-Schäden ist die Beweisaufnahme aufwendiger (Tachoscheibe, Geschwindigkeitsschreiber, Sichtverhältnisse). Wir nehmen Schaden und Unfallsituation umfassend auf — und empfehlen frühe Einbindung eines Verkehrsrechtsanwalts.',
      },
      {
        q: 'Bedienen Sie auch Hannover-Wülfel und Misburg?',
        a: 'Ja, beide liegen in unserem 50-km-Radius — keine Anfahrtskosten.',
      },
      {
        q: 'Schaden auf B65 oder A7 bei Sehnde — wann sind Sie da?',
        a: '30–40 Minuten ab Anruf, je nach Tageszeit und Verkehrslage. In Eilfällen priorisieren wir.',
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
