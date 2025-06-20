'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CountUp from './animations/CountUp'

export default function StatsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium background gradient animation
      gsap.to('.stats-gradient', {
        backgroundPosition: '400% 50%',
        duration: 15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })

      // Luxury card hover animations with enhanced effects
      const statCards = gsap.utils.toArray('.stat-card')
      statCards.forEach(card => {
        const icon = card.querySelector('.stat-icon')
        const number = card.querySelector('.stat-number')
        const label = card.querySelector('.stat-label')
        const glow = card.querySelector('.card-glow')

        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            scale: 1.08, 
            rotationY: 8,
            z: 60,
            duration: 0.5, 
            ease: 'back.out(1.4)' 
          })
          gsap.to(icon, { 
            rotation: 360, 
            scale: 1.3,
            duration: 0.8, 
            ease: 'back.out(1.4)' 
          })
          gsap.to([number, label], {
            color: '#D4AF37',
            textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
            duration: 0.4,
            ease: 'power2.out'
          })
          gsap.to(glow, {
            opacity: 1,
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            scale: 1, 
            rotationY: 0,
            z: 0,
            duration: 0.5, 
            ease: 'power2.out' 
          })
          gsap.to(icon, { 
            rotation: 0, 
            scale: 1,
            duration: 0.5, 
            ease: 'power2.out' 
          })
          gsap.to(number, {
            color: '#ffffff',
            textShadow: 'none',
            duration: 0.4,
            ease: 'power2.out'
          })
          gsap.to(label, {
            color: '#D4AF37',
            textShadow: 'none',
            duration: 0.4,
            ease: 'power2.out'
          })
          gsap.to(glow, {
            opacity: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          })
        })
      })

      // Enhanced floating particles animation
      gsap.to('.floating-particle', {
        y: 'random(-80, 80)',
        x: 'random(-50, 50)',
        rotation: 'random(-270, 270)',
        scale: 'random(0.5, 1.5)',
        duration: 'random(4, 8)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 3,
          from: 'random'
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    {
      icon: '🏨',
      number: 98,
      suffix: '%',
      label: 'Guest Satisfaction Rate',
      description: 'Based on 500+ verified reviews across platforms'
    },
    {
      icon: '⭐',
      number: 4.8,
      suffix: '/5',
      label: 'Average Rating',
      description: 'Consistently rated across all booking platforms'
    },
    {
      icon: '🎉',
      number: 1250,
      suffix: '+',
      label: 'Events Hosted',
      description: 'Weddings, corporate events & celebrations'
    },
    {
      icon: '🛏️',
      number: 12,
      suffix: '',
      label: 'Luxury Rooms',
      description: 'Premium accommodations & executive suites'
    },
    {
      icon: '👥',
      number: 500,
      suffix: '+',
      label: 'Guest Capacity',
      description: 'Combined banquet hall seating capacity'
    },
    {
      icon: '🕐',
      number: 24,
      suffix: '/7',
      label: 'Concierge Service',
      description: 'Round-the-clock luxury hospitality'
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-32 bg-charcoal overflow-hidden">
      {/* Premium animated background with luxury gradient */}
      <div className="stats-gradient absolute inset-0 bg-gradient-to-r from-black via-charcoal via-midnight to-black bg-[length:400%_100%]"></div>
      
      {/* High-resolution background image with gold overlay */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&h=1080&fit=crop&crop=center"
          alt="Luxury Hotel Statistics Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-antique-gold/20"></div>
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="floating-particle absolute bg-gradient-to-br from-gold to-antique-gold rounded-full shadow-lg shadow-gold/30"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Premium section header */}
        <div className="text-center mb-20 fade-slide-up">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white font-cormorant mb-8 leading-none">
            Excellence in <span className="text-gold bg-gradient-to-r from-gold to-antique-gold bg-clip-text text-transparent">Numbers</span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-200 max-w-5xl mx-auto font-light leading-relaxed tracking-wide">
            Since our establishment in 2021, Grand Pearl Hotel has set new standards in luxury hospitality, 
            creating memorable experiences for thousands of distinguished guests from around the world.
          </p>
        </div>

        {/* Premium stats grid with luxury styling */}
        <div className="stagger-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card group relative bg-gradient-to-br from-midnight via-charcoal to-black p-10 rounded-3xl border-2 border-gold/30 hover:border-gold transition-all duration-500 backdrop-blur-sm shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Luxury card glow effect */}
              <div className="card-glow absolute inset-0 bg-gradient-radial from-gold/15 via-antique-gold/10 to-transparent opacity-0 rounded-3xl"></div>
              
              {/* Metallic border overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold/20 via-transparent to-antique-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="stat-icon text-6xl md:text-7xl mb-6 inline-block filter drop-shadow-lg">
                  {stat.icon}
                </div>
                <div className="stat-number text-5xl md:text-7xl lg:text-8xl font-bold text-white font-cormorant mb-4 leading-none">
                  <CountUp end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="stat-label text-xl md:text-2xl font-bold text-gold mb-4 tracking-wide">
                  {stat.label}
                </div>
                <div className="text-gray-300 text-base md:text-lg font-light leading-relaxed tracking-wide">
                  {stat.description}
                </div>
              </div>

              {/* Premium decorative corner elements */}
              <div className="absolute top-6 right-6 w-8 h-8 border-t-3 border-r-3 border-gold/40 group-hover:border-gold transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-3 border-l-3 border-gold/40 group-hover:border-gold transition-colors duration-500"></div>
            </div>
          ))}
        </div>

        {/* Luxury industry facts section with premium styling */}
        <div className="fade-slide-up bg-gradient-to-br from-gold/15 via-antique-gold/10 to-pale-gold/5 rounded-3xl p-16 border-2 border-gold/30 shadow-2xl shadow-gold/10 backdrop-blur-sm">
          <h3 className="text-4xl md:text-6xl font-bold text-gold font-cormorant text-center mb-16 tracking-wide">
            Luxury Hospitality Industry Excellence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white font-cormorant mb-3 group-hover:text-gold transition-colors duration-300">₹2.1T</div>
              <div className="text-gold font-bold text-lg mb-3 tracking-wide">India Hotel Industry</div>
              <div className="text-gray-300 text-sm font-light">Projected market size by 2025</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white font-cormorant mb-3 group-hover:text-gold transition-colors duration-300">85%</div>
              <div className="text-gold font-bold text-lg mb-3 tracking-wide">Luxury Segment Growth</div>
              <div className="text-gray-300 text-sm font-light">Year-over-year expansion rate</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white font-cormorant mb-3 group-hover:text-gold transition-colors duration-300">₹15K</div>
              <div className="text-gold font-bold text-lg mb-3 tracking-wide">Premium Average Rate</div>
              <div className="text-gray-300 text-sm font-light">Per night in tier-1 cities</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-white font-cormorant mb-3 group-hover:text-gold transition-colors duration-300">92%</div>
              <div className="text-gold font-bold text-lg mb-3 tracking-wide">Occupancy Excellence</div>
              <div className="text-gray-300 text-sm font-light">Luxury hotel standard benchmark</div>
            </div>
          </div>
        </div>

        {/* Premium achievement badges with metallic styling */}
        <div className="flex flex-wrap justify-center gap-8 mt-20 fade-slide-up">
          <div className="bg-gradient-to-r from-gold via-antique-gold to-gold text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl shadow-gold/30 border-2 border-gold hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            TripAdvisor Excellence Award
          </div>
          
          <div className="bg-gradient-to-r from-gold via-antique-gold to-gold text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl shadow-gold/30 border-2 border-gold hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            5-Star Luxury Certification
          </div>
          
          <div className="bg-gradient-to-r from-gold via-antique-gold to-gold text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl shadow-gold/30 border-2 border-gold hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Best Banquet Venue 2024
          </div>
        </div>
      </div>
    </section>
  )
}