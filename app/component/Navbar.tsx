
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Menu,
  X,
  HeartHandshake,
  ArrowUpRight,
  ChevronDown,
  UserRound,
  CalendarPlus,
  CalendarCog,
  CalendarCheck,
  LogOut,
  Loader2,
} from 'lucide-react'
import { authClient } from '../lib/auht-client'


export default function Navbar() {
  const router = useRouter()

  const { data: session, isPending } = authClient.useSession()

  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const user = session?.user

  const navLinks = [
    { name: 'Upcoming Events', href: '/events' },
  ]

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      await authClient.signOut()

      setIsProfileOpen(false)
      setIsOpen(false)

      router.replace('/')
      router.refresh()
    } catch {
      setIsLoggingOut(false)
    }
  }

  const closeMenus = () => {
    setIsOpen(false)
    setIsProfileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/90 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        <Link
          href="/"
          onClick={closeMenus}
          className="group flex items-center gap-3"
        >
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

        <div className="hidden items-center gap-4 md:flex">

          {isPending ? (
            <Loader2 className="animate-spin text-green-700" size={23} />
          ) : user ? (

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-3 transition hover:border-green-300 hover:shadow-md"
                aria-expanded={isProfileOpen}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || 'Profile'}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full border border-green-100 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-bold text-gray-800">
                  {user.name || 'My Account'}
                </span>

                <ChevronDown
                  size={17}
                  className={`text-gray-500 transition-transform ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl shadow-gray-900/10">

                  <div className="border-b border-gray-100 px-3 py-3">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-1 py-2">

                 

                    <Link
                      href="/events/create"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      <CalendarPlus size={18} />
                      Create Event
                    </Link>

                    <Link
                      href="/my-events"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      <CalendarCog size={18} />
                      Manage Events
                    </Link>

                    <Link
                      href="/joined-events"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      <CalendarCheck size={18} />
                      Joined Events
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <LogOut size={18} />
                      )}

                      {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                </div>
              )}
            </div>

          ) : (
            <Link
              href="/login"
              className="group flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-green-700"
            >
              Login
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm transition hover:border-green-200 hover:bg-green-50 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className="flex items-center justify-between rounded-xl px-4 py-4 text-sm font-bold text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                {link.name}
                <ArrowUpRight size={17} />
              </Link>
            ))}

            {!isPending && user ? (
              <>
                <div className="my-2 border-t border-gray-100" />

                <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'Profile'}
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-200 font-bold text-green-800">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-green-50"
                >
                  <UserRound size={19} />
                  My Profile
                </Link>

                <Link
                  href="/events/create"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-green-50"
                >
                  <CalendarPlus size={19} />
                  Create Event
                </Link>

                <Link
                  href="/my-events"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-green-50"
                >
                  <CalendarCog size={19} />
                  Manage Events
                </Link>

                <Link
                  href="/joined-events"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-green-50"
                >
                  <CalendarCheck size={19} />
                  Joined Events
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : !isPending ? (
              <Link
                href="/login"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-green-700"
              >
                Login
                <ArrowUpRight size={17} />
              </Link>
            ) : (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-green-700" />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

