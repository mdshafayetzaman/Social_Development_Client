'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  HeartHandshake,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react'

interface UserData {
  name: string
  email: string
  photo: string
  password: string
}

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const users: UserData[] = JSON.parse(
      localStorage.getItem('kindred-users') || '[]',
    )

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    )

    if (!user) {
      setError('Invalid email or password. Please try again.')
      return
    }

    localStorage.setItem('kindred-user', JSON.stringify(user))
    window.dispatchEvent(new Event('kindred-auth'))

    router.push('/events')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8f5] p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_20px_80px_rgba(16,60,48,0.09)] lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#103c30] p-12 text-white lg:flex xl:p-16">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2d8065]/30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#80b89b]/20 blur-3xl" />

          <Link
            href="/"
            className="relative flex items-center gap-3 text-2xl font-bold"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <HeartHandshake size={25} />
            </span>
            kindred<span className="text-[#a5d6b8]">.</span>
          </Link>

          <div className="relative z-10 py-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-[#b8e2c7]">
              <Sparkles size={14} />
              WELCOME BACK
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-[1.15] xl:text-6xl">
              Together,
              <br />
              we make
              <br />
              <span className="italic text-[#a5d6b8]">good happen.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/65">
              Welcome back to a community of people making a difference. Your
              next meaningful moment starts here.
            </p>

            <div className="mt-10">
              <p className="text-sm font-semibold">A community for everyone</p>
              <p className="mt-1 text-xs text-white/50">
                Connect. Participate. Make an impact.
              </p>
            </div>
          </div>

          <div className="relative border-t border-white/15 pt-6">
            <p className="text-sm text-white/50">
              Together, we can make good things happen.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-10 flex items-center gap-2 text-2xl font-bold text-[#103c30] lg:hidden"
            >
              <HeartHandshake size={30} />
              kindred<span className="text-[#65a985]">.</span>
            </Link>

            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#438365]">
                <span className="h-[2px] w-7 bg-[#438365]" />
                WELCOME BACK
              </div>

              <h2 className="text-4xl font-bold tracking-tight text-[#173e32] sm:text-5xl">
                Sign in to
                <br />
                <span className="italic text-[#65a985]">Kindred.</span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                Welcome back! Enter your details to access your account.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-13 w-full rounded-xl border border-gray-200 bg-[#fafcfb] pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#438365] focus:ring-4 focus:ring-[#438365]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-13 w-full rounded-xl border border-gray-200 bg-[#fafcfb] pl-12 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#438365] focus:ring-4 focus:ring-[#438365]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#438365]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#103c30] font-semibold text-white shadow-lg shadow-[#103c30]/15 transition-all duration-300 hover:bg-[#185442] hover:shadow-xl"
              >
                Sign in
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?
              <Link
                href="/register"
                className="ml-1 font-bold text-[#438365] transition hover:text-[#103c30]"
              >
                Create account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-gray-400">
              © 2026 Kindred. Made for a better community.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
