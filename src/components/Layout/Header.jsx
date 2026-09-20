import { Link, NavLink } from 'react-router-dom'
import { Logo } from '@/components/Brand'

const NAV = [
  { to: '/courses', label: 'Courses' },
  { to: '/quiz', label: 'Find your fit' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/brand', label: 'Brand' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="tal-logo-slot -ml-1 shrink-0 rounded-sm">
          {/* Below `sm` the wordmark would crowd the nav, so the mark stands alone. */}
          <Logo variant="tile" size="sm" className="sm:hidden" />
          <Logo variant="lockup" size="sm" className="hidden sm:inline-flex" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'text-navy' : 'text-navy-700/70 hover:text-navy'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/pricing"
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-all duration-150 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg hover:shadow-navy/20"
        >
          Join the Lab
        </Link>
      </div>
    </header>
  )
}
