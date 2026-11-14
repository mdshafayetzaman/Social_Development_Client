import { NextRequest, NextResponse } from 'next/server'

/**
 * Route protection for the pages that require a signed-in user.
 *
 * The file has to be named `proxy.ts` and live in the project root (next to
 * `app/`) for Next.js to pick it up - the old `app/poxy.ts` was silently
 * ignored, so every protected page was reachable without a session.
 */
export function proxy(request: NextRequest) {
  const sessionCookie =
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value

  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url)

    loginUrl.searchParams.set(
      'callbackUrl',
      request.nextUrl.pathname + request.nextUrl.search,
    )

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // "/events" and "/events/[id]" stay public - the events list is the
    // public landing page and it links guests to /login itself.
    '/upcoming-events/:path*',
    '/create-event/:path*',
    '/manage-events/:path*',
    '/joined-events/:path*',
    '/edit-event/:path*',
  ],
}
