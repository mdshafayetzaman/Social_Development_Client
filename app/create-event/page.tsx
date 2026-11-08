'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
} from 'lucide-react'
import { EventItem, getEvents, saveEvents } from '@/lib/events'
export default function CreateEvent() {
  const router = useRouter()
  const [error, setError] = useState('')
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('kindred-user') || 'null')
    if (!user) {
      router.push('/login')
      return
    }
    const data = new FormData(e.currentTarget)
    const date = String(data.get('date'))
    if (date <= new Date().toISOString().slice(0, 10)) {
      setError('Please choose a future date.')
      return
    }
    const event: EventItem = {
      id: crypto.randomUUID(),
      title: String(data.get('title')),
      description: String(data.get('description')),
      type: String(data.get('type')),
      image: String(data.get('image')),
      location: String(data.get('location')),
      date,
      organizer: user.name,
      email: user.email,
      joined: [],
    }
    saveEvents([event, ...getEvents()])
    alert('Your event has been created!')
    router.push('/events')
  }
  return (
    <section className="container form-page">
      <Link href="/events" className="back-link">
        <ArrowLeft size={16} /> Back to events
      </Link>
      <div className="form-heading">
        <div className="section-kicker">BRING PEOPLE TOGETHER</div>
        <h1>
          Start something <em>good.</em>
        </h1>
        <p>Every meaningful change starts with someone like you.</p>
      </div>
      <form className="event-form" onSubmit={submit}>
        <div className="form-two">
          <div>
            <label>Event title</label>
            <input name="title" placeholder="Give your event a name" required />
          </div>
          <div>
            <label>Event type</label>
            <select name="type" required>
              <option value="">Choose a cause</option>
              {[
                'Cleanup',
                'Plantation',
                'Donation',
                'Education',
                'Healthcare',
                'Community',
                'Other',
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>
        <label>What is this event about?</label>
        <textarea
          name="description"
          rows={5}
          placeholder="Tell people what you'll do and how they can help..."
          required
        />
        <label>Thumbnail image URL</label>
        <div className="input-icon">
          <ImageIcon />
          <input
            type="url"
            name="image"
            placeholder="https://your-image-url.com/photo.jpg"
            required
          />
        </div>
        <div className="form-two">
          <div>
            <label>Location</label>
            <div className="input-icon">
              <MapPin />
              <input
                name="location"
                placeholder="Where will it happen?"
                required
              />
            </div>
          </div>
          <div>
            <label>Event date</label>
            <div className="input-icon">
              <CalendarDays />
              <input
                type="date"
                name="date"
                min={new Date().toISOString().slice(0, 10)}
                required
              />
            </div>
          </div>
        </div>
        {error && <p className="form-error">{error}</p>}
        <button className="btn btn-primary form-submit">
          Publish event <ArrowLeft className="rotate-icon" size={17} />
        </button>
      </form>
    </section>
  )
}
