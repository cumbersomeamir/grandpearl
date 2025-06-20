'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SVGMorph from './animations/SVGMorph'
import GlitchText from './animations/GlitchText'

export default function HeroSection() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium hero timeline animation
      const tl = gsap.timeline({ delay: 1.5 })
      
      // Luxury layered reveal sequence
      tl.fromTo('.hero-bg-layer-1', 
        { scale: 1.3, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.out' }
      )
      .fromTo('.hero-bg-layer-2',
        { x: -150, opacity: 0, skewX: 15 },
        { x: 0, opacity: 0.8, skewX: 0, duration: 2, ease: 'power3.out' }, '-=2'
      )
      .fromTo('.hero-title-main',
        { y: 200, opacity: 0, rotateX: -45, scale: 0.8 },
        { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.8, ease: 'back.out(1.4)' }, '-=1.5'
      )
      .fromTo('.hero-subtitle',
        { y: 120, opacity: 0, letterSpacing: '0.5em' },
        { y: 0, opacity: 1, letterSpacing: '0.2em', duration: 1.4, ease: 'power3.out' }, '-=1.2'
      )
      .fromTo('.hero-description',
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=1'
      )
      .fromTo('.hero-cta-buttons',
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)' }, '-=0.8'
      )

      // Premium floating animation for decorative elements
      gsap.to('.floating-element', {
        y: -30,
        rotation: 8,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.7
      })

      // Enhanced parallax scroll effect
      gsap.to('.hero-parallax-bg', {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      // Luxury 3D tilt effect on hero content
      const heroContent = heroRef.current?.querySelector('.hero-content')
      if (heroContent) {
        heroContent.addEventListener('mousemove', (e) => {
          const rect = heroContent.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(heroContent, {
            rotationX: y / 30,
            rotationY: -x / 30,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1200
          })
        })

        heroContent.addEventListener('mouseleave', () => {
          gsap.to(heroContent, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'power2.out'
          })
        })
      }

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* High-resolution hero background with gold overlay */}
      <div className="absolute inset-0">
        <div className="hero-parallax-bg absolute inset-0 z-0">
          <div className="hero-bg-layer-1 absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&crop=center"
              alt="Luxury Hotel Interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-antique-gold/10"></div>
          </div>
          <div className="hero-bg-layer-2 absolute inset-0 bg-gradient-to-r from-transparent via-gold/8 to-transparent"></div>
        </div>
      </div>

      {/* Premium animated background pattern */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="luxury-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              <circle cx="150" cy="150" r="3" fill="#d3af37" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle cx="75" cy="75" r="2" fill="#d3af37" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="225" cy="225" r="2.5" fill="#C49E3B" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.95;0.5" dur="8s" repeatCount="indefinite" />
              </circle>
              <path d="M100,100 L200,100 L150,200 Z" fill="none" stroke="#d3af37" strokeWidth="0.5" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite" />
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#luxury-pattern)" />
        </svg>
      </div>

      {/* Premium floating decorative elements */}
      <div className="floating-element absolute top-24 left-24 w-6 h-6 bg-gradient-to-br from-gold to-antique-gold rounded-full shadow-lg shadow-gold/50"></div>
      <div className="floating-element absolute top-48 right-40 w-8 h-8 border-2 border-gold rounded-full shadow-lg shadow-gold/30"></div>
      <div className="floating-element absolute bottom-40 left-20 w-5 h-5 bg-gradient-to-br from-antique-gold to-gold rounded-full shadow-lg shadow-antique-gold/50"></div>
      <div className="floating-element absolute bottom-32 right-32">
        <SVGMorph />
      </div>

      {/* Luxury Hero Content */}
      <div className="hero-content relative z-10 text-center px-6 max-w-7xl mx-auto">
        <div className="hero-title-main mb-10">
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold text-white font-cormorant leading-none tracking-tight">
            <span className="block text-gold shimmer-effect bg-gradient-to-r from-gold via-antique-gold to-gold bg-clip-text text-transparent bg-size-200 animate-shimmer">GRAND</span>
            <span className="block text-white drop-shadow-2xl">PEARL</span>
            <GlitchText text="HOTEL" className="block text-pale-gold drop-shadow-xl" />
          </h1>
        </div>

        <div className="hero-subtitle mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-gold font-cormorant tracking-wide">
            Where Luxury Meets Perfection
          </h2>
        </div>

        <div className="hero-description mb-16 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light tracking-wide">
            Experience unparalleled hospitality in the heart of Lucknow. Since 2021, Grand Pearl Hotel 
            has redefined luxury accommodation with world-class amenities, exquisite dining, and 
            unforgettable events in our premium banquet halls.
          </p>
        </div>

        <div className="hero-cta-buttons flex flex-col sm:flex-row gap-8 justify-center items-center">
          <button className="group relative px-12 py-6 bg-gradient-to-r from-gold via-antique-gold to-gold text-black text-xl font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-gold/40 border-2 border-transparent hover:border-gold">
            <span className="relative z-10 tracking-wide">Reserve Your Luxury Stay</span>
            <div className="absolute inset-0 bg-gradient-to-r from-antique-gold via-gold to-antique-gold transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
          
          <button className="group relative px-12 py-6 border-3 border-gold text-gold text-xl font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:bg-gradient-to-r hover:from-gold hover:to-antique-gold hover:text-black hover:shadow-2xl hover:shadow-gold/40">
            <span className="relative z-10 tracking-wide">Explore Our Venue</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-antique-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* Premium scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-12 border-3 border-gold rounded-full flex justify-center relative overflow-hidden">
            <div className="w-2 h-4 bg-gradient-to-b from-gold to-antique-gold rounded-full mt-3 animate-bounce"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gold/20"></div>
          </div>
          <p className="text-gold text-sm mt-3 font-light tracking-widest">SCROLL TO EXPLORE</p>
        </div>
      </div>

      {/* Luxury badges with metallic borders */}
      <div className="absolute top-10 right-10 bg-gradient-to-r from-gold via-antique-gold to-gold text-black px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-gold/30 border-2 border-gold">
        <span className="flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Premium Luxury Hotel
        </span>
      </div>

      <div className="absolute top-10 left-10 border-3 border-gold text-gold px-6 py-3 rounded-full text-lg font-light bg-black/50 backdrop-blur-sm">
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Established 2021
        </span>
      </div>
    </section>
  )
}