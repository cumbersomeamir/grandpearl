'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import HeroSection from '../app/components/HeroSection'
import StatsSection from '../app/components/StatsSection'
import ServicesShowcase from '../app/components/ServicesShowcase'
import LuxuryFeatures from '../app/components/LuxuryFeatures'
import TestimonialsCarousel from '../app/components/TestimonialsCarousel'
import LocationSection from '../app/components/LocationSection'
import BookingCTA from '../app/components/BookingCta'
import ParallaxBackground from './components/animations/ParallaxBackground'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin)
}

export default function Home() {
  useEffect(() => {
    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Page load sequence
      const tl = gsap.timeline()
      
      tl.from('.page-loader', {
        duration: 0.8,
        opacity: 1,
        ease: 'power2.out'
      })
      .set('.page-loader', { display: 'none' })
      .from('.main-content', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      })

      // Scroll-triggered fade and slide animations
      gsap.utils.toArray('.fade-slide-up').forEach((element) => {
        gsap.fromTo(element, 
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Staggered animations for card groups
      gsap.utils.toArray('.stagger-group').forEach((group) => {
        const children = group.children
        gsap.fromTo(children,
          {
            y: 80,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: group,
              start: 'top 75%',
              end: 'bottom 25%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Pinned sections with scroll-linked content
      gsap.utils.toArray('.pinned-section').forEach((section) => {
        const content = section.querySelector('.scroll-content')
        if (content) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            onUpdate: (self) => {
              gsap.to(content, {
                y: -self.progress * 100,
                duration: 0.3,
                ease: 'none'
              })
            }
          })
        }
      })

      // Text reveal animations
      gsap.utils.toArray('.text-reveal').forEach((text) => {
        const chars = text.textContent.split('')
        text.innerHTML = chars.map(char => 
          char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('')
        
        gsap.fromTo(text.querySelectorAll('.char'),
          {
            y: 100,
            opacity: 0,
            rotateX: -90
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: text,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Gradient background animation
      gsap.to('.gradient-bg', {
        backgroundPosition: '200% 50%',
        duration: 8,
        ease: 'none',
        repeat: -1,
        yoyo: true
      })

    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Page Loader */}
      <div className="page-loader fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Parallax Background */}
      <ParallaxBackground />

      {/* Main Content */}
      <main className="main-content relative z-10">
        <HeroSection />
        <StatsSection />
        <ServicesShowcase />
        <LuxuryFeatures />
        <TestimonialsCarousel />
        <LocationSection />
        <BookingCTA />
      </main>
    </>
  )
}