
import { NextRequest, NextResponse } from 'next/server'

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
    '/events/:path*',
    '/upcoming-events',
    '/upcoming-events/:path*',
    '/create-event/:path*',
    '/manage-events/:path*',
    '/joined-events/:path*',
    '/edit-event/:path*',
  ],
}
