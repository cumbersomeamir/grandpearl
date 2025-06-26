'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    guestName: '',
    mobileNumber: '',
    email: '',
    cleanlinessRating: 5,
    staffBehaviourRating: 5,
    roomComfortRating: 5,
    improvementSuggestion: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const heroRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.5 })
      
      tl.fromTo('.feedback-hero-bg', 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
      )
      .fromTo('.feedback-hero-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' }, '-=1.5'
      )
      .fromTo('.feedback-hero-subtitle',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=1'
      )
      .fromTo('.feedback-hero-description',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.8'
      )

      // Parallax effect
      gsap.to('.feedback-hero-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Form entrance animation
      gsap.fromTo('.feedback-form',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
      )

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseInt(value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          guestName: '',
          mobileNumber: '',
          email: '',
          cleanlinessRating: 5,
          staffBehaviourRating: 5,
          roomComfortRating: 5,
          improvementSuggestion: ''
        })

        // Success animation
        gsap.fromTo('.submit-success', {
          scale: 0,
          opacity: 0
        }, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })

        setTimeout(() => {
          gsap.to('.submit-success', {
            opacity: 0,
            duration: 0.3
          })
        }, 3000)
      } else {
        setSubmitStatus('error')
        throw new Error(result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Feedback submission error:', error)
      setSubmitStatus('error')

      // Error animation
      gsap.fromTo('.submit-error', {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })

      setTimeout(() => {
        gsap.to('.submit-error', {
          opacity: 0,
          duration: 0.3
        })
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const RatingSelector = ({ label, value, onChange, field }) => (
    <div className="mb-6">
      <label className="block text-gold text-lg font-medium mb-3">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(field, rating)}
            className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
              value >= rating
                ? 'bg-gradient-to-br from-gold to-antique-gold border-gold text-white'
                : 'border-gold/30 text-gold hover:border-gold/60'
            }`}
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  )

  return (
    <div className="feedback-page-content">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="feedback-hero-bg absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&crop=center"
            alt="Grand Pearl Hotel Feedback"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-antique-gold/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="feedback-hero-title mb-8">
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold text-white font-cormorant leading-none">
              <span className="block text-gold bg-gradient-to-r from-gold to-antique-gold bg-clip-text text-transparent">Feedback</span>
            </h1>
          </div>

          <div className="feedback-hero-subtitle mb-8">
            <h2 className="text-3xl md:text-5xl font-light text-gold font-cormorant tracking-wide">
              Share Your Experience
            </h2>
          </div>

          <div className="feedback-hero-description max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light tracking-wide">
              Your feedback helps us maintain the highest standards of luxury and service. 
              We value your opinion and use it to continuously improve your experience.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-12 border-2 border-gold rounded-full flex justify-center relative overflow-hidden">
              <div className="w-2 h-4 bg-gradient-to-b from-gold to-antique-gold rounded-full mt-3 animate-bounce"></div>
            </div>
            <p className="text-gold text-sm mt-3 font-light tracking-widest">SHARE FEEDBACK</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-gold/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-gold/20 to-antique-gold/20 rounded-full animate-float"></div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="feedback-form">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gold font-cormorant mb-4">
                Tell Us About Your Stay
              </h2>
              <p className="text-xl text-gray-300 font-light">
                We'd love to hear about your experience at Grand Pearl Hotel
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="submit-success fixed top-20 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50">
                <p className="font-medium">Thank you! Your feedback has been submitted successfully.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="submit-error fixed top-20 right-6 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50">
                <p className="font-medium">Something went wrong. Please try again.</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gold text-lg font-medium mb-3">Guest Name *</label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-gold text-lg font-medium mb-3">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gold text-lg font-medium mb-3">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Rating Sections */}
              <div className="space-y-8">
                <RatingSelector
                  label="Rate the Cleanliness (1-10)"
                  value={formData.cleanlinessRating}
                  onChange={handleRatingChange}
                  field="cleanlinessRating"
                />

                <RatingSelector
                  label="Rate Staff Behaviour (1-10)"
                  value={formData.staffBehaviourRating}
                  onChange={handleRatingChange}
                  field="staffBehaviourRating"
                />

                <RatingSelector
                  label="Rate Room Comfort (1-10)"
                  value={formData.roomComfortRating}
                  onChange={handleRatingChange}
                  field="roomComfortRating"
                />
              </div>

              {/* Improvement Suggestion */}
              <div>
                <label className="block text-gold text-lg font-medium mb-3">How can we improve?</label>
                <textarea
                  name="improvementSuggestion"
                  value={formData.improvementSuggestion}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Share your suggestions for improvement..."
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-gradient-to-r from-gold to-antique-gold text-black font-semibold rounded-lg hover:from-antique-gold hover:to-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 