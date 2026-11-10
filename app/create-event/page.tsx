'use client'

import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Image,
  Sparkles,
  Leaf,
  Users,
  GraduationCap,
  HeartPulse,
  Gift,
  Loader2,
  CheckCircle2,
  Type,
  AlignLeft,
} from 'lucide-react'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const categories = [
  { name: 'Cleanup', icon: Leaf },
  { name: 'Plantation', icon: Leaf },
  { name: 'Donation', icon: Gift },
  { name: 'Education', icon: GraduationCap },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Community', icon: Users },
  { name: 'Other', icon: Sparkles },
]

interface CurrentUser {
  email?: string
  name?: string
}

interface CreateEventResponse {
  success: boolean
  message?: string
  event?: {
    _id: string
  }
}

export default function CreateEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [minDate, setMinDate] = useState('')

  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const day = String(tomorrow.getDate()).padStart(2, '0')

    setMinDate(`${year}-${month}-${day}`)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isSubmitting) return

    const form = e.currentTarget

    const savedUser = localStorage.getItem('kindred-user')

    if (!savedUser) {
      toast.error('Please login before creating an event.')
      return
    }

    let currentUser: CurrentUser

    try {
      currentUser = JSON.parse(savedUser) as CurrentUser
    } catch {
      toast.error('Invalid user session. Please login again.')
      return
    }

    const createdBy = currentUser.email?.trim().toLowerCase() || ''

    if (!createdBy) {
      toast.error('User email not found. Please login again.')
      return
    }

    const formData = new FormData(form)

    const eventData = {
      title: String(formData.get('title') || '').trim(),
      description: String(formData.get('description') || '').trim(),
      type: String(formData.get('type') || ''),
      location: String(formData.get('location') || '').trim(),
      date: String(formData.get('date') || '').trim(),
      imageUrl: String(formData.get('imageUrl') || '').trim(),
      createdBy,
      organizer: currentUser.name?.trim() || createdBy,
      maxParticipants: 50,
    }

    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.type ||
      !eventData.location ||
      !eventData.date ||
      !eventData.imageUrl
    ) {
      toast.error('Please fill in all fields.')
      return
    }

    if (minDate && eventData.date < minDate) {
      toast.error('Please select a future date.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:5002/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      const result: CreateEventResponse = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Event creation failed.')
      }

      toast.success('Your event has been published successfully!')

      form.reset()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8f6]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <section className="relative overflow-hidden bg-[#073b2c] px-5 py-20 text-white sm:px-8">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-300/20 bg-green-300/10 px-4 py-2 text-xs font-bold tracking-widest text-green-200">
              <Sparkles size={15} />
              MAKE SOMETHING MEANINGFUL
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Good things start with{' '}
              <span className="text-green-300">you.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-green-100/75 sm:text-lg">
              Bring your community together and create an event that makes a
              real difference.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-green-100/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-green-300" />
              Easy event creation
            </div>

            <div className="flex items-center gap-2">
              <Users size={17} className="text-green-300" />
              Community focused
            </div>

            <div className="flex items-center gap-2">
              <HeartPulse size={17} className="text-green-300" />
              Make an impact
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-5xl px-4 pb-20 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_20px_70px_-25px_rgba(0,0,0,0.18)]">
          <div className="border-b border-gray-100 px-6 py-7 sm:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <CalendarDays size={27} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700">
                  EVENT CREATION
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                  Create your event
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Share your idea and bring people together.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-9 p-6 sm:p-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Type size={18} className="text-green-700" />
                <label className="text-sm font-bold text-gray-800">
                  Event title
                </label>
                <span className="text-red-500">*</span>
              </div>

              <input
                name="title"
                type="text"
                placeholder="e.g. Clean Our City Together"
                maxLength={100}
                required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              />

              <p className="text-xs text-gray-400">
                Give your event a clear and attractive title.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-green-700" />
                <label className="text-sm font-bold text-gray-800">
                  Choose event category
                </label>
                <span className="text-red-500">*</span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categories.map((category) => {
                  const Icon = category.icon

                  return (
                    <label key={category.name} className="cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={category.name}
                        required
                        className="peer sr-only"
                      />

                      <div className="flex min-h-16 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-4 transition hover:border-green-400 hover:bg-green-50/50 peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:ring-2 peer-checked:ring-green-600/10">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                          <Icon size={19} />
                        </div>

                        <span className="text-sm font-bold text-gray-700">
                          {category.name}
                        </span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlignLeft size={18} className="text-green-700" />
                <label className="text-sm font-bold text-gray-800">
                  Event description
                </label>
                <span className="text-red-500">*</span>
              </div>

              <textarea
                name="description"
                rows={5}
                maxLength={1500}
                placeholder="Tell people what your event is about, what you are planning, and how they can participate..."
                required
                className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              />

              <p className="text-xs text-gray-400">
                Explain the purpose and activities of your event.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image size={18} className="text-green-700" />
                <label className="text-sm font-bold text-gray-800">
                  Event image URL
                </label>
                <span className="text-red-500">*</span>
              </div>

              <input
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                required
                className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
              />

              <p className="text-xs text-gray-400">
                Add a valid image URL for your event.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-green-700" />
                  <label className="text-sm font-bold text-gray-800">
                    Event location
                  </label>
                  <span className="text-red-500">*</span>
                </div>

                <input
                  name="location"
                  type="text"
                  placeholder="Dhaka, Bangladesh"
                  maxLength={150}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-green-700" />
                  <label className="text-sm font-bold text-gray-800">
                    Event date
                  </label>
                  <span className="text-red-500">*</span>
                </div>

                <input
                  name="date"
                  type="date"
                  min={minDate}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-5 py-4 text-sm text-gray-700 outline-none transition hover:border-gray-300 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-7">
              <div className="mb-7 rounded-2xl bg-[#f0f8f2] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-700">
                    <HeartPulse size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-800">
                      Make a positive impact
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      By publishing this event, you are helping create a
                      stronger and more connected community.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-700 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto sm:min-w-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish Event
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

              <p className="mt-4 text-xs text-gray-400">
                Please review your information before publishing.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
