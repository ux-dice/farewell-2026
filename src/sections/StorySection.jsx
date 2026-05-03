import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection({ data }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paraRefs = useRef([]);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Decorative diamond
      gsap.from(decorRef.current, {
        scale: 0,
        rotation: 45,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });

      // Paragraphs stagger
      paraRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          opacity: 0,
          y: 40,
          filter: 'blur(8px)',
          duration: 1.2,
          ease: 'power3.out',
          delay: i * 0.2,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Decorative diamond */}
        <div ref={decorRef} className="flex justify-center mb-12">
          <div className="w-10 h-10 border border-gold/40 rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-gold/60 rotate-0" />
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-8 bg-gold/30" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold/50 uppercase">Chapter One</span>
          <div className="h-px w-8 bg-gold/30" />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-center font-light text-white leading-tight mb-16"
        >
          {data.title}
        </h2>

        {/* Gold divider */}
        <div className="hr-gold w-24 mx-auto mb-16" />

        {/* Paragraphs */}
        <div className="space-y-8 text-center">
          {data.paragraphs.map((para, i) => (
            <p
              key={i}
              ref={el => paraRefs.current[i] = el}
              className="font-body text-xl md:text-2xl text-white/60 font-light italic leading-relaxed max-w-3xl mx-auto"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
