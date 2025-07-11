'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GalleryGrid from '../components/gallery/GalleryGrid'
import LoginModal from '../components/gallery/LoginModal'
import UploadModal from '../components/gallery/UploadModal'
import GalleryHero from '../components/gallery/GalleryHero'
import FilterTabs from '../components/gallery/FilterTabs'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GalleryPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch gallery items from API
  const fetchGalleryItems = async (category = 'all') => {
    try {
      setLoading(true)
      const response = await fetch(`/api/gallery${category !== 'all' ? `?category=${category}` : ''}`)
      const result = await response.json()
      
      if (result.success) {
        setGalleryItems(result.data)
      } else {
        setError('Failed to fetch gallery items')
      }
    } catch (err) {
      console.error('Error fetching gallery items:', err)
      setError('Failed to fetch gallery items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const loginStatus = localStorage.getItem('grandpearl_logged_in')
    setIsLoggedIn(loginStatus === 'true')

    // Fetch initial gallery items
    fetchGalleryItems()

    // Initialize GSAP animations
    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.fromTo('.gallery-page-content', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      })

      // Floating elements animation
      gsap.to('.floating-gallery-element', {
        y: -20,
        rotation: 5,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      })

    })

    return () => ctx.revert()
  }, [])

  // Refetch when filter changes
  useEffect(() => {
    fetchGalleryItems(selectedFilter)
  }, [selectedFilter])

  const handleLogin = (credentials) => {
    // Simple login logic (in production, use proper authentication)
    if (credentials.username === 'admin' && credentials.password === 'grandpearl2024') {
      setIsLoggedIn(true)
      localStorage.setItem('grandpearl_logged_in', 'true')
      setShowLoginModal(false)
      
      // Success animation
      gsap.fromTo('.login-success', {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
    } else {
      // Error animation
      gsap.to('.login-form', {
        x: -10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('grandpearl_logged_in')
    setShowUploadModal(false)
  }

  const handleUpload = async (files, metadata = []) => {
    try {
      const formData = new FormData()
      
      files.forEach((file, index) => {
        formData.append('files', file)
        formData.append('titles', metadata[index]?.title || file.name.split('.')[0])
        formData.append('descriptions', metadata[index]?.description || '')
        formData.append('categories', metadata[index]?.category || 'uploaded')
      })

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        // Refetch gallery items to show the new uploads
        await fetchGalleryItems(selectedFilter)
        setShowUploadModal(false)

        // Upload success animation
        gsap.fromTo('.upload-success', {
          scale: 0,
          opacity: 0
        }, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })

        // Hide success message after 3 seconds
        setTimeout(() => {
          gsap.to('.upload-success', {
            opacity: 0,
            duration: 0.3
          })
        }, 3000)
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      // Show error animation
      gsap.fromTo('.upload-error', {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })

      setTimeout(() => {
        gsap.to('.upload-error', {
          opacity: 0,
          duration: 0.3
        })
      }, 3000)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Refetch gallery items
        await fetchGalleryItems(selectedFilter)
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const handleSeedDatabase = async () => {
    try {
      const response = await fetch('/api/gallery/seed', {
        method: 'POST'
      })
      const result = await response.json()
      
      if (result.success) {
        // Refetch gallery items
        await fetchGalleryItems(selectedFilter)
        
        // Show success message
        gsap.fromTo('.seed-success', {
          scale: 0,
          opacity: 0
        }, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        })
        
        setTimeout(() => {
          gsap.to('.seed-success', {
            opacity: 0,
            duration: 0.3
          })
        }, 3000)
      }
    } catch (error) {
      console.error('Seed error:', error)
    }
  }

  const filteredItems = selectedFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedFilter)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="floating-gallery-element absolute top-20 left-10 w-6 h-6 bg-gradient-to-br from-gold to-antique-gold rounded-full opacity-60"></div>
      <div className="floating-gallery-element absolute top-40 right-20 w-8 h-8 border-2 border-gold rounded-full opacity-40"></div>
      <div className="floating-gallery-element absolute bottom-32 left-16 w-5 h-5 bg-gradient-to-br from-antique-gold to-gold rounded-full opacity-50"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="gallery-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#D4AF37" opacity="0.3" />
              <circle cx="25" cy="25" r="0.5" fill="#C49E3B" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery-pattern)" />
        </svg>
      </div>

      <div className="gallery-page-content relative z-10">
        {/* Gallery Hero Section */}
        <GalleryHero />

        {/* Admin Controls */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {isLoggedIn ? (
                <>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="group relative px-8 py-4 bg-gradient-to-r from-gold via-antique-gold to-gold text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/30 text-lg"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        📸 Upload Photos & Videos
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-antique-gold via-gold to-antique-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                    
                    <button
                      onClick={handleSeedDatabase}
                      className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300"
                    >
                      🌱 Seed Database
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-black transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </span>
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gold/20 to-antique-gold/20 text-gold px-4 py-2 rounded-full border border-gold/30 text-sm font-semibold">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                      👑 Admin Mode Active
                    </span>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="group relative px-8 py-4 border-2 border-gold text-gold font-bold rounded-full hover:bg-gold hover:text-black transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    🔑 Admin Login to Upload Media
                  </span>
                </button>
              )}
            </div>
            
            <div className="text-white bg-midnight/50 px-4 py-2 rounded-full border border-gold/20">
              <span className="text-gold font-semibold text-lg">{filteredItems.length}</span> 
              <span className="text-gray-300 ml-1">Media Items</span>
            </div>
          </div>

          {/* Upload Instructions for Admin */}
          {isLoggedIn && (
            <div className="mb-8 bg-gradient-to-r from-gold/10 to-antique-gold/10 rounded-2xl p-6 border border-gold/30">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📤</div>
                <div>
                  <h3 className="text-gold font-bold font-cormorant text-xl mb-2">Ready to Upload Media?</h3>
                  <p className="text-gray-300 text-sm">Click the "Upload Photos & Videos" button above to add new images and videos to the gallery. Supports JPG, PNG, GIF, MP4, MOV, and WebM formats.</p>
                </div>
              </div>
            </div>
          )}
        </div>

          {/* Filter Tabs */}
          <FilterTabs 
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Loading gallery items...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <button
                  onClick={() => fetchGalleryItems(selectedFilter)}
                  className="px-6 py-3 bg-gold text-black font-semibold rounded-full hover:bg-antique-gold transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && !error && (
            <GalleryGrid 
              items={filteredItems}
              isAdmin={isLoggedIn}
              onDeleteItem={handleDeleteItem}
            />
          )}
        </div>

        {/* Success Messages */}
        <div className="login-success fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none z-50">
          Successfully logged in!
        </div>
        <div className="upload-success fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none z-50">
          Media uploaded successfully!
        </div>
        <div className="upload-error fixed top-20 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none z-50">
          Upload failed. Please try again.
        </div>
        <div className="seed-success fixed top-20 right-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none z-50">
          Database seeded successfully!
        </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
    )
}
