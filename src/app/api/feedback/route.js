import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Feedback from '../../../models/Feedback'

export async function POST(request) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { 
      guestName, 
      mobileNumber, 
      email, 
      cleanlinessRating, 
      staffBehaviourRating, 
      roomComfortRating, 
      improvementSuggestion 
    } = body

    // Validate required fields
    if (!guestName || !mobileNumber || !email || !cleanlinessRating || !staffBehaviourRating || !roomComfortRating) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    // Validate ratings are between 1-10
    if (cleanlinessRating < 1 || cleanlinessRating > 10 || 
        staffBehaviourRating < 1 || staffBehaviourRating > 10 || 
        roomComfortRating < 1 || roomComfortRating > 10) {
      return NextResponse.json(
        { success: false, error: 'Ratings must be between 1 and 10' },
        { status: 400 }
      )
    }

    // Create new feedback
    const feedback = new Feedback({
      guestName,
      mobileNumber,
      email,
      cleanlinessRating,
      staffBehaviourRating,
      roomComfortRating,
      improvementSuggestion
    })

    await feedback.save()

    return NextResponse.json(
      { success: true, message: 'Feedback submitted successfully', data: feedback },
      { status: 201 }
    )

  } catch (error) {
    console.error('Feedback submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await dbConnect()
    
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json(
      { success: true, data: feedbacks },
      { status: 200 }
    )

  } catch (error) {
    console.error('Feedback fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
} 