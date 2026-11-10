'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  CalendarDays,
  MapPin,
  Users,
  UserRound,
  X,
  ArrowUpRight,
  Loader2,
} from 'lucide-react'
import { authClient } from '../lib/auht-client'

interface EventItem {
  _id: string
  title: string
  description: string
  date: string
  location: string
  image: string
  category: string
  imageUrl?: string
  organizer: string
  maxParticipants: number
  joined: string[]
  source: string
  createdAt?: string
}

export default function EventsPage() {
  const { data: session, isPending } = authClient.useSession()

  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const isLoggedIn = !!session?.user

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError('')

        const response = await fetch('http://localhost:5002/events', {
          method: 'GET',
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error('Failed to fetch community events.')
        }

        const data = await response.json()

        setEvents(Array.isArray(data.events) ? data.events : [])
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Something went wrong.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const getTimestamp = (event: EventItem) => {
        if (event.createdAt) {
          return new Date(event.createdAt).getTime()
        }

        return parseInt(event._id.substring(0, 8), 16) * 1000
      }

      return getTimestamp(b) - getTimestamp(a)
    })
  }, [events])

  const filteredEvents = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    if (!searchValue) return sortedEvents

    return sortedEvents.filter((event) => {
      return (
        event.title?.toLowerCase().includes(searchValue) ||
        event.category?.toLowerCase().includes(searchValue) ||
        event.location?.toLowerCase().includes(searchValue) ||
        event.organizer?.toLowerCase().includes(searchValue) ||
        event.description?.toLowerCase().includes(searchValue)
      )
    })
  }, [search, sortedEvents])

  if (loading || isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-green-600" />
          <p className="mt-4 font-medium text-gray-600">
            Loading community events...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-widest text-green-600">
            Make a Difference
          </span>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            All Community Events
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Discover all community events and make a difference together. Join
            hands, connect with people, and create positive change.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl border bg-white px-5 py-3">
              <p className="text-sm text-gray-500">Total Events</p>
              <p className="text-2xl font-bold text-green-600">
                {events.length}
              </p>
            </div>

            <div className="rounded-xl border bg-white px-5 py-3">
              <p className="text-sm text-gray-500">Search Results</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredEvents.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events by title, category, location or organizer..."
              className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Explore Events</h2>
            <p className="mt-1 text-sm text-gray-500">
              Recently created events appear first.
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {filteredEvents.length} Events
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-300" />

            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {search ? 'No matching events found' : 'No events available'}
            </h2>

            <p className="mt-2 text-gray-500">
              {search
                ? 'Try searching with a different keyword.'
                : 'There are no community events right now.'}
            </p>

            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-5 rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.image || event.imageUrl || '/placeholder.jpg'}
                    alt={event.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {index === 0 && (
                    <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1.5 text-xs font-bold text-white shadow">
                      LATEST EVENT
                    </span>
                  )}

                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700">
                    {event.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-green-700">
                      {event.source === 'user'
                        ? 'Community Event'
                        : 'Kindred Event'}
                    </span>

                    <span className="text-xs text-gray-400">
                      {event.joined?.length || 0} Joined
                    </span>
                  </div>

                  <h2 className="line-clamp-1 text-xl font-bold text-gray-900 transition group-hover:text-green-700">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 min-h-[60px] text-sm leading-6 text-gray-600">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 shrink-0 text-green-600" />
                      {event.date}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="line-clamp-1">{event.organizer}</span>
                    </p>

                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 shrink-0 text-green-600" />
                      Participants: {event.joined?.length || 0}/
                      {event.maxParticipants}
                    </p>
                  </div>

                  <Link
                    href={
                      isLoggedIn
                        ? `/events/${event._id}`
                        : `/login?callbackUrl=${encodeURIComponent(`/events/${event._id}`)}`
                    }
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    View Details
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
