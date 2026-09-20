import { LOGO_TONES } from './brandTokens'

/**
 * The Automation Lab wordmark.
 *
 * Rendered as live text rather than outlines: it stays selectable, searchable
 * and screen-reader friendly, and it re-renders crisply at any zoom. The serif
 * carries the name; the tracked sans kicker supplies the "lab" precision.
 */
export const LOGOTYPE_SIZES = {
  sm: { word: 'text-lg', kicker: 'text-[0.5rem]', gap: 'gap-[0.15em]' },
  md: { word: 'text-2xl', kicker: 'text-[0.55rem]', gap: 'gap-[0.15em]' },
  lg: { word: 'text-4xl', kicker: 'text-[0.65rem]', gap: 'gap-[0.2em]' },
  xl: { word: 'text-5xl', kicker: 'text-xs', gap: 'gap-[0.2em]' },
}

export default function Logotype({
  size = 'md',
  tone = 'navy',
  kicker = true,
  className = '',
}) {
  const palette = LOGO_TONES[tone] ?? LOGO_TONES.navy
  const scale = LOGOTYPE_SIZES[size] ?? LOGOTYPE_SIZES.md

  return (
    <span className={`flex flex-col justify-center ${scale.gap} ${className}`}>
      <span
        className={`whitespace-nowrap font-serif font-medium leading-none ${scale.word}`}
        style={{ color: palette.word, letterSpacing: '0.01em' }}
      >
        The Automation Lab
      </span>
      {kicker && (
        <span
          className={`whitespace-nowrap font-sans font-medium uppercase leading-none ${scale.kicker}`}
          style={{ color: palette.kicker, letterSpacing: '0.32em' }}
        >
          Automate with intent
        </span>
      )}
    </span>
  )
}
