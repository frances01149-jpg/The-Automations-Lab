# Brand guidelines — The Automation Lab

The live version is at **`/brand`** in the running app. This file is the
written reference. The original artwork it all derives from is kept in
[`public/brand/`](../public/brand).

## The mark

An **A** built from two round-capped strokes meeting at a vertex, haloed in
periwinkle, crossed by a pill-shaped bar. Two lime nodes sit on it: one at the
vertex, one on the crossbar — the point where a process branches, and the point
where it is measured.

It was rebuilt from the supplied artwork as SVG rather than traced or embedded
as a bitmap, so it scales, recolours and animates. The rebuild is verified
against the source: **99.6% of pixels match**, the remainder being
anti-aliasing along the glyph edge.

### How it is constructed

The halo is not a separate shape. The same two-stroke path is drawn twice —
once at 333 units wide in periwinkle, then at 195 in the body colour — so the
outline falls out of the construction and the counter between the legs is
simply never painted. Geometry lives in
[`src/components/Brand/markGeometry.js`](../src/components/Brand/markGeometry.js)
and is shared by the React component and the static asset generator, so the two
cannot drift.

## The logotype

Three rows: the **THE** kicker, the name, and a hairline closed by three dots.

| Element | Face | Size | Colour |
| --- | --- | --- | --- |
| THE | Inter SemiBold, tracked | 0.34em | Periwinkle |
| Automation | PT Serif Bold | 1em | Navy |
| Lab | Inter Bold | 0.82em | Cornflower |

Everything is expressed in `em` against the size of "Automation", so the whole
lockup scales from one number. The kicker tracking is set so "THE" measures
0.129x the width of "Automation", matching the artwork rather than being
eyeballed.

The serif/sans pairing is the point: "Automation" is considered, "Lab" is
operational. Do not set them in the same face.

### A note on the typefaces

The supplied artwork is flattened, so the fonts were **identified, not
given**. Each candidate was rendered and scored against the artwork by pixel
overlap:

- **"Automation" → PT Serif Bold.** Best of nine serif candidates (IoU 0.82,
  next best Noto Serif at 0.816), and at 164 units it sets to 950.2 against the
  artwork's 947 — a 0.3% difference. Close enough to be near-certain about the
  metrics, though the artwork's glyphs are marginally shorter at matched width,
  so this may be a metrically similar cousin rather than PT Serif itself.
- **"Lab" → Inter Bold.** Best of eight sans candidates (IoU 0.858), and
  consistent with Inter being the brand's body face.

If you know the real faces, they are a one-line change: the families in
`Logotype.jsx` and `tailwind.config.js`, then re-run `npm run brand:assets`
after regenerating `scripts/logotype-outlines.json`.

### Why the static SVGs carry outlines, not text

An SVG loaded through an `<img>` tag — or opened in an email client — cannot
fetch a webfont, so live text there would silently fall back to whatever serif
the reader happens to have. The files in `public/` therefore ship the logotype
as glyph outlines, baked once into `scripts/logotype-outlines.json` (8 KB) so
the build needs no font files. In the app, `Logotype.jsx` uses live text, which
stays selectable and searchable.

## Tones

| Tone | Body of the A | "Lab" | Use on |
| --- | --- | --- | --- |
| `light` | Navy | Cornflower | Cream, white, light surfaces |
| `dark` | Ice | Periwinkle | Navy, dark, photographic surfaces |
| `mono` | `currentColor` | `currentColor` | One-ink print, embossing, stamps |

The halo, crossbar and nodes keep their colours in every tone, exactly as the
two supplied artworks do.

## Variants

| Variant | Use |
| --- | --- |
| `lockup` | Default signature. Headers, documents, email. |
| `stacked` | Heroes, splash screens, print. |
| `tile` | The navy rounded square. Avatars, app icons, favicons. |
| `mark` | The bare A, for inline and large-format use. |
| `wordmark` | Footers, legal text, email signatures. |

## Scale

The bare A holds down to about **24px**; below that the crossbar node closes
up. Under 24px use the **tile**, whose silhouette survives 16px — which is why
`favicon.svg` is the tile and not the bare mark.

## Clear space

Keep free space of at least **half the mark's height** on all four sides.
Nothing — type, rules, image edges, other logos — enters that margin. The
`.tal-logo-slot` utility in `globals.css` enforces it in layout.

## Motion

The apex node pulses on a 2.8s cycle and the crossbar node answers 0.55s later,
so the mark reads as a signal passing through it.

Use motion **only where the logo is the subject of the screen** — a hero, a
splash, a loading state. Never in the header. All motion is `transform` and
`opacity` only, and is suppressed entirely under `prefers-reduced-motion`.

## What not to do

- Do not rebuild the A from a typeface — it is a drawn mark, not a letter.
- Do not recolour the halo, the crossbar or the nodes.
- Do not stretch, skew or rotate the lockup — scale it proportionally.
- Do not put the navy lockup on navy, or the reversed one on cream.
- Do not set "Automation" and "Lab" in the same face.
- Do not drop the hairline and dots from the full lockup.

## Accessibility

- The lockup is exposed as one `role="img"` labelled "The Automation Lab"; the
  mark and logotype inside are `aria-hidden`, so the name is not read twice.
- A bare `LogoMark` with no `title` is `role="presentation"` — decorative by
  default, which is correct next to a visible wordmark.

Measured contrast (sRGB, WCAG 2.1):

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Navy `#142a5e` on cream `#fbfaf6` | 13.21:1 | AAA |
| Ice `#f4f6ff` on navy | 12.79:1 | AAA |
| Lime `#dce566` on navy | 10.14:1 | AAA |
| Periwinkle `#8fa9ea` on navy | 5.93:1 | AA |
| Cornflower text `#4f68b8` on cream | 5.02:1 | AA |
| Cornflower `#6682d5` on cream | 3.52:1 | large text only |
| Periwinkle `#8fa9ea` on cream | 2.23:1 | **fails — logo only** |
| Lime `#dce566` on cream | 1.30:1 | **fails — logo only** |

Periwinkle and lime are logo colours first. WCAG exempts text that is part of a
logo, which is why the "THE" kicker may stay periwinkle inside the lockup — but
neither colour may be used for interface text on a light surface. Accent copy
uses `cornflower-text`, which is also what the focus ring uses (WCAG 1.4.11
asks 3:1 for UI components; brand cornflower is 3.52:1 and clears it, but the
darker step is used for consistency with accent text).
