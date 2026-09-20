import { Logo, LogoMark, BRAND } from '@/components/Brand'

function Section({ title, description, children }) {
  return (
    <section className="border-t border-navy-100 py-14">
      <h2 className="font-serif text-3xl font-bold text-navy">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-700/75">{description}</p>
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
  ['Navy', BRAND.navy, 'The tile, the wordmark, body copy, primary buttons.'],
  ['Periwinkle', BRAND.periwinkle, 'The halo around the mark and the THE kicker. Accent text on navy only.'],
  ['Cornflower', BRAND.cornflower, '“Lab” in the logotype and the rule dots.'],
  ['Cornflower text', BRAND.cornflowerText, 'Accent text on light surfaces and focus rings. 5.02:1 on cream.'],
  ['Lime', BRAND.lime, 'The two nodes. The only warm colour — never more than a detail.'],
  ['Ice', BRAND.ice, 'The A’s body when it sits on navy.'],
  ['Cream', BRAND.cream, 'The page surface.'],
  ['Hairline', BRAND.hairline, 'The rule beneath the logotype.'],
]

const DOWNLOADS = [
  { file: 'logo.svg', use: 'Horizontal lockup, light surfaces' },
  { file: 'logo-inverse.svg', use: 'Horizontal lockup reversed on navy', dark: true },
  { file: 'logo-tile.svg', use: 'Navy app icon — avatars, app stores, favicons' },
  { file: 'logo-mark.svg', use: 'The bare A, for inline and large-format use' },
  { file: 'favicon.svg', use: 'The tile, which holds up at 16px where the bare A does not' },
]

const MISUSE = [
  'Do not rebuild the A from a typeface — it is a drawn mark, not a letter.',
  'Do not recolour the halo, the crossbar or the nodes.',
  'Do not stretch, skew or rotate the lockup — scale it proportionally.',
  'Do not put the navy lockup on navy, or the reversed one on cream.',
  'Do not set “Automation” and “Lab” in the same face — the contrast is the idea.',
  'Do not drop the hairline and dots from the full lockup.',
]

export default function Brand() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <header className="py-16">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-cornflower-text">
          Identity
        </p>
        <h1 className="mt-4 font-serif text-5xl font-bold leading-tight text-navy sm:text-6xl">
          The logo &amp; logotype
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-navy-700/75">
          The mark is an A built from two round-capped strokes, haloed in
          periwinkle, with a node at the vertex and another on the crossbar —
          the two points where a process branches and where it is measured. The
          logotype pairs a bold serif against a bold sans, which is the whole
          brand argument in two words: considered, and operational.
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
            <Logo variant="lockup" size="lg" tone="dark" />
          </Panel>
        </div>
      </Section>

      <Section
        title="Variants"
        description="Five constructions cover every placement. Reach for the smallest one that still reads."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['Lockup', <Logo key="a" variant="lockup" size="sm" />],
            ['Stacked', <Logo key="b" variant="stacked" size="sm" />],
            ['Tile', <Logo key="c" variant="tile" size="lg" />],
            ['Mark', <Logo key="d" variant="mark" size="lg" />],
            ['Wordmark', <Logo key="e" variant="wordmark" size="md" />],
          ].map(([label, node]) => (
            <figure key={label} className="flex flex-col">
              <Panel className="min-h-[11rem] flex-1">{node}</Panel>
              <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-navy-700/60">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        title="Scale"
        description="The bare A holds down to about 24px. Below that the crossbar node closes up, so use the tile instead — its silhouette survives 16px."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <figure>
            <Panel className="gap-8">
              {[20, 28, 40, 56, 80].map((s) => (
                <LogoMark key={s} size={s} />
              ))}
            </Panel>
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-navy-700/60">
              Mark
            </figcaption>
          </figure>
          <figure>
            <Panel className="gap-8">
              {[16, 24, 32, 48, 64].map((s) => (
                <LogoMark key={s} size={s} tile />
              ))}
            </Panel>
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-navy-700/60">
              Tile
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section
        title="Clear space"
        description="Keep free space of at least half the mark's height on all four sides. Nothing — type, rules, image edges — enters that margin."
      >
        <Panel>
          <div className="p-[26px] outline-dashed outline-1 outline-periwinkle">
            <Logo variant="lockup" size="md" />
          </div>
        </Panel>
      </Section>

      <Section
        title="Motion"
        description="The apex node pulses and the crossbar node answers half a beat later, so the mark reads as a signal passing through it. Only where the logo is the subject of the screen — never in the header. Suppressed entirely under prefers-reduced-motion."
      >
        <Panel dark>
          <Logo variant="stacked" size="md" tone="dark" animated />
        </Panel>
      </Section>

      <Section
        title="Palette"
        description="Every value is sampled from the supplied artwork. Periwinkle and cornflower are logo colours first: as text on cream they measure 2.23:1 and 3.52:1, so accent copy uses the darker cornflower step instead."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SWATCHES.map(([name, hex, use]) => (
            <div key={name} className="overflow-hidden rounded-xl border border-navy-100">
              <div className="h-24" style={{ background: hex }} />
              <div className="bg-white p-4">
                <p className="font-serif text-lg font-bold text-navy">{name}</p>
                <p className="font-mono text-xs uppercase text-navy-700/60">{hex}</p>
                <p className="mt-2 text-xs leading-relaxed text-navy-700/75">{use}</p>
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
                  className="font-mono text-sm text-navy underline decoration-periwinkle underline-offset-4 hover:text-cornflower-text"
                >
                  {file}
                </a>
                <p className="mt-1 text-xs text-navy-700/75">{use}</p>
              </div>
              <span className={`rounded-md px-3 py-2 ${dark ? 'bg-navy' : 'bg-cream'}`}>
                <img src={`/${file}`} alt="" className="h-9" />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-navy-700/60">
          The original artwork is kept in <code>public/brand/</code> as the
          reference these vectors were rebuilt from.
        </p>
      </Section>

      <Section title="What not to do">
        <ul className="grid gap-3 sm:grid-cols-2">
          {MISUSE.map((rule) => (
            <li
              key={rule}
              className="flex gap-3 rounded-lg border border-navy-100 bg-white p-4 text-sm leading-relaxed text-navy-700/75"
            >
              <span aria-hidden="true" className="font-semibold text-cornflower-text">
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
