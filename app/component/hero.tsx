import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Play, Heart, ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#123f32] text-white">
      <div className="absolute -right-20 -top-40 h-[450px] w-[450px] rounded-full border border-white/10" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:py-16 md:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#d7f45b]" />
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#d7f45b]">
              GOOD THINGS HAPPEN TOGETHER
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Be the reason
            <br />
            someone{' '}
            <span className="font-serif italic text-[#d7f45b]">smiles.</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base">
            Real change begins when ordinary people come together. Find your
            people, show up, and make a difference that lasts.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link
              href="/events"
              className="flex items-center gap-2 rounded-lg bg-[#d7f45b] px-5 py-3 text-sm font-bold text-[#173f32] transition hover:bg-[#e4ff70]"
            >
              Explore events
              <ArrowUpRight size={18} />
            </Link>

            <Link
              href="/create-event"
              className="group flex items-center gap-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition group-hover:bg-[#d7f45b] group-hover:text-[#173f32]">
                <Play size={13} fill="currentColor" />
              </span>
              <span className="text-xs font-bold">Start something good</span>
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <div className="flex -space-x-3">
              {['A', 'S', 'R', 'M'].map((item) => (
                <div
                  key={item}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#123f32] bg-gray-200 text-xs font-bold text-[#173f32]"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="text-xs text-white/70">
              <span className="font-extrabold text-white">2,400+</span> people
              making change
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[480px]">
          <div className="relative h-[300px] overflow-hidden rounded-t-[48%] rounded-b-lg sm:h-[380px] lg:h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=85"
              alt="Volunteers working together"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -right-2 top-5 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full border border-[#d7f45b] text-center text-[9px] font-bold tracking-widest text-[#d7f45b] sm:-right-5 sm:h-24 sm:w-24">
            MAKE
            <br />
            IT
            <br />
            <span className="font-serif text-base italic">MATTER</span>
          </div>

          <div className="absolute -bottom-5 left-2 flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-gray-900 shadow-xl sm:-left-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f7d9] text-[#88a51c]">
              <Heart size={19} fill="currentColor" />
            </div>

            <div>
              <h3 className="text-xs font-extrabold">
                Goodness is contagious.
              </h3>
              <p className="mt-1 text-[10px] text-gray-500">
                Pass it on today.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 text-[9px] font-semibold tracking-[0.15em] text-white/50">
          <span>01 — PEOPLE POWER</span>
          <span className="flex items-center gap-2">
            SCROLL TO DISCOVER <ArrowDown size={12} />
          </span>
          <span>EST. FOR GOOD · 2026</span>
        </div>
      </div>
    </section>
  )
}
