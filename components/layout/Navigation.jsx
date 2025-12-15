'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { name: 'Home', path: '#hero' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Projects', path: '#projects' },
    { name: 'Contact', path: '#contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-40">
      <div 
        className="absolute inset-0 bg-transparent"
        style={{ mixBlendMode: 'multiply' }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with contrast */}
          <a 
            href="#hero" 
            className="text-2xl font-bold transition-all duration-300 hover:scale-105"
            style={{ 
              color: '#fff',
              mixBlendMode: 'difference',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            Portfolio
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {links.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                style={{ 
                  color: '#fff',
                  mixBlendMode: 'difference',
                  textShadow: '0 1px 4px rgba(0,0,0,0.2)'
                }}
              >
                <span className="relative group">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-white/10"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            style={{ 
              color: '#fff',
              mixBlendMode: 'difference'
            }}
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      {isOpen && (
        <div 
          className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200/30 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="relative max-w-7xl mx-auto px-4 py-4 space-y-1">
            {links.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg transition-all duration-300 font-medium hover:bg-gray-100/50"
                style={{ 
                  color: '#000',
                  mixBlendMode: 'normal',
                          
          mixBlendMode: 'difference'
        
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}