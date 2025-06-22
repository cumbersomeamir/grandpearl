import mongoose from 'mongoose'

const ReservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true
  },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema)
