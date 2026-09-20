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

This branch establishes the **brand identity layer** — the logo, the logotype
and the design tokens everything else will be built on — plus the minimum app
shell needed to see them in place.

```
public/
  logo.svg            Primary horizontal lockup (light surfaces)
  logo-inverse.svg    Reversed lockup (navy / photographic surfaces)
  logo-mark.svg       Isotype only (avatars, app icons)
  favicon.svg         Heavier isotype, tuned for 16–32px
src/components/Brand/
  Logo.jsx            The lockup — lockup | stacked | mark | wordmark
  LogoMark.jsx        The isotype, drawn on a 64px grid
  Logotype.jsx        The wordmark, as live text
  brandTokens.js      Palette and tone presets
scripts/
  generate-logo-assets.mjs   Emits public/*.svg from one shared definition
```

Visit **`/brand`** in the running app for the full identity reference: variants,
scale, clear space, motion, palette, downloadable files and misuse rules.

## Using the logo

```jsx
import { Logo } from '@/components/Brand'

<Logo />                                   // horizontal lockup, navy
<Logo variant="stacked" size="xl" />       // centred, for heroes
<Logo variant="mark" size="sm" />          // isotype only
<Logo tone="inverse" />                    // on navy or imagery
<Logo variant="mark" size="xl" animated /> // nodes pulse, connectors draw
```

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `lockup` · `stacked` · `mark` · `wordmark` | `lockup` |
| `size` | `sm` · `md` · `lg` · `xl` | `md` |
| `tone` | `navy` · `inverse` · `mono` | `navy` |
| `kicker` | `true` · `false` | `true` |
| `animated` | `true` · `false` | `false` |

The lockup announces itself to assistive tech as a single
`"The Automation Lab"` image, so the name is never read twice.

## Swapping in your own logo file

The mark is defined in exactly two places, both of which read from the same
geometry constants:

1. `src/components/Brand/LogoMark.jsx` — the in-app React component
2. `scripts/generate-logo-assets.mjs` — the generator for `public/*.svg`

To drop in a different mark, replace the paths in both and run
`npm run brand:assets`. Nothing else in the codebase hard-codes the logo, so no
other file needs to change.

If you would rather use an exported asset file than an inline SVG component,
put it in `public/` and replace the contents of `LogoMark.jsx` with an `<img>`
pointing at it — but you will lose the `tone` and `animated` props, which need
the SVG's internals to be addressable.

## Brand tokens

Navy `#1a3a52` · Sky `#6b9ec9` · Cream `#f9f8f5` · Charcoal `#3a3a3a`
Cormorant Garamond (headlines) · Inter (body)

These are declared in three places that must be changed together:

- `tailwind.config.js` — utility classes
- `src/styles/variables.css` — CSS custom properties
- `src/components/Brand/brandTokens.js` — JS access, used by the logo

See [`docs/BRAND.md`](docs/BRAND.md) for the usage rules.
