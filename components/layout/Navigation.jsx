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
      <div
        className="absolute inset-0 bg-transparent"
        style={{ mixBlendMode: 'difference' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Button */}
          <button
            className="text-2xl font-bold transition-all duration-300 hover:scale-105 bg-transparent border-none cursor-pointer p-0"
            style={{
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          >
            Portfolio
          </button>
          <div className="md:flex space-x-3">
            {links.map((link) => (
              <button
                key={link.name}
                className="px-4 py-2 transition-all duration-300 font-medium bg-transparent"
                style={{
                  color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  fontWeight: 500
                }}
              >
                <span className="relative group">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
