'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import {
  HeartHandshake,
  ArrowRight,
  User,
  Mail,
  Lock,
  Camera,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { authClient } from '../lib/auht-client'

export default function Register() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const conditions = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter (A-Z)', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a-z)', valid: /[a-z]/.test(password) },
  ]

  const isPasswordValid = conditions.every((item) => item.valid)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!isPasswordValid) {
      const message = 'Please meet all password requirements.'
      setError(message)
      toast.error(message, { duration: 5000 })
      return
    }

    setIsLoading(true)

    const loadingToast = toast.loading('Creating your account...', {
      duration: Infinity,
    })

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photo.trim() || undefined,
        callbackURL: '/',
      })

      if (signUpError) {
        const message =
          signUpError.message || 'Registration failed. Please try again.'

        setError(message)
        toast.dismiss(loadingToast)
        toast.error(message, {
          duration: 5000,
        })
        return
      }

      toast.dismiss(loadingToast)

      toast.success('Account created successfully! Welcome to Kindred.', {
        duration: 5000,
      })

      router.replace('/')
      router.refresh()
    } catch {
      toast.dismiss(loadingToast)

      const message = 'Something went wrong. Please try again.'
      setError(message)
      toast.error(message, {
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8f5] p-4 sm:p-8">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: '14px',
            background: '#103c30',
            color: '#fff',
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 10px 35px rgba(16,60,48,0.15)',
          },
          success: {
            iconTheme: {
              primary: '#a5d6b8',
              secondary: '#103c30',
            },
          },
          error: {
            style: {
              background: '#991b1b',
              color: '#fff',
              borderRadius: '14px',
            },
          },
        }}
      />

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
              BETTER, TOGETHER
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-[1.15] xl:text-6xl">
              There&apos;s room
              <br />
              for <span className="italic text-[#a5d6b8]">you</span> in
              <br />
              the good.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/65">
              Join a community of doers, dreamers and people who believe in
              making the world a better place.
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

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-8 flex items-center gap-2 text-2xl font-bold text-[#103c30] lg:hidden"
            >
              <HeartHandshake size={30} />
              kindred<span className="text-[#65a985]">.</span>
            </Link>

            <div className="mb-7">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#438365]">
                <span className="h-[2px] w-7 bg-[#438365]" />
                JOIN THE COMMUNITY
              </div>

              <h2 className="text-4xl font-bold tracking-tight text-[#173e32] sm:text-5xl">
                Create your
                <br />
                <span className="italic text-[#65a985]">account.</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Create your account and become part of something meaningful.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Your name
                </label>

                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafcfb] pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#438365] focus:ring-4 focus:ring-[#438365]/10"
                  />
                </div>
              </div>

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
                    required
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafcfb] pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#438365] focus:ring-4 focus:ring-[#438365]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="photo"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Profile photo{' '}
                  <span className="font-normal text-gray-400">(Optional)</span>
                </label>

                <div className="relative">
                  <Camera
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    id="photo"
                    name="photo"
                    type="url"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    placeholder="https://your-photo-url.com"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafcfb] pl-12 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#438365] focus:ring-4 focus:ring-[#438365]/10"
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
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-[#fafcfb] pl-12 pr-12 text-sm text-gray-800 outline-none transition focus:border-[#438365] focus:ring-4 focus:ring-[#438365]/10"
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

                <div className="mt-3 rounded-xl bg-[#f5f8f5] p-3">
                  <p className="mb-2 text-xs font-semibold text-gray-600">
                    Password requirements
                  </p>

                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div
                        key={condition.label}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2
                          size={15}
                          className={
                            condition.valid ? 'text-green-600' : 'text-gray-300'
                          }
                        />

                        <span
                          className={`text-xs ${condition.valid ? 'font-medium text-green-700' : 'text-gray-400'}`}
                        >
                          {condition.label}
                        </span>
                      </div>
                    ))}
                  </div>
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
                disabled={isLoading}
                className="group flex h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-[#103c30] text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#103c30]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#185442] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Creating account...' : 'Create account'}

                {!isLoading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?
              <Link
                href="/login"
                className="ml-1 font-bold text-[#438365] transition hover:text-[#103c30]"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-xs text-gray-400">
              © 2026 Kindred. Made for a better community.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
