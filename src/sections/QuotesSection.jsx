import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../data/content.json'

gsap.registerPlugin(ScrollTrigger)

export default function QuotesSection() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const quoteRef = useRef(null)
  const authorRef = useRef(null)
  const headerRef = useRef(null)

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
  }, [])

  const changeQuote = (i) => {
    if (i === active) return
    const tl = gsap.timeline()
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0, y: -20, duration: 0.3, ease: 'power2.in'
    })
    .call(() => setActive(i))
    .to([quoteRef.current, authorRef.current], {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1
    })
  }

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (active + 1) % content.quotes.length
      changeQuote(next)
    }, 6000)
    return () => clearInterval(interval)
  }, [active])

  const quote = content.quotes[active]

  return (
    <section id="quotes" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[20vw] font-display font-bold text-white/[0.015] select-none leading-none"
        >
          "
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20 opacity-0">
          <span className="font-mono text-[11px] tracking-[0.4em] text-gold/60 uppercase block mb-4">
            Chapter Five
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-white">
            Words That <span className="italic text-gold">Endure</span>
          </h2>
          <div className="flex justify-center mt-6">
            <div className="gold-line" />
          </div>
        </div>

        {/* Quote display */}
        <div className="relative">
          {/* Big quote mark */}
          <div
            className="absolute -top-8 -left-4 md:-left-12 font-display text-8xl text-gold/20 leading-none select-none"
          >
            "
          </div>

          <blockquote
            ref={quoteRef}
            className="font-display text-2xl md:text-4xl text-white italic leading-relaxed"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.1)' }}
          >
            {quote.text}
          </blockquote>

          <div
            ref={authorRef}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-gold/40" />
            <span className="font-mono text-xs tracking-[0.3em] text-gold/70 uppercase">
              {quote.author}
            </span>
            <div className="w-12 h-px bg-gold/40" />
          </div>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-3 mt-12">
          {content.quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => changeQuote(i)}
              className={`transition-all duration-300 rounded-full ${
                i === active
                  ? 'w-8 h-1.5 bg-gold'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
