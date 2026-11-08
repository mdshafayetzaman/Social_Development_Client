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
import { authClient } from '../lib/auht-client'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { error: signInError } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: '/',
      })

      if (signInError) {
        setError(
          signInError.message || 'Invalid email or password. Please try again.',
        )
        return
      }

      router.replace('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    setIsGoogleLoading(true)

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      })
    } catch {
      setError('Google sign in failed. Please try again.')
      setIsGoogleLoading(false)
    }
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
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-[52px] w-full rounded-xl border border-gray-200 bg-[#fafcfb] pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#438365] focus:ring-4 focus:ring-[#438365]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-[52px] w-full rounded-xl border border-gray-200 bg-[#fafcfb] pl-12 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#438365] focus:ring-4 focus:ring-[#438365]/10"
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
                <div
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#103c30] font-semibold text-white shadow-lg shadow-[#103c30]/15 transition-all duration-300 hover:bg-[#185442] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}

                {!isLoading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-gray-400">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLoading}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-[#438365] hover:bg-[#f8fbf9] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.73 7.18l7.34 5.7c4.28-3.95 7.43-9.77 7.43-17.35z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.34-5.7c-2.04 1.36-4.65 2.16-8.56 2.16-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>

              {isGoogleLoading
                ? 'Connecting to Google...'
                : 'Continue with Google'}
            </button>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?
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
