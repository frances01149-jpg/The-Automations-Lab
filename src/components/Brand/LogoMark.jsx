import { useId } from 'react'
import { LOGO_TONES } from './brandTokens'

/**
 * The Automation Lab isotype.
 *
 * An Erlenmeyer flask (the Lab) holding a three-node network suspended above
 * the liquid line (the Automation). Drawn on a 64x64 grid so it stays crisp
 * at favicon sizes; strokes are rounded to match the serif wordmark's warmth.
 */
export default function LogoMark({
  size = 40,
  tone = 'navy',
  animated = false,
  title,
  className = '',
  ...rest
}) {
  const palette = LOGO_TONES[tone] ?? LOGO_TONES.navy
  const titleId = useId()
  const decorative = !title

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`tal-logo-mark ${animated ? 'is-animated' : ''} ${className}`}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : titleId}
      focusable="false"
      {...rest}
    >
      {!decorative && <title id={titleId}>{title}</title>}

      {/* Liquid — the settled result of the process above it. */}
      <path
        className="tal-logo-liquid"
        d="M15.4 44h33.2l3.3 5.1a6.2 6.2 0 0 1-5.2 9.6H17.3a6.2 6.2 0 0 1-5.2-9.6z"
        fill={palette.accent}
        opacity={tone === 'mono' ? 0.25 : 0.32}
      />

      {/* Automation network — three nodes, fully connected. */}
      <g
        className="tal-logo-network"
        stroke={palette.accent}
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="32" y1="18.5" x2="23.5" y2="36" />
        <line x1="32" y1="18.5" x2="40.5" y2="36" />
        <line x1="23.5" y1="36" x2="40.5" y2="36" />
      </g>
      <g className="tal-logo-nodes" fill={palette.accent}>
        <circle cx="32" cy="18.5" r="2.6" />
        <circle cx="23.5" cy="36" r="2.6" />
        <circle cx="40.5" cy="36" r="2.6" />
      </g>

      {/* Flask shell — drawn last so it reads as the containing silhouette. */}
      <g
        stroke={palette.shell}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M27 11v14.8L12.1 49.1a6.2 6.2 0 0 0 5.2 9.6h29.4a6.2 6.2 0 0 0 5.2-9.6L37 25.8V11" />
        <path d="M23 11h18" />
      </g>
    </svg>
  )
}
