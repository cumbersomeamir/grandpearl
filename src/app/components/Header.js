'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo('.header-content', {
        y: -100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      })

      // Logo animation
      gsap.fromTo('.header-logo', {
        scale: 0,
        rotation: -180
      }, {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 0.8
      })

      // Navigation items stagger animation
      gsap.fromTo('.nav-item', {
        y: -50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 1
      })

    })

    return () => ctx.revert()
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Feedback', href: '/feedback' }
  ]

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="header-content max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="header-logo group">
            <div className="flex items-center space-x-3">

              {/* <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-gold font-cormorant">Grand Pearl</h1>
                <p className="text-xs text-gray-400 tracking-widest">LUXURY HOTEL</p>
              </div> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item relative group transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-gold'
                    : 'text-gray-300 hover:text-gold'
                }`}
              >
                <span className="text-lg font-medium tracking-wide">{item.name}</span>
                
                {/* Underline effect */}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-gold to-antique-gold transform transition-all duration-300 ${
                  isActive(item.href) 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-gold/20 to-antique-gold/20 blur-lg transform transition-all duration-300 ${
                  isActive(item.href) 
                    ? 'opacity-100' 
                    : 'opacity-0 group-hover:opacity-100'
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gold hover:text-antique-gold transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}></span>
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-gold/20 text-gold border-l-4 border-gold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-gold'
                }`}
              >
                <span className="text-lg font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
    </header>
  )
} 