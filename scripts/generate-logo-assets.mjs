/**
 * Generates the static SVG brand assets in /public from one shared definition,
 * so they can never drift from src/components/Brand/LogoMark.jsx.
 *
 *   npm run brand:assets
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const BRAND = {
  navy: '#1a3a52',
  sky: '#6b9ec9',
  // Text-safe tints for the kicker line: 5.18:1 on cream, 5.56:1 on navy.
  skyDark: '#3f6d92',
  skyLight: '#94b6ce',
  cream: '#f9f8f5',
}

const TONES = {
  navy: { shell: BRAND.navy, accent: BRAND.sky, kicker: BRAND.skyDark, word: BRAND.navy },
  inverse: { shell: BRAND.cream, accent: BRAND.sky, kicker: BRAND.skyLight, word: BRAND.cream },
}

const FLASK = 'M27 11v14.8L12.1 49.1a6.2 6.2 0 0 0 5.2 9.6h29.4a6.2 6.2 0 0 0 5.2-9.6L37 25.8V11'
const RIM = 'M23 11h18'
const LIQUID = 'M15.4 44h33.2l3.3 5.1a6.2 6.2 0 0 1-5.2 9.6H17.3a6.2 6.2 0 0 1-5.2-9.6z'
const NODES = [
  [32, 18.5],
  [23.5, 36],
  [40.5, 36],
]
const EDGES = [
  [0, 1],
  [0, 2],
  [1, 2],
]

/** The mark's inner geometry, optionally translated into a wider canvas. */
function mark({ shell, accent }, { strokeWidth = 3.6, nodeRadius = 2.6, x = 0 } = {}) {
  const shift = x ? ` transform="translate(${x} 0)"` : ''
  const edges = EDGES.map(([a, b]) => {
    const [x1, y1] = NODES[a]
    const [x2, y2] = NODES[b]
    return `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
  }).join('\n')
  const dots = NODES.map(([cx, cy]) => `    <circle cx="${cx}" cy="${cy}" r="${nodeRadius}"/>`).join('\n')

  return `  <g${shift}>
    <path d="${LIQUID}" fill="${accent}" opacity=".32"/>
  <g stroke="${accent}" stroke-width="2" stroke-linecap="round">
${edges}
  </g>
  <g fill="${accent}">
${dots}
  </g>
  <g fill="none" stroke="${shell}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${FLASK}"/>
    <path d="${RIM}"/>
  </g>
  </g>`
}

function svg({ width, height, viewBox, body, label }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}" role="img" aria-label="${label}">
  <title>${label}</title>
${body}
</svg>
`
}

const LABEL = 'The Automation Lab'

/** Horizontal lockup: mark + serif wordmark + tracked sans kicker. */
function lockup(tone) {
  const t = TONES[tone]
  const body = `${mark(t)}
  <text x="80" y="32" font-family="'Cormorant Garamond', Georgia, serif" font-size="27" font-weight="500" fill="${t.word}" letter-spacing=".3">${LABEL}</text>
  <text x="81.5" y="48" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="7.5" font-weight="500" fill="${t.kicker}" letter-spacing="2.4">AUTOMATE WITH INTENT</text>`
  return svg({ width: 320, height: 64, viewBox: '0 0 320 64', body, label: LABEL })
}

const files = {
  // Primary horizontal lockup, for light surfaces.
  'logo.svg': lockup('navy'),
  // Same lockup reversed out, for navy or photographic surfaces.
  'logo-inverse.svg': lockup('inverse'),
  // Isotype alone, for avatars, app icons and tight navigation.
  'logo-mark.svg': svg({ width: 64, height: 64, viewBox: '0 0 64 64', body: mark(TONES.navy), label: LABEL }),
  // Favicon: heavier strokes and larger nodes so it survives 16px rasterisation.
  'favicon.svg': svg({
    width: 64,
    height: 64,
    viewBox: '0 0 64 64',
    body: mark(TONES.navy, { strokeWidth: 4.6, nodeRadius: 3.4 }),
    label: LABEL,
  }),
}

mkdirSync(OUT, { recursive: true })
for (const [name, contents] of Object.entries(files)) {
  writeFileSync(join(OUT, name), contents)
  console.log(`wrote public/${name}`)
}
