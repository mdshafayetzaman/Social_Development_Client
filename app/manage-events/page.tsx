'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CalendarDays,
  MapPin,
  Users,
  Pencil,
  Trash2,
  Loader2,
  Plus,
  RefreshCw,
  AlertCircle,
  X,
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Event {
  _id: string
  title: string
  description?: string
  image?: string
  imageUrl?: string
  location?: string
  date?: string
  time?: string
  category?: string
  attendees?: string[]
  createdBy?: string
}

export default function ManageEventsPage() {
  const router = useRouter()

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [error, setError] = useState('')

  const getToken = async (): Promise<string> => {
    const response = await fetch('/api/auth/token', {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error('Authentication token পাওয়া যায়নি')
    }

    const data = await response.json()

    if (!data.token) {
      throw new Error('Please login again')
    }

    return data.token
  }

  const fetchEvents = useCallback(async () => {
    const controller = new AbortController()

    try {
      setLoading(true)
      setError('')

      const token = await getToken()

      const response = await fetch(
        'https://development-social.vercel.app/events/user',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
          signal: controller.signal,
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Events load করা যায়নি')
      }

      setEvents(Array.isArray(data) ? data : data.events || [])
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }

    return () => controller.abort()
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const confirmDelete = async () => {
    if (!selectedEvent?._id) return

    try {
      setDeleting(true)

      const token = await getToken()

      const response = await fetch(
        `http://localhost:5002/delete-event/${selectedEvent._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Event delete করা যায়নি')
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== selectedEvent._id),
      )

      toast.success('Event successfully deleted')
      setSelectedEvent(null)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Something went wrong',
      )
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (date?: string) => {
    if (!date) return 'Date not specified'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return date
    }

    return parsedDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
          <p className="text-sm text-gray-500">Loading your events...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage, edit and delete your created events.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchEvents}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <Link
              href="/create-event"
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Plus size={18} />
              Create Event
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={20} />
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchEvents}
              className="ml-auto text-sm font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Created Events</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            {events.length}
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <CalendarDays className="mx-auto h-14 w-14 text-gray-300" />

            <h2 className="mt-5 text-xl font-semibold text-gray-800">
              No events found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You have not created any events yet.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Plus size={18} />
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-48 bg-gray-100">
                  {event.imageUrl || event.image ? (
                    <img
                      src={event.imageUrl || event.image}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <CalendarDays className="h-14 w-14 text-gray-300" />
                    </div>
                  )}

                  {event.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
                      {event.category}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-gray-900">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-500">
                    {event.description || 'No description available'}
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-emerald-600" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={17} className="text-emerald-600" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Users size={17} className="text-emerald-600" />
                      <span>{event.attendees?.length || 0} Participants</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Link
                      href={`/edit-event/${event._id}`}
                      className="flex items-center justify-center gap-2 rounded-lg border border-emerald-600 px-3 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-100 p-3 text-red-600">
                  <Trash2 size={22} />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Delete Event
                </h2>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                disabled={deleting}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm leading-6 text-gray-600">
              Are you sure you want to delete{' '}
              <strong>{selectedEvent.title}</strong>? This action cannot be
              undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
