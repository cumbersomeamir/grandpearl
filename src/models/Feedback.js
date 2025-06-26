import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  cleanlinessRating: { type: Number, required: true, min: 1, max: 10 },
  staffBehaviourRating: { type: Number, required: true, min: 1, max: 10 },
  roomComfortRating: { type: Number, required: true, min: 1, max: 10 },
  improvementSuggestion: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema) 