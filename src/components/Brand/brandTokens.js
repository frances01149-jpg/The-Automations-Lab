/**
 * Single source of truth for the brand palette.
 * Mirrors tailwind.config.js and src/styles/variables.css — change all three
 * together if the brand ever shifts.
 */
export const BRAND = {
  navy: '#1a3a52',
  sky: '#6b9ec9',
  /** Sky darkened to clear 4.5:1 on cream (5.18:1) — for accent TEXT on light. */
  skyDark: '#3f6d92',
  /** Sky lightened to clear 4.5:1 on navy (5.56:1) — for accent TEXT on dark. */
  skyLight: '#94b6ce',
  cream: '#f9f8f5',
  charcoal: '#3a3a3a',
}

/**
 * Tone presets for the logo. Each tone maps the mark's structural roles:
 *  - `shell`  the flask outline + rim (the load-bearing silhouette)
 *  - `accent` the automation nodes, connectors and liquid — a graphic, which
 *             WCAG exempts as part of the logo, so it keeps true brand sky
 *  - `kicker` the "AUTOMATE WITH INTENT" line — real text, so it takes a
 *             surface-specific tint that clears 4.5:1 (see docs/BRAND.md)
 *  - `word`   the logotype text
 */
export const LOGO_TONES = {
  /** Default: for cream / white / light surfaces. */
  navy: { shell: BRAND.navy, accent: BRAND.sky, kicker: BRAND.skyDark, word: BRAND.navy },
  /** For navy or photographic surfaces. */
  inverse: { shell: BRAND.cream, accent: BRAND.sky, kicker: BRAND.skyLight, word: BRAND.cream },
  /** Single-colour: inherits `currentColor`. For stamps, favicons, print. */
  mono: {
    shell: 'currentColor',
    accent: 'currentColor',
    kicker: 'currentColor',
    word: 'currentColor',
  },
}

export const LOGO_TONE_NAMES = Object.keys(LOGO_TONES)
