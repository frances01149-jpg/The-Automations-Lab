import { Link } from 'react-router-dom'
import { Logo } from '@/components/Brand'

const COLUMNS = [
  { title: 'Learn', links: [['Courses', '/courses'], ['Find your fit', '/quiz'], ['Pricing', '/pricing']] },
  { title: 'Lab', links: [['Brand', '/brand'], ['Community', '/community'], ['Support', '/support']] },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          {/* The inverse tone is mandatory on navy — see docs/BRAND.md. */}
          <Logo variant="lockup" size="md" tone="dark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-300">
            A membership-first lab for people who would rather build the system
            than repeat the task.
          </p>
        </div>

        {COLUMNS.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-periwinkle">
              {title}
            </h2>
            <ul className="mt-5 space-y-3">
              {links.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-navy-300 transition-colors duration-150 hover:text-cream"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-navy-700">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-navy-300 sm:px-8">
          © {new Date().getFullYear()} The Automation Lab. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
