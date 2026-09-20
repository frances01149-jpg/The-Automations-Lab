import LogoMark from './LogoMark'
import Logotype from './Logotype'

const MARK_SIZES = { sm: 28, md: 40, lg: 56, xl: 80 }

/**
 * The primary brand lockup.
 *
 * Variants:
 *  - `lockup`   mark + wordmark, side by side (default — headers, nav)
 *  - `stacked`  mark above wordmark, centred (hero, auth screens, print)
 *  - `mark`     isotype only (favicons, avatars, tight mobile nav)
 *  - `wordmark` type only (footers, legal, email signatures)
 *
 * The whole lockup is announced as a single "The Automation Lab" image to
 * assistive tech; the inner pieces are decorative so the name is not read twice.
 */
export default function Logo({
  variant = 'lockup',
  size = 'md',
  tone = 'navy',
  kicker = true,
  animated = false,
  className = '',
  ...rest
}) {
  const markSize = MARK_SIZES[size] ?? MARK_SIZES.md
  const label = 'The Automation Lab'

  if (variant === 'mark') {
    return (
      <LogoMark
        size={markSize}
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
      <span className={`inline-flex ${className}`} role="img" aria-label={label} {...rest}>
        <Logotype size={size} tone={tone} kicker={kicker} />
      </span>
    )
  }

  const stacked = variant === 'stacked'

  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-flex ${
        stacked ? 'flex-col items-center gap-3 text-center' : 'flex-row items-center gap-3'
      } ${className}`}
      {...rest}
    >
      <LogoMark size={markSize} tone={tone} animated={animated} />
      <Logotype size={size} tone={tone} kicker={kicker} />
    </span>
  )
}
