import Link from 'next/link'
import { Leaf, Users, HandHeart, ArrowUpRight, Sparkles } from 'lucide-react'

const features = [
  {
    number: '01',
    label: 'DISCOVER',
    title: 'Find a cause you care about.',
    description:
      'Explore meaningful local events that match your interests and values.',
    link: 'Explore causes',
    href: '/events',
    icon: Leaf,
    color: 'bg-[#e0ebdc]',
    iconBg: 'bg-white/80',
  },
  {
    number: '02',
    label: 'CONNECT',
    title: 'Meet your kind of people.',
    description:
      'Build friendships with neighbours who believe in making things better.',
    link: 'Meet the community',
    href: '/events',
    icon: Users,
    color: 'bg-white',
    iconBg: 'bg-[#eff4e8]',
  },
  {
    number: '03',
    label: 'MAKE IMPACT',
    title: 'Turn care into real change.',
    description: 'Show up, lend a hand, and see what a group of people can do.',
    link: 'Host an event',
    href: '/create-event',
    icon: HandHeart,
    color: 'bg-[#f3ebcb]',
    iconBg: 'bg-white/80',
  },
]

export default function WhyKindred() {
  return (
    <section className="bg-[#f8f9f2] px-5 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[2px] w-7 bg-[#91aa36]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#78932c]">
                Why Kindred
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight text-[#192820] sm:text-5xl lg:text-6xl">
              Small steps.{' '}
              <span className="font-serif italic font-medium text-[#8ca52d]">
                Big shifts.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#748078]">
            There are a hundred ways to help.
            <br className="hidden sm:block" />
            We'll help you find the one that feels right.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.number}
                className={`group relative flex min-h-[330px] flex-col overflow-hidden rounded-2xl ${feature.color} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(30,50,35,0.09)] sm:p-8`}
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-[#173f32]/[0.06] transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#173f32]/[0.05] bg-white/80 text-[#204b3b] shadow-sm transition duration-300 group-hover:rotate-[-8deg] group-hover:bg-[#173f32] group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <div className="relative mt-7">
                  <span className="text-[10px] font-bold tracking-[0.17em] text-[#829087]">
                    {feature.number} / {feature.label}
                  </span>

                  <h3 className="mt-3 max-w-[280px] text-2xl font-bold leading-[1.2] tracking-tight text-[#192820] sm:text-[27px]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 max-w-[300px] text-sm leading-7 text-[#68766d]">
                    {feature.description}
                  </p>
                </div>

                <div className="relative mt-auto pt-8">
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-[#20352a] transition-colors hover:text-[#819d2b]"
                  >
                    {feature.link}
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.16em] text-[#8b968d]">
          <Sparkles size={13} className="text-[#91aa36]" />
          GOOD PEOPLE. MEANINGFUL ACTIONS. REAL IMPACT.
        </div>
      </div>
    </section>
  )
}
