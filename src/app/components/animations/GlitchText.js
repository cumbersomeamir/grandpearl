// components/animations/GlitchText.js
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function GlitchText({ text, className = '' }) {
  const glitchRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 })
      
      tl.to('.glitch-layer-1', {
        x: -2,
        duration: 0.1,
        ease: 'none'
      })
      .to('.glitch-layer-2', {
        x: 2,
        duration: 0.1,
        ease: 'none'
      }, '<')
      .to('.glitch-layer-1', {
        x: 1,
        duration: 0.1,
        ease: 'none'
      })
      .to('.glitch-layer-2', {
        x: -1,
        duration: 0.1,
        ease: 'none'
      }, '<')
      .to(['.glitch-layer-1', '.glitch-layer-2'], {
        x: 0,
        duration: 0.1,
        ease: 'none'
      })

    }, glitchRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={glitchRef} className={`relative ${className}`}>
      <span className="glitch-layer-1 absolute inset-0 text-red-500 opacity-80 mix-blend-multiply">
        {text}
      </span>
      <span className="glitch-layer-2 absolute inset-0 text-cyan-500 opacity-80 mix-blend-multiply">
        {text}
      </span>
      <span className="relative z-10">{text}</span>
    </div>
  )
}