import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function POST(request: Request) {
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

    const body = await request.json()
    const { phone, message } = body

    if (!phone || !message) {
      return NextResponse.json(
        { error: 'Nomor dan pesan harus diisi' },
        { status: 400 }
      )
    }

    if (phone.trim().length < 9) {
      return NextResponse.json(
        { error: 'Nomor WhatsApp tidak valid' },
        { status: 400 }
      )
    }

    if (message.trim().length === 0 || message.trim().length > 1000) {
      return NextResponse.json(
        { error: 'Pesan harus 1-1000 karakter' },
        { status: 400 }
      )
    }

    // TODO: Implementasi pengiriman WhatsApp sebenarnya
    // Untuk sekarang hanya mock response

    return NextResponse.json(
      {
        success: true,
        message: 'Pesan berhasil dikirim',
        data: {
          phone: `+62${phone}`,
          message,
          status: 'sent',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Gagal mengirim pesan' },
      { status: 500 }
    )
  }
}
