import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import GalleryItem from '@/models/GalleryItem'

export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let query = {}
    if (category && category !== 'all') {
      query.category = category
    }
    
    const galleryItems = await GalleryItem.find(query)
      .sort({ uploadedAt: -1 })
      .lean()
    
    return NextResponse.json({
      success: true,
      data: galleryItems
    })
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
} 