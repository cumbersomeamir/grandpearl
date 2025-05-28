'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import LiquidButton from '../components/animations/LiquidButton'
import SVGStrokeDraw from '../components/animations/SVGStrokeDraw'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable)
}

export default function ServicesShowcase() {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      title: 'Luxury Accommodation',
      subtitle: 'Premium Rooms & Suites',
      description: 'Experience unparalleled comfort in our meticulously designed rooms featuring city views, premium amenities, and 24/7 personalized service.',
      features: [
        'Air-conditioned luxury rooms',
        'Private bathrooms with premium toiletries',
        'City skyline views',
        'Work desk and high-speed Wi-Fi',
        '24/7 room service',
        'Daily housekeeping'
      ],
      price: 'Starting ₹4,999/night',
      icon: '🏨',
      image: '/api/placeholder/600/400',
      stats: { rooms: 45, rating: 4.8, guests: '10,000+' }
    },
    {
      id: 2,
      title: 'Banquet & Events',
      subtitle: 'Grand Celebration Halls',
      description: 'Host unforgettable weddings, corporate events, and celebrations in our two fully air-conditioned banquet halls with complete event management.',
      features: [
        '2 Premium banquet halls',
        'Capacity up to 500 guests',
        'Full air-conditioning',
        'Custom event themes',
        'Professional event planning',
        'Audio-visual equipment'
      ],
      price: 'Starting ₹2,50,000/event',
      icon: '🎉',
      image: '/api/placeholder/600/400',
      stats: { events: 1250, capacity: 500, satisfaction: '98%' }
    },
    {
      id: 3,
      title: 'Fine Dining',
      subtitle: 'Restaurant & Cloud Kitchen',
      description: 'Indulge in exquisite culinary experiences with our multi-cuisine restaurant, cloud kitchen services, and premium catering options.',
      features: [
        'Multi-cuisine restaurant',
        'Cloud kitchen services',
        'Premium catering',
        'Custom menu planning',
        'Dietary accommodations',
        'Private dining options'
      ],
      price: 'À la carte & packages',
      icon: '🍽️',
      image: '/api/placeholder/600/400',
      stats: { dishes: 200, chefs: 8, cuisines: 12 }
    },
    {
      id: 4,
      title: 'Premium Amenities',
      subtitle: 'Luxury Facilities',
      description: 'Enjoy our comprehensive range of luxury amenities including bar, terrace, garden, indoor games, and premium transportation services.',
      features: [
        'On-site premium bar',
        'Rooftop terrace & garden',
        'Indoor gaming lounge',
        'Bonfire & fireplace areas',
        'Airport shuttle service',
        'Concierge services'
      ],
      price: 'Included with stay',
      icon: '🌟',
      image: '/api/placeholder/600/400',
      stats: { amenities: 15, satisfaction: '96%', hours: '24/7' }
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Service card morphing animation
      const cards = gsap.utils.toArray('.service-card')
      cards.forEach((card, index) => {
        const tl = gsap.timeline({ paused: true })
        
        tl.to(card, {
          scale: 1.05,
          rotationY: 10,
          z: 100,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
        .to(card.querySelector('.card-content'), {
          y: -20,
          duration: 0.3,
          ease: 'power2.out'
        }, '-=0.3')
        .to(card.querySelector('.service-features'), {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.2')

        card.addEventListener('mouseenter', () => tl.play())
        card.addEventListener('mouseleave', () => tl.reverse())
      })

      // Draggable carousel
      if (carouselRef.current) {
        Draggable.create(carouselRef.current, {
          type: 'x',
          bounds: { minX: -((services.length - 1) * 400), maxX: 0 },
          inertia: true,
          snap: {
            x: function(endValue) {
              return Math.round(endValue / 400) * 400
            }
          },
          onDrag: function() {
            const activeIndex = Math.abs(Math.round(this.x / 400))
            setActiveService(activeIndex)
          }
        })
      }

      // Service icon animations
      gsap.to('.service-icon', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 2
      })

      // Background pattern animation
      gsap.to('.pattern-element', {
        rotation: 'random(-180, 180)',
        scale: 'random(0.5, 1.5)',
        duration: 'random(10, 20)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 5,
          from: 'random'
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="pattern-element absolute w-8 h-8 border border-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 fade-slide-up">
          <div className="inline-block mb-6">
            <SVGStrokeDraw 
              path="M50,25 Q75,5 100,25 Q125,45 150,25"
              className="w-32 h-12 stroke-gold stroke-2 fill-none"
            />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white font-cormorant mb-8">
            <span className="text-reveal">Our Premium</span>
            <br />
            <span className="text-gold text-reveal">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Discover a world of luxury and comfort with our comprehensive range of premium services, 
            designed to exceed your expectations and create unforgettable experiences.
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative mb-20">
          <div className="overflow-hidden">
            <div ref={carouselRef} className="flex gap-8" style={{ width: `${services.length * 400}px` }}>
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className={`service-card flex-shrink-0 w-96 bg-gradient-to-br from-charcoal to-midnight rounded-3xl border border-gold/20 overflow-hidden cursor-pointer transition-all duration-500 ${
                    index === activeService ? 'border-gold shadow-2xl shadow-gold/25' : ''
                  }`}
                >
                  {/* Service Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gold/20 to-antique-gold/20 flex items-center justify-center">
                    <div className="service-icon text-6xl">{service.icon}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent"></div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white font-cormorant mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gold font-semibold text-lg">
                        {service.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-300 mb-6 font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Service Features */}
                    <div className="service-features h-0 opacity-0 overflow-hidden">
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-400">
                            <span className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Service Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-gold/20">
                      {Object.entries(service.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-gold font-cormorant">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex justify-between items-center">
                      <div className="text-white font-semibold">
                        {service.price}
                      </div>
                      <LiquidButton text="Learn More" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeService ? 'bg-gold scale-125' : 'bg-gold/30'
                }`}
                onClick={() => {
                  gsap.to(carouselRef.current, {
                    x: -index * 400,
                    duration: 0.5,
                    ease: 'power2.out'
                  })
                  setActiveService(index)
                }}
              />
            ))}
          </div>
        </div>

        {/* Service Excellence Facts */}
        <div className="fade-slide-up bg-gradient-to-r from-gold/5 to-antique-gold/5 rounded-3xl p-12 border border-gold/10">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gold font-cormorant mb-12">
            Service Excellence Standards
          </h3>
          
          <div className="stagger-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold to-antique-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-2xl font-bold text-white font-cormorant mb-2">&lt; 5 min</div>
              <div className="text-gold font-semibold mb-2">Response Time</div>
              <div className="text-gray-400 text-sm">Average service request response</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold to-antique-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="text-2xl font-bold text-white font-cormorant mb-2">99.2%</div>
              <div className="text-gold font-semibold mb-2">Service Accuracy</div>
              <div className="text-gray-400 text-sm">First-time service delivery success</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold to-antique-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-2xl font-bold text-white font-cormorant mb-2">50+</div>
              <div className="text-gold font-semibold mb-2">Expert Staff</div>
              <div className="text-gray-400 text-sm">Trained hospitality professionals</div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold to-antique-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-2xl font-bold text-white font-cormorant mb-2">15+</div>
              <div className="text-gold font-semibold mb-2">Awards Won</div>
              <div className="text-gray-400 text-sm">Hospitality & service excellence</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-slide-up">
          <h3 className="text-3xl font-bold text-white font-cormorant mb-6">
            Ready to Experience Luxury?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our concierge team to customize your perfect stay or event package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LiquidButton text="Book Your Stay" className="bg-gold text-black" />
            <LiquidButton text="Plan Your Event" className="border-gold text-gold" />
          </div>
        </div>
      </div>
    </section>
  )
}