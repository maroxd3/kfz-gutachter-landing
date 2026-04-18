// Akten-Streifen zwischen Sections — verbindet den narrativen Faden.

const dashedMask = {
  maskImage: 'repeating-linear-gradient(to right, black 0 5px, transparent 5px 11px)',
  WebkitMaskImage: 'repeating-linear-gradient(to right, black 0 5px, transparent 5px 11px)',
}

export default function SectionConnector({ time, entry, number, variant = 'light' }) {
  const isDark = variant === 'dark'
  return (
    <div className={isDark ? 'bg-ink text-white' : 'bg-cream text-ink'}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-5">
        {/* linke gestrichelte Linie */}
        <div
          className={`h-px flex-1 ${isDark ? 'bg-white/20' : 'bg-ink/20'}`}
          style={dashedMask}
        />

        {/* Akten-Badge */}
        <div
          className={`flex shrink-0 items-center gap-3 rounded-full border px-4 py-1.5 shadow-sm ${
            isDark
              ? 'border-gold/30 bg-white/[0.04] backdrop-blur'
              : 'border-line bg-white'
          }`}
        >
          <span
            className={`font-mono text-[10px] font-semibold tracking-wider ${
              isDark ? 'text-gold-soft' : 'text-gold-dark'
            }`}
          >
            {time} Uhr
          </span>
          <span className={`h-3 w-px ${isDark ? 'bg-white/20' : 'bg-line'}`} />
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.15em] ${
              isDark ? 'text-neutral-400' : 'text-ink-muted'
            }`}
          >
            Eintrag {String(number).padStart(2, '0')} · {entry}
          </span>
        </div>

        {/* rechte gestrichelte Linie */}
        <div
          className={`h-px flex-1 ${isDark ? 'bg-white/20' : 'bg-ink/20'}`}
          style={dashedMask}
        />
      </div>
    </div>
  )
}
