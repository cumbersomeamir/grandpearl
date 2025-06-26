import mongoose from 'mongoose'

const GalleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'video']
  },
  src: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['rooms', 'events', 'dining', 'amenities', 'uploaded'],
    default: 'uploaded'
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema) 