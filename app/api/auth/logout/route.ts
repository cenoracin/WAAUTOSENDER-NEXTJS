import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')

    return NextResponse.redirect(
      new URL('/', process.env.NEXTAUTH_URL || 'http://localhost:3000'),
      { status: 302 }
    )
  } catch (error: any) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
