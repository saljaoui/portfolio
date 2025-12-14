'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Make container fixed so it doesn't move vertically
    scrollContainer.style.position = 'fixed'
    scrollContainer.style.top = '0'
    scrollContainer.style.left = '0'
    scrollContainer.style.height = '100vh'
    scrollContainer.style.display = 'flex'
    scrollContainer.style.flexDirection = 'row'
    scrollContainer.style.width = `${scrollContainer.children.length * 100}vw` // total width

    // Set body height to enable vertical scrolling
    document.body.style.height = `${scrollContainer.scrollWidth}px`

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ({ scroll }) => {
      scrollContainer.style.transform = `translateX(-${scroll}px)`
    })

    return () => {
      lenis.destroy()
      document.body.style.height = ''
      scrollContainer.style.position = ''
      scrollContainer.style.transform = ''
    }
  }, [])

  return <div ref={scrollRef}>{children}</div>
}
