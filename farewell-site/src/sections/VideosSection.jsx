import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SkeletonVideoCard } from '../components/Skeleton';

gsap.registerPlugin(ScrollTrigger);

function VideoModal({ video, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(overlayRef.current, { opacity: 0, duration: 0.4 });
    tl.from(contentRef.current, { scale: 0.9, opacity: 0, y: 30, duration: 0.5, ease: 'power3.out' }, 0.15);

    const onKey = e => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: 'power3.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25 }, 0.1);
  };

  return (
    <div ref={overlayRef} className="modal-overlay" onClick={handleClose}>
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl mx-4 glass rounded-xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 0 80px rgba(212,175,55,0.1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div>
            <h3 className="font-display text-lg text-white">{video.title}</h3>
            <p className="font-body text-sm text-white/40 italic">{video.description}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-none"
            data-cursor="pointer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Iframe */}
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, index, onClick }) {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="video-card group relative overflow-hidden rounded-xl cursor-none"
      onClick={() => onClick(video)}
      data-cursor="pointer"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'brightness(0.7)' }}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:border-gold group-hover:bg-gold/10 group-hover:scale-110"
            style={{ backdropFilter: 'blur(10px)', background: 'rgba(0,0,0,0.4)' }}
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M2 1.5L16.5 10L2 18.5V1.5Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 glass px-2 py-1 rounded text-[10px] font-mono text-white/60">
          #{String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg text-white group-hover:text-gold transition-colors duration-400">
              {video.title}
            </h3>
            <p className="font-body text-sm text-white/40 italic mt-1">{video.description}</p>
          </div>
          <div
            className="w-6 h-6 flex-shrink-0 border border-gold/20 flex items-center justify-center rounded-full mt-1 group-hover:border-gold/60 transition-all duration-500"
          >
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
              <path d="M1 0.5L7 4.5L1 8.5V0.5Z" fill="rgba(212,175,55,0.5)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover bottom border */}
      <div className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500 bg-gold/60" />
    </div>
  );
}

export default function VideosSection({ videos }) {
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.video-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="relative py-32 px-6"
      style={{ background: 'linear-gradient(180deg, #000 0%, #050400 50%, #000 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-gold/30" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold/50 uppercase">Moving Pictures</span>
            <div className="h-px w-8 bg-gold/30" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Stories in Motion
          </h2>
        </div>

        {/* Grid */}
        {!loaded ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <SkeletonVideoCard key={i} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} onClick={setModal} />
            ))}
          </div>
        )}
      </div>

      {modal && <VideoModal video={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
