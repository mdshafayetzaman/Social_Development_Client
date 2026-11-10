'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Plus,
  CalendarDays,
  MapPin,
  Trash2,
  Pencil,
  Loader2,
  RefreshCw,
  HeartHandshake,
  X,
  AlertTriangle,
} from 'lucide-react'

interface EventItem {
  _id: string
  title: string
  description: string
  type: string
  location: string
  date: string
  imageUrl: string
  joined: string[]
  createdBy: string
}

interface CurrentUser {
  email?: string
  name?: string
}

interface EventsResponse {
  success: boolean
  message?: string
  events: EventItem[]
}

interface DeleteResponse {
  success: boolean
  message?: string
}

export default function ManageEvents() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('kindred-user')

      if (savedUser) {
        setUser(JSON.parse(savedUser) as CurrentUser)
      } else {
        setError('Please login to manage your events.')
        setLoading(false)
      }
    } catch {
      setError('Invalid user session. Please login again.')
      setLoading(false)
    }
  }, [])

  const fetchEvents = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5002/events', {
        cache: 'no-store',
      })

      const result: EventsResponse = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to load events.')
      }

      const currentUser = user.email || user.name || ''

      const myEvents = result.events.filter(
        (event) => event.createdBy === currentUser,
      )

      setEvents(myEvents)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchEvents()
    }
  }, [user, fetchEvents])

  function handleDelete(event: EventItem) {
    setSelectedEvent(event)
    setShowDeleteModal(true)
  }

  async function confirmDelete() {
    if (!selectedEvent || deletingId) return

    const id = selectedEvent._id

    setDeletingId(id)
    setError('')

    try {
      const response = await fetch(`http://localhost:5002/delete-event/${id}`, {
        method: 'DELETE',
      })

      const result: DeleteResponse = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete event.')
      }

      setEvents((previous) => previous.filter((event) => event._id !== id))

      setShowDeleteModal(false)
      setSelectedEvent(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event.')
    } finally {
      setDeletingId('')
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf8]">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-green-700" size={40} />
          <p className="mt-4 font-semibold text-gray-600">
            Loading your events...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <section className="relative overflow-hidden bg-[#073b2c]">
        <div className="absolute -right-32 -top-40 h-[400px] w-[400px] rounded-full bg-green-400/20 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <ArrowLeft size={17} />
            Back to events
          </Link>

          <div className="mt-12 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-300/20 bg-green-300/10 px-4 py-2 text-xs font-bold tracking-widest text-green-200">
                <HeartHandshake size={15} />
                YOUR COMMUNITY IMPACT
              </div>

              <h1 className="mt-6 text-4xl font-black text-white sm:text-6xl">
                Manage your
                <span className="text-green-300"> events.</span>
              </h1>

              <p className="mt-4 max-w-xl leading-7 text-green-100/75">
                Manage, update and organize the events you have created.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-green-400"
            >
              <Plus size={20} />
              Create new event
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900">My events</h2>

            <p className="mt-2 text-sm text-gray-500">
              {events.length} {events.length === 1 ? 'event' : 'events'} created
            </p>
          </div>

          <button
            onClick={fetchEvents}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-green-500 hover:text-green-700"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-7 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-700">
              <CalendarDays size={36} />
            </div>

            <h3 className="mt-7 text-2xl font-black text-gray-900">
              No events yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
              You haven't created any events yet. Start something meaningful and
              bring your community together.
            </p>

            <Link
              href="/create-event"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-800"
            >
              <Plus size={19} />
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-green-700 shadow-sm">
                    {event.type}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="line-clamp-1 text-xl font-black text-gray-900">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-500">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays size={17} className="text-green-700" />
                      {event.date}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={17} className="text-green-700" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <HeartHandshake size={17} className="text-green-700" />
                      {event.joined?.length || 0} people joined
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Link
                      href={`/edit-event/${event._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-3 text-sm font-bold text-green-700 transition hover:bg-green-100"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(event)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
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
      </section>

      {showDeleteModal && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!deletingId) {
              setShowDeleteModal(false)
              setSelectedEvent(null)
            }
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md animate-in zoom-in-95 rounded-3xl bg-white p-7 shadow-2xl duration-200"
          >
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedEvent(null)
                }}
                disabled={!!deletingId}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={30} />
            </div>

            <div className="mt-5 text-center">
              <h2 className="text-2xl font-black text-gray-900">
                Delete Event?
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Are you sure you want to delete this event? This action cannot
                be undone.
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Event name
              </p>

              <p className="mt-2 font-bold text-gray-800">
                {selectedEvent.title}
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedEvent(null)
                }}
                disabled={!!deletingId}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deletingId ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Yes, Delete
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
