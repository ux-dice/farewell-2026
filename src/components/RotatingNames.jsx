import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import content from '../data/content.json';

const RotatingNames = () => {
  const { majdoor } = content;
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const setupMarquee = (row, duration, reverse = false) => {
      const items = [...row.children];
      items.forEach(item => {
        const clone = item.cloneNode(true);
        row.appendChild(clone);
      });

      gsap.to(row, {
        x: reverse ? "0%" : "-50%",
        duration: duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % 50) // Ensure it loops correctly if using xPercent or x
        }
      });
      
      // Simpler approach for infinite scroll
      gsap.set(row, { x: 0 });
      gsap.to(row, {
        x: "-50%",
        duration: duration,
        ease: "none",
        repeat: -1,
        runBackwards: reverse
      });
    };

    if (row1Ref.current) setupMarquee(row1Ref.current, 6);
    if (row2Ref.current) setupMarquee(row2Ref.current, 6, true);
  }, []);

  return (
    <section className="py-24 overflow-hidden relative bg-black">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 mb-16 text-center relative z-10">
        <span className="text-gold/40 text-xs tracking-[0.5em] uppercase mb-4 block">Contributors</span>
        <h2 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-gold-light via-gold to-gold-dark uppercase tracking-widest italic animate-shimmer bg-[length:200%_auto]">
          {majdoor.heading}
        </h2>
        <div className="mt-6 flex justify-center items-center gap-4">
          <div className="h-px w-12 bg-gold/20"></div>
          <div className="w-2 h-2 rotate-45 border border-gold/30"></div>
          <div className="h-px w-12 bg-gold/20"></div>
        </div>
      </div>

      <div className="flex flex-col gap-12 relative">
        {/* Row 1: Seniors */}
        <div className="overflow-hidden py-4 border-y border-gold/5 bg-gold/[0.02]">
          <div ref={row1Ref} className="flex whitespace-nowrap w-fit">
            {majdoor.seniors.map((senior, i) => (
              <div key={`senior-${i}`} className="flex items-center mx-8 group">
                <span className="text-gold/20 text-3xl font-serif mr-8">/</span>
                <span className="text-3xl md:text-5xl font-serif text-white/30 group-hover:text-gold transition-all duration-700 cursor-default">
                  {senior.name}
                  <sup className="text-[10px] uppercase tracking-widest ml-2 text-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Senior</sup>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Juniors */}
        <div className="overflow-hidden py-4 border-y border-gold/5 bg-gold/[0.01]">
          <div ref={row2Ref} className="flex whitespace-nowrap w-fit">
            {majdoor.juniors.map((junior, i) => (
              <div key={`junior-${i}`} className="flex items-center mx-8 group">
                <span className="text-gold/20 text-3xl font-serif mr-8">/</span>
                {junior.url ? (
                  <a 
                    href={junior.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-3xl md:text-5xl font-serif text-white/30 hover:text-gold transition-all duration-700 cursor-pointer decoration-gold/30 hover:decoration-gold underline underline-offset-8 decoration-0 hover:decoration-1"
                  >
                    {junior.name}
                    <sup className="text-[10px] uppercase tracking-widest ml-2 text-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Junior</sup>
                  </a>
                ) : (
                  <span className="text-3xl md:text-5xl font-serif text-white/30 group-hover:text-gold transition-all duration-700 cursor-default">
                    {junior.name}
                    <sup className="text-[10px] uppercase tracking-widest ml-2 text-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Junior</sup>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative side fades */}
      <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};

export default RotatingNames;
