'use client'
import { useState, useEffect } from 'react'

export default function Navigation({ currentSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const links = [
    { name: 'Home', section: 0 },
    { name: 'About', section: 1 },
    { name: 'Skills', section: 2 },
    { name: 'Projects', section: 3 },
    { name: 'Contact', section: 4 },
  ]

  const handleClick = (section) => {
    onNavigate(section)
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-40 mix-blend-difference">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo with slide-in from left */}
          <button
            onClick={() => handleClick(0)}
            className={`text-2xl font-bold transition-all duration-700 hover:scale-105 bg-transparent border-none cursor-pointer p-0 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            style={{
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          >
            <div className='h-10 w-10' >
               <img src="/images/logo.png" alt="Logo" />
            </div>
           
          </button>

          {/* Desktop Navigation with staggered fade-in */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleClick(link.section)}
                className={`relative px-3 py-2 transition-all duration-300 font-medium bg-transparent border-none cursor-pointer rounded-lg group ${currentSection === link.section ? 'text-white' : 'text-white/70'
                  } ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
                  }`}
                style={{
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  fontWeight: 500,
                  transitionDelay: mounted ? `${index * 100 + 200}ms` : '0ms',
                  transitionProperty: 'transform, opacity, color'
                }}
              >
                {link.name}
                <div
                  className={`absolute bottom-1 left-0 h-0.5 transition-all duration-300 ${currentSection === link.section ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  style={{
                    background: currentSection === link.section ? 'white' : 'rgba(255,255,255,0.4)',
                    boxShadow: '0 0 8px rgba(255,255,255,0.6)'
                  }}
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button with rotation animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg bg-transparent border-none cursor-pointer transition-all duration-700 ${mounted ? 'translate-x-0 opacity-100 rotate-0' : 'translate-x-12 opacity-0 rotate-180'
              }`}
            style={{ color: '#fff' }}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
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

        {/* Mobile Menu with slide-down and staggered items */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="py-4 space-y-1">
            {links.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleClick(link.section)}
                className={`block w-full text-left px-5 py-3 font-medium bg-transparent border-none cursor-pointer rounded-lg transition-all duration-300 ${currentSection === link.section ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                  } ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                style={{
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
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