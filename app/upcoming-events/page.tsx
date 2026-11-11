'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { authClient } from '../lib/auht-client'


interface EventItem {
  _id: string
  title: string
  description: string
  date: string
  location: string
  image: string
  imageUrl?: string
  category: string
  organizer: string
  maxParticipants: number
  joined: string[]
  source: string
}

interface EventsResponse {
  success: boolean
  message?: string
  events?: EventItem[]
}

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    let isMounted = true

    const fetchEvents = async () => {
      if (isPending) return

      if (!session?.user) {
        const callbackUrl = window.location.pathname + window.location.search

        window.location.replace(
          `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        )
        return
      }

      try {
        setLoading(true)
        setError('')

        const { data: tokenData, error: tokenError } = await authClient.token()

        if (tokenError || !tokenData?.token) {
          throw new Error('Authentication token not found. Please login again.')
        }

        const response = await fetch(
          'https://development-social.vercel.app/events/user',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          },
        )

        if (response.status === 401) {
          throw new Error('Your login session is invalid. Please login again.')
        }

        if (!response.ok) {
          throw new Error('Failed to fetch upcoming events.')
        }

        const data: EventsResponse = await response.json()

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch events.')
        }

        if (isMounted) {
          setEvents(Array.isArray(data.events) ? data.events : [])
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Something went wrong.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchEvents()

    return () => {
      isMounted = false
    }
  }, [session, isPending])

  if (isPending || loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium">Loading upcoming events...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Upcoming Events
          </h1>

          <p className="mt-3 text-gray-600">
            Discover events created by our community members.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Total Events: {events.length}
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No upcoming events yet
            </h2>

            <p className="mt-2 text-gray-500">
              Be the first to create a community event.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={event.image || event.imageUrl || ''}
                  alt={event.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {event.category}
                  </span>

                  <h2 className="mt-3 text-xl font-bold text-gray-900">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Date:</strong> {event.date}
                    </p>

                    <p>
                      <strong>Location:</strong> {event.location}
                    </p>

                    <p>
                      <strong>Organizer:</strong> {event.organizer}
                    </p>

                    <p>
                      <strong>Participants:</strong> {event.joined?.length || 0}
                      /{event.maxParticipants}
                    </p>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-6 block rounded-lg bg-green-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-green-700"
                  >
                    View Details
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
