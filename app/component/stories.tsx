import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const stories = [
  {
    id: '01',
    title: 'Together we grow',
    image:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=90',
    className: 'lg:row-span-2',
  },
  {
    id: '02',
    title: 'Lending a hand',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=90',
    className: '',
  },
  {
    id: '03',
    title: 'Sharing knowledge',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=90',
    className: '',
  },
]

export default function Stories() {
  return (
    <section
      id="stories"
      className="overflow-hidden bg-[#f8f8f2] px-6 py-20 md:px-12 md:py-28 lg:px-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#78952d]">
              MOMENTS THAT MATTER
            </p>

            <h2 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-[#182820] sm:text-5xl md:text-6xl lg:text-7xl">
              Look what we{' '}
              <span className="font-serif font-medium italic text-[#829d2b]">
                did.
              </span>
            </h2>
          </div>

          <div className="flex items-center justify-between gap-6 md:max-w-[290px]">
            <p className="text-sm leading-7 text-[#748078] md:text-base">
              Every photo tells a story of people showing up for one another.
            </p>

         
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`group relative overflow-hidden rounded-xl bg-[#dce2d5] ${story.className} ${
                index === 0
                  ? 'aspect-[1.1/1] sm:row-span-2 lg:aspect-auto lg:h-[455px]'
                  : 'aspect-[1.5/1] lg:h-[328px]'
              }`}
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-white/75">
                    {story.id} — COMMUNITY MOMENTS
                  </p>

                  <h3 className="text-lg font-semibold tracking-wide text-white sm:text-xl">
                    {story.title}
                  </h3>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-[#d6f65c] group-hover:bg-[#d6f65c] group-hover:text-[#173d30]">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[#dce1d6] pt-6">
          <p className="text-xs font-medium tracking-wide text-[#778078]">
            SMALL ACTS. SHARED PURPOSE.
          </p>

          <a
            href="/events"
            className="flex items-center gap-2 text-sm font-semibold text-[#193e30] transition hover:text-[#829d2b]"
          >
            Explore our community
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
