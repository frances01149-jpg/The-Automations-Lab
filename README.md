# The Automation Lab

A membership-first digital learning platform for people who would rather build
the system once than repeat the task forever.

**React 18 · Vite · Tailwind CSS**

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run brand:assets` | Regenerate the SVG brand files in `public/` |

## What is in this branch

The **brand identity layer** — the company logo and logotype, rebuilt from the
supplied artwork as scalable SVG, plus the design tokens everything else will
be built on and the minimum app shell needed to see them in place.

```
public/
  brand/              The supplied artwork, kept as the reference
  logo.svg            Horizontal lockup (light surfaces)
  logo-inverse.svg    Horizontal lockup reversed on navy
  logo-tile.svg       The navy rounded-square app icon
  logo-mark.svg       The bare A
  favicon.svg         The tile — it holds at 16px where the bare A does not
src/components/Brand/
  Logo.jsx            The lockup — lockup | stacked | tile | mark | wordmark
  LogoMark.jsx        The A, with or without its tile
  Logotype.jsx        THE / Automation / Lab, as live text
  markGeometry.js     The mark's measured geometry
  brandTokens.js      Palette and tone presets
scripts/
  generate-logo-assets.mjs   Emits public/*.svg from the same geometry
  logotype-outlines.json     Baked glyph outlines for the static lockups
```

Visit **`/brand`** in the running app for the full identity reference.

## Using the logo

```jsx
import { Logo } from '@/components/Brand'

<Logo />                                   // horizontal lockup
<Logo variant="stacked" size="xl" />       // centred, for heroes
<Logo variant="tile" size="sm" />          // the app icon
<Logo variant="mark" />                    // the bare A
<Logo tone="dark" />                       // on navy or imagery
<Logo variant="tile" size="xl" animated /> // the nodes pulse
```

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `lockup` · `stacked` · `tile` · `mark` · `wordmark` | `lockup` |
| `size` | `sm` · `md` · `lg` · `xl` | `md` |
| `tone` | `light` · `dark` · `mono` | `light` |
| `kicker` | `true` · `false` | `true` |
| `rule` | `true` · `false` | `true` |
| `animated` | `true` · `false` | `false` |

The lockup announces itself to assistive tech as a single
`"The Automation Lab"` image, so the name is never read twice.

## Changing the mark

The mark is defined once, in
[`src/components/Brand/markGeometry.js`](src/components/Brand/markGeometry.js).
Both the React component and `scripts/generate-logo-assets.mjs` read from it,
so editing that file and running `npm run brand:assets` updates everything.
Nothing else in the codebase hard-codes the logo.

## Brand tokens

Navy `#142a5e` · Periwinkle `#8fa9ea` · Cornflower `#6682d5` · Lime `#dce566`
Ice `#f4f6ff` · Cream `#fbfaf6`
PT Serif (headlines) · Inter (body)

Declared in three places that must be changed together:

- `tailwind.config.js` — utility classes
- `src/styles/variables.css` — CSS custom properties
- `src/components/Brand/brandTokens.js` — JS access, used by the logo

See [`docs/BRAND.md`](docs/BRAND.md) for usage rules, contrast measurements and
a note on how the logotype's typefaces were identified.
