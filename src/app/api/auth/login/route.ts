import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth-jwt'
import { setAdminSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body as { email: string; password: string }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await signToken({ email, role: 'admin' })

    const response = NextResponse.json({ success: true }, { status: 200 })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    // Bridge to legacy session cookie
    setAdminSessionCookie(response)

    return response
  } catch (error: any) {
    console.error("Login API Error:", error)
    return NextResponse.json({ error: 'Internal server error', details: error.message || error }, { status: 500 })
  }
}
