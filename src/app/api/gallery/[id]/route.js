import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import GalleryItem from '@/models/GalleryItem'

export async function DELETE(request, { params }) {
  try {
    await dbConnect()
    
    const { id } = params
    
    const deletedItem = await GalleryItem.findByIdAndDelete(id)
    
    if (!deletedItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
} 