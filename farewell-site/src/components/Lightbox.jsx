import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Lightbox({ photo, onClose }) {
  const overlayRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    .fromTo(imgRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    )

    const handleKey = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(imgRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: 'power2.in' })
    .to(overlayRef.current, { opacity: 0, duration: 0.3 }, '-=0.1')
  }

  return (
    <div
      ref={overlayRef}
      className="lightbox-overlay"
      onClick={handleClose}
    >
      <div className="relative max-w-5xl max-h-[90vh] mx-4" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 font-mono text-xs text-white/50 hover:text-gold transition-colors tracking-widest uppercase flex items-center gap-2"
        >
          <span>Close</span>
          <span className="text-lg">×</span>
        </button>

        {/* Image */}
        <div
          ref={imgRef}
          className="overflow-hidden rounded-sm"
          style={{ boxShadow: '0 0 80px rgba(212, 175, 55, 0.15)' }}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="max-w-full max-h-[85vh] object-contain block"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="font-body italic text-white/60 text-lg">{photo.caption}</p>
        </div>
      </div>
    </div>
  )
}
