'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import GalleryModal from './GalleryModal'

export default function GalleryGrid({ items, isAdmin, onDeleteItem }) {
  const gridRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid items entrance animation
      gsap.fromTo('.gallery-item', {
        y: 100,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Hover animations for gallery items
      const galleryItems = gsap.utils.toArray('.gallery-item')
      galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay')
        const image = item.querySelector('.gallery-image')
        
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            duration: 0.4,
            ease: 'back.out(1.7)'
          })
          gsap.to(overlay, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
          })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.4,
            ease: 'power2.out'
          })
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          })
        })
      })

    }, gridRef)

    return () => ctx.revert()
  }, [items])

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setShowModal(true)
  }

  const handleDelete = (itemId, event) => {
    event.stopPropagation()
    
    // Delete animation
    gsap.to(`.gallery-item-${itemId}`, {
      scale: 0,
      opacity: 0,
      rotation: 180,
      duration: 0.5,
      ease: 'back.in(1.7)',
      onComplete: () => {
        onDeleteItem(itemId)
      }
    })
  }

  const getCategoryColor = (category) => {
    const colors = {
      rooms: 'from-blue-500/20 to-blue-600/20',
      events: 'from-purple-500/20 to-purple-600/20',
      dining: 'from-green-500/20 to-green-600/20',
      amenities: 'from-gold/20 to-antique-gold/20',
      uploaded: 'from-pink-500/20 to-pink-600/20'
    }
    return colors[category] || 'from-gold/20 to-antique-gold/20'
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-2xl font-bold text-white font-cormorant mb-4">No media found</h3>
        <p className="text-gray-400">Try selecting a different filter or upload some media.</p>
      </div>
    )
  }

  return (
    <>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div
            key={item._id}
            className={`gallery-item gallery-item-${item._id} group relative bg-gradient-to-br from-charcoal to-midnight rounded-3xl overflow-hidden border-2 border-gold/20 hover:border-gold/50 transition-all duration-300 cursor-pointer shadow-2xl shadow-black/50`}
            onClick={() => handleItemClick(item)}
          >
            {/* Media Content */}
            <div className="relative aspect-square overflow-hidden">
              {item.type === 'video' ? (
                <video
                  className="gallery-image w-full h-full object-cover"
                  src={item.src}
                  muted
                  loop
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                />
              ) : (
                <img
                  className="gallery-image w-full h-full object-cover"
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                />
              )}
              
              {/* Type indicator */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {item.type === 'video' ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    Video
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    Image
                  </>
                )}
              </div>

              {/* Category badge */}
              <div className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(item.category)} backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-gold/30`}>
                {item.category}
              </div>

              {/* Overlay */}
              <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold font-cormorant mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm font-light">{item.description}</p>
                </div>

                {/* View button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-gradient-to-r from-gold to-antique-gold rounded-full flex items-center justify-center shadow-2xl shadow-gold/30">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Admin delete button */}
              {isAdmin && (
                <button
                  onClick={(e) => handleDelete(item._id, e)}
                  className="absolute top-4 right-16 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>

            {/* Content Footer */}
            <div className="p-4 bg-gradient-to-r from-midnight/50 to-charcoal/50">
              <h3 className="text-lg font-bold text-white font-cormorant mb-1 truncate">{item.title}</h3>
              <p className="text-gray-400 text-sm font-light truncate">{item.description}</p>
            </div>

            {/* Luxury border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold/20 via-transparent to-antique-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      {showModal && selectedItem && (
        <GalleryModal
          item={selectedItem}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}