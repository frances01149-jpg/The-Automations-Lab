import { Link } from 'react-router-dom'
import { Logo } from '@/components/Brand'

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
          {/* The hero is the one place the animated mark earns its keep. */}
          <Logo variant="tile" size="xl" animated className="mb-12" />

          <h1 className="font-serif text-4xl leading-[1.1] text-navy sm:text-6xl lg:text-7xl">
            Stop Doing.
            <br />
            Start Automating.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-navy-700/75 sm:text-lg">
            A membership-first lab for people who would rather build the system
            once than repeat the task forever.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/quiz"
              className="rounded-full bg-navy px-8 py-3.5 font-medium text-cream transition-all duration-150 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-xl hover:shadow-navy/20"
            >
              Find your starting point
            </Link>
            <Link
              to="/brand"
              className="rounded-full border border-navy-300 px-8 py-3.5 font-medium text-navy transition-all duration-150 hover:-translate-y-0.5 hover:border-navy hover:shadow-lg hover:shadow-navy/10"
            >
              See the identity
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
