'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function GalleryModal({ item, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Modal entrance animation
      gsap.fromTo('.gallery-modal-backdrop', {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })

      gsap.fromTo('.gallery-modal-content', {
        scale: 0.9,
        opacity: 0,
        y: 30
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.4)'
      })

      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          handleClose()
        }
      }
      
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }

    }, modalRef)

    return () => ctx.revert()
  }, [])

  const handleClose = () => {
    // Exit animation
    gsap.to('.gallery-modal-content', {
      scale: 0.9,
      opacity: 0,
      y: 30,
      duration: 0.4,
      ease: 'back.in(1.4)'
    })
    gsap.to('.gallery-modal-backdrop', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: onClose
    })
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = item.src
    link.download = item.title || 'gallery-media'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // Show success message
      gsap.fromTo('.share-success', {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
      setTimeout(() => {
        gsap.to('.share-success', {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.out'
        })
      }, 2000)
    }
  }

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="gallery-modal-backdrop absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="gallery-modal-content relative bg-gradient-to-br from-charcoal to-midnight rounded-3xl border-2 border-gold/30 shadow-2xl shadow-gold/10 max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        <button className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 hover:scale-110">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 hover:scale-110">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
          {/* Media Display */}
          <div className="lg:col-span-2 relative bg-black/50 flex items-center justify-center">
            {item.type === 'video' ? (
              <video
                className="w-full h-full object-contain max-h-[80vh]"
                src={item.src}
                controls
                autoPlay
                loop
              />
            ) : (
              <img
                className="w-full h-full object-contain max-h-[80vh]"
                src={item.src}
                alt={item.title}
              />
            )}

            {/* Media Type Badge */}
            <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
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
          </div>

          {/* Media Info */}
          <div className="p-8 space-y-6 bg-gradient-to-b from-midnight/80 to-charcoal/80 backdrop-blur-sm">
            {/* Category */}
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-gold/20 to-antique-gold/20 border border-gold/30 rounded-full text-gold text-sm font-semibold">
              {item.category}
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-cormorant mb-4 leading-tight">
                {item.title}
              </h2>
              <p className="text-gray-300 text-lg font-light leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="border-t border-gold/20 pt-4">
                <h3 className="text-gold font-semibold mb-3 font-cormorant text-lg">Media Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white capitalize">{item.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white capitalize">{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Added:</span>
                    <span className="text-white">Recently</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button 
                onClick={handleDownload}
                className="w-full py-3 bg-gradient-to-r from-gold to-antique-gold text-black font-bold rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Original
                </span>
              </button>
              
              <button 
                onClick={handleShare}
                className="w-full py-3 border-2 border-gold/30 text-gold font-semibold rounded-xl hover:border-gold/50 hover:bg-gold/10 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Media
                </span>
              </button>
            </div>

            {/* Gallery Stats */}
            <div className="border-t border-gold/20 pt-6">
              <h3 className="text-gold font-semibold mb-4 font-cormorant text-lg">Gallery Statistics</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-midnight/50 rounded-xl p-4 border border-gold/20">
                  <div className="text-2xl font-bold text-white font-cormorant">156</div>
                  <div className="text-gray-400 text-sm">Total Views</div>
                </div>
                <div className="bg-midnight/50 rounded-xl p-4 border border-gold/20">
                  <div className="text-2xl font-bold text-white font-cormorant">24</div>
                  <div className="text-gray-400 text-sm">Downloads</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-gold font-semibold mb-3 font-cormorant text-lg">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full border border-gold/30">luxury</span>
                <span className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full border border-gold/30">hotel</span>
                <span className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full border border-gold/30">premium</span>
                <span className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full border border-gold/30">interior</span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Success Message */}
        <div className="share-success fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none z-50">
          Link copied to clipboard!
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="absolute bottom-6 left-6 text-gray-500 text-xs">
          Press ESC to close • Use arrow keys to navigate
        </div>

        {/* Luxury border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold/10 via-transparent to-antique-gold/10 pointer-events-none"></div>
      </div>
    </div>
  )
}