import { auth } from '@/app/lib/auth'
import { connection } from 'next/server'
import { APIError } from 'better-auth/api'

export async function GET(request: Request) {
  await connection()

  try {
    const tokenData = await auth.api.getToken({
      headers: request.headers,
    })

    if (!tokenData?.token) {
      return Response.json(
        { success: false, message: 'Token not found' },
        { status: 401 },
      )
    }

    return Response.json({
      success: true,
      token: tokenData.token,
    })
  } catch (error) {
    const statusCode = error instanceof APIError ? error.statusCode : 500

    // A missing/invalid session is an expected outcome, not a server fault.
    if (statusCode !== 401) {
      console.error('Auth token route error:', error)
    }

    return Response.json(
      {
        success: false,
        message:
          statusCode === 401
            ? 'Unauthorized. Please login again.'
            : 'Failed to get token',
      },
      { status: statusCode },
    )
  }
}
