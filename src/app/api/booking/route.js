import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Booking from '../../../models/Booking'

export async function POST(req) {
  try {
    await dbConnect()
    const data = await req.json()
    const booking = await Booking.create(data)
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
} 