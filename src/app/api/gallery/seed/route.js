import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import GalleryItem from '@/models/GalleryItem'

export async function POST() {
  try {
    await dbConnect()
    
    // Check if gallery already has items
    const existingCount = await GalleryItem.countDocuments()
    if (existingCount > 0) {
      return NextResponse.json({
        success: false,
        message: 'Gallery already has items. Seed skipped.'
      })
    }
    
    // Default gallery items
    const defaultItems = [
      {
        title: 'Luxury Suite Interior',
        description: 'Opulent bedroom with premium amenities',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center',
        category: 'rooms',
        fileName: 'luxury-suite.jpg',
        fileSize: 1024000,
        mimeType: 'image/jpeg'
      },
      {
        title: 'Grand Banquet Hall',
        description: 'Elegant venue for weddings and celebrations',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&crop=center',
        category: 'events',
        fileName: 'banquet-hall.jpg',
        fileSize: 1200000,
        mimeType: 'image/jpeg'
      },
      {
        title: 'Premium Restaurant',
        description: 'Fine dining with world-class cuisine',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&crop=center',
        category: 'dining',
        fileName: 'restaurant.jpg',
        fileSize: 980000,
        mimeType: 'image/jpeg'
      },
      {
        title: 'Luxury Spa',
        description: 'Rejuvenating wellness treatments',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&crop=center',
        category: 'amenities',
        fileName: 'spa.jpg',
        fileSize: 1100000,
        mimeType: 'image/jpeg'
      },
      {
        title: 'Rooftop Terrace',
        description: 'Panoramic city views and relaxation',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&crop=center',
        category: 'amenities',
        fileName: 'rooftop.jpg',
        fileSize: 950000,
        mimeType: 'image/jpeg'
      },
      {
        title: 'Corporate Conference',
        description: 'Professional meeting facilities',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop&crop=center',
        category: 'events',
        fileName: 'conference.jpg',
        fileSize: 1050000,
        mimeType: 'image/jpeg'
      }
    ]
    
    // Insert default items
    const insertedItems = await GalleryItem.insertMany(defaultItems)
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${insertedItems.length} gallery items`,
      data: insertedItems
    })
    
  } catch (error) {
    console.error('Error seeding gallery:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed gallery' },
      { status: 500 }
    )
  }
} 