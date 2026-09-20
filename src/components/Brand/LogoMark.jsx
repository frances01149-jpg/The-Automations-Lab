import { useId } from 'react'
import { LOGO_TONES } from './brandTokens'
import {
  LEG_PATH,
  BODY_WIDTH,
  HALO_WIDTH,
  BAR_OUTER,
  BAR_INNER,
  NODES,
  GLYPH,
  TILE,
} from './markGeometry'

/**
 * The Automation Lab "A" mark.
 *
 * `tile` draws it on the navy rounded square (the app icon); without it the
 * glyph stands alone for use beside the logotype.
 */
export default function LogoMark({
  size = 40,
  tone = 'light',
  tile = false,
  animated = false,
  title,
  className = '',
  ...rest
}) {
  const t = LOGO_TONES[tone] ?? LOGO_TONES.light
  const titleId = useId()
  const decorative = !title

  // On the tile the A always reverses out, whatever tone the caller asked for.
  const p = tile ? LOGO_TONES.dark : t

  const glyph = (
    <g transform={tile ? `translate(${TILE.offsetX} ${TILE.offsetY})` : undefined}>
      {/* Halo and body are the same path: draw it wide, then narrow on top.
          The gap between the legs — the counter — is simply never painted. */}
      <path
        d={LEG_PATH}
        fill="none"
        stroke={p.halo}
        strokeWidth={HALO_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={LEG_PATH}
        fill="none"
        stroke={p.body}
        strokeWidth={BODY_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Crossbar sits over the legs. */}
      <rect {...dims(BAR_OUTER)} rx={BAR_OUTER.r} fill={p.halo} />
      <rect {...dims(BAR_INNER)} rx={BAR_INNER.r} fill={p.barFill} />

      <g className="tal-logo-nodes">
        {NODES.map((n) => (
          <g key={n.cy}>
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={p.node} />
            <circle cx={n.cx} cy={n.cy} r={n.dot} fill={p.nodeDot} />
          </g>
        ))}
      </g>
    </g>
  )

  const box = tile ? `0 0 ${TILE.size} ${TILE.size}` : `0 0 ${GLYPH.w} ${GLYPH.h}`
  const height = tile ? size : Math.round((size * GLYPH.h) / GLYPH.w)

  return (
    <svg
      viewBox={box}
      width={size}
      height={height}
      className={`tal-logo-mark ${animated ? 'is-animated' : ''} ${className}`}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : titleId}
      focusable="false"
      {...rest}
    >
      {!decorative && <title id={titleId}>{title}</title>}
      {/* Mono is a single-ink tone, so a filled tile would swallow the A. */}
      {tile && tone !== 'mono' && (
        <rect width={TILE.size} height={TILE.size} rx={TILE.radius} fill={LOGO_TONES.light.word} />
      )}
      {glyph}
    </svg>
  )
}

function dims({ x, y, w, h }) {
  return { x, y, width: w, height: h }
}
