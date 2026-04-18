import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { ContainerScroll } from './components/ui/container-scroll-animation.jsx'
import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Audience from './sections/Audience.jsx'
import Services from './sections/Services.jsx'
import BeforeAfter from './sections/BeforeAfter.jsx'
import Calculator from './sections/Calculator.jsx'
import Process from './sections/Process.jsx'
import Stats from './sections/Stats.jsx'
import WhyUs from './sections/WhyUs.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Faq from './sections/Faq.jsx'
import Footer from './sections/Footer.jsx'
import ChapterHead from './components/chapter-head.jsx'

// Jede Section = ein Kapitel. Ganzer Block rutscht beim Scrollen als
// Einheit rein (Intro + Foto + Inhalt). Keine Popups mehr.
function StoryChapter({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Lädt das Gutachten-Mockup. Solange /gutachten-mockup.png nicht existiert,
// zeigt es einen stilvollen Dark-Platzhalter — nie ein kaputtes Bild-Icon.
function GutachtenMockup() {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(184,145,94,0.6)_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative flex flex-col items-center gap-4 text-gold-soft">
          <FileText size={56} strokeWidth={1} />
          <div className="text-center">
            <div className="font-serif text-2xl font-semibold text-white">
              Kfz-Schadensgutachten
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-gold-soft">
              Mockup folgt · /gutachten-mockup.png
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <img
      src="/gutachten-mockup.png"
      alt="Kfz-Schadensgutachten · Musterseite"
      onError={() => setFailed(true)}
      className="mx-auto h-full w-full rounded-2xl object-cover object-left-top"
      draggable={false}
    />
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        {/* Prolog — der Moment, in dem alles beginnt */}
        <Hero />

        {/* Signature-Reveal: Das Ergebnis, auf das die ganze Story zuläuft */}
        <div className="bg-cream">
          <ContainerScroll
            titleComponent={
              <>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">
                  Das Ergebnis
                </div>
                <h2 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-6xl lg:text-7xl">
                  Das ist Ihr Gutachten.
                </h2>
                <p className="mx-auto mt-4 max-w-xl font-serif text-lg italic text-ink-muted md:text-xl">
                  Rechtssicher. Prüfbar. Ihres.
                </p>
              </>
            }
          >
            <GutachtenMockup />
          </ContainerScroll>
        </div>

        {/* Kap. 01 · 08:22 — Der Anruf */}
        <StoryChapter>
          <ChapterHead
            number={1}
            time="08:22 Uhr"
            meta="7 Minuten nach dem Unfall"
            title="Der Anruf."
            subtitle="„Herr Saleh — was jetzt?"
            question="Ihr Telefon klingelt. Es ist 8:22 Uhr. Wen rufen Sie an — die Versicherung des anderen, oder jemanden, der auf Ihrer Seite steht?"
            image="/k01.png"
            imageAlt="Hand mit Smartphone, im Hintergrund ein beschädigtes Fahrzeug"
            tone="neutral"
          />
          <Audience />
        </StoryChapter>

        {/* Kap. 02 · 08:30 — Die Zusage */}
        <StoryChapter>
          <ChapterHead
            number={2}
            time="08:30 Uhr"
            meta="Unsere Zusage"
            title="45 Minuten. Dann sind wir da."
            subtitle="Was Sie von uns bekommen — und was Sie dafür zahlen."
            question="Wie lange warten Sie, bis jemand vorbeikommt — und zu welchem Preis?"
            image="/k02.png"
            imageAlt="Fahrzeug des Sachverständigen trifft am Unfallort ein"
            tone="neutral"
          />
          <Services />
        </StoryChapter>

        {/* Kap. 03 · 10:02 — Die Besichtigung (dark) */}
        <StoryChapter>
          <ChapterHead
            number={3}
            time="10:02 Uhr"
            meta="Vor Ort"
            title="Jeder Kratzer. Jede Delle."
            subtitle="Dokumentiert, bevor der Schaden zur Aussage wird."
            question="Wird der Schaden so aufgenommen, wie er wirklich ist — oder so, wie die Gegenseite ihn gern hätte?"
            tone="gold"
            dark
          />
          <BeforeAfter />
        </StoryChapter>

        {/* Kap. 04 · 10:08 — Die Kalkulation */}
        <StoryChapter>
          <ChapterHead
            number={4}
            time="10:08 Uhr"
            meta="Berechnung"
            title="Die Kalkulation."
            subtitle="Rechtssicher. Nachvollziehbar. In unter einer Minute geschätzt."
            question="Was ist Ihr Schaden wirklich wert — und was würde eine Versicherung Ihnen gern auszahlen?"
            image="/k03.png"
            imageAlt="Schreibtisch mit Laptop, Schadensfotos und Messwerkzeug"
            tone="neutral"
          />
          <Calculator />
        </StoryChapter>

        {/* Kap. 05 · 10:12 — Der Ablauf */}
        <StoryChapter>
          <ChapterHead
            number={5}
            time="10:12 Uhr"
            meta="Ablauf dokumentiert"
            title="Drei Schritte."
            subtitle="Vom ersten Anruf bis zum fertigen Gutachten."
            question="Wie oft müssen Sie selbst hinterhertelefonieren, bis etwas passiert?"
            tone="neutral"
          />
          <Process />
        </StoryChapter>

        {/* Kap. 06 · 10:15 — Die Zusicherungen */}
        <StoryChapter>
          <ChapterHead
            number={6}
            time="10:15 Uhr"
            meta="Zusicherungen"
            title="Vier Zahlen."
            subtitle="Auf die Sie sich verlassen können — schriftlich, nicht als Versprechen."
            question="Woran erkennen Sie, ob Sie einen guten oder einen beliebigen Gutachter haben?"
            image="/k04.png"
            imageAlt="Uhr auf Schreibtisch neben unterschriebenem Gutachten"
            tone="neutral"
          />
          <Stats />
        </StoryChapter>

        {/* Kap. 07 · 10:18 — Die Qualifikation (dark) */}
        <StoryChapter>
          <ChapterHead
            number={7}
            time="10:18 Uhr"
            meta="Qualifikation geprüft"
            title="Warum Mandanten bleiben."
            subtitle="Der Unterschied zwischen einem Gutachter und einem Sachverständigen."
            question={'Darf jeder „Gutachter" heißen — oder nur jemand, der wirklich dafür geprüft wurde?'}
            image="/k07.png"
            imageAlt="Zertifikat DIN EN ISO/IEC 17024"
            tone="gold"
            dark
          />
          <WhyUs />
        </StoryChapter>

        {/* Kap. 08 · 10:22 — Der Sachverständige */}
        <StoryChapter>
          <ChapterHead
            number={8}
            time="10:22 Uhr"
            meta="Vorstellung"
            title="Der Mensch hinter dem Stempel."
            subtitle="Mustafa Saleh — Sachverständiger nach DIN EN ISO/IEC 17024."
            question="Wem vertrauen Sie Ihren Schaden an — einer Firma, oder einer Person, der Sie ins Gesicht schauen?"
            image="/k08.png"
            imageAlt="Portrait Mustafa Saleh, Sachverständiger"
            tone="neutral"
          />
          <About />
        </StoryChapter>

        {/* Kap. 09 · Eine Woche später — Die Auszahlung */}
        <StoryChapter>
          <ChapterHead
            number={9}
            time="Eine Woche später"
            meta="Fall abgeschlossen"
            title="Sie tragen 0 €."
            subtitle="Akte geschlossen. Wagen repariert. Leben geht weiter."
            question="Was bleibt, wenn der Schaden weg ist — außer der Gewissheit, dass Sie richtig gehandelt haben?"
            image="/k05.png"
            imageAlt="Repariertes Fahrzeug im Abendlicht"
            tone="gold"
          />
          <Contact />
        </StoryChapter>

        {/* Epilog — Nachlese */}
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
