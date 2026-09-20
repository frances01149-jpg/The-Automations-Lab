import { Logo, LogoMark, BRAND } from '@/components/Brand'

function Section({ title, description, children }) {
  return (
    <section className="border-t border-navy-100 py-14">
      <h2 className="font-serif text-3xl text-navy">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-light">{description}</p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  )
}

function Panel({ dark = false, className = '', children }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl p-10 ${
        dark ? 'bg-navy' : 'border border-navy-100 bg-white'
      } ${className}`}
    >
      {children}
    </div>
  )
}

const SWATCHES = [
  ['Navy', BRAND.navy, 'Primary. Shell of the mark, headlines, primary buttons.'],
  ['Sky', BRAND.sky, 'Accent graphic only — the mark\u2019s network and liquid. Too light for text on either surface.'],
  ['Sky dark', BRAND.skyDark, 'Accent text on light surfaces, and focus rings. 5.18:1 on cream.'],
  ['Sky light', BRAND.skyLight, 'Accent text on navy. 5.56:1.'],
  ['Cream', BRAND.cream, 'Surface. Page background, reversed logo.'],
  ['Charcoal', BRAND.charcoal, 'Body copy. Never used inside the mark.'],
]

const DOWNLOADS = [
  { file: 'logo.svg', use: 'Primary horizontal lockup, light surfaces' },
  // The reversed lockup is cream-on-transparent, so its preview needs a navy
  // chip behind it or it disappears against the row.
  { file: 'logo-inverse.svg', use: 'Reversed lockup, navy or photographic surfaces', dark: true },
  { file: 'logo-mark.svg', use: 'Isotype only, avatars and app icons' },
  { file: 'favicon.svg', use: 'Heavier isotype, tuned for 16–32px' },
]

const MISUSE = [
  'Do not recolour the mark outside the three approved tones.',
  'Do not stretch, skew or rotate the lockup — scale it proportionally.',
  'Do not place the navy lockup on navy, or the inverse lockup on cream.',
  'Do not add drop shadows, outlines, gradients or bevels to the mark.',
  'Do not re-typeset the wordmark in another face, or re-space its letters.',
  'Do not crop the flask, or separate the network from its shell.',
]

export default function Brand() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <header className="py-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-sky-dark">
          Identity
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight text-navy sm:text-6xl">
          The logo &amp; logotype
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-charcoal-light">
          The mark is an Erlenmeyer flask holding a three-node network suspended
          above the liquid line: the lab that contains the process, and the
          automation running inside it. The serif wordmark supplies the warmth
          the navy palette deliberately withholds.
        </p>
      </header>

      <Section
        title="Primary lockup"
        description="The default signature. Use it wherever there is horizontal room — headers, documents, email."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Panel>
            <Logo variant="lockup" size="lg" />
          </Panel>
          <Panel dark>
            <Logo variant="lockup" size="lg" tone="inverse" />
          </Panel>
        </div>
      </Section>

      <Section
        title="Variants"
        description="Four constructions cover every placement. Reach for the smallest one that still reads."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Lockup', <Logo key="a" variant="lockup" size="sm" />],
            ['Stacked', <Logo key="b" variant="stacked" size="md" />],
            ['Mark', <Logo key="c" variant="mark" size="lg" />],
            ['Wordmark', <Logo key="d" variant="wordmark" size="sm" />],
          ].map(([label, node]) => (
            <figure key={label} className="flex flex-col">
              <Panel className="min-h-[10rem] flex-1">{node}</Panel>
              <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-charcoal-muted">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        title="Scale"
        description="The mark is drawn on a 64px grid and holds its silhouette down to 16px. Below 24px, use favicon.svg — its heavier strokes survive rasterisation."
      >
        <Panel className="gap-10">
          {[16, 24, 32, 48, 64, 96].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <LogoMark size={s} />
              <span className="text-[0.65rem] text-charcoal-muted">{s}px</span>
            </div>
          ))}
        </Panel>
      </Section>

      <Section
        title="Clear space"
        description="Keep free space of at least half the mark's height on all four sides. Nothing — type, rules, image edges — enters that margin."
      >
        <Panel>
          <div className="relative p-[28px] outline-dashed outline-1 outline-offset-0 outline-sky/50">
            <Logo variant="lockup" size="md" />
          </div>
        </Panel>
      </Section>

      <Section
        title="Motion"
        description="The nodes pulse and the connectors draw in, but only where the logo is the subject of the screen — a hero, a splash, a loading state. Never in the header. The animation is suppressed entirely under prefers-reduced-motion."
      >
        <Panel dark>
          <Logo variant="stacked" size="xl" tone="inverse" animated />
        </Panel>
      </Section>

      <Section
        title="Palette"
        description="Brand sky colours the mark's interior and nothing else. As text it fails WCAG AA on both cream (2.69:1) and navy (4.16:1), so accent type uses the two tinted variants instead."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SWATCHES.map(([name, hex, use]) => (
            <div key={name} className="overflow-hidden rounded-xl border border-navy-100">
              <div className="h-24" style={{ background: hex }} />
              <div className="bg-white p-4">
                <p className="font-serif text-lg text-navy">{name}</p>
                <p className="font-mono text-xs uppercase text-charcoal-muted">{hex}</p>
                <p className="mt-2 text-xs leading-relaxed text-charcoal-light">{use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Files">
        <ul className="divide-y divide-navy-100 overflow-hidden rounded-xl border border-navy-100 bg-white">
          {DOWNLOADS.map(({ file, use, dark }) => (
            <li key={file} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <a
                  href={`/${file}`}
                  download
                  className="font-mono text-sm text-navy underline decoration-sky underline-offset-4 hover:text-sky-dark"
                >
                  {file}
                </a>
                <p className="mt-1 text-xs text-charcoal-light">{use}</p>
              </div>
              <span className={`rounded-md px-3 py-2 ${dark ? 'bg-navy' : 'bg-cream'}`}>
                <img src={`/${file}`} alt="" className="h-8" />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What not to do">
        <ul className="grid gap-3 sm:grid-cols-2">
          {MISUSE.map((rule) => (
            <li
              key={rule}
              className="flex gap-3 rounded-lg border border-navy-100 bg-white p-4 text-sm leading-relaxed text-charcoal-light"
            >
              <span aria-hidden="true" className="font-semibold text-sky-dark">
                ×
              </span>
              {rule}
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
