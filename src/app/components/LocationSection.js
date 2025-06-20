'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

export default function LocationSection() {
  const sectionRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Motion path animation for location pin
      gsap.to('.location-pin', {
        motionPath: {
          path: 'M0,0 Q50,-30 100,0 Q150,30 200,0',
          align: 'self',
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        },
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })

      // Map reveal animation
      gsap.fromTo('.map-container', {
        scale: 0.8,
        opacity: 0,
        rotationY: -45
      }, {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Distance markers animation
      gsap.from('.distance-marker', {
        scale: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.distance-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Transportation options hover
      const transportCards = gsap.utils.toArray('.transport-card')
      transportCards.forEach(card => {
        const icon = card.querySelector('.transport-icon')
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
          gsap.to(icon, {
            rotation: 10,
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })

      // Floating location elements
      gsap.to('.floating-location', {
        y: -20,
        rotation: 5,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 1
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const locationFeatures = [
    {
      icon: '🏛️',
      title: 'IIM Lucknow Campus',
      distance: '3 km',
      description: 'Adjacent to prestigious IIM campus'
    },
    {
      icon: '✈️',
      title: 'International Airport',
      distance: '25.5 km',
      description: 'Chaudhary Charan Singh Airport'
    },
    {
      icon: '🚇',
      title: 'Metro Station',
      distance: '3 km',
      description: 'Connected to city metro network'
    },
    {
      icon: '🏙️',
      title: 'Central Lucknow',
      distance: '7 km',
      description: 'Easy access to city center'
    },
    {
      icon: '🏫',
      title: 'Lucknow University',
      distance: '5 km',
      description: 'Near educational hub'
    },
    {
      icon: '🏟️',
      title: 'KD Singh Stadium',
      distance: '6 km',
      description: 'Sports and entertainment venue'
    }
  ]

  const nearbyAttractions = [
    { name: 'Domino\'s Pizza', type: 'Restaurant', distance: '0.5 km' },
    { name: 'KFC', type: 'Restaurant', distance: '0.8 km' },
    { name: 'Twilight Kitchen & Bar', type: 'Fine Dining', distance: '1.2 km' },
    { name: 'Phoenix United Mall', type: 'Shopping', distance: '4 km' },
    { name: 'Hazratganj Market', type: 'Shopping', distance: '8 km' },
    { name: 'Bara Imambara', type: 'Historic Site', distance: '12 km' }
  ]

  const transportOptions = [
    {
      icon: '🚗',
      title: 'Complimentary Shuttle',
      description: 'Airport pickup & drop service',
      availability: '24/7 on request'
    },
    {
      icon: '🚕',
      title: 'Taxi Service',
      description: 'Dedicated cab booking desk',
      availability: 'Always available'
    },
    {
      icon: '🚌',
      title: 'Public Transport',
      description: 'Metro & bus connectivity',
      availability: '6 AM - 11 PM'
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-black to-charcoal overflow-hidden">
      {/* Floating Location Elements */}
      <div className="floating-location absolute top-20 left-10 w-8 h-8 bg-gold/30 rounded-full"></div>
      <div className="floating-location absolute top-40 right-20 w-6 h-6 bg-antique-gold/40 rounded-full"></div>
      <div className="floating-location absolute bottom-32 left-16 w-10 h-10 bg-gold/20 rounded-full"></div>

      {/* Animated Path Background */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <path
          d="M0,400 Q300,200 600,400 Q900,600 1200,400"
          stroke="#d3af37"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10,5"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;30"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 fade-slide-up">
          <h2 className="text-5xl md:text-7xl font-bold text-white font-cormorant mb-8">
            Prime <span className="text-gold">Location</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-8">
            Strategically located in Muttakipur, IIM Road, Lucknow - where convenience meets luxury in the heart of Uttar Pradesh's capital city
          </p>
          
          {/* Address */}
          <div className="bg-gradient-to-r from-gold/10 to-antique-gold/10 rounded-2xl p-6 max-w-2xl mx-auto border border-gold/20">
            <div className="text-2xl text-gold font-cormorant font-bold mb-2">📍 Our Address</div>
            <div className="text-white text-lg">Muttakipur, IIM Road, Lucknow</div>
            <div className="text-gray-300">Uttar Pradesh 226020, India</div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div ref={mapRef} className="mb-20">
          <div className="map-container bg-gradient-to-br from-midnight to-charcoal rounded-3xl border border-gold/20 overflow-hidden">
            <div className="relative h-96 bg-gradient-to-br from-gold/5 to-antique-gold/5 flex items-center justify-center">
              {/* Map Placeholder with Animation */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-6xl text-gold/50">🗺️</div>
                
                {/* Animated Location Pin */}
                <div className="location-pin absolute text-4xl text-gold">📍</div>
                
                {/* Location Pulse Effect */}
                <div className="absolute w-20 h-20 border-2 border-gold rounded-full animate-ping opacity-30"></div>
                <div className="absolute w-32 h-32 border border-gold rounded-full animate-pulse opacity-20"></div>
              </div>

              {/* Map Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gold/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gold font-semibold">Grand Pearl Hotel & Banquet</div>
                      <div className="text-white text-sm">Muttakipur, IIM Road, Lucknow</div>
                    </div>
                    <button className="bg-gold text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-antique-gold transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distance Grid */}
        <div className="distance-grid mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-white font-cormorant text-center mb-12">
            Strategic <span className="text-gold">Connectivity</span>
          </h3>
          
          <div className="stagger-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locationFeatures.map((feature, index) => (
              <div key={index} className="distance-marker bg-gradient-to-br from-midnight to-charcoal rounded-2xl p-8 border border-gold/20 text-center hover:border-gold/50 transition-colors group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="text-2xl font-bold text-gold font-cormorant mb-2">
                  {feature.distance}
                </div>
                <div className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </div>
                <div className="text-gray-400 text-sm font-light">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation Options */}
        <div className="mb-20 fade-slide-up">
          <h3 className="text-3xl md:text-4xl font-bold text-white font-cormorant text-center mb-12">
            Transportation <span className="text-gold">Services</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transportOptions.map((transport, index) => (
              <div key={index} className="transport-card bg-gradient-to-br from-charcoal to-midnight rounded-2xl p-8 border border-gold/20 text-center">
                <div className="transport-icon text-5xl mb-6">
                  {transport.icon}
                </div>
                <h4 className="text-xl font-bold text-white font-cormorant mb-4">
                  {transport.title}
                </h4>
                <p className="text-gray-300 mb-4 font-light">
                  {transport.description}
                </p>
                <div className="text-gold text-sm font-semibold">
                  {transport.availability}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="mb-20 fade-slide-up">
          <h3 className="text-3xl md:text-4xl font-bold text-white font-cormorant text-center mb-12">
            Nearby <span className="text-gold">Attractions</span>
          </h3>
          
          <div className="bg-gradient-to-r from-gold/5 to-antique-gold/5 rounded-3xl p-12 border border-gold/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyAttractions.map((attraction, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-midnight/50 rounded-xl border border-gold/20">
                  <div>
                    <div className="text-white font-semibold">{attraction.name}</div>
                    <div className="text-gold text-sm">{attraction.type}</div>
                  </div>
                  <div className="text-gray-400 text-sm font-light">
                    {attraction.distance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center fade-slide-up">
          <h3 className="text-3xl font-bold text-white font-cormorant mb-8">
            Ready to <span className="text-gold">Visit Us?</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-midnight to-charcoal rounded-2xl p-8 border border-gold/20">
              <div className="text-3xl text-gold mb-4">📞</div>
              <div className="text-white font-semibold mb-2">Call Us</div>
              <div className="text-gray-300 text-sm space-y-1">
                <div>+91 7081207081</div>
                <div>+91 9307928813</div>
                <div>+91 9335902391</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-midnight to-charcoal rounded-2xl p-8 border border-gold/20">
              <div className="text-3xl text-gold mb-4">✉️</div>
              <div className="text-white font-semibold mb-2">Email Us</div>
              <div className="text-gray-300 text-sm">
                grandpearlvenues@gmail.com
              </div>
            </div>

            <div className="bg-gradient-to-br from-midnight to-charcoal rounded-2xl p-8 border border-gold/20">
              <div className="text-3xl text-gold mb-4">🕒</div>
              <div className="text-white font-semibold mb-2">Reception Hours</div>
              <div className="text-gray-300 text-sm">
                24/7 Available
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gold text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/25">
              <span className="relative z-10">Get Directions</span>
            </button>
            
            <button className="group relative px-8 py-4 border-2 border-gold text-gold font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-black">
              <span className="relative z-10">Book Transportation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}