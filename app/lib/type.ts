export type EventItem = {
  title: string
  description: string
  type: string
  location: string
  date: string
  joined?: string[]
}
export function getEvents(): EventItem[] {
  if (typeof window === 'undefined') return []

  try {
    const saved = JSON.parse(localStorage.getItem('kindred-events') || '[]')

    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function saveEvents(items: EventItem[]) {
  localStorage.setItem('kindred-events', JSON.stringify(items))
}
