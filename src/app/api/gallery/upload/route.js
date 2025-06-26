import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import GalleryItem from '@/models/GalleryItem'

export async function POST(request) {
  try {
    await dbConnect()
    
    const formData = await request.formData()
    const files = formData.getAll('files')
    const titles = formData.getAll('titles')
    const descriptions = formData.getAll('descriptions')
    const categories = formData.getAll('categories')
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      )
    }
    
    const uploadedItems = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const title = titles[i] || file.name.split('.')[0]
      const description = descriptions[i] || ''
      const category = categories[i] || 'uploaded'
      
      // Convert file to base64 for storage
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const dataUrl = `data:${file.type};base64,${base64}`
      
      // Create gallery item
      const galleryItem = new GalleryItem({
        title,
        description,
        type: file.type.startsWith('video/') ? 'video' : 'image',
        src: dataUrl,
        category,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type
      })
      
      await galleryItem.save()
      uploadedItems.push(galleryItem)
    }
    
    return NextResponse.json({
      success: true,
      data: uploadedItems,
      message: `Successfully uploaded ${uploadedItems.length} item(s)`
    })
    
  } catch (error) {
    console.error('Error uploading gallery items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload gallery items' },
      { status: 500 }
    )
  }
} 