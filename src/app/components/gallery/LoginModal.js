'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LoginModal({ onClose, onLogin }) {
  const modalRef = useRef(null)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Modal entrance animation
      gsap.fromTo('.modal-backdrop', {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.fromTo('.modal-content', {
        scale: 0.8,
        opacity: 0,
        y: 50
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })

    }, modalRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields')
      return
    }

    onLogin(credentials)
  }

  const handleClose = () => {
    // Exit animation
    gsap.to('.modal-content', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'back.in(1.7)'
    })
    gsap.to('.modal-backdrop', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: onClose
    })
  }

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="modal-content relative bg-gradient-to-br from-charcoal to-midnight rounded-3xl border-2 border-gold/30 shadow-2xl shadow-gold/10 p-8 max-w-md w-full mx-4">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gold transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gold to-antique-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold/30">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white font-cormorant mb-2">Admin Login</h2>
          <p className="text-gray-400 font-light">Access gallery management</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form space-y-6">
          {/* Username Field */}
          <div className="relative">
            <label className="block text-gold font-semibold mb-2 tracking-wide">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 bg-midnight/50 border-2 border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300 backdrop-blur-sm"
              placeholder="Enter username"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-gold font-semibold mb-2 tracking-wide">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 bg-midnight/50 border-2 border-gold/20 rounded-xl text-white focus:border-gold focus:outline-none transition-colors duration-300 backdrop-blur-sm"
              placeholder="Enter password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-gold to-antique-gold text-black font-bold rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login to Admin Panel
            </span>
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Default credentials: admin / grandpearl2024
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-3xl"></div>
      </div>
    </div>
  )
}