'use client'
import Link from 'next/link'
import { useState } from 'react'
import { HeartHandshake, ArrowRight } from 'lucide-react'
export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      setError(
        'Password needs at least 6 characters, one uppercase and one lowercase letter.',
      )
      return
    }
    const users = JSON.parse(localStorage.getItem('kindred-users') || '[]')
    if (users.some((u: { email: string }) => u.email === email)) {
      setError('An account with this email already exists.')
      return
    }
    const user = {
      name,
      email,
      photo: photo || 'https://i.pravatar.cc/100?img=12',
      password,
    }
    localStorage.setItem('kindred-users', JSON.stringify([...users, user]))
    localStorage.setItem('kindred-user', JSON.stringify(user))
    window.dispatchEvent(new Event('kindred-auth'))
    alert('Welcome to Kindred! Your account is ready.')
    window.location.href = '/events'
  }
  return (
    <div className="auth-page">
      <div className="auth-art">
        <div className="auth-art-copy">
          <span className="eyebrow light">BETTER, TOGETHER</span>
          <h2>
            There's room
            <br />
            for <em>you</em> in
            <br />
            the good.
          </h2>
          <p>
            Join a community of doers, dreamers
            <br />
            and people who give a damn.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1000&q=85"
          alt="Volunteers smiling together"
        />
      </div>
      <div className="auth-panel">
        <div className="auth-form-wrap">
          <Link href="/" className="brand">
            <span className="brand-mark">
              <HeartHandshake />
            </span>
            <span>
              kindred<span className="brand-dot">.</span>
            </span>
          </Link>
          <div className="section-kicker">COME ON IN</div>
          <h1>
            Be part of
            <br />
            <em>something good.</em>
          </h1>
          <p className="auth-sub">
            Create your account. Your community is waiting.
          </p>
          <form onSubmit={submit}>
            <label>Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="How should we call you?"
              required
            />
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <label>
              Profile photo URL <span className="optional">(optional)</span>
            </label>
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="https://..."
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />
            {error && <p className="form-error">{error}</p>}
            <button className="btn btn-primary auth-submit">
              Create account <ArrowRight size={17} />
            </button>
          </form>
          <p className="auth-switch">
            Already a member? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
