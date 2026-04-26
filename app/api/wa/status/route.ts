import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token invalid' },
        { status: 401 }
      )
    }

    // TODO: Check actual WhatsApp connection status
    // Untuk saat ini return false

    return NextResponse.json({
      success: true,
      connected: false,
      message: 'WhatsApp not connected',
    })
  } catch (error: any) {
    console.error('WA status error:', error)
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    )
  }
}
