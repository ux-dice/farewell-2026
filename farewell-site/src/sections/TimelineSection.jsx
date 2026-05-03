import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection({ timeline }) {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the center line growing
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power3.out',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.5,
          },
        }
      );

      // Timeline items
      gsap.utils.toArray('.timeline-item', sectionRef.current).forEach((el, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: isLeft ? -60 : 60,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Dots
      gsap.utils.toArray('.timeline-dot', sectionRef.current).forEach(el => {
        gsap.fromTo(
          el,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-32 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-10"
          style={{ background: 'linear-gradient(180deg, transparent, #d4af37, transparent)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-gold/30" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold/50 uppercase">The Journey</span>
            <div className="h-px w-8 bg-gold/30" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white">
            Chapter by Chapter
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(212,175,55,0.1), rgba(212,175,55,0.5), rgba(212,175,55,0.1))',
            }}
          />

          {/* Items */}
          <div className="space-y-16">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`timeline-item relative flex items-center gap-8 md:gap-12 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                    <div
                      className="glass-gold rounded-xl p-6 inline-block max-w-sm"
                      style={{ boxShadow: '0 4px 40px rgba(0,0,0,0.4)' }}
                    >
                      <span className="font-mono text-xs text-gold/60 tracking-widest uppercase block mb-2">
                        {item.year}
                      </span>
                      <p className="font-body text-lg text-white/80 italic leading-relaxed">
                        {item.event}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="timeline-dot absolute left-1/2 -translate-x-1/2 w-4 h-4 flex items-center justify-center">
                    <div
                      className="w-3 h-3 rounded-full border border-gold/60 bg-black"
                      style={{ boxShadow: '0 0 12px rgba(212,175,55,0.5)' }}
                    />
                  </div>

                  {/* Empty spacer */}
                  <div className="flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
