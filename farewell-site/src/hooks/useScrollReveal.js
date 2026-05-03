import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Attaches a GSAP ScrollTrigger fade-up animation to the returned ref.
 * @param {object} opts - Optional overrides: { y, duration, ease, delay }
 */
export function useScrollReveal(opts = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: opts.y ?? 60,
          scale: opts.scale ?? 1,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: opts.duration ?? 1.2,
          ease: opts.ease ?? 'power3.out',
          delay: opts.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Staggered reveal for a list of children within a container.
 * @param {number} stagger - Stagger delay between children
 * @param {string} childSelector - CSS selector for children
 */
export function useStaggerReveal(childSelector = '> *', stagger = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray(childSelector, el),
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [childSelector, stagger]);

  return ref;
}
