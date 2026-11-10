'use client'

import {
  Suspense,
  useEffect,
  useState,
  type FormEvent,
  type ChangeEvent,
} from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Type,
  FileText,
  Save,
  Loader2,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
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

interface EventForm {
  title: string
  description: string
  type: string
  location: string
  date: string
  imageUrl: string
}

function EditEventContent() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params.id

  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    type: '',
    location: '',
    date: '',
    imageUrl: '',
  })

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!id) return

    const controller = new AbortController()

    async function fetchEvent() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`http://localhost:5002/events/${id}`, {
          cache: 'no-store',
          signal: controller.signal,
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to load event.')
        }

        const event = result.event as EventItem

        setForm({
          title: event.title || '',
          description: event.description || '',
          type: event.type || '',
          location: event.location || '',
          date: event.date ? event.date.slice(0, 10) : '',
          imageUrl: event.imageUrl || '',
        })
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return

        setError(err instanceof Error ? err.message : 'Something went wrong.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchEvent()

    return () => controller.abort()
  }, [id])

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.type ||
      !form.location.trim() ||
      !form.date ||
      !form.imageUrl.trim()
    ) {
      setError('Please fill in all required fields.')
      return
    }

    setUpdating(true)

    try {
      const response = await fetch(`http://localhost:5002/update-event/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          type: form.type,
          location: form.location.trim(),
          date: form.date,
          imageUrl: form.imageUrl.trim(),
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update event.')
      }

      setSuccess('Your event has been updated successfully!')

      setTimeout(() => {
        router.push('/manage-events')
        router.refresh()
      }, 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update event.')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf8]">
        <div className="text-center">
          <Loader2 size={42} className="mx-auto animate-spin text-green-700" />
          <p className="mt-4 font-semibold text-gray-600">
            Loading event information...
          </p>
        </div>
      </main>
    )
  }

  if (error && !form.title) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-5">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <AlertCircle size={45} className="mx-auto text-red-500" />

          <h2 className="mt-5 text-2xl font-black text-gray-900">
            Unable to Load Event
          </h2>

          <p className="mt-3 text-sm leading-7 text-red-500">{error}</p>

          <Link
            href="/manage-events"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
          >
            <ArrowLeft size={17} />
            Back to My Events
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <section className="relative overflow-hidden bg-[#073b2c]">
        <div className="absolute -right-32 -top-40 h-[400px] w-[400px] rounded-full bg-green-400/20 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <Link
            href="/manage-events"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <ArrowLeft size={17} />
            Back to My Events
          </Link>

          <div className="mt-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-300/20 bg-green-300/10 px-4 py-2 text-xs font-bold tracking-widest text-green-200">
              <HeartHandshake size={15} />
              MANAGE YOUR COMMUNITY
            </div>

            <h1 className="mt-6 text-4xl font-black text-white sm:text-6xl">
              Edit your
              <span className="text-green-300"> event.</span>
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-green-100/75">
              Update your event information and keep your community informed.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl font-black text-gray-900">
              Event Information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Update the information below and save your changes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-600">
                <AlertCircle size={19} className="shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4 text-sm font-semibold text-green-700">
                <CheckCircle2 size={20} />
                {success}
              </div>
            )}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                <Type size={17} className="text-green-700" />
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                <FileText size={17} className="text-green-700" />
                Event Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Event Category
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Community">Community</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                  <option value="Health">Health</option>
                  <option value="Charity">Charity</option>
                  <option value="Social">Social</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                  <CalendarDays size={17} className="text-green-700" />
                  Event Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                <MapPin size={17} className="text-green-700" />
                Event Location
              </label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter event location"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                <ImageIcon size={17} className="text-green-700" />
                Event Image URL
              </label>

              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-800 outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100"
              />
            </div>

            {form.imageUrl && (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                <p className="px-4 py-3 text-sm font-bold text-gray-600">
                  Image Preview
                </p>

                <img
                  src={form.imageUrl}
                  alt="Event preview"
                  className="h-64 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = 'block'
                  }}
                />
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:justify-end">
              <Link
                href="/manage-events"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-7 py-4 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={updating}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updating ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Updating Event...
                  </>
                ) : (
                  <>
                    <Save size={19} />
                    Update Event
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default function EditEvent() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7faf8]">
          <div className="text-center">
            <Loader2
              size={42}
              className="mx-auto animate-spin text-green-700"
            />
            <p className="mt-4 font-semibold text-gray-600">
              Loading event information...
            </p>
          </div>
        </main>
      }
    >
      <EditEventContent />
    </Suspense>
  )
}
