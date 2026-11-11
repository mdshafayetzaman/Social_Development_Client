import { auth } from '@/app/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await auth.api.getToken({
      headers: request.headers,
    })

    if (!tokenData?.token) {
      return NextResponse.json({ message: 'Token not found' }, { status: 401 })
    }

    return NextResponse.json(tokenData)
  } catch (error) {
    console.error('Auth token route error:', error)

    return NextResponse.json(
      { message: 'Failed to get token' },
      { status: 500 },
    )
  }
}
