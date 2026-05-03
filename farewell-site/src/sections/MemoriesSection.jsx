import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../data/content.json'

gsap.registerPlugin(ScrollTrigger)

export default function MemoriesSection() {
  const sectionRef = useRef(null)
  const linesRef = useRef([])
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // Each line animates individually
      linesRef.current.forEach((line, i) => {
        if (!line) return
        gsap.fromTo(line,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
            },
            delay: content.memories[i]?.delay || 0,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24 opacity-0">
          <span className="font-mono text-[11px] tracking-[0.4em] text-gold/60 uppercase block mb-4">
            Chapter One
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-white">
            The Words We <span className="italic text-gold">Never Said</span>
          </h2>
          <div className="flex justify-center mt-6">
            <div className="gold-line" />
          </div>
        </div>

        {/* Memory lines */}
        <div className="space-y-8 text-center">
          {content.memories.map((memory, i) => (
            <div
              key={memory.id}
              ref={el => linesRef.current[i] = el}
              className="opacity-0"
            >
              <p
                className={`font-body leading-relaxed ${
                  i === 0 || i === 1
                    ? 'text-2xl md:text-4xl text-white italic'
                    : i === 6
                    ? 'text-3xl md:text-5xl text-gold font-display'
                    : 'text-lg md:text-2xl text-white/60'
                }`}
              >
                {memory.line}
              </p>
              {i === 1 && (
                <div className="flex justify-center mt-8">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
