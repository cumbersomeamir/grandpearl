import { NextResponse } from 'next/server'

export async function POST(req) {
  const data = await req.json()
  const username = process.env.ADMIN_USER || 'admin'
  const password = process.env.ADMIN_PASS || 'password'

  if (data.username === username && data.password === password) {
    const res = NextResponse.json({ success: true })
    res.cookies.set({ name: 'auth', value: 'true', httpOnly: true, path: '/' })
    return res
  }
  return NextResponse.json({ success: false }, { status: 401 })
}
