// src/app/api/gallery/route.js
import { NextResponse } from 'next/server'
import { 
  getAllGalleryItems, 
  addMultipleGalleryItems, 
  deleteGalleryItem,
  getGalleryItemsByCategory 
} from '../../../database/galleryDB'
import { uploadMultipleFilesToS3, deleteFileFromS3 } from '../../../lib/aws-s3'

// GET: Fetch all gallery items or by category
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    let items
    if (category && category !== 'all') {
      items = getGalleryItemsByCategory(category)
    } else {
      const galleryData = getAllGalleryItems()
      items = galleryData.items
    }
    
    return NextResponse.json({
      success: true,
      items,
      total: items.length
    })
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

// POST: Upload new files and add to gallery
export async function POST(request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files')
    const category = formData.get('category') || 'uploaded'
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      )
    }

    console.log(`Uploading ${files.length} files to S3...`)
    
    // Upload files to S3
    const uploadResults = await uploadMultipleFilesToS3(files, category)
    
    // Filter successful uploads
    const successfulUploads = uploadResults.filter(result => result.success)
    
    if (successfulUploads.length === 0) {
      return NextResponse.json(
        { success: false, error: 'All file uploads failed' },
        { status: 500 }
      )
    }

    // Prepare gallery items for database
    const galleryItems = successfulUploads.map(upload => ({
      type: upload.type.startsWith('video/') ? 'video' : 'image',
      src: upload.url,
      title: upload.originalName.split('.')[0].replace(/[-_]/g, ' '),
      category: category,
      description: `Uploaded ${upload.type.startsWith('video/') ? 'video' : 'image'}`,
      s3Key: upload.key,
      originalName: upload.originalName,
      size: upload.size
    }))

    // Add to database
    const updatedGalleryData = addMultipleGalleryItems(galleryItems)
    
    console.log(`Successfully added ${galleryItems.length} items to gallery`)
    
    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${successfulUploads.length} files`,
      items: galleryItems,
      total: updatedGalleryData.totalItems,
      failed: uploadResults.length - successfulUploads.length
    })
    
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload files' },
      { status: 500 }
    )
  }
}

// DELETE: Remove gallery item and delete from S3
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const itemId = parseInt(searchParams.get('id'))
    
    if (!itemId) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      )
    }

    // Delete from database and get item info
    const { galleryData, deletedItem } = deleteGalleryItem(itemId)
    
    // Delete from S3 if it has an S3 key (not default items)
    if (deletedItem && deletedItem.s3Key) {
      console.log(`Deleting file from S3: ${deletedItem.s3Key}`)
      await deleteFileFromS3(deletedItem.s3Key)
    }
    
    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully',
      total: galleryData.totalItems
    })
    
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}