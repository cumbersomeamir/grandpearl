'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MaskReveal from '../components/animations/MaskReveal'
import PhysicsCard from '../components/animations/PhysicsCard'

export default function LuxuryFeatures() {
  const sectionRef = useRef(null)
  const pinnedRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned section with scroll-linked animation
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.pinned-content',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to('.scroll-indicator', {
            scaleY: progress,
            duration: 0.1,
            ease: 'none'
          })
        }
      })

      // Timeline choreographed sequence
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      })

      masterTl
        .fromTo('.feature-image-1', 
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 }
        )
        .fromTo('.feature-content-1',
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 }, '-=0.5'
        )
        .fromTo('.feature-image-2',
          { scale: 0.8, rotation: -10 },
          { scale: 1, rotation: 0, duration: 1 }, '-=0.3'
        )
        .fromTo('.feature-content-2',
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1 }, '-=0.5'
        )

      // Blob morphing animation
      gsap.to('.blob-morph', {
        morphSVG: { shape: '.blob-shape-2' },
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      })

      // Luxury amenities hover effects
      const amenityCards = gsap.utils.toArray('.amenity-card')
      amenityCards.forEach((card, index) => {
        const icon = card.querySelector('.amenity-icon')
        const bg = card.querySelector('.amenity-bg')
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            scale: 1.05,
            rotationY: 5,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
          gsap.to(icon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
          gsap.to(bg, {
            scale: 1.1,
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            scale: 1,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(bg, {
            scale: 1,
            opacity: 0.5,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const luxuryFeatures = [
    {
      title: 'Opulent Interiors',
      description: 'Each room is a masterpiece of design, featuring hand-selected furnishings, premium fabrics, and artistic elements that create an atmosphere of refined elegance.',
      highlights: [
        'Italian marble bathrooms',
        'Egyptian cotton linens',
        'Handcrafted furniture',
        'Original artwork collections'
      ],
      image: '/api/placeholder/500/400'
    },
    {
      title: 'Personalized Service',
      description: 'Our dedicated staff provides intuitive, personalized service that anticipates your needs before you even realize them, ensuring every moment exceeds expectations.',
      highlights: [
        'Personal concierge service',
        'Butler service for suites',
        'Customized dining experiences',
        '24/7 multilingual support'
      ],
      image: '/api/placeholder/500/400'
    }
  ]

  const amenities = [
    { icon: '🍸', title: 'Premium Bar', description: 'Curated selection of finest spirits and wines' },
    { icon: '🌿', title: 'Spa & Wellness', description: 'Rejuvenating treatments and therapies' },
    { icon: '🏊', title: 'Infinity Pool', description: 'Rooftop pool with panoramic city views' },
    { icon: '🎮', title: 'Gaming Lounge', description: 'State-of-the-art entertainment center' },
    { icon: '🚗', title: 'Valet Parking', description: 'Complimentary luxury vehicle service' },
    { icon: '🏋️', title: 'Fitness Center', description: '24/7 premium gym facilities' },
    { icon: '🌸', title: 'Garden Terrace', description: 'Landscaped gardens for relaxation' },
    { icon: '🔥', title: 'Bonfire Lounge', description: 'Outdoor fireplace gathering area' }
  ]

  return (
    <section ref={sectionRef} className="relative bg-midnight overflow-hidden">
      {/* Pinned Section */}
      <div ref={pinnedRef} className="pinned-section relative min-h-screen">
        <div className="pinned-content flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 fade-slide-up">
              <h2 className="text-6xl md:text-8xl font-bold text-white font-cormorant mb-8">
                Luxury <span className="text-gold">Redefined</span>
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light">
                Where every detail whispers elegance and every moment becomes a cherished memory
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="w-1 h-32 bg-gold/20 rounded-full">
            <div className="scroll-indicator w-full bg-gold rounded-full origin-top scale-y-0"></div>
          </div>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="relative py-24">
        {luxuryFeatures.map((feature, index) => (
          <div key={index} className={`flex items-center min-h-screen ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Content */}
                <div className={`feature-content-${index + 1} ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                  <MaskReveal>
                    <h3 className="text-5xl md:text-6xl font-bold text-white font-cormorant mb-8">
                      {feature.title}
                    </h3>
                  </MaskReveal>
                  
                  <p className="text-xl text-gray-300 mb-8 font-light leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-gold rounded-full mr-4 flex-shrink-0"></div>
                        <span className="font-light">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <button className="group relative px-8 py-4 bg-gradient-to-r from-gold to-antique-gold text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gold/25">
                    <span className="relative z-10">Explore Feature</span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>

                {/* Image */}
                <div className={`feature-image-${index + 1} relative`}>
                  <div className="relative rounded-3xl overflow-hidden">
                    <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-gold/20 to-antique-gold/20 rounded-3xl flex items-center justify-center">
                      <div className="text-8xl text-gold/50">🏨</div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-gold rounded-full opacity-80 animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-antique-gold rounded-full opacity-60 animate-bounce"></div>
                  </div>

                  {/* Decorative SVG */}
                  <svg className="absolute -top-10 -left-10 w-20 h-20 text-gold/30" viewBox="0 0 100 100">
                    <path className="blob-morph" d="M50,10 Q90,30 80,70 Q50,90 20,70 Q10,30 50,10 Z" fill="currentColor" />
                    <path className="blob-shape-2" d="M50,5 Q95,25 85,75 Q50,95 15,75 Q5,25 50,5 Z" fill="currentColor" style={{ display: 'none' }} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Amenities Grid */}
      <div className="relative py-24 bg-gradient-to-b from-midnight to-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-slide-up">
            <h3 className="text-4xl md:text-5xl font-bold text-white font-cormorant mb-6">
              World-Class <span className="text-gold">Amenities</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Every amenity crafted to perfection, every service designed to delight
            </p>
          </div>

          <div className="stagger-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <PhysicsCard key={index} className="amenity-card">
                <div className="amenity-bg absolute inset-0 bg-gradient-to-br from-gold/10 to-antique-gold/10 rounded-2xl opacity-50"></div>
                <div className="relative z-10 p-6 text-center">
                  <div className="amenity-icon text-4xl mb-4 inline-block">
                    {amenity.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white font-cormorant mb-3">
                    {amenity.title}
                  </h4>
                  <p className="text-gray-400 text-sm font-light">
                    {amenity.description}
                  </p>
                </div>
              </PhysicsCard>
            ))}
          </div>
        </div>
      </div>

      {/* Luxury Standards */}
      <div className="relative py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="fade-slide-up bg-gradient-to-r from-gold/5 to-antique-gold/5 rounded-3xl p-16 border border-gold/20">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-bold text-gold font-cormorant mb-6">
                Our Luxury Standards
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
                We maintain the highest standards in luxury hospitality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold to-antique-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl text-black font-bold">5★</span>
                </div>
                <h4 className="text-2xl font-bold text-white font-cormorant mb-4">Five-Star Service</h4>
                <p className="text-gray-400 font-light">
                  Every interaction exceeds international luxury hospitality standards
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold to-antique-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl text-black font-bold">24/7</span>
                </div>
                <h4 className="text-2xl font-bold text-white font-cormorant mb-4">Round-the-Clock Care</h4>
                <p className="text-gray-400 font-light">
                  Dedicated staff available at all hours to cater to your needs
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold to-antique-gold rounded-full flex items-center justify-center">
                  <span className="text-2xl text-black font-bold">∞</span>
                </div>
                <h4 className="text-2xl font-bold text-white font-cormorant mb-4">Limitless Luxury</h4>
                <p className="text-gray-400 font-light">
                  No request too grand, no detail too small for our attention
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}