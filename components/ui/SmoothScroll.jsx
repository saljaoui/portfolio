'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
    })

    const scrollContainer = document.querySelector('.scroll-container')
    const sections = document.querySelectorAll('section')
    const totalWidth = sections.length * window.innerWidth

    // Set body height to enable vertical scroll
    document.body.style.height = `${totalWidth}px`

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Convert vertical scroll to horizontal movement
    lenis.on('scroll', ({ scroll }) => {
      if (scrollContainer) {
        scrollContainer.style.transform = `translateX(-${scroll}px)`
      }
    })

    return () => {
      lenis.destroy()
      document.body.style.height = ''
    }
  }, [])

  return null
}