'use client'
import { useState } from 'react'

export default function Navigation({ currentSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Home', section: 0 },
    { name: 'About', section: 1 },
    { name: 'Skills', section: 2 },
    { name: 'Projects', section: 3 },
    { name: 'Contact', section: 4 },
  ]

  const handleClick = (section) => {
    onNavigate(section)  // ✅ Calls the parent function
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-40 mix-blend-difference">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => handleClick(0)}
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

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleClick(link.section)}
                className={`relative px-3 py-2 transition-all duration-300 font-medium bg-transparent border-none cursor-pointer rounded-lg group ${
                  currentSection === link.section ? 'text-white' : 'text-white/70'
                }`}
                style={{
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  fontWeight: 500
                }}
              >
                {link.name}
                <div 
                  className={`absolute bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    currentSection === link.section ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  style={{ 
                    background: currentSection === link.section ? 'white' : 'rgba(255,255,255,0.4)',
                    boxShadow: '0 0 8px rgba(255,255,255,0.6)' 
                  }} 
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-transparent border-none cursor-pointer"
            style={{ color: '#fff' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleClick(link.section)}
                className={`block w-full text-left px-5 py-3 transition-all duration-300 font-medium bg-transparent border-none cursor-pointer rounded-lg ${
                  currentSection === link.section ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                }`}
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
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
