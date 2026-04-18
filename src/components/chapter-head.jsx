import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'

// Inline Kapitel-Intro. Drei Ebenen:
//   1) Reader-Question — fängt den Leser direkt ab („Was machen Sie jetzt?").
//   2) Großer Titel — cinematisch, Wort für Wort eingeblendet.
//   3) Foto — bildhafte Verankerung der Szene, mit sanftem Scroll-Parallax.
export default function ChapterHead({
  number,
  total = 9,
  time,
  meta,
  title,
  subtitle,
  question,
  image,
  imageAlt,
  tone = 'neutral', // 'neutral' | 'gold' | 'red'
  dark = false,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'end 30%'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.35], [60, 0])
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])
  const metaOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1])
  const [imgFailed, setImgFailed] = useState(false)

  const toneAccent = {
    red:     dark ? 'text-red-400'   : 'text-red-500',
    gold:    dark ? 'text-gold'      : 'text-gold-dark',
    neutral: dark ? 'text-gold-soft' : 'text-gold-dark',
  }[tone]

  const toneLine = {
    red:     'from-red-500 via-red-500/50 to-transparent',
    gold:    dark ? 'from-gold via-gold/70 to-transparent' : 'from-gold-dark via-gold to-transparent',
    neutral: dark ? 'from-gold via-gold/50 to-transparent' : 'from-gold-dark via-gold/70 to-transparent',
  }[tone]

  return (
    <div
      ref={ref}
      className={`${dark ? 'bg-ink text-white' : 'bg-cream text-ink'} relative overflow-hidden pt-24 pb-10 md:pt-32 md:pb-16`}
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div style={{ opacity, y }}>
          {/* Kapitel-Marker-Zeile */}
          <div className="flex items-center gap-5">
            <div className={`font-mono text-[11px] font-semibold tracking-[0.3em] ${toneAccent}`}>
              KAP. {String(number).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
            <motion.div
              className={`h-px flex-1 origin-left bg-gradient-to-r ${toneLine}`}
              style={{ scaleX: lineScale }}
            />
            <div className={`font-mono text-[11px] tracking-[0.15em] ${dark ? 'text-neutral-400' : 'text-ink-muted'}`}>
              {time}
            </div>
          </div>

          {/* Leser-Frage — direkte Ansprache */}
          {question && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`mt-8 max-w-2xl font-serif text-lg italic leading-relaxed md:text-xl ${
                dark ? 'text-gold-soft' : 'text-gold-dark'
              }`}
            >
              {question}
            </motion.p>
          )}

          {/* Großer Titel */}
          <h2
            className={`mt-6 font-serif text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl lg:text-[5.5rem] ${
              dark ? 'text-white' : 'text-ink'
            }`}
          >
            {title.split(' ').map((word, i, arr) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {word}
                {i < arr.length - 1 && '\u00A0'}
              </motion.span>
            ))}
          </h2>

          {/* Subtitle + Meta */}
          <motion.div
            style={{ opacity: metaOpacity }}
            className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8"
          >
            {subtitle && (
              <p
                className={`max-w-2xl font-serif text-xl italic leading-relaxed md:text-2xl ${
                  dark ? 'text-neutral-300' : 'text-ink-muted'
                }`}
              >
                {subtitle}
              </p>
            )}
            {meta && (
              <div
                className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] ${
                  dark ? 'text-neutral-500' : 'text-ink-muted/70'
                }`}
              >
                {meta}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Kapitel-Foto — cinematischer Rahmen, warmer Schatten, leichtes Parallax */}
        {image && (
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative mt-14 overflow-hidden rounded-2xl shadow-2xl shadow-ink/30 ring-1 ring-gold/20 md:mt-20"
          >
            {imgFailed ? (
              // Platzhalter, solange das Foto noch nicht unter /public liegt
              <div className="relative flex aspect-[3/2] w-full items-center justify-center bg-gradient-to-br from-ink via-ink-soft to-ink">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(184,145,94,0.7)_1px,transparent_0)] [background-size:24px_24px]" />
                <div className="relative flex flex-col items-center gap-3 text-gold-soft">
                  <ImageIcon size={42} strokeWidth={1.2} />
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em]">
                    Foto folgt · {image}
                  </div>
                </div>
              </div>
            ) : (
              <motion.img
                src={image}
                alt={imageAlt || title}
                style={{ y: imgY, scale: imgScale }}
                className="aspect-[3/2] w-full object-cover"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            )}
            {/* Warme Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            {/* Untertitel-Streifen unten */}
            <figcaption
              className={`absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] ${
                dark ? 'text-neutral-300' : 'text-white/90'
              }`}
            >
              <span>Kap. {String(number).padStart(2, '0')} · {time}</span>
              <span className="text-gold-soft">{meta}</span>
            </figcaption>
          </motion.figure>
        )}
      </div>
    </div>
  )
}
