'use client'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Home' },
    { name: 'About' },
    { name: 'Skills' },
    { name: 'Projects' },
    { name: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-40 mix-blend-difference">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo Button */}
          <button
            className="text-2xl font-bold transition-all duration-300 hover:scale-105 bg-transparent border-none cursor-pointer p-0 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-2 py-1"
            style={{
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
            aria-label="Portfolio home"
          >
            Portfolio
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.name}
                className="relative px-3 py-2 transition-all duration-300 font-medium bg-transparent border-none cursor-pointer rounded-lg group"
                style={{
                  color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  fontWeight: 500
                }}
                aria-label={`Navigate to ${link.name}`}
              >
                {link.name}
                <div className="absolute bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" 
                     style={{ 
                       boxShadow: '0 0 8px rgba(255,255,255,0.6)' 
                     }} />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-transparent border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:bg-white/5"
            style={{
              color: '#fff',
              textShadow: '0 1px 4px rgba(0,0,0,0.4)'
            }}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => setIsOpen(false)}
                className="block w-full text-left px-5 py-3 transition-all duration-300 font-medium bg-transparent border-none cursor-pointer rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30"
                style={{
                  color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  fontWeight: 500
                }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}