import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import content from '../data/content.json'

export default function HeroSection() {
  const videoRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const taglineRef = useRef(null)
  const scrollHintRef = useRef(null)
  const overlayRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 })

    // Video subtle zoom
    gsap.to(videoRef.current, {
      scale: 1.08,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })

    // Overlay fade in
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    )

    // Badge
    .fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )

    // Title split animation
    const titleChars = titleRef.current.querySelectorAll('.char')
    tl.fromTo(titleChars,
      { opacity: 0, y: 60, rotateX: 90 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 1,
        stagger: 0.04,
        ease: 'power4.out',
      },
      '-=0.3'
    )

    // Subtitle
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )

    // Tagline
    .fromTo(taglineRef.current,
      { opacity: 0, letterSpacing: '0.3em' },
      { opacity: 1, letterSpacing: '0.15em', duration: 1.2, ease: 'power2.out' },
      '-=0.5'
    )

    // Scroll hint
    .fromTo(scrollHintRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    )

    return () => tl.kill()
  }, [])

  // Animated scroll indicator
  useEffect(() => {
    const el = scrollHintRef.current
    if (!el) return
    gsap.to(el.querySelector('.scroll-dot'), {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut',
      delay: 5,
    })
  }, [])

  const titleWords = content.site.title.split(' ')

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={content.hero.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=60"
      />

      {/* Gradient Overlays */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(0,0,0,0.3) 0%,
              rgba(0,0,0,0.5) 40%,
              rgba(0,0,0,0.7) 70%,
              rgba(0,0,0,0.95) 100%
            )
          `
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <div ref={badgeRef} className="mb-8 opacity-0">
          <div className="inline-flex items-center gap-3 glass px-5 py-2 rounded-full border border-gold/20">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-gold/80 uppercase">
              {content.site.batch} · {content.site.institution}
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div
          ref={titleRef}
          className="overflow-hidden mb-4"
          style={{ perspective: '1000px' }}
        >
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight">
            {titleWords.map((word, wi) => (
              <span key={wi} className="inline-block mr-4">
                {word.split('').map((char, ci) => (
                  <span
                    key={ci}
                    className={`char inline-block ${word === 'Hearts' ? 'text-gold italic' : ''}`}
                    style={{ opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <div className="w-1.5 h-1.5 bg-gold rounded-full" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed italic opacity-0"
        >
          {content.hero.tagline}
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-6 font-mono text-xs text-white/30 tracking-[0.15em] uppercase opacity-0"
        >
          {content.site.year} — A memory preserved in time
        </p>

        {/* Scroll Indicator */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
            <div className="scroll-dot w-px h-4 bg-gold absolute top-0 left-0" />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-px rounded-full opacity-0"
          style={{
            background: '#d4af37',
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
            boxShadow: '0 0 6px #d4af37',
            animation: `float ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            opacity: 0.4,
          }}
        />
      ))}
    </section>
  )
}
