import { auth } from '@/app/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tokenData = await auth.api.getToken({
      headers: await headers(),
    })

    if (!tokenData?.token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required.',
        },
        { status: 401 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        token: tokenData.token,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Auth token route error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to generate token.',
      },
      { status: 401 },
    )
  }
}
