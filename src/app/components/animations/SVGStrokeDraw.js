
// components/animations/SVGStrokeDraw.js
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SVGStrokeDraw({ path, className = '' }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pathElement = svgRef.current.querySelector('path')
      const pathLength = pathElement.getTotalLength()
      
      pathElement.style.strokeDasharray = pathLength
      pathElement.style.strokeDashoffset = pathLength

      gsap.to(pathElement, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

    }, svgRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg ref={svgRef} className={className} viewBox="0 0 200 50">
      <path d={path} />
    </svg>
  )
}
