import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../data/content.json'
import VideoModal from '../components/VideoModal'

gsap.registerPlugin(ScrollTrigger)

function VideoCard({ video, index, onClick }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.15,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        }
      }
    )
  }, [index])

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: '0 30px 60px rgba(212,175,55,0.15)',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(imgRef.current, { scale: 1.05, duration: 0.5, ease: 'power2.out' })
  }

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 0 0 rgba(212,175,55,0)',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className="glass border border-gold/10 overflow-hidden cursor-pointer group opacity-0"
      onClick={() => onClick(video)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-cursor
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <img
          ref={imgRef}
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-gold/80 group-hover:scale-110 transition-all duration-400"
            style={{ background: 'rgba(0,0,0,0.4)' }}
          >
            <div
              className="w-0 h-0 ml-1"
              style={{
                borderTop: '9px solid transparent',
                borderBottom: '9px solid transparent',
                borderLeft: '16px solid rgba(255,255,255,0.8)',
              }}
            />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3">
          <span className="font-mono text-[11px] text-white/70 bg-black/60 px-2 py-0.5 rounded">
            {video.duration}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-0.5 h-12 bg-gradient-to-b from-gold to-transparent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-300">
              {video.title}
            </h3>
            <p className="font-body italic text-white/40 text-sm mt-1 leading-relaxed">
              {video.description}
            </p>
          </div>
        </div>

        {/* Watch button */}
        <div className="mt-4 flex items-center gap-2 text-gold/60 group-hover:text-gold transition-colors duration-300">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase">Watch Now</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function VideoSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [activeVideo, setActiveVideo] = useState(null)

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
    <section id="videos" ref={sectionRef} className="section-padding">
      {/* Background gradient (Fixed: use inset-0 instead of h-full to prevent overflow) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.03), transparent)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="font-mono text-[11px] tracking-[0.4em] text-gold/60 uppercase block mb-4">
            Chapter Three
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-white">
            Moving <span className="italic text-gold">Pictures</span>
          </h2>
          <p className="font-body text-white/40 mt-4 max-w-md mx-auto italic">
            Watch the stories unfold — in motion and in memory
          </p>
          <div className="flex justify-center mt-6">
            <div className="gold-line" />
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.videos.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              index={i}
              onClick={setActiveVideo}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  )
}
