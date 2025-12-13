'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return

      e.preventDefault()
      const targetId = target.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return null // This component doesn't render anything, just handles smooth scrolling
}
