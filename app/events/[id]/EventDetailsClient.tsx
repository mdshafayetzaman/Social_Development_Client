'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  HeartHandshake,
  Loader2,
  CheckCircle2,
} from 'lucide-react'

import { authClient } from '@/app/lib/auht-client'


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

interface EventDetailsClientProps {
  event: EventItem
  token: string
}

interface ApiResponse {
  success: boolean
  message?: string
  event?: EventItem
}

export default function EventDetailsClient({
  event: initialEvent,
  token,
}: EventDetailsClientProps) {
  const [event, setEvent] = useState(initialEvent)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { data: session, isPending } = authClient.useSession()

  const userEmail = session?.user?.email?.trim().toLowerCase() || ''

  const isJoined =
    !!userEmail &&
    event.joined?.some((user) => user.trim().toLowerCase() === userEmail)

  const handleJoinEvent = async () => {
    if (isPending) return

    if (!session?.user) {
      window.location.href = '/login'
      return
    }

    if (!token) {
      setError('Authentication token not found. Please login again.')
      return
    }

    if (isJoined) {
      setSuccess('You have already joined this event.')
      return
    }

    try {
      setJoining(true)
      setError('')
      setSuccess('')

      const response = await fetch(
        `https://development-social.vercel.app/${event._id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data: ApiResponse = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to join event')
      }

      setSuccess(data.message || 'Successfully joined the event!')

      const eventResponse = await fetch(
        `http://localhost:5002/events/${event._id}`,
        {
          cache: 'no-store',
        },
      )

      const eventData: ApiResponse = await eventResponse.json()

      if (eventResponse.ok && eventData.success && eventData.event) {
        setEvent(eventData.event)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setJoining(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-600"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="h-64 w-full overflow-hidden md:h-96">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                {event.type}
              </span>

              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Users size={16} />
                {event.joined?.length || 0} Participants
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              {event.title}
            </h1>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                <CalendarDays className="text-green-600" size={22} />

                <div>
                  <p className="text-sm text-gray-500">Event Date</p>

                  <p className="font-medium text-gray-800">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                <MapPin className="text-green-600" size={22} />

                <div>
                  <p className="text-sm text-gray-500">Location</p>

                  <p className="font-medium text-gray-800">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="mb-3 text-xl font-bold text-gray-900">
                About This Event
              </h2>

              <p className="whitespace-pre-line leading-7 text-gray-600">
                {event.description}
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
              <div className="mb-5 flex items-center gap-3">
                <HeartHandshake className="text-green-600" size={28} />

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Join This Event
                  </h2>

                  <p className="text-sm text-gray-600">
                    Be a part of this social development activity.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleJoinEvent}
                disabled={joining || isPending || isJoined}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition disabled:cursor-not-allowed ${
                  isJoined
                    ? 'bg-gray-500'
                    : 'bg-green-600 hover:bg-green-700 disabled:opacity-60'
                }`}
              >
                {joining ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Joining...
                  </>
                ) : isJoined ? (
                  <>
                    <CheckCircle2 size={18} />
                    Already Joined
                  </>
                ) : (
                  <>
                    <HeartHandshake size={18} />
                    Join Event
                  </>
                )}
              </button>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              {success && (
                <p className="mt-3 flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle2 size={16} />
                  {success}
                </p>
              )}

              {isJoined && (
                <p className="mt-4 text-sm font-medium text-green-700">
                  You have already joined this event.
                </p>
              )}

              <p className="mt-4 text-sm text-gray-600">
                Total Participants: {event.joined?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
