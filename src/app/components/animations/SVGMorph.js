// components/animations/SVGMorph.js
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SVGMorph() {
  const morphRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 })
      
      tl.to('.morph-path', {
        attr: { d: 'M20,50 Q80,10 50,50 Q10,90 20,50' },
        duration: 2,
        ease: 'sine.inOut'
      })
      .to('.morph-path', {
        attr: { d: 'M50,20 Q90,50 50,80 Q10,50 50,20' },
        duration: 2,
        ease: 'sine.inOut'
      })
      .to('.morph-path', {
        attr: { d: 'M50,50 Q50,50 50,50 Q50,50 50,50' },
        duration: 1,
        ease: 'power2.inOut'
      })
      .to('.morph-path', {
        attr: { d: 'M20,20 Q80,20 80,80 Q20,80 20,20' },
        duration: 2,
        ease: 'sine.inOut'
      })

    }, morphRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg ref={morphRef} width="60" height="60" viewBox="0 0 100 100" className="text-gold">
      <path 
        className="morph-path"
        d="M20,20 Q80,20 80,80 Q20,80 20,20"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  )
}