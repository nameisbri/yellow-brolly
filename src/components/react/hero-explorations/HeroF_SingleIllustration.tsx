import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * F: Single hero illustration — the winged pencil at massive scale
 * dominates the right half. Text on the left. The pencil has a slow
 * breathing scale + subtle rotation. Simple, confident, branded.
 */
export default function HeroF_SingleIllustration() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Illustration sweeps in from right with rotation
      tl.fromTo('.hf-illust', { x: 200, opacity: 0, rotation: 15 }, { x: 0, opacity: 1, rotation: 0, duration: 1.4, ease: 'power3.out' });

      // Text
      tl.fromTo('.hf-eyebrow', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.3)
        .fromTo('.hf-word', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, 0.4)
        .fromTo('.hf-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9)
        .fromTo('.hf-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.1);

      // Continuous breathing on illustration
      gsap.to('.hf-illust', {
        scale: 1.04,
        rotation: 2,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      {/* Single large illustration — right half */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center pointer-events-none select-none">
        <img src="/images/brand/winged-pencil.png" alt="" aria-hidden="true"
          className="hf-illust w-[80%] max-w-[500px] object-contain opacity-[0.18] will-change-transform" />
      </div>

      {/* Mobile: smaller illustration */}
      <div className="absolute right-4 bottom-8 lg:hidden pointer-events-none select-none">
        <img src="/images/brand/winged-pencil.png" alt="" aria-hidden="true"
          className="hf-illust w-32 object-contain opacity-[0.12]" />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-xl lg:max-w-2xl">
          <span className="hf-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => (
              <span key={i} className="hf-word inline-block mr-[0.25em] last:mr-0 text-black/85">{word}</span>
            ))}
          </h1>
          <p className="hf-sub text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hf-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
