import { NextResponse } from 'next/server'
import GalleryItem from '@/models/GalleryItem'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    await connectToDatabase()
    const items = await GalleryItem.find().sort({ createdAt: -1 })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Gallery GET error', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    await connectToDatabase()
    const itemsToCreate = Array.isArray(body.items) ? body.items : [body]
    const created = await GalleryItem.insertMany(itemsToCreate)
    return NextResponse.json({ success: true, items: created })
  } catch (error) {
    console.error('Gallery POST error', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
