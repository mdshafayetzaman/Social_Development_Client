import Link from 'next/link'
import { ArrowUpRight, HeartHandshake, Sparkles } from 'lucide-react'
import { FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#103c30] text-white">
      <section className="border-b border-white/5 bg-[#174638]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-10 lg:px-14 lg:py-14">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d6f65c]">
              A GOOD THING IN YOUR INBOX
            </p>

            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Stay close to
              <br />
              <span className="font-serif font-medium italic text-[#d6f65c]">
                the good.
              </span>
            </h2>

            <p className="mt-4 max-w-sm text-xs leading-6 text-white/65 sm:text-sm">
              Get stories, fresh events and little reminders that your actions
              matter.
            </p>
          </div>

          <div className="relative">
            <Sparkles className="absolute -top-20 right-2 h-16 w-16 text-[#d6f65c]/35" />

            <form className="relative mt-3">
              <label htmlFor="email" className="mb-3 block text-xs font-medium">
                Your email address
              </label>

              <div className="flex items-center gap-3 border-b border-white/35 pb-2">
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="min-w-0 flex-1 bg-transparent py-2 text-base text-white outline-none placeholder:text-white/45"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#d6f65c] text-[#123e31] transition hover:-translate-y-1 hover:bg-white"
                >
                  <ArrowUpRight size={22} />
                </button>
              </div>

              <p className="mt-3 text-[10px] text-white/45">
                No spam. Just good things, every now and then.
              </p>
            </form>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 pt-11 md:px-10 lg:px-14 lg:pt-14">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d6f65c] text-[#123e31]">
                <HeartHandshake size={22} />
              </span>

              <span className="text-2xl font-bold tracking-tight">
                kindred<span className="text-[#d6f65c]">.</span>
              </span>
            </Link>

            <p className="mt-4 text-xs leading-6 text-white/65">
              Small acts. Shared purpose.
              <br />A better world, built together.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold">Explore</h3>

            <ul className="space-y-3 text-xs text-white/65">
              <li>
                <Link
                  href="/events"
                  className="transition hover:text-[#d6f65c]"
                >
                  Upcoming events
                </Link>
              </li>
              <li>
                <Link
                  href="/#impact"
                  className="transition hover:text-[#d6f65c]"
                >
                  Our impact
                </Link>
              </li>
              <li>
                <Link
                  href="/#stories"
                  className="transition hover:text-[#d6f65c]"
                >
                  Community stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold">Get involved</h3>

            <ul className="space-y-3 text-xs text-white/65">
              <li>
                <Link
                  href="/events/create"
                  className="transition hover:text-[#d6f65c]"
                >
                  Host an event
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="transition hover:text-[#d6f65c]"
                >
                  Become a member
                </Link>
              </li>
              <li>
                <Link
                  href="/my-events"
                  className="transition hover:text-[#d6f65c]"
                >
                  Your events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold">Follow the good</h3>

            <div className="flex items-center gap-2">
              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition hover:border-[#d6f65c] hover:bg-[#d6f65c] hover:text-[#103c30]"
              >
                <FaInstagram size={16} />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition hover:border-[#d6f65c] hover:bg-[#d6f65c] hover:text-[#103c30]"
              >
                <FaLinkedinIn size={16} />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition hover:border-[#d6f65c] hover:bg-[#d6f65c] hover:text-[#103c30]"
              >
                <FaGithub size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-11 flex flex-col justify-between gap-3 border-t border-white/15 py-5 text-[10px] text-white/45 sm:flex-row sm:items-center">
          <p>© 2026 Kindred Community. Made for meaningful change.</p>

          <p>
            Built with care <span className="text-[#d6f65c]">♥</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
