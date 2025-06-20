import mongoose from 'mongoose'

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  message: String,
}, { timestamps: true })

export default mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema)
