import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Coordinates are kept to the far edges to avoid blocking content
const STICKERS = [
  { id: 1, type: 'cap', top: '12%', left: '4%', rotation: -15, mobile: false },
  { id: 2, type: 'sparkle', top: '18%', right: '6%', rotation: 10, mobile: true },
  { id: 3, type: 'lastBenchers', top: '35%', left: '3%', rotation: -8, mobile: true },
  { id: 4, type: 'polaroid', top: '45%', right: '5%', rotation: 15, mobile: false },
  { id: 5, type: 'sparkle', top: '60%', left: '8%', rotation: -20, mobile: false },
  { id: 6, type: 'proxyMasters', top: '75%', right: '6%', rotation: -12, mobile: true },
  { id: 7, type: 'cap', bottom: '15%', right: '12%', rotation: 25, mobile: false },
  { id: 8, type: 'polaroid', bottom: '10%', left: '6%', rotation: -18, mobile: true },
  { id: 9, type: 'coffeeCup', top: '25%', right: '15%', rotation: 20, mobile: false },
  { id: 10, type: 'musicNote', bottom: '35%', left: '12%', rotation: -15, mobile: true },
  { id: 11, type: 'canteenLegends', top: '50%', right: '10%', rotation: 8, mobile: true },
  { id: 12, type: 'heart', bottom: '25%', right: '8%', rotation: -25, mobile: false },
  { id: 13, type: 'examWarriors', top: '8%', right: '25%', rotation: -5, mobile: false },
  { id: 14, type: 'sparkle', bottom: '45%', left: '15%', rotation: 15, mobile: false },
  { id: 15, type: 'funnyGoggles', top: '22%', left: '18%', rotation: -15, mobile: true },
  { id: 16, type: 'aviators', bottom: '40%', right: '18%', rotation: 25, mobile: false },
  { id: 17, type: 'funnyGoggles', bottom: '5%', right: '35%', rotation: -10, mobile: true }
]

