import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteSection({ quotes, meta }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.quote-block', sectionRef.current).forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000 0%, #0a0802 50%, #000 100%)' }}
    >
      {/* Decorative radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #d4af37 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto space-y-24">
        {quotes.map((quote, i) => (
          <div key={i} className="quote-block text-center relative">
            {/* Opening quote mark */}
            <div
              className="font-display text-9xl text-gold/10 leading-none select-none mb-4"
              style={{ lineHeight: 1 }}
            >
              "
            </div>

            <blockquote className="font-display text-2xl md:text-4xl font-light italic text-white/80 leading-relaxed mb-8">
              {quote.text}
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-gold/30" />
              <cite className="font-mono text-xs text-gold/50 tracking-widest uppercase not-italic">
                {quote.author}
              </cite>
              <div className="h-px w-8 bg-gold/30" />
            </div>
          </div>
        ))}

        {/* Final farewell */}
        <div className="quote-block text-center py-16 border-t border-white/5">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 border border-gold/30 rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 border border-gold/50" />
            </div>
          </div>
          <p className="font-mono text-xs tracking-[0.4em] text-gold/40 uppercase mb-6">
            {meta.location}
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-light text-white mb-6">
            {meta.title}
          </h2>
          <p className="font-body text-xl text-white/40 italic">{meta.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
