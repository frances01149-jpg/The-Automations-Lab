/**
 * The "A" mark, reverse-engineered from public/brand/logo-icon-source.png.
 *
 * The artwork is two round-capped strokes meeting at a vertex, a crossbar
 * pill laid over them, and two ringed nodes. Rebuilding it as strokes rather
 * than tracing an outline means the halo falls out of the construction: the
 * same path drawn twice, wide in periwinkle then narrow in the body colour.
 *
 * All values are in the glyph's own 1254 x 1408 space, measured to the pixel
 * against the source and verified by overlay diff (npm run brand:verify).
 */

/** The vertex where both leg centrelines meet — also the apex node's centre. */
export const APEX = { x: 627, y: 168 }
/** Where each leg's centreline ends; the round cap extends past this. */
export const LEG_END_Y = 1240.5
export const LEG_LEFT_X = 165.9
export const LEG_RIGHT_X = 1088.1

/** Stroke widths. The halo is the body plus 69 of periwinkle on each side. */
export const BODY_WIDTH = 195
export const HALO_WIDTH = 333

/** `M apex L left  M apex L right` — two strokes, not one polyline, so the
 *  round cap lands on each foot and the round join rounds the vertex. */
export const LEG_PATH =
  `M${APEX.x} ${APEX.y}L${LEG_LEFT_X} ${LEG_END_Y}` +
  `M${APEX.x} ${APEX.y}L${LEG_RIGHT_X} ${LEG_END_Y}`

/** Crossbar: a periwinkle pill with a navy pill inset 50 inside it. */
export const BAR_OUTER = { x: 266, y: 762, w: 721, h: 156, r: 78 }
export const BAR_INNER = { x: 316, y: 812, w: 621, h: 56, r: 28 }

/** The two nodes: a lime ring with a navy counter. */
export const NODES = [
  { cx: APEX.x, cy: APEX.y, r: 89, dot: 40 },
  { cx: APEX.x, cy: 840, r: 55, dot: 24 },
]

/** The glyph's own viewBox. */
export const GLYPH = { w: 1254, h: 1408 }

/** The app-icon tile the mark sits on, in its own 1744 x 1744 space. */
export const TILE = { size: 1744, radius: 374, offsetX: 245, offsetY: 128 }
