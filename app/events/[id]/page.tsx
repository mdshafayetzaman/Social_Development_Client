import { Suspense } from 'react'
import { headers } from 'next/headers'
import { auth } from '@/app/lib/auth'
import EventDetailsClient from './EventDetailsClient'

interface PageProps {
  params: Promise<{ id: string }>
}

async function EventDetailsContent({ params }: PageProps) {
  const { id } = await params

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })

  const token = jwtToken?.token

  if (!token) {
    return <div className="p-10 text-center">Please login first.</div>
  }

  const response = await fetch(`http://localhost:5002/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    return (
      <div className="p-10 text-center text-red-500">Failed to load event.</div>
    )
  }

  const data = await response.json()

  if (!data.success || !data.event) {
    return <div className="p-10 text-center text-red-500">Event not found.</div>
  }

  return <EventDetailsClient event={data.event} token={token} />
}

export default function EventDetailsPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading event details...
        </div>
      }
    >
      <EventDetailsContent params={params} />
    </Suspense>
  )
}
