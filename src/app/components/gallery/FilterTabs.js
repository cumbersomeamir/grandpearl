'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function FilterTabs({ selectedFilter, onFilterChange }) {
  const tabsRef = useRef(null)

  const filters = [
    { id: 'all', label: 'All Media', icon: '🏨' },
    { id: 'rooms', label: 'Luxury Rooms', icon: '🛏️' },
    { id: 'events', label: 'Events', icon: '🎉' },
    { id: 'dining', label: 'Dining', icon: '🍽️' },
    { id: 'amenities', label: 'Amenities', icon: '🌟' },
    { id: 'uploaded', label: 'Recently Added', icon: '📸' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate tabs on mount
      gsap.fromTo('.filter-tab', {
        y: 50,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      })

    }, tabsRef)

    return () => ctx.revert()
  }, [])

  const handleTabClick = (filterId) => {
    onFilterChange(filterId)
    
    // Tab click animation
    gsap.to(`.filter-tab-${filterId}`, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })
  }

  return (
    <div ref={tabsRef} className="mb-12">
      <div className="flex flex-wrap justify-center gap-4 p-6 bg-gradient-to-r from-charcoal/50 to-midnight/50 rounded-3xl border border-gold/20 backdrop-blur-sm">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleTabClick(filter.id)}
            className={`filter-tab filter-tab-${filter.id} group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
              selectedFilter === filter.id
                ? 'bg-gradient-to-r from-gold to-antique-gold text-black shadow-lg shadow-gold/30'
                : 'bg-midnight/50 text-gray-300 border border-gold/20 hover:border-gold/50 hover:text-gold'
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="text-xl">{filter.icon}</span>
              <span className="font-cormorant tracking-wide">{filter.label}</span>
            </span>
            
            {/* Active indicator */}
            {selectedFilter === filter.id && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gold rounded-full shadow-lg shadow-gold/50"></div>
            )}
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-antique-gold/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>
    </div>
  )
}