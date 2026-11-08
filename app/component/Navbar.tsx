'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, HeartHandshake, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [{ name: 'Upcoming Events', href: '/events' }]

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-green-800 text-white shadow-lg shadow-green-800/20 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
            <HeartHandshake size={26} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              Kindred<span className="text-green-600">.</span>
            </h1>
            <p className="text-[9px] font-bold tracking-[0.22em] text-gray-400">
              MAKE A DIFFERENCE
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-2 text-sm font-bold text-gray-600 transition hover:text-green-700"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-green-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-gray-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-green-700/20"
          >
            Login
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm transition hover:border-green-200 hover:bg-green-50 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white/95 px-5 py-5 shadow-xl shadow-gray-900/5 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 text-sm font-bold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                {link.name}
                <ArrowUpRight size={17} />
              </Link>
            ))}

            <div className="border-t border-gray-100 pt-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-green-700"
              >
                Login
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
