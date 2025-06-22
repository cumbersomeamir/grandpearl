import { NextResponse } from 'next/server'
import Reservation from '@/models/Reservation'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(request) {
  try {
    const body = await request.json()
    await connectToDatabase()
    const reservation = await Reservation.create(body)
    return NextResponse.json({ success: true, reservation })
  } catch (error) {
    console.error('Reservation error', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
