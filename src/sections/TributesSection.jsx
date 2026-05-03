import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../data/content.json'

gsap.registerPlugin(ScrollTrigger)

function TributeCard({ person, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        }
      }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="group relative glass border border-gold/10 p-6 hover:border-gold/25 transition-all duration-500 opacity-0"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-sm"
        style={{ boxShadow: 'inset 0 0 40px rgba(212,175,55,0.05)' }}
      />

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gold/20">
            <img
              src={person.avatar}
              alt={person.name}
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Gold ring on hover */}
          <div className="absolute inset-0 rounded-full border border-gold/0 group-hover:border-gold/40 transition-all duration-500 scale-110" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-300">
            {person.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 mb-3">
            <div className="w-4 h-px bg-gold/40" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold/60 uppercase">
              {person.role}
            </span>
          </div>
          <p className="font-body italic text-white/40 text-sm leading-relaxed">
            "{person.memory}"
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TributesSection() {
  const sectionRef = useRef(null)
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

  return (
    <section id="tributes" ref={sectionRef} className="section-padding">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="font-mono text-[11px] tracking-[0.4em] text-gold/60 uppercase block mb-4">
            Chapter Four
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-white">
            The <span className="italic text-gold">Faces</span> We'll Miss
          </h2>
          <p className="font-body text-white/40 mt-4 max-w-md mx-auto italic">
            The people who shaped every moment worth remembering
          </p>
          <div className="flex justify-center mt-6">
            <div className="gold-line" />
          </div>
        </div>

        {/* Team Grid */}
        <div className="mb-16">
          <h3 className="font-mono text-sm tracking-[0.2em] text-gold/80 uppercase text-center mb-8">
            The Batch Representatives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.team.map((person, i) => (
              <TributeCard key={`team-${person.id}`} person={person} index={i} />
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        {content.teachers && content.teachers.length > 0 && (
          <div>
            <h3 className="font-mono text-sm tracking-[0.2em] text-gold/80 uppercase text-center mb-8">
              Our Mentors & Teachers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.teachers.map((person, i) => (
                <TributeCard key={`teacher-${person.id}`} person={person} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
