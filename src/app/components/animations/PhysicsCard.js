// components/animations/PhysicsCard.js
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PhysicsCard({ children, className = '' }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          rotationX: 5,
          rotationY: 5,
          scale: 1.02,
          duration: 0.3,
          ease: 'back.out(1.7)',
          transformPerspective: 1000
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        })
      })

    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={cardRef} className={`relative bg-gradient-to-br from-charcoal to-midnight rounded-2xl border border-gold/20 ${className}`}>
      {children}
    </div>
  )
}