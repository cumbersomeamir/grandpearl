// components/animations/LiquidButton.js
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LiquidButton({ text, className = '' }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const button = buttonRef.current
      const blob = button.querySelector('.liquid-blob')

      button.addEventListener('mouseenter', () => {
        gsap.to(blob, {
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)'
        })
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })

      button.addEventListener('mouseleave', () => {
        gsap.to(blob, {
          scale: 0,
          duration: 0.3,
          ease: 'back.in(1.7)'
        })
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

    }, buttonRef)

    return () => ctx.revert()
  }, [])

  return (
    <button ref={buttonRef} className={`relative px-6 py-3 bg-gold text-black font-semibold rounded-full overflow-hidden ${className}`}>
      <div className="liquid-blob absolute inset-0 bg-antique-gold rounded-full scale-0"></div>
      <span className="relative z-10">{text}</span>
    </button>
  )
}