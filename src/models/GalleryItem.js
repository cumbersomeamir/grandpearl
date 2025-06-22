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
  description: String
}, { timestamps: true })

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema)
