/**
 * The Automation Lab — brand tokens.
 *
 * Every value here was sampled directly from the supplied logo artwork in
 * public/brand/, so this file is the authority the rest of the codebase
 * derives from. Mirrored in tailwind.config.js and src/styles/variables.css.
 */
export const BRAND = {
  /** The tile, the wordmark, the node centres. */
  navy: '#142a5e',
  /** The halo around the mark, and the "THE" kicker. */
  periwinkle: '#8fa9ea',
  /** "Lab" in the logotype, and the first two rule dots. */
  cornflower: '#6682d5',
  /** The two nodes. Used sparingly — it is the only warm colour in the system. */
  lime: '#dce566',
  /** The mark's body when it sits on navy. */
  ice: '#f4f6ff',
  /** The page surface. */
  cream: '#fbfaf6',
  /** The hairline under the logotype. */
  hairline: '#d9e2fc',

  /**
   * Cornflower is 3.52:1 on cream — large text only. This darker step clears
   * 4.5:1 (5.02:1) and is what accent TEXT uses outside the logo itself.
   */
  cornflowerText: '#4f68b8',
}

/**
 * Tone presets. The mark keeps its halo, bar and nodes in every tone; only the
 * body of the A changes, exactly as the two supplied artworks do.
 *
 *  - `body`    the A's stroke: ice on dark surfaces, navy on light ones
 *  - `halo`    the periwinkle outline around the A and the crossbar
 *  - `barFill` the crossbar's interior
 *  - `node`    the lime ring
 *  - `nodeDot` the counter inside each ring
 */
export const LOGO_TONES = {
  /** Default: cream, white and other light surfaces. */
  light: {
    body: BRAND.navy,
    halo: BRAND.periwinkle,
    barFill: BRAND.navy,
    node: BRAND.lime,
    nodeDot: BRAND.navy,
    word: BRAND.navy,
    lab: BRAND.cornflower,
    kicker: BRAND.periwinkle,
    rule: BRAND.hairline,
  },
  /** Navy, dark and photographic surfaces. */
  dark: {
    body: BRAND.ice,
    halo: BRAND.periwinkle,
    barFill: BRAND.navy,
    node: BRAND.lime,
    nodeDot: BRAND.navy,
    word: BRAND.ice,
    lab: BRAND.periwinkle,
    kicker: BRAND.periwinkle,
    rule: 'rgba(217,226,252,0.35)',
  },
  /** Single-colour, for stamps, embossing and one-ink print. */
  mono: {
    body: 'currentColor',
    halo: 'currentColor',
    barFill: 'currentColor',
    node: 'currentColor',
    nodeDot: 'currentColor',
    word: 'currentColor',
    lab: 'currentColor',
    kicker: 'currentColor',
    rule: 'currentColor',
  },
}

export const LOGO_TONE_NAMES = Object.keys(LOGO_TONES)
