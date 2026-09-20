import LogoMark from './LogoMark'
import Logotype from './Logotype'
import { GLYPH } from './markGeometry'

/**
 * Size scale. `type` is the font-size of "Automation", which the whole
 * logotype derives from; `mark` is the glyph's width. The ratio between them
 * (mark height ≈ 3x the cap height of "Automation") matches the supplied
 * horizontal artwork.
 */
const SIZES = {
  sm: { type: 15, mark: 30 },
  md: { type: 21, mark: 42 },
  lg: { type: 30, mark: 60 },
  xl: { type: 44, mark: 88 },
}

/**
 * The brand lockup.
 *
 *  - `lockup`   mark + logotype side by side (default — headers, nav)
 *  - `stacked`  tile above the logotype, centred (heroes, splash, print)
 *  - `mark`     the bare A (tight nav, inline use)
 *  - `tile`     the navy rounded square app icon (avatars, favicons, apps)
 *  - `wordmark` logotype alone (footers, legal, email signatures)
 *
 * The whole lockup is announced as one "The Automation Lab" image, so the
 * name is never read twice.
 */
export default function Logo({
  variant = 'lockup',
  size = 'md',
  tone = 'light',
  kicker = true,
  rule = true,
  animated = false,
  className = '',
  ...rest
}) {
  const s = SIZES[size] ?? SIZES.md
  const label = 'The Automation Lab'

  if (variant === 'mark' || variant === 'tile') {
    return (
      <LogoMark
        size={variant === 'tile' ? s.mark : s.mark}
        tile={variant === 'tile'}
        tone={tone}
        animated={animated}
        title={label}
        className={className}
        {...rest}
      />
    )
  }

  if (variant === 'wordmark') {
    return (
      <span
        role="img"
        aria-label={label}
        className={`inline-flex ${className}`}
        style={{ fontSize: s.type }}
        {...rest}
      >
        <Logotype tone={tone} kicker={kicker} rule={rule} />
      </span>
    )
  }

  const stacked = variant === 'stacked'
  // The tile is navy, so on a dark surface it would be invisible — and putting
  // navy on navy is the one thing the misuse rules single out. Reverse to the
  // bare mark there instead.
  const stackedTile = stacked && tone === 'light'

  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-flex ${
        stacked ? 'flex-col items-center text-center' : 'flex-row items-center'
      } ${className}`}
      {...rest}
    >
      <LogoMark
        size={stacked ? s.mark * 2.1 : s.mark}
        tile={stackedTile}
        tone={tone}
        animated={animated}
      />
      <span
        style={{
          fontSize: s.type,
          // Clear space beside the mark is 1.17x the cap height of "Automation".
          marginLeft: stacked ? 0 : s.type * 0.82,
          marginTop: stacked ? s.type * 0.9 : 0,
        }}
      >
        <Logotype tone={tone} kicker={kicker} rule={rule} />
      </span>
    </span>
  )
}

export { GLYPH }
