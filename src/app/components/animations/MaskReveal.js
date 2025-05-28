// components/animations/MaskReveal.js
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MaskReveal({ children }) {
  const maskRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mask-content', {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: maskRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

    }, maskRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={maskRef} className="overflow-hidden">
      <div className="mask-content">
        {children}
      </div>
    </div>
  )
}