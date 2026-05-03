import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../data/content.json'

gsap.registerPlugin(ScrollTrigger)

export default function FooterSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Just a simple fade in when the component mounts, no scroll dependency
    gsap.to(contentRef.current, {
      opacity: 1, 
      y: 0,
      duration: 1.2, 
      ease: 'power3.out',
      delay: 0.5
    })
  }, [])

  return (
    <footer ref={sectionRef} className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.95))'
        }}
      />

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-0 text-center" style={{ opacity: 0, transform: 'translateY(40px)' }}>
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-2 h-2 bg-gold rotate-45" />
          <div className="w-8 h-px bg-gold/40" />
          <div className="w-2 h-2 border border-gold/40 rotate-45" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Final message */}
        <h2 className="font-display text-4xl md:text-6xl text-white mb-6 leading-tight">
          Until we meet again,<br />
          <span className="text-gold italic">keep shining.</span>
        </h2>

        <p className="font-body text-white/40 text-xl italic max-w-lg mx-auto leading-relaxed">
          The memories live on in every smile, every tear, every photograph — and most of all, in each other.
        </p>

        {/* Year badge */}
        <div className="mt-12 inline-flex items-center gap-3 glass px-6 py-3 rounded-full border border-gold/20">
          <div className="w-1 h-1 bg-gold rounded-full" />
          <span className="font-mono text-xs tracking-[0.3em] text-gold/70">
            {content.site.batch}
          </span>
          <div className="w-1 h-1 bg-gold rounded-full" />
        </div>

        {/* Scroll to Top */}
        <div className="mt-16">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-4 mx-auto"
          >
            <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold transition-colors duration-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold transform group-hover:-translate-y-1 transition-transform duration-500">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-mono text-[9px] tracking-[0.4em] text-gold/40 uppercase group-hover:text-gold transition-colors duration-500">
              Back to Top
            </span>
          </button>
        </div>

        {/* The End Signature */}
        <div className="mt-32 mb-16 opacity-20 hover:opacity-100 transition-opacity duration-1000">
          <span className="font-display text-4xl text-white italic tracking-widest">
            Fin.
          </span>
        </div>

        {/* Developer Credit */}
        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center justify-center group">
          {/* Subtle taglines */}
          <div className="flex flex-col items-center gap-1 mb-8 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            <span className="font-mono text-[8px] tracking-[0.5em] uppercase text-white/60">
              A Digital Memory Capsule
            </span>
            <div className="w-8 h-px bg-gold/30" />
            <span className="font-mono text-[8px] tracking-[0.5em] uppercase text-white/60">
              Designed with Passion & Purpose
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase">
                Handcrafted with
              </span>
              <span className="text-gold/60 text-xs animate-pulse">✨</span>
              <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase">
                by
              </span>
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>
          
          <div className="relative group/name cursor-pointer">
            {/* Liquid Gold Shimmer Effect */}
            <a 
              href="https://www.instagram.com/astron_dice?igsh=Mzl5eGt2a29zczc4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 font-display text-4xl md:text-7xl tracking-[0.2em] block"
              data-cursor
            >
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#b8960a] via-[#f3e5ad] to-[#b8960a] bg-[length:200%_auto] animate-shimmer group-hover:text-white transition-colors duration-700">
                ANSH
              </span>
              
              {/* Pulsing Aura */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-0 group-hover/name:opacity-100 transition-opacity duration-1000 bg-gold/20 rounded-full scale-150" />
            </a>

            {/* Cinematic Underline */}
            <div className="mt-6 flex justify-center items-center gap-0 overflow-hidden">
              <div className="h-[1px] w-0 group-hover/name:w-32 bg-gradient-to-r from-transparent to-gold transition-all duration-1000 ease-out" />
              <div className="w-1.5 h-1.5 rotate-45 border border-gold scale-0 group-hover/name:scale-100 transition-transform duration-700 delay-300" />
              <div className="h-[1px] w-0 group-hover/name:w-32 bg-gradient-to-l from-transparent to-gold transition-all duration-1000 ease-out" />
            </div>
          </div>
          
          <div className="mt-12 mb-6">
            <button 
              onClick={() => {
                const gallery = document.getElementById('gallery');
                if (gallery) {
                  gallery.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative px-10 py-4 overflow-hidden border border-gold/30 rounded-sm hover:border-gold transition-colors duration-500"
              data-cursor
            >
              <span className="relative z-10 font-display text-2xl text-white group-hover:text-gold transition-colors duration-500 tracking-[0.3em] uppercase">
                Finish
              </span>
              <div className="absolute inset-0 bg-gold/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>

          {/* Technical subtext */}
          <div className="mt-8 flex items-center gap-6 font-mono text-[7px] text-white/10 tracking-[0.4em] uppercase transition-colors duration-500 group-hover:text-white/30">
            <span>React & Vite</span>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <span>GSAP Animations</span>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <span>Pure CSS3</span>
          </div>

          <p className="mt-8 font-mono text-[8px] text-white/10 tracking-[0.4em] uppercase pb-8">
            &copy; {content.site.year} • Forever In Our Hearts • All Memories Preserved
          </p>
        </div>
      </div>
    </footer>
  )
}
