import { LOGO_TONES } from './brandTokens'

/**
 * The Automation Lab logotype.
 *
 * Three rows — the "THE" kicker, the name, and a hairline closed by three
 * dots. Every measurement is expressed in `em` against the size of
 * "Automation", so the whole lockup scales from one number. The ratios come
 * from public/brand/logo-horizontal-source.png:
 *
 *   kicker size        0.34em      kicker tracking   0.155em
 *   "Lab" size         0.82em      hairline          0.05em
 *   dot diameter       0.20em      hairline offset   0.53em
 *
 * The kicker tracking is set so "THE" measures 0.129x the width of
 * "Automation", as it does in the artwork — not eyeballed.
 *
 * Rendered as live text, so it stays selectable and searchable and re-renders
 * crisply at any zoom. "Automation" is PT Serif Bold and "Lab" is Inter Bold
 * — see docs/BRAND.md on how those were identified.
 */
export default function Logotype({ tone = 'light', kicker = true, rule = true, className = '' }) {
  const t = LOGO_TONES[tone] ?? LOGO_TONES.light

  return (
    <span className={`tal-logotype ${className}`} style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {kicker && (
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '0.34em',
            lineHeight: 1,
            letterSpacing: '0.155em',
            color: t.kicker,
            marginBottom: '0.5em',
          }}
        >
          THE
        </span>
      )}

      <span style={{ display: 'flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
        <span
          style={{
            fontFamily: "'PT Serif', Georgia, serif",
            fontWeight: 700,
            fontSize: '1em',
            lineHeight: 1,
            color: t.word,
          }}
        >
          Automation
        </span>
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: '0.82em',
            lineHeight: 1,
            color: t.lab,
            marginLeft: '1.13em',
          }}
        >
          Lab
        </span>
      </span>

      {rule && (
        <span
          aria-hidden="true"
          style={{ display: 'flex', alignItems: 'center', gap: '0.11em', marginTop: '0.44em' }}
        >
          <span style={{ flex: 1, height: '0.05em', background: t.rule, borderRadius: '999px' }} />
          {/* Two cornflower dots then one lime — the only warm note in the system. */}
          {[t.lab, t.lab, tone === 'mono' ? 'currentColor' : '#dce566'].map((c, i) => (
            <span
              key={i}
              style={{
                width: '0.2em',
                height: '0.2em',
                borderRadius: '999px',
                background: c,
                marginLeft: i === 0 ? '0.3em' : 0,
              }}
            />
          ))}
        </span>
      )}
    </span>
  )
}
