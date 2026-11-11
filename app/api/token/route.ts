import { auth } from '@/app/lib/auth'
import { connection } from 'next/server'

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
    console.error('Auth token route error:', error)

    return Response.json(
      { success: false, message: 'Failed to get token' },
      { status: 500 },
    )
  }
}
