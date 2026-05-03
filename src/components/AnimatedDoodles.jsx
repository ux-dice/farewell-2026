import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const DOODLE_TYPES = ['book', 'pen', 'cap', 'diploma', 'sparkle']

// Generate 25 subtle background doodles
const DOODLES = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  type: DOODLE_TYPES[Math.floor(Math.random() * DOODLE_TYPES.length)],
  left: `${-5 + Math.random() * 110}%`,
  top: `${-5 + Math.random() * 110}%`,
  scale: 0.6 + Math.random() * 0.6, // Reasonable size
  rotation: Math.random() * 360,
  opacity: 0.04 + Math.random() * 0.06 // Low opacity
}))

export default function AnimatedDoodles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.doodle-item').forEach((el) => {
        // Gentle hovering/floating
        gsap.to(el, {
          y: `+=${Math.random() > 0.5 ? 20 : -20}`,
          x: `+=${Math.random() > 0.5 ? 10 : -10}`,
          rotation: `+=${Math.random() > 0.5 ? 10 : -10}`,
          duration: 4 + Math.random() * 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * -10
        })

        // Gentle pulse
        gsap.to(el, {
          opacity: `random(0.02, 0.1)`,
          duration: 3 + Math.random() * 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * -5
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const renderDoodle = (type) => {
    switch (type) {
      case 'book':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-gold">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        )
      case 'pen':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-gold">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        )
      case 'cap':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 text-gold">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        )
      case 'diploma':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-gold">
            <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
            <path d="M19 17V5a2 2 0 0 0-2-2H4" />
          </svg>
        )
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
            <path d="M12 3c0 4.5-4.5 9-9 9 4.5 0 9 4.5 9 9 0-4.5 4.5-9 9-9-4.5 0-9-4.5-9-9z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {DOODLES.map((doodle) => (
        <div
          key={doodle.id}
          className="doodle-item absolute"
          style={{
            left: doodle.left,
            top: doodle.top,
            transform: `scale(${doodle.scale}) rotate(${doodle.rotation}deg)`,
            opacity: doodle.opacity
          }}
        >
          {renderDoodle(doodle.type)}
        </div>
      ))}
    </div>
  )
}
