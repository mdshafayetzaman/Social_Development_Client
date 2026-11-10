'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium">Loading community events...</p>
      </div>
    )
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            All Community Events
          </h1>

          <p className="mt-3 text-gray-600">
            Discover all community events and make a difference together.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Total Events: {events.length}
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              No events available
            </h2>

            <p className="mt-2 text-gray-500">
              There are no community events right now.
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
                  src={event.image || event.imageUrl}
                  alt={event.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {event.category}
                    </span>

                    <span className="text-xs text-gray-500">
                      {event.source === 'user'
                        ? 'Community Event'
                        : 'Kindred Event'}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">
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
