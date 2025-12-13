'use client'

import { useEffect, useRef, useState } from 'react'

export default function MouseFollower() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const circle = useRef({ x: 0, y: 0 })
  const [isHoveringButton, setIsHoveringButton] = useState(false)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    // Mouse move listener
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      // Dot follows instantly with hardware acceleration
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Button hover listeners
    const buttons = document.querySelectorAll('button')
    const handleMouseEnter = () => setIsHoveringButton(true)
    const handleMouseLeave = () => setIsHoveringButton(false)

    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnter)
      button.addEventListener('mouseleave', handleMouseLeave)
    })

    const speed = 0.25 // Increased speed for smoother following

    const animate = () => {
      // Ring follows smoothly with hardware acceleration
      circle.current.x += (mouse.current.x - circle.current.x) * speed
      circle.current.y += (mouse.current.y - circle.current.y) * speed

      ring.style.transform = `translate3d(${circle.current.x}px, ${circle.current.y}px, 0) translate(-50%, -50%)`

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnter)
        button.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Outer ring - smooth follow with hardware acceleration */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 will-change-transform ${
          isHoveringButton ? 'w-10 h-10' : 'w-8 h-8'
        }`}
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      >
        <div className="w-full h-full border-2 border-blue-500 rounded-full" />
      </div>

      {/* Inner dot - instant follow, fills ring on button hover */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 will-change-transform ${
          isHoveringButton ? 'w-4 h-4' : 'w-2 h-2'
        }`}
        style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      >
        <div className="w-full h-full bg-blue-500 rounded-full" />
      </div>
    </>
  )
}
