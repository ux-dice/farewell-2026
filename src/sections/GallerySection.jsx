import { useEffect, useRef, useState, lazy, Suspense, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkeletonGrid from '../components/SkeletonGrid'
import Lightbox from '../components/Lightbox'
import { useGalleryImages } from '../hooks/useGalleryImages'
import { useImageOrientation } from '../hooks/useImageOrientation'
import buildCollageLayout from '../utils/buildCollageLayout'

gsap.registerPlugin(ScrollTrigger)

function GalleryItem({ photo, index, onClick, isReady }) {
  const itemRef = useRef(null)
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    gsap.fromTo(itemRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1,
        ease: 'power3.out',
        delay: (index % 3) * 0.12,
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 88%',
        }
      }
    )
  }, [index])

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.6, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' })
  }

  return (
    <div
      ref={itemRef}
      className="group relative overflow-hidden cursor-pointer opacity-0"
      onClick={() => onClick(photo)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor
      style={{
        display: isReady ? "block" : "none",
        gridColumn: `span ${photo.colSpan || 4}`,
        gridRow: `span ${photo.rowSpan || 1}`,
        position: "relative",
        overflow: "hidden",
        minHeight: "280px",
        height: "100%",
        borderRadius: "4px",
        background: "#1a1a1a",
      }}
    >
      {/* Skeleton while loading */}
      {!loaded && <div className="gallery-skeleton" />}

      {/* Image */}
      <img
        ref={imgRef}
        src={photo.src}
        alt={photo.caption || "Gallery Image"}
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "opacity 0.4s ease",
          opacity: loaded ? 1 : 0,
        }}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow border on hover */}
      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500"
        style={{
          boxShadow: 'inset 0 0 0 0 rgba(212,175,55,0)',
        }}
      />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-body italic text-white text-sm">{photo.caption}</p>
        <p className="font-mono text-[10px] text-gold/60 tracking-wider mt-1 uppercase">{photo.category}</p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="glass w-8 h-8 rounded-full flex items-center justify-center border border-gold/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function GallerySection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [activeLightbox, setActiveLightbox] = useState(null)
  
  const BATCH_SIZE = 24
  const allImages = useGalleryImages()
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const visibleImages = allImages.slice(0, visibleCount)
  const hasMore = visibleCount < allImages.length

  const { orientations, isReady } = useImageOrientation(visibleImages)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const layout = buildCollageLayout(visibleImages, orientations)

  console.log("Layout generated:", layout)
  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + BATCH_SIZE, allImages.length))
  }, [allImages.length])

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
    <section id="gallery" ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="font-mono text-[11px] tracking-[0.4em] text-gold/60 uppercase block mb-4">
            Chapter Two
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-white">
            Frames of <span className="italic text-gold">Memory</span>
          </h2>
          <p className="font-body text-white/40 mt-4 max-w-md mx-auto italic">
            Every photograph holds a universe of moments we never want to forget
          </p>
          <div className="flex justify-center mt-6">
            <div className="gold-line" />
          </div>
        </div>

        {/* Masonry Grid */}
        <style>{`
          @keyframes shimmer {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .gallery-skeleton {
            background: linear-gradient(
              90deg,
              #1a1a1a 25%,
              #2a2a2a 50%,
              #1a1a1a 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
            border-radius: 4px;
            width: 100%;
            height: 100%;
            position: absolute;
            inset: 0;
          }
          @media (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(4, 1fr) !important;
              grid-auto-rows: 180px !important;
            }
          }
          @media (max-width: 480px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-auto-rows: 160px !important;
              gap: 4px !important;
            }
          }
        `}</style>
        <div 
          className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "280px",
            gap: "8px",
            width: "100%",
          }}
        >
          {!isReady && layout.map(({ id, colSpan, rowSpan }) => (
            <div
              key={`skel-${id}`}
              style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
                borderRadius: "4px",
                background: "linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.4s infinite",
                minHeight: "200px",
              }}
            />
          ))}
          {layout.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              index={i}
              onClick={setActiveLightbox}
              isReady={isReady}
            />
          ))}
        </div>

        {hasMore && (
          <div style={{ display:"flex", justifyContent:"center", padding:"2rem 0" }}>
            <button onClick={loadMore}>
              Load More ({allImages.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* Count */}
        <div className="text-center mt-12">
          <span className="font-mono text-xs text-white/20 tracking-widest">
            {allImages.length} photographs preserved
          </span>
        </div>
      </div>

      {/* Lightbox */}
      {activeLightbox && (
        <Lightbox
          photo={activeLightbox}
          onClose={() => setActiveLightbox(null)}
        />
      )}
    </section>
  )
}
