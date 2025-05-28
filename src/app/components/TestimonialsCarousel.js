'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

export default function TestimonialsCarousel() {
  const carouselRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      role: 'Wedding Client',
      location: 'Mumbai',
      rating: 5,
      text: 'Grand Pearl Hotel exceeded every expectation for our wedding celebration. The banquet hall was absolutely stunning, and the service was impeccable. Our 400 guests were thoroughly impressed with the luxury and attention to detail.',
      event: 'Wedding Reception - 400 Guests',
      date: 'December 2024'
    },
    {
      id: 2,
      name: 'Priya Verma',
      role: 'Corporate Client',
      location: 'Delhi',
      rating: 5,
      text: 'We hosted our annual corporate conference at Grand Pearl, and the experience was phenomenal. The modern facilities, excellent catering, and professional staff made our event a huge success. Highly recommended for business events.',
      event: 'Corporate Conference - 250 Attendees',
      date: 'November 2024'
    },
    {
      id: 3,
      name: 'Amit & Kavya Gupta',
      role: 'Honeymoon Guests',
      location: 'Bangalore',
      rating: 5,
      text: 'Our honeymoon stay at Grand Pearl was magical. The luxury suite, personalized service, and romantic ambiance created memories we\'ll cherish forever. The rooftop dining experience was particularly unforgettable.',
      event: 'Honeymoon Suite - 5 Days',
      date: 'January 2025'
    },
    {
      id: 4,
      name: 'Dr. Sunita Rao',
      role: 'Medical Conference',
      location: 'Chennai',
      rating: 5,
      text: 'The medical symposium we organized was executed flawlessly. The hotel\'s attention to detail, from technical support to catering, was outstanding. The proximity to IIM Lucknow was an added advantage for our delegates.',
      event: 'Medical Symposium - 300 Delegates',
      date: 'October 2024'
    },
    {
      id: 5,
      name: 'Rohit Khanna',
      role: 'Business Traveler',
      location: 'Pune',
      rating: 5,
      text: 'As a frequent business traveler, I can confidently say Grand Pearl Hotel sets the gold standard for luxury hospitality in Lucknow. The rooms are exquisite, and the business center facilities are top-notch.',
      event: 'Business Stay - Executive Suite',
      date: 'March 2025'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-scroll carousel
      const autoScroll = gsap.to(carouselRef.current, {
        x: () => -((testimonials.length - 1) * 400),
        duration: testimonials.length * 8,
        ease: 'none',
        repeat: -1,
        paused: true
      })

      // Draggable carousel with momentum
      Draggable.create(carouselRef.current, {
        type: 'x',
        bounds: { minX: -((testimonials.length - 1) * 400), maxX: 0 },
        inertia: true,
        snap: {
          x: function(endValue) {
            return Math.round(endValue / 400) * 400
          }
        },
        onPress: () => autoScroll.pause(),
        onRelease: () => autoScroll.play(),
        onDrag: function() {
          const slideIndex = Math.abs(Math.round(this.x / 400))
          setCurrentSlide(slideNumber)
        }
      })

      // Start auto-scroll
      autoScroll.play()

      // Card hover animations
      const cards = gsap.utils.toArray('.testimonial-card')
      cards.forEach(card => {
        const tl = gsap.timeline({ paused: true })
        
        tl.to(card, {
          scale: 1.05,
          rotationY: 5,
          z: 50,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
        .to(card.querySelector('.card-glow'), {
          opacity: 1,
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        }, '<')

        card.addEventListener('mouseenter', () => tl.play())
        card.addEventListener('mouseleave', () => tl.reverse())
      })

      // Star rating animation
      gsap.utils.toArray('.star-rating').forEach(rating => {
        const stars = rating.querySelectorAll('.star')
        gsap.from(stars, {
          scale: 0,
          rotation: 180,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: rating,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      })

    }, carouselRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-antique-gold/5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 fade-slide-up">
          <h2 className="text-5xl md:text-7xl font-bold text-white font-cormorant mb-8">
            Guest <span className="text-gold">Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Discover why guests from across India choose Grand Pearl Hotel for their most important moments
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="star-rating flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star text-2xl text-gold">★</span>
              ))}
            </div>
            <div className="text-2xl font-bold text-white font-cormorant">4.8/5</div>
            <div className="text-gray-400">Based on 500+ reviews</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <div 
              ref={carouselRef} 
              className="flex gap-8 cursor-grab active:cursor-grabbing"
              style={{ width: `${testimonials.length * 400}px` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className="testimonial-card flex-shrink-0 w-96 bg-gradient-to-br from-midnight to-charcoal rounded-3xl border border-gold/20 overflow-hidden relative"
                >
                  {/* Card Glow Effect */}
                  <div className="card-glow absolute inset-0 bg-gradient-radial from-gold/10 to-transparent opacity-0 scale-90"></div>

                  <div className="relative z-10 p-8">
                    {/* Quote Icon */}
                    <div className="text-4xl text-gold/50 mb-6">❝</div>

                    {/* Testimonial Text */}
                    <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
                      {testimonial.text}
                    </p>

                    {/* Event Details */}
                    <div className="bg-gold/10 rounded-xl p-4 mb-6">
                      <div className="text-gold font-semibold text-sm mb-1">
                        {testimonial.event}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.date}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="star-rating flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star text-xl text-gold">★</span>
                      ))}
                    </div>

                    {/* Guest Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold text-lg font-cormorant">
                          {testimonial.name}
                        </div>
                        <div className="text-gold text-sm">
                          {testimonial.role}
                        </div>
                        <div className="text-gray-400 text-sm">
                          📍 {testimonial.location}
                        </div>
                      </div>
                      
                      {/* Avatar Placeholder */}
                      <div className="w-16 h-16 bg-gradient-to-br from-gold to-antique-gold rounded-full flex items-center justify-center text-black font-bold text-xl">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-gold/30"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-gold scale-125' : 'bg-gold/30 hover:bg-gold/50'
                }`}
                onClick={() => {
                  gsap.to(carouselRef.current, {
                    x: -index * 400,
                    duration: 0.5,
                    ease: 'power2.out'
                  })
                  setCurrentSlide(index)
                }}
              />
            ))}
          </div>
        </div>

        {/* Review Platforms */}
        <div className="fade-slide-up text-center">
          <h3 className="text-2xl font-bold text-white font-cormorant mb-8">
            Featured on Leading Platforms
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3 bg-midnight/50 px-6 py-4 rounded-full border border-gold/20">
              <div className="text-2xl">🏨</div>
              <div>
                <div className="text-white font-semibold">MakeMyTrip</div>
                <div className="text-gold text-sm">3.4/5 ★</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-midnight/50 px-6 py-4 rounded-full border border-gold/20">
              <div className="text-2xl">🅾️</div>
              <div>
                <div className="text-white font-semibold">OYO</div>
                <div className="text-gold text-sm">4.6/5 ★</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-midnight/50 px-6 py-4 rounded-full border border-gold/20">
              <div className="text-2xl">🌐</div>
              <div>
                <div className="text-white font-semibold">Booking.com</div>
                <div className="text-gold text-sm">4.5/5 ★</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-midnight/50 px-6 py-4 rounded-full border border-gold/20">
              <div className="text-2xl">✈️</div>
              <div>
                <div className="text-white font-semibold">Goibibo</div>
                <div className="text-gold text-sm">4.4/5 ★</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 fade-slide-up">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold font-cormorant mb-2">500+</div>
            <div className="text-white font-semibold mb-1">Reviews</div>
            <div className="text-gray-400 text-sm">Verified guest feedback</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gold font-cormorant mb-2">98%</div>
            <div className="text-white font-semibold mb-1">Satisfaction</div>
            <div className="text-gray-400 text-sm">Would recommend to others</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gold font-cormorant mb-2">4.8</div>
            <div className="text-white font-semibold mb-1">Average Rating</div>
            <div className="text-gray-400 text-sm">Across all platforms</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gold font-cormorant mb-2">95%</div>
            <div className="text-white font-semibold mb-1">Repeat Guests</div>
            <div className="text-gray-400 text-sm">Return for future events</div>
          </div>
        </div>
      </div>
    </section>
  )
}