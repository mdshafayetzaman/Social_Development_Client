/**
 * Single source of truth for every call to the Kindred Events API (the
 * Express backend).
 *
 * The base URL comes from NEXT_PUBLIC_API_URL so the exact same code works
 * locally (http://localhost:5002) and in production
 * (https://development-social.vercel.app) without editing source files.
 *
 * The backend verifies the JWT that we send in the `Authorization` header
 * against the better-auth JWKS endpoint (/api/auth/jwks) and it validates the
 * `iss` / `aud` claims against BETTER_AUTH_URL. That means the frontend and
 * the backend must always agree on their URLs, which is exactly what this
 * module makes easy to keep in sync.
 */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'
).replace(/\/+$/, '')

/** Builds an absolute URL for a backend route. */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Returns the JWT of the currently signed-in user.
 *
 * The token is minted by better-auth (HS-less EdDSA, published through the
 * JWKS endpoint) and is the only credential the backend accepts.
 */
export async function getAuthToken(): Promise<string> {
  const response = await fetch('/api/token', {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  })

  const data = await response.json().catch(() => null)

  if (!response.ok || !data?.token) {
    throw new Error(
      data?.message || 'Authentication token not found. Please login again.',
    )
  }

  return data.token as string
}
