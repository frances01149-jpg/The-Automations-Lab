# Brand guidelines — The Automation Lab

The live, rendered version of this document is at **`/brand`** in the running
app. This file is the written reference.

## The idea

The mark is an Erlenmeyer flask holding a three-node network suspended above the
liquid line. The flask is the Lab — the container, the place where things are
tried. The network is the Automation — the process running inside it. The liquid
is what settles out when the process has run.

It is deliberately not a gear, a robot or a lightning bolt. The category is
crowded with machinery; the flask reads as method and patience instead, which is
what a membership-first learning platform is actually selling.

## The wordmark

"The Automation Lab" is set in **Cormorant Garamond Medium**, with the kicker
"AUTOMATE WITH INTENT" in **Inter Medium**, uppercase, tracked to `0.32em`.

The serif does the differentiating work. The competitive set in this category is
overwhelmingly bold geometric sans in hot colours; a navy garamond reads as
considered rather than loud, and it is what someone choosing between the two
will remember.

The wordmark is rendered as **live text**, not outlines. It stays selectable,
searchable and screen-reader friendly, and it re-renders crisply at any zoom.
It must never wrap — it is a single typographic unit.

## Tones

| Tone | Shell | Accent (graphic) | Kicker (text) | Use on |
| --- | --- | --- | --- | --- |
| `navy` | `#1a3a52` | `#6b9ec9` | `#3f6d92` | Cream, white, light surfaces |
| `inverse` | `#f9f8f5` | `#6b9ec9` | `#94b6ce` | Navy, dark or photographic surfaces |
| `mono` | `currentColor` | `currentColor` | `currentColor` | Stamps, print, single-colour |

The accent and the kicker are deliberately different values. The accent colours
the mark's nodes, connectors and liquid — a graphic that is part of the logo,
which WCAG exempts from contrast requirements, so it keeps true brand sky. The
kicker is real text and is not exempt, so each tone shifts it to a tint that
clears 4.5:1 against its surface.

## Variants

| Variant | Use |
| --- | --- |
| `lockup` | Default signature. Headers, documents, email. |
| `stacked` | Heroes, splash screens, auth, print. |
| `mark` | Favicons, avatars, tight mobile navigation. |
| `wordmark` | Footers, legal text, email signatures. |

Reach for the smallest variant that still reads in the space available.

## Scale

The mark is drawn on a 64px grid and holds its silhouette down to **16px**.
Below 24px use `favicon.svg`, whose heavier strokes and larger nodes survive
rasterisation.

## Clear space

Keep free space of at least **half the mark's height** on all four sides.
Nothing — type, rules, image edges, other logos — enters that margin. The
`.tal-logo-slot` utility in `globals.css` enforces this in layout.

## Motion

The nodes pulse on a 2.8s cycle, staggered 0.45s apart so the network reads as a
signal travelling; the connectors draw in once on mount.

Use motion **only where the logo is the subject of the screen** — a hero, a
splash, a loading state. Never in the header: a logo that moves on every page
load is noise, and it undercuts the composure the serif is there to establish.

All motion is `transform` and `opacity` only, so it stays on the compositor, and
it is suppressed entirely under `prefers-reduced-motion: reduce`.

## What not to do

- Do not recolour the mark outside the three approved tones.
- Do not stretch, skew or rotate the lockup — scale it proportionally.
- Do not place the navy lockup on navy, or the inverse lockup on cream.
- Do not add drop shadows, outlines, gradients or bevels to the mark.
- Do not re-typeset the wordmark in another face, or re-space its letters.
- Do not crop the flask, or separate the network from its shell.

## Accessibility

- The lockup is exposed as one `role="img"` labelled `"The Automation Lab"`;
  the mark and wordmark inside it are `aria-hidden` so the name is not
  announced twice.
- A bare `LogoMark` with no `title` is `role="presentation"` — decorative by
  default, which is correct next to a visible wordmark.
Measured contrast ratios (sRGB, WCAG 2.1 formula):

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Navy `#1a3a52` on cream `#f9f8f5` | 11.17:1 | AAA |
| Cream `#f9f8f5` on navy `#1a3a52` | 11.17:1 | AAA |
| Charcoal `#3a3a3a` on cream | 10.71:1 | AAA |
| Sky-dark `#3f6d92` on cream | 5.18:1 | AA |
| Sky-light `#94b6ce` on navy | 5.56:1 | AA |
| Sky `#6b9ec9` on navy | 4.16:1 | **fails AA for text** |
| Sky `#6b9ec9` on cream | 2.69:1 | **fails AA for text** |

Brand sky is therefore never used for text on either surface — only for the
mark's graphic interior. Use `text-sky-dark` on light surfaces and
`text-sky-light` on navy. The focus ring uses sky-dark for the same reason:
WCAG 1.4.11 asks 3:1 for UI components, and brand sky on cream is 2.69:1.
