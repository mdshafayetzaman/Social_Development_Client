'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { Button, Input, Card, CardBody } from '@heroui/react'
import {
  HeartHandshake,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
  Sparkles,
} from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    try {
      const users = JSON.parse(localStorage.getItem('kindred-users') || '[]')

      const user = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password,
      )

      if (!user) {
        setError('Incorrect email or password. Please try again.')
        return
      }

      localStorage.setItem('kindred-user', JSON.stringify(user))
      window.dispatchEvent(new Event('kindred-auth'))
      window.location.href = '/events'
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1400&q=90"
          alt="Community volunteers working together"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#092b21] via-[#103c30]/65 to-[#103c30]/20" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between p-12 xl:p-16">
          <Link href="/" className="flex w-fit items-center gap-3 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
              <HeartHandshake size={27} />
            </span>
            <span className="text-3xl font-bold tracking-tight">
              kindred<span className="text-[#e5a66e]">.</span>
            </span>
          </Link>

          <div className="max-w-xl pb-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white backdrop-blur-md">
              <Sparkles size={15} />
              YOUR PEOPLE ARE HERE
            </div>

            <h1 className="text-5xl font-semibold leading-[1.15] tracking-tight text-white xl:text-7xl">
              Together,
              <br />
              we make
              <br />
              <span className="font-serif italic text-[#e5a66e]">
                good happen.
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-white/75 xl:text-lg">
              Find your community. Discover meaningful causes. Be part of
              something bigger than yourself.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  'photo-1534528741775-53994a69daeb',
                  'photo-1500648767791-00dcc994a43e',
                  'photo-1531123897727-8f129e1688ce',
                ].map((photo) => (
                  <img
                    key={photo}
                    src={`https://images.unsplash.com/${photo}?w=100&h=100&fit=crop`}
                    alt="Community member"
                    className="h-11 w-11 rounded-full border-2 border-[#103c30] object-cover"
                  />
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  A community that cares
                </p>
                <p className="text-xs text-white/60">
                  Connect. Volunteer. Make an impact.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/50">
            © 2026 Kindred. Making the world a little better.
          </p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10 lg:px-12">
        <div className="w-full max-w-[440px]">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-3 lg:hidden"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#103c30] text-white">
              <HeartHandshake size={24} />
            </span>
            <span className="text-2xl font-bold text-[#103c30]">
              kindred<span className="text-[#d99a65]">.</span>
            </span>
          </Link>

          <div className="mb-9">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6eee8] text-[#103c30]">
              <HeartHandshake size={29} />
            </div>

            <p className="mb-3 text-xs font-bold tracking-[0.22em] text-[#a87950]">
              WELCOME BACK
            </p>

            <h2 className="text-4xl font-semibold tracking-tight text-[#183d30] sm:text-5xl">
              Good to see
              <br />
              <span className="font-serif font-normal italic text-[#b47a4c]">
                you again.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              Sign in to continue your journey and make a difference.
            </p>
          </div>

          <Card shadow="none" className="border border-gray-100 bg-white">
            <CardBody className="gap-6 p-6 sm:p-8">
              <form onSubmit={submit} className="space-y-6">
                <Input
                  label="Email address"
                  labelPlacement="outside"
                  placeholder="you@example.com"
                  type="email"
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  value={email}
                  onValueChange={(value) => {
                    setEmail(value)
                    setError('')
                  }}
                  isRequired
                  classNames={{
                    label: 'font-semibold text-gray-700',
                    inputWrapper:
                      'h-14 border-gray-200 hover:border-[#557c66] group-data-[focus=true]:border-[#276b50] shadow-none',
                    input: 'text-sm',
                  }}
                />

                <Input
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  variant="bordered"
                  radius="lg"
                  size="lg"
                  value={password}
                  onValueChange={(value) => {
                    setPassword(value)
                    setError('')
                  }}
                  isRequired
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-[#103c30]"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  }
                  classNames={{
                    label: 'font-semibold text-gray-700',
                    inputWrapper:
                      'h-14 border-gray-200 hover:border-[#557c66] group-data-[focus=true]:border-[#276b50] shadow-none',
                    input: 'text-sm',
                  }}
                />

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-gray-500">
                    <ShieldCheck size={15} className="text-[#347653]" />
                    Secure sign in
                  </span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  radius="lg"
                  className="h-14 w-full bg-[#103c30] text-base font-semibold text-white shadow-lg shadow-[#103c30]/15 transition hover:bg-[#205541]"
                  endContent={<ArrowRight size={19} />}
                >
                  Sign in to Kindred
                </Button>
              </form>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-xs text-gray-400">NEW HERE?</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <Button
                as={Link}
                href="/register"
                variant="bordered"
                size="lg"
                radius="lg"
                className="h-13 w-full border-[#dce5df] font-semibold text-[#103c30] hover:bg-[#f1f6f2]"
              >
                Create an account
              </Button>
            </CardBody>
          </Card>

          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Users size={15} />
            Join a community that makes a difference.
          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  )
}
