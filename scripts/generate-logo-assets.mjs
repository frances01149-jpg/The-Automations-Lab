/**
 * Generates the static SVG brand assets in /public from the same geometry the
 * React components use, so the two can never drift.
 *
 *   npm run brand:assets
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', 'public')

/**
 * Glyph outlines for the logotype, baked once from PT Serif Bold and Inter
 * (see docs/BRAND.md). Committed so this script needs no font files.
 */
const OUTLINES = JSON.parse(readFileSync(join(HERE, 'logotype-outlines.json'), 'utf8'))

const C = {
  navy: '#142a5e',
  periwinkle: '#8fa9ea',
  cornflower: '#6682d5',
  lime: '#dce566',
  ice: '#f4f6ff',
  hairline: '#d9e2fc',
}

// Mirrors src/components/Brand/markGeometry.js.
const LEGS = 'M627 168L165.9 1240.5M627 168L1088.1 1240.5'
const GLYPH = { w: 1254, h: 1408 }
const TILE = { size: 1744, radius: 374, dx: 245, dy: 128 }

/** The A itself: halo stroke, body stroke, crossbar, two ringed nodes. */
function glyph(body, { dx = 0, dy = 0 } = {}) {
  const shift = dx || dy ? ` transform="translate(${dx} ${dy})"` : ''
  return `  <g${shift}>
    <path d="${LEGS}" fill="none" stroke="${C.periwinkle}" stroke-width="333" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${LEGS}" fill="none" stroke="${body}" stroke-width="195" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="266" y="762" width="721" height="156" rx="78" fill="${C.periwinkle}"/>
    <rect x="316" y="812" width="621" height="56" rx="28" fill="${C.navy}"/>
    <circle cx="627" cy="168" r="89" fill="${C.lime}"/><circle cx="627" cy="168" r="40" fill="${C.navy}"/>
    <circle cx="627" cy="840" r="55" fill="${C.lime}"/><circle cx="627" cy="840" r="24" fill="${C.navy}"/>
  </g>`
}

const LABEL = 'The Automation Lab'

function svg({ w, h, viewBox, body, defs = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${viewBox}" role="img" aria-label="${LABEL}">
  <title>${LABEL}</title>${defs}
${body}
</svg>
`
}

/** The navy rounded-square app icon. */
function tile() {
  return svg({
    w: TILE.size,
    h: TILE.size,
    viewBox: `0 0 ${TILE.size} ${TILE.size}`,
    body: `  <rect width="${TILE.size}" height="${TILE.size}" rx="${TILE.radius}" fill="${C.navy}"/>
${glyph(C.ice, { dx: TILE.dx, dy: TILE.dy })}`,
  })
}

/**
 * Horizontal lockup. Proportions come from the source artwork, expressed
 * against a 164-unit "Automation" (cap height 115, baseline at y=325).
 *
 * The logotype is emitted as outlines, not <text>: an SVG loaded through an
 * <img> tag or an email client cannot fetch a webfont, so live text here
 * would silently fall back to whatever serif the reader happens to have.
 */
function lockup(dark) {
  const word = dark ? C.ice : C.navy
  const lab = dark ? C.periwinkle : C.cornflower
  const rule = dark ? 'rgba(217,226,252,.35)' : C.hairline

  const TX = 505                 // left edge of the logotype column
  const BASE = 325               // "Automation" baseline
  const W = 1900
  const H = 516

  const bg = dark ? `  <rect width="${W}" height="${H}" fill="${C.navy}"/>\n` : ''

  return svg({
    w: W,
    h: H,
    viewBox: `0 0 ${W} ${H}`,
    body: `${bg}  <g transform="translate(60 84) scale(0.247)">
${glyph(dark ? C.ice : C.navy)}
  </g>
  <g fill="${C.periwinkle}">${place(OUTLINES.the, TX - 9, BASE - 208)}</g>
  <g fill="${word}">${place(OUTLINES.automation, TX, BASE)}</g>
  <g fill="${lab}">${place(OUTLINES.lab, TX + 1099, BASE)}</g>
  <rect x="${TX + 5}" y="${BASE + 87}" width="1114" height="8" rx="4" fill="${rule}"/>
  <circle cx="${TX + 1199}" cy="${BASE + 91}" r="16" fill="${lab}"/>
  <circle cx="${TX + 1249}" cy="${BASE + 91}" r="16" fill="${lab}"/>
  <circle cx="${TX + 1299}" cy="${BASE + 91}" r="16" fill="${C.lime}"/>`,
  })
}

/** Re-anchor a baked outline run to a new origin. */
function place(run, x, y) {
  const dx = x - run.x
  const dy = y - run.y
  return `<g transform="translate(${dx.toFixed(2)} ${dy.toFixed(2)})">${run.paths.join('')}</g>`
}

const files = {
  // The A alone — favicons at larger sizes, avatars, inline use.
  'logo-mark.svg': svg({
    w: GLYPH.w,
    h: GLYPH.h,
    viewBox: `0 0 ${GLYPH.w} ${GLYPH.h}`,
    body: glyph(C.navy),
  }),
  // The navy rounded-square app icon.
  'logo-tile.svg': tile(),
  // Favicon: the tile, which stays legible at 16px where the bare A does not.
  'favicon.svg': tile(),
  // Horizontal lockup for light surfaces.
  'logo.svg': lockup(false),
  // Horizontal lockup reversed out on navy.
  'logo-inverse.svg': lockup(true),
}

mkdirSync(OUT, { recursive: true })
for (const [name, contents] of Object.entries(files)) {
  writeFileSync(join(OUT, name), contents)
  console.log(`wrote public/${name}`)
}
