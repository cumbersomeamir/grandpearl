'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function GalleryHero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.5 })
      
      tl.fromTo('.gallery-hero-bg', 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
      )
      .fromTo('.gallery-hero-title',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' }, '-=1.5'
      )
      .fromTo('.gallery-hero-subtitle',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=1'
      )
      .fromTo('.gallery-hero-description',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.8'
      )

      // Parallax effect
      gsap.to('.gallery-hero-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="gallery-hero-bg absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop&crop=center"
          alt="Grand Pearl Hotel Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-antique-gold/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="gallery-hero-title mb-8">
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold text-white font-cormorant leading-none">
            <span className="block text-gold bg-gradient-to-r from-gold to-antique-gold bg-clip-text text-transparent">Gallery</span>
          </h1>
        </div>

        <div className="gallery-hero-subtitle mb-8">
          <h2 className="text-3xl md:text-5xl font-light text-gold font-cormorant tracking-wide">
            Moments of Luxury Captured
          </h2>
        </div>

        <div className="gallery-hero-description max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light tracking-wide">
            Explore our collection of breathtaking images and videos showcasing the unparalleled elegance, 
            world-class amenities, and unforgettable experiences at Grand Pearl Hotel.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-12 border-2 border-gold rounded-full flex justify-center relative overflow-hidden">
            <div className="w-2 h-4 bg-gradient-to-b from-gold to-antique-gold rounded-full mt-3 animate-bounce"></div>
          </div>
          <p className="text-gold text-sm mt-3 font-light tracking-widest">EXPLORE GALLERY</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-gold/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-gold/20 to-antique-gold/20 rounded-full animate-float"></div>
    </section>
  )
}