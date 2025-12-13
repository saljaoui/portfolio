'use client'

import { useEffect, useRef, useState } from 'react'

export default function SmoothMouseFollower() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const prevMouse = useRef({ x: 0, y: 0 })
  const circle = useRef({ x: 0, y: 0 })
  const currentScale = useRef(0)
  const currentAngle = useRef(0)
  const rafId = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    // Mouse move with passive listener for better performance
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Hover detection
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Use delegation for better performance
    document.addEventListener('mouseover', (e) => {
      const target = e.target
      if (target.matches('button, a, input, textarea, [role="button"]')) {
        setIsHovering(true)
      }
    })

    document.addEventListener('mouseout', (e) => {
      const target = e.target
      if (target.matches('button, a, input, textarea, [role="button"]')) {
        setIsHovering(false)
      }
    })

    const speed = 0.2

    const animate = () => {
      // Calculate delta for squish
      const deltaX = mouse.current.x - prevMouse.current.x
      const deltaY = mouse.current.y - prevMouse.current.y
      prevMouse.current = { x: mouse.current.x, y: mouse.current.y }

      // Velocity calculation
      const velocity = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 4, 150)
      const scaleValue = (velocity / 150) * 0.3
      currentScale.current += (scaleValue - currentScale.current) * speed

      // Rotation
      if (velocity > 20) {
        currentAngle.current = Math.atan2(deltaY, deltaX) * (180 / Math.PI)
      }

      // Smooth follow
      circle.current.x += (mouse.current.x - circle.current.x) * speed
      circle.current.y += (mouse.current.y - circle.current.y) * speed

      // Apply transforms using translate3d for GPU acceleration
      ring.style.transform = `translate3d(${circle.current.x}px, ${circle.current.y}px, 0) translate(-50%, -50%) rotate(${currentAngle.current}deg) scale(${1 + currentScale.current}, ${1 - currentScale.current})`
      
      dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  return (
    <>
      {/* Ring - smooth follow with squish */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 will-change-transform transition-[width,height] duration-200 ${
          isHovering ? 'w-14 h-14' : 'w-10 h-10'
        }`}
        style={{
          mixBlendMode: 'difference',
        }}
      >
        <div 
          className="w-full border-1 h-full rounded-full transition-colors"
        />
      </div>

      {/* Dot - instant follow */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 will-change-transform transition-[width,height] duration-200 ${
          isHovering ? 'w-6 h-6' : 'w-2 h-2'
        }`}
        style={{
          mixBlendMode: 'difference',
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </div>
    </>
  )
}