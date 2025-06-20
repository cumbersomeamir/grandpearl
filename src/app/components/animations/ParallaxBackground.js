// components/animations/ParallaxBackground.js
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ParallaxBackground() {
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Multi-layer parallax effect
      gsap.to('.parallax-layer-1', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      gsap.to('.parallax-layer-2', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      gsap.to('.parallax-layer-3', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

    }, bgRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={bgRef} className="fixed inset-0 z-0">
      <div className="parallax-layer-1 absolute inset-0 bg-gradient-to-b from-black via-charcoal to-midnight"></div>
      <div className="parallax-layer-2 absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent"></div>
      <div className="parallax-layer-3 absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="bg-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#d3af37" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-pattern)" />
        </svg>
      </div>
    </div>
  )
}
