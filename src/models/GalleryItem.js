import mongoose from 'mongoose'

const GalleryItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  src: {
    type: String,
    required: true
  },
  title: String,
  category: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema)