export default function Stickers() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Soft, floating up-down and slight rotation animation
      gsap.utils.toArray('.sticker-anim').forEach((el, i) => {
        gsap.to(el, {
          y: 'random(-12, 12)',
          rotation: 'random(-8, 8)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3
        })
      })
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  const renderContent = (type) => {
    switch (type) {
      case 'cap':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 sm:w-16 sm:h-16 text-white/30 group-hover:text-gold/80 transition-colors duration-500">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        )
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-12 sm:h-12 text-gold/40 group-hover:text-gold transition-colors duration-500">
            <path d="M12 3c0 4.5-4.5 9-9 9 4.5 0 9 4.5 9 9 0-4.5 4.5-9 9-9-4.5 0-9-4.5-9-9z" />
          </svg>
        )
      case 'lastBenchers':
        return (
          <div className="relative w-[110px] sm:w-[130px] flex items-center justify-center py-3">
            <svg viewBox="0 0 120 40" className="absolute inset-0 w-full h-full text-white/20 group-hover:text-gold/60 transition-colors duration-500 overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M5,5 Q60,2 115,8 Q118,20 112,35 Q60,38 8,32 Q2,15 5,5 Z" />
            </svg>
            <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-widest text-white/50 group-hover:text-white/90 transition-colors duration-500 transform -rotate-2">
              LAST BENCHERS
            </span>
          </div>
        )
      case 'proxyMasters':
        return (
          <div className="relative w-[110px] sm:w-[130px] flex items-center justify-center py-3">
            <svg viewBox="0 0 120 40" className="absolute inset-0 w-full h-full text-white/20 group-hover:text-gold/60 transition-colors duration-500 overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M8,8 Q60,10 112,5 Q115,15 118,32 Q60,35 5,38 Q2,20 8,8 Z" />
            </svg>
            <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-widest text-white/50 group-hover:text-white/90 transition-colors duration-500 transform rotate-2">
              PROXY MASTERS
            </span>
          </div>
        )
      case 'polaroid':
        return (
          <svg viewBox="0 0 80 100" className="w-14 h-20 sm:w-20 sm:h-24 text-white/20 group-hover:text-gold/60 transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5,5 L75,3 L77,95 L3,97 Z" />
            <path d="M10,10 L70,9 L71,70 L9,72 Z" />
            <path d="M15,65 L35,45 L45,55 L65,35 L70,68" strokeLinejoin="round" />
            <circle cx="25" cy="25" r="4" />
          </svg>
        )
      case 'coffeeCup':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-14 sm:h-14 text-white/20 group-hover:text-gold/80 transition-colors duration-500">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        )
      case 'musicNote':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-12 sm:h-12 text-white/20 group-hover:text-gold/80 transition-colors duration-500">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-14 sm:h-14 text-white/20 group-hover:text-gold/80 transition-colors duration-500">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )
      case 'canteenLegends':
        return (
          <div className="relative w-[110px] sm:w-[130px] flex items-center justify-center py-3">
            <svg viewBox="0 0 120 40" className="absolute inset-0 w-full h-full text-white/20 group-hover:text-gold/60 transition-colors duration-500 overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M5,15 Q30,5 115,10 Q118,25 110,35 Q60,38 8,30 Q2,20 5,15 Z" />
            </svg>
            <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-widest text-white/50 group-hover:text-white/90 transition-colors duration-500 transform -rotate-3">
              CANTEEN LEGENDS
            </span>
          </div>
        )
      case 'examWarriors':
        return (
          <div className="relative w-[110px] sm:w-[130px] flex items-center justify-center py-3">
            <svg viewBox="0 0 120 40" className="absolute inset-0 w-full h-full text-white/20 group-hover:text-gold/60 transition-colors duration-500 overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M10,5 Q50,0 110,8 Q115,25 105,35 Q50,40 5,35 Q0,20 10,5 Z" />
            </svg>
            <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-widest text-white/50 group-hover:text-white/90 transition-colors duration-500 transform rotate-1">
              EXAM WARRIORS
            </span>
          </div>
        )
      case 'funnyGoggles':
        return (
          <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-10 sm:w-24 sm:h-14 text-white/20 group-hover:text-gold/80 transition-colors duration-500">
            {/* Left lens */}
            <circle cx="30" cy="25" r="18" />
            <circle cx="30" cy="25" r="10" strokeWidth="2" className="opacity-50" />
            {/* Right lens */}
            <circle cx="70" cy="25" r="18" />
            <circle cx="70" cy="25" r="10" strokeWidth="2" className="opacity-50" />
            {/* Bridge */}
            <path d="M 48 25 L 52 25" />
            {/* Straps */}
            <path d="M 0 25 L 12 25" />
            <path d="M 88 25 L 100 25" />
          </svg>
        )
      case 'aviators':
        return (
          <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-8 sm:w-24 sm:h-12 text-white/20 group-hover:text-gold/80 transition-colors duration-500">
            {/* Left Lens */}
            <path d="M 40 10 C 40 10, 45 35, 25 35 C 5 35, 10 10, 10 10 Z" />
            {/* Right Lens */}
            <path d="M 60 10 C 60 10, 55 35, 75 35 C 95 35, 90 10, 90 10 Z" />
            {/* Bridge Top */}
            <path d="M 35 10 C 45 5, 55 5, 65 10" />
            {/* Bridge Bottom */}
            <path d="M 40 15 C 45 12, 55 12, 60 15" />
            {/* Arms */}
            <path d="M 10 10 C 5 10, 0 15, 0 20" />
            <path d="M 90 10 C 95 10, 100 15, 100 20" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[10] overflow-hidden">
      {STICKERS.map((sticker) => (
        <div
          key={sticker.id}
          className={`absolute pointer-events-auto cursor-default ${
            !sticker.mobile ? 'hidden md:block' : ''
          }`}
          style={{
            top: sticker.top,
            left: sticker.left,
            right: sticker.right,
            bottom: sticker.bottom,
            transform: `rotate(${sticker.rotation}deg)`
          }}
        >
          <div className="sticker-anim">
            <div className="group transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              {renderContent(sticker.type)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
