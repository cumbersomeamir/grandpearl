'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function BookingCTA() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [selectedService, setSelectedService] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  })

  const services = [
    'Luxury Room Booking',
    'Wedding & Events',
    'Corporate Meetings',
    'Banquet Hall Rental',
    'Restaurant Reservation',
    'Airport Transportation'
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero CTA animation
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      })

      ctaTl.fromTo('.cta-bg', {
        scale: 0.8,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'back.out(1.7)'
      })
      .fromTo('.cta-content', {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')

      // Form field animations
      const formFields = gsap.utils.toArray('.form-field')
      formFields.forEach((field, index) => {
        const input = field.querySelector('input, select, textarea')
        const label = field.querySelector('label')

        // Focus animations
        input.addEventListener('focus', () => {
          gsap.to(field, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(label, {
            color: '#d3af37',
            scale: 0.9,
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        input.addEventListener('blur', () => {
          gsap.to(field, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
          if (!input.value) {
            gsap.to(label, {
              color: '#9CA3AF',
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
        })
      })

      // Booking stats animation
      gsap.from('.booking-stat', {
        scale: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.booking-stats',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Service selector animation
      gsap.from('.service-option', {
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.service-selector',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Floating elements
      gsap.to('.floating-booking', {
        y: -15,
        rotation: 3,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      })

      // Urgency indicator animation
      gsap.to('.urgency-pulse', {
        scale: 1.1,
        opacity: 0.8,
        duration: 1,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          checkIn: '',
          checkOut: '',
          guests: '',
          message: ''
        })

        gsap.to('.form-success', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-charcoal to-black overflow-hidden">
      {/* Floating Booking Elements */}
      <div className="floating-booking absolute top-20 left-10 w-12 h-12 bg-gold/20 rounded-full"></div>
      <div className="floating-booking absolute top-40 right-20 w-8 h-8 bg-antique-gold/30 rounded-full"></div>
      <div className="floating-booking absolute bottom-32 left-16 w-10 h-10 bg-gold/15 rounded-full"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="booking-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              <rect x="70" y="70" width="10" height="10" fill="#d3af37" opacity="0.3" />
              <circle cx="75" cy="25" r="3" fill="#d3af37" opacity="0.4" />
              <circle cx="25" cy="75" r="2" fill="#d3af37" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#booking-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Main CTA Section */}
        <div className="cta-bg bg-gradient-to-br from-midnight to-charcoal rounded-3xl border border-gold/20 overflow-hidden">
          <div className="cta-content p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - CTA Content */}
              <div>
                <div className="text-center lg:text-left mb-12">
                  <h2 className="text-5xl md:text-6xl font-bold text-white font-cormorant mb-6">
                    Book Your <span className="text-gold">Luxury</span> Experience
                  </h2>
                  <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
                    Transform your special moments into unforgettable memories. Reserve your stay or event at Grand Pearl Hotel today.
                  </p>

                  {/* Urgency Indicator */}
                  <div className="urgency-pulse inline-flex items-center gap-3 bg-gold/20 text-gold px-6 py-3 rounded-full border border-gold/30 mb-8">
                    <span className="w-3 h-3 bg-gold rounded-full animate-pulse"></span>
                    <span className="font-semibold text-sm">Limited Time: 20% Off Wedding Packages</span>
                  </div>
                </div>

                {/* Booking Stats */}
                <div className="booking-stats grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="booking-stat text-center">
                    <div className="text-3xl font-bold text-gold font-cormorant mb-2">2.5k+</div>
                    <div className="text-white text-sm">Happy Guests</div>
                  </div>
                  <div className="booking-stat text-center">
                    <div className="text-3xl font-bold text-gold font-cormorant mb-2">98%</div>
                    <div className="text-white text-sm">Satisfaction</div>
                  </div>
                  <div className="booking-stat text-center">
                    <div className="text-3xl font-bold text-gold font-cormorant mb-2">24/7</div>
                    <div className="text-white text-sm">Support</div>
                  </div>
                  <div className="booking-stat text-center">
                    <div className="text-3xl font-bold text-gold font-cormorant mb-2">4.8★</div>
                    <div className="text-white text-sm">Rating</div>
                  </div>
                </div>

                {/* Service Selector */}
                <div className="service-selector mb-8">
                  <h3 className="text-2xl font-bold text-white font-cormorant mb-4">
                    What can we help you with?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedService(service)}
                        className={`service-option text-left p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                          selectedService === service
                            ? 'bg-gold text-black border-gold'
                            : 'bg-charcoal/50 text-gray-300 border-gold/20 hover:border-gold/50'
                        }`}
                      >
                        <div className="font-semibold text-sm">{service}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Contact Options */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group relative px-8 py-4 bg-gold text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/25">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      📞 Call Now: +91 7081207081
                    </span>
                  </button>
                  
                  <button className="group relative px-8 py-4 border-2 border-gold text-gold font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-black">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      💬 WhatsApp Chat
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Side - Booking Form */}
              <div className="relative">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-black/50 to-charcoal/50 backdrop-blur-sm p-8 rounded-2xl border border-gold/20">
                  <h3 className="text-2xl font-bold text-white font-cormorant text-center mb-6">
                    Reserve Your Experience
                  </h3>

                  {/* Name Field */}
                  <div className="form-field relative">
                    <label className="absolute top-3 left-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      minLength={2}
                      className="w-full pt-8 pb-3 px-4 bg-midnight/50 border border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-field relative">
                    <label className="absolute top-3 left-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pt-8 pb-3 px-4 bg-midnight/50 border border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="form-field relative">
                    <label className="absolute top-3 left-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      pattern="[0-9+()\s-]{7,15}"
                      className="w-full pt-8 pb-3 px-4 bg-midnight/50 border border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300"
                      required
                    />
                  </div>

                  {/* Service Selection */}
                  <div className="form-field relative">
                    <label className="absolute top-3 left-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full pt-8 pb-3 px-4 bg-midnight/50 border border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-midnight text-white">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-field relative">
                      <label className="absolute top-3 left-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full pt-8 pb-3 px-4 bg-midnight/50 border border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    <div className="form-field relative">
                      <label className="absolute top-3 left-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full pt-8 pb-3 px-4 bg-midnight/50 border border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Guests Field */}
                  <div className="form-field relative">
                    <label className="absolute top-3 left-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      min="1"
                      max="500"
                      className="w-full pt-8 pb-3 px-4 bg-midnight/50 border border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="form-field relative">
                    <label className="absolute top-3 left-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none">
                      Special Requirements
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full pt-8 pb-3 px-4 bg-midnight/50 border border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us about your special requirements..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="submit-btn w-full py-4 bg-gradient-to-r from-gold to-antique-gold text-black font-bold rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="flex items-center justify-center gap-2">
                      🏨 Reserve Now - Get Instant Confirmation
                    </span>
                  </button>

                  {/* Form Success Message */}
                  <div className="form-success opacity-0 translate-y-4 bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl text-center">
                    <div className="font-semibold mb-2">🎉 Booking Request Submitted!</div>
                    <div className="text-sm">Our team will contact you within 2 hours to confirm your reservation.</div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-gold/20">
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <span>🔒</span> Secure Booking
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <span>✅</span> Instant Confirmation
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <span>🎯</span> Best Price Guarantee
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Booking Options */}
        <div className="mt-20 fade-slide-up">
          <h3 className="text-3xl md:text-4xl font-bold text-white font-cormorant text-center mb-12">
            Multiple Ways to <span className="text-gold">Book</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Direct Booking */}
            <div className="bg-gradient-to-br from-midnight to-charcoal rounded-2xl p-8 border border-gold/20 text-center hover:border-gold/50 transition-colors group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏨</div>
              <h4 className="text-xl font-bold text-white font-cormorant mb-3">Direct Booking</h4>
              <p className="text-gray-400 text-sm mb-4">Best rates guaranteed when you book directly with us</p>
              <div className="text-gold font-semibold text-sm">Save up to 15%</div>
            </div>

            {/* Phone Booking */}
            <div className="bg-gradient-to-br from-midnight to-charcoal rounded-2xl p-8 border border-gold/20 text-center hover:border-gold/50 transition-colors group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📞</div>
              <h4 className="text-xl font-bold text-white font-cormorant mb-3">Phone Booking</h4>
              <p className="text-gray-400 text-sm mb-4">Speak directly with our reservations team</p>
              <div className="text-gold font-semibold text-sm">24/7 Available</div>
            </div>

            {/* Online Platforms */}
            <div className="bg-gradient-to-br from-midnight to-charcoal rounded-2xl p-8 border border-gold/20 text-center hover:border-gold/50 transition-colors group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💻</div>
              <h4 className="text-xl font-bold text-white font-cormorant mb-3">Online Platforms</h4>
              <p className="text-gray-400 text-sm mb-4">Book through MakeMyTrip, OYO, Booking.com</p>
              <div className="text-gold font-semibold text-sm">Multiple Options</div>
            </div>

            {/* Walk-in */}
            <div className="bg-gradient-to-br from-midnight to-charcoal rounded-2xl p-8 border border-gold/20 text-center hover:border-gold/50 transition-colors group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚶</div>
              <h4 className="text-xl font-bold text-white font-cormorant mb-3">Walk-in</h4>
              <p className="text-gray-400 text-sm mb-4">Visit us directly for immediate assistance</p>
              <div className="text-gold font-semibold text-sm">Subject to Availability</div>
            </div>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="mt-20 fade-slide-up">
          <div className="bg-gradient-to-r from-gold/10 to-antique-gold/10 rounded-3xl p-12 border border-gold/20">
            <h3 className="text-3xl md:text-4xl font-bold text-gold font-cormorant text-center mb-12">
              Transparent Pricing
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Room Rates */}
              <div className="text-center">
                <div className="text-6xl mb-4">🛏️</div>
                <h4 className="text-2xl font-bold text-white font-cormorant mb-4">Luxury Rooms</h4>
                <div className="text-3xl font-bold text-gold mb-2">₹4,999+</div>
                <div className="text-gray-400 text-sm mb-4">Per night (including taxes)</div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Premium amenities included</li>
                  <li>✓ Complimentary breakfast</li>
                  <li>✓ 24/7 room service</li>
                  <li>✓ High-speed Wi-Fi</li>
                </ul>
              </div>

              {/* Event Packages */}
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="text-2xl font-bold text-white font-cormorant mb-4">Event Packages</h4>
                <div className="text-3xl font-bold text-gold mb-2">₹2,50,000+</div>
                <div className="text-gray-400 text-sm mb-4">Per event (customizable)</div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Fully decorated banquet hall</li>
                  <li>✓ Catering services included</li>
                  <li>✓ Event planning support</li>
                  <li>✓ Audio-visual equipment</li>
                </ul>
              </div>

              {/* Corporate Rates */}
              <div className="text-center">
                <div className="text-6xl mb-4">🏢</div>
                <h4 className="text-2xl font-bold text-white font-cormorant mb-4">Corporate Rates</h4>
                <div className="text-3xl font-bold text-gold mb-2">₹3,999+</div>
                <div className="text-gray-400 text-sm mb-4">Per night (bulk bookings)</div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Business center access</li>
                  <li>✓ Meeting room facilities</li>
                  <li>✓ Corporate billing</li>
                  <li>✓ Extended checkout</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-300 mb-6">
                * Prices are subject to availability and seasonal variations. Special packages and discounts available for extended stays and group bookings.
              </p>
              <button className="bg-gold text-black px-8 py-4 rounded-full font-semibold hover:bg-antique-gold transition-colors duration-300">
                View Detailed Pricing
              </button>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20 fade-slide-up">
          <h3 className="text-4xl md:text-5xl font-bold text-white font-cormorant mb-6">
            Your <span className="text-gold">Luxury Experience</span> Awaits
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 font-light">
            Don't wait - our premium rooms and event spaces book quickly. Secure your dates today and experience the finest hospitality in Lucknow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-gold to-antique-gold text-black text-xl font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/30">
              <span className="relative z-10">Book Now - Limited Availability</span>
              <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <div className="text-center">
              <div className="text-white text-sm mb-1">Need help choosing?</div>
              <button className="text-gold hover:text-antique-gold transition-colors font-semibold">
                📞 Call our experts: +91 7081207081
              </button>
            </div>
          </div>

          {/* Final Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span>🛡️</span> Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span> 24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <span>🎯</span> Best Price Guarantee
            </div>
            <div className="flex items-center gap-2">
              <span>✅</span> Instant Confirmation
            </div>
            <div className="flex items-center gap-2">
              <span>🔄</span> Flexible Cancellation
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}