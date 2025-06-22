import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import GalleryItem from '@/models/GalleryItem'

export async function GET() {
  try {
    await connectDB()
    const items = await GalleryItem.find().sort({ createdAt: -1 })
    return NextResponse.json(items)
  } catch (err) {
    return NextResponse.json({ message: 'Error fetching gallery items' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()
    const item = await GalleryItem.create(data)
    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Error saving gallery item' }, { status: 500 })
  }
}
