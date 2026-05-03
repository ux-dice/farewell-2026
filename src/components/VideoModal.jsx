import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function VideoModal({ video, onClose }) {
  const overlayRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    )
    .fromTo(containerRef.current,
      { scale: 0.85, y: 40, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    )

    const handleKey = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(containerRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: 'power2.in' })
    .to(overlayRef.current, { opacity: 0, duration: 0.3 }, '-=0.1')
  }

  return (
    <div ref={overlayRef} className="video-modal" onClick={handleClose}>
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-xl text-white">{video.title}</h3>
            <p className="font-mono text-xs text-white/40 mt-1">{video.description}</p>
          </div>
          <button
            onClick={handleClose}
            className="glass border border-white/10 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all duration-300"
          >
            ×
          </button>
        </div>

        {/* Video */}
        <div
          className="relative overflow-hidden rounded-sm"
          style={{
            paddingBottom: '56.25%',
            boxShadow: '0 0 80px rgba(212, 175, 55, 0.15)'
          }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer hint */}
        <p className="text-center font-mono text-[10px] text-white/20 tracking-widest mt-4 uppercase">
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  )
}
