'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
  HeartHandshake,
  Loader2,
} from 'lucide-react'
import { authClient } from '../lib/auht-client'

interface EventItem {
  _id: string
  title: string
  description: string
  type: string
  location: string
  date: string
  imageUrl: string
  createdBy: string
  joined: string[]
}

interface JoinedEventsResponse {
  success: boolean
  message?: string
  events?: EventItem[]
}

export default function JoinEvent() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchJoinedEvents = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const { data: tokenData, error: tokenError } = await authClient.token()

      if (tokenError || !tokenData?.token) {
        throw new Error('Please login again.')
      }

      const response = await fetch(
        'https://development-social.vercel.app/joined-events',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        },
      )

      const data: JoinedEventsResponse = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch joined events.')
      }

      setEvents(Array.isArray(data.events) ? data.events : [])
    } catch (error) {
      setEvents([])
      setError(error instanceof Error ? error.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isPending) return

    if (!session?.user) {
      router.replace('/login?callbackUrl=/joined-events')
      return
    }

    fetchJoinedEvents()
  }, [isPending, session, router, fetchJoinedEvents])

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#83a32d]" />
          <p className="mt-4 font-medium text-gray-600">
            Loading your joined events...
          </p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <section className="min-h-screen bg-[#f8faf6] py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#edf3df] px-5 py-2 text-sm font-bold text-[#718d2b]">
            <HeartHandshake size={18} />
            YOUR COMMUNITY JOURNEY
          </span>

          <h1 className="mb-4 text-3xl font-bold text-[#19251f] md:text-5xl">
            Joined Events
          </h1>

          <p className="mx-auto max-w-xl text-base leading-7 text-[#718078]">
            Explore all the community events you have joined and continue making
            a difference.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#19251f]">
              Your Joined Events
            </h2>

            <p className="mt-2 text-sm text-[#819087]">
              Events you have successfully joined.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-[#edf3df] px-5 py-3 text-sm font-bold text-[#718d2b]">
            <Users size={19} />
            {events.length} Events Joined
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            <p>{error}</p>

            <button
              onClick={fetchJoinedEvents}
              className="mt-3 font-bold underline"
            >
              Try Again
            </button>
          </div>
        )}

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-[#e7ebe4] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden bg-[#e7ece6]">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <HeartHandshake size={45} className="text-[#83a32d]" />
                    </div>
                  )}

                  <span className="absolute left-5 top-5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#58731e]">
                    {event.type}
                  </span>

                  <span className="absolute right-5 top-5 rounded-lg bg-[#83a32d] px-4 py-2 text-xs font-bold text-white">
                    Joined
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-[#819b32]">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={17} />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        timeZone: 'UTC',
                      })}
                    </span>

                    <span className="flex items-center gap-2 text-[#819087]">
                      <MapPin size={17} />
                      {event.location}
                    </span>
                  </div>

                  <h3 className="mb-3 line-clamp-2 text-xl font-bold text-[#19251f]">
                    {event.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-7 text-[#718078]">
                    {event.description}
                  </p>

                  <div className="mb-5 flex items-center justify-between border-t border-[#e7ebe4] pt-5 text-sm text-[#819087]">
                    <span className="flex items-center gap-2">
                      <Users size={17} />
                      {event.joined?.length ?? 0} Participants
                    </span>

                    <span className="font-semibold text-[#83a32d]">
                      Successfully Joined
                    </span>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#83a32d] px-5 py-4 font-bold text-white transition hover:bg-[#6e8927]"
                  >
                    View Event
                    <ArrowRight size={19} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#dce2d9] bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3df]">
              <HeartHandshake size={32} className="text-[#83a32d]" />
            </div>

            <h3 className="mb-3 text-2xl font-bold text-[#19251f]">
              No Joined Events Found
            </h3>

            <p className="mx-auto mb-7 max-w-md text-sm leading-7 text-[#819087]">
              You have not joined any events yet. Explore community events and
              become part of something meaningful.
            </p>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-xl bg-[#83a32d] px-7 py-4 font-bold text-white transition hover:bg-[#6e8927]"
            >
              Explore Events
              <ArrowRight size={19} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
