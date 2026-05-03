import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGalleryImages } from '../hooks/useGalleryImages'

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveGallerySection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const containerRef = useRef(null)
  
  const allImages = useGalleryImages()
  // Just take a subset of images for the interactive scatter (e.g. 10 images)
  const displayImages = allImages.slice(0, 12)

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        }
      }
    )

    // Floating animation for polaroids
    const cards = gsap.utils.toArray('.interactive-card')
    cards.forEach((card, i) => {
      // Random initial scatter
      gsap.set(card, {
        rotation: gsap.utils.random(-15, 15),
        x: gsap.utils.random(-40, 40),
        y: gsap.utils.random(-40, 40),
        zIndex: gsap.utils.random(1, 10, 1)
      })

      // Gentle floating
      gsap.to(card, {
        y: "+=random(-15, 15)",
        x: "+=random(-15, 15)",
        rotation: "+=random(-5, 5)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    })
  }, [displayImages.length])

  const handleMouseMove = (e, cardRef) => {
    const rect = cardRef.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -15
    const rotateY = ((x - centerX) / centerX) * 15

    gsap.to(cardRef, {
      rotateX,
      rotateY,
      scale: 1.1,
      zIndex: 50,
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = (cardRef, originalZ) => {
    gsap.to(cardRef, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      zIndex: originalZ,
      duration: 0.6,
      ease: 'power2.out'
    })
  }

  return (
    <section id="interactive-gallery" ref={sectionRef} className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="font-mono text-[11px] tracking-[0.4em] text-gold/60 uppercase block mb-4">
            Chapter Four
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-white">
            Scattered <span className="italic text-gold">Memories</span>
          </h2>
          <p className="font-body text-white/40 mt-4 max-w-md mx-auto italic">
            Hover over the photos to relive the moments
          </p>
          <div className="flex justify-center mt-6">
            <div className="gold-line" />
          </div>
        </div>

        {/* Interactive Scatter Area */}
        <div 
          ref={containerRef}
          className="relative w-full min-h-[600px] flex items-center justify-center flex-wrap gap-8 py-12 perspective-[1000px]"
        >
          {displayImages.map((img, i) => {
            const originalZ = i % 10 + 1;
            return (
              <div
                key={img.id || i}
                className="interactive-card relative w-[220px] sm:w-[260px] aspect-[3/4] bg-white p-3 pb-12 rounded-sm cursor-grab active:cursor-grabbing shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform-style-3d transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget, originalZ)}
              >
                <div className="w-full h-full bg-black/10 overflow-hidden rounded-sm">
                  <img
                    src={img.src}
                    alt={img.caption || "Memory"}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="font-mono text-sm font-bold text-black/80">
                    {img.caption || `Memory #${i + 1}`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
