import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    let count = { val: 0 }

    tl.to(count, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(count.val)
        }
      }
    })
    .to(barRef.current, {
      scaleX: 1,
      duration: 2.2,
      ease: 'power2.inOut',
      transformOrigin: 'left center',
    }, 0)
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in'
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      onComplete: () => onComplete && onComplete()
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #d4af37 0%, transparent 70%)`
        }}
      />

      <div ref={textRef} className="relative z-10 text-center">
        {/* Logo / Brand */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-gold" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold/70 uppercase">
              Loading Experience
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white tracking-tight">
            Forever
          </h1>
          <h1 className="font-display text-5xl md:text-7xl text-gold italic tracking-tight">
            In Our Hearts
          </h1>
        </div>

        {/* Counter */}
        <div className="relative mb-8">
          <span
            ref={counterRef}
            className="font-mono text-6xl font-light text-white/20 select-none"
          >
            0
          </span>
          <span className="font-mono text-2xl text-white/10 ml-1">%</span>
        </div>

        {/* Progress bar */}
        <div className="w-[280px] h-px bg-white/5 mx-auto relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-0 bg-gradient-to-r from-gold/60 via-gold to-gold/60"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <p className="font-body text-xs text-white/20 tracking-[0.3em] mt-6 uppercase">
          Preparing your memory
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-gold/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-gold/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-gold/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-gold/20" />
    </div>
  )
}
