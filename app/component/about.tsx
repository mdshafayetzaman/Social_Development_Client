import Link from 'next/link'
import { ArrowUpRight, CalendarDays, Clock3, Users, MapPin } from 'lucide-react'

const stats = [
  { number: '120+', label: 'Community Events', icon: CalendarDays },
  { number: '2.4k', label: 'Active Volunteers', icon: Users },
  { number: '18', label: 'Local Communities', icon: MapPin },
  { number: '8.6k', label: 'Hours of Good', icon: Clock3 },
]

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#fbfcf8] px-5 py-12 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-7 md:grid-cols-2 md:gap-12">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="h-[2px] w-7 bg-[#8cae32]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78932c]">
                A little about us
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-[1.12] tracking-tight text-[#17251e] sm:text-4xl lg:text-5xl">
              Good is not a
              <br />
              spectator sport
              <span className="text-[#9dbb38]">.</span>
            </h2>
          </div>

          <div>
            <p className="max-w-lg text-sm leading-7 text-[#718078] sm:text-base">
              Kindred is where people who care find the people who do. From
              planting trees to sharing skills, we make it easy to turn good
              intentions into real-world impact.
            </p>

         
          </div>
        </div>

        <div className="mt-10 border-t border-[#e3e9dc] pt-7 sm:mt-12">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="rounded-xl p-3 transition hover:bg-white hover:shadow-sm sm:p-4"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#eff4e4] text-[#78932c]">
                    <Icon size={16} />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-[#17251e] sm:text-3xl">
                    {stat.number}
                  </h3>

                  <p className="mt-1 text-xs text-[#849087]">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
