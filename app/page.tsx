import About from './component/about'
import Hero from './component/hero'
import Stories from './component/stories'
import WhyKindred from './component/whyKindred'
import EventDetailsPage from './events/[id]/page'
import EventsPage from './events/page'
import UpcomingEventsPage from './upcoming-events/page'

const HomePage = () => {
  return (
    <div>
      <Hero></Hero>
      <About></About>
      <EventsPage></EventsPage>

      <WhyKindred></WhyKindred>
      <Stories></Stories>
    </div>
  )
}

export default HomePage
