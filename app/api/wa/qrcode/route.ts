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

    // TODO: Generate real QR code menggunakan whatsapp-web.js
    // Untuk saat ini return placeholder QR code

    const placeholderQR =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="256" height="256"%3E%3Crect fill="white" width="256" height="256"/%3E%3Crect fill="black" x="20" y="20" width="30" height="30"/%3E%3Crect fill="black" x="20" y="206" width="30" height="30"/%3E%3Crect fill="black" x="206" y="20" width="30" height="30"/%3E%3Crect fill="black" x="50" y="50" width="150" height="150" fill="none" stroke="black" stroke-width="2"/%3E%3C/svg%3E'

    return NextResponse.json({
      success: true,
      qrCode: placeholderQR,
      message: 'QR Code generated successfully',
      expiresIn: 60,
    })
  } catch (error: any) {
    console.error('QR code error:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}
