import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Reservation from '@/models/Reservation'

export async function POST(request) {
  try {
    const data = await request.json()
    await dbConnect()
    await Reservation.create(data)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 })
  }
}
