
// components/animations/CountUp.js
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CountUp({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to({ val: 0 }, {
        val: end,
        duration: duration,
        ease: 'power2.out',
        onUpdate: function() {
          setCount(Math.round(this.targets()[0].val))
        },
        scrollTrigger: {
          trigger: countRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reset'
        }
      })
    }, countRef)

    return () => ctx.revert()
  }, [end, duration])

  return (
    <span ref={countRef}>
      {count}{suffix}
    </span>
  )
}
