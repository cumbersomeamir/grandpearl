import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  checkIn: { type: String },
  checkOut: { type: String },
  guests: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema) 