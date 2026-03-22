import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * FG: Combined — editorial headline with illustrations placed deliberately
 * to complement the text layout. Positioned to create a diagonal rhythm
 * from top-right to bottom-left. All share the same gentle drift speed,
 * no pulsating. Multi-layer parallax on cursor.
 */
export default function HeroFG_Combined() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Illustrations fade in together, gentle entrance
      tl.fromTo('.hfg-ill-1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .fromTo('.hfg-ill-2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.15)
        .fromTo('.hfg-ill-3', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.3);

      // Headline lines
      tl.fromTo('.hfg-line', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.3);

      // Bottom content
      tl.fromTo('.hfg-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9)
        .fromTo('.hfg-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.1);

      // Shared slow drift — same speed and feel for all three, just offset timing
      const driftConfig = { duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' };
      gsap.to('.hfg-ill-1', { y: '+=10', rotation: '+=2', ...driftConfig });
      gsap.to('.hfg-ill-2', { y: '+=12', rotation: '-=1.5', ...driftConfig, delay: 2 });
      gsap.to('.hfg-ill-3', { y: '+=8', rotation: '+=1', ...driftConfig, delay: 4 });
    }, sectionRef);

    // Multi-layer parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Near layer (pencil) moves most, far layer (trophy) least
      gsap.to('.hfg-ill-1', { x: x * 50, y: y * 30, duration: 1.4, ease: 'power2.out' });
      gsap.to('.hfg-ill-2', { x: x * 35, y: y * 20, duration: 1.2, ease: 'power2.out' });
      gsap.to('.hfg-ill-3', { x: x * 20, y: y * 12, duration: 1, ease: 'power2.out' });
      gsap.to('.hfg-text', { x: x * -8, y: y * -5, duration: 1.2, ease: 'power2.out' });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center cursor-default">

      {/*
        Illustration placement: stacked vertically along the right margin,
        each aligned beside a different headline line. Clear separation.
        - Trophy (top): beside "When growth" — small, high
        - Pencil (middle): beside "we help you" — largest, hero piece
        - Coffee person (bottom): below the headline, near the CTA row
      */}

      {/* Trophy — top-right, beside first headline line */}
      <img src="/images/brand/trophy-winner.png" alt="" aria-hidden="true"
        className="hfg-ill-3 absolute top-[15%] right-[6%] lg:right-[10%] w-28 md:w-36 lg:w-40 object-contain opacity-[0.12] pointer-events-none select-none will-change-transform" />

      {/* Pencil — mid-right, beside third headline line, largest */}
      <img src="/images/brand/winged-pencil.png" alt="" aria-hidden="true"
        className="hfg-ill-1 absolute top-[40%] right-[4%] lg:right-[6%] w-44 md:w-56 lg:w-64 object-contain opacity-[0.16] pointer-events-none select-none will-change-transform" />

      {/* Coffee person — lower-right, below the headline block */}
      <img src="/images/brand/coffee-person.png" alt="" aria-hidden="true"
        className="hfg-ill-2 absolute bottom-[10%] right-[14%] lg:right-[20%] w-32 md:w-40 lg:w-44 object-contain opacity-[0.11] pointer-events-none select-none will-change-transform" />

      {/* Text */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="hfg-text max-w-6xl will-change-transform">
          <span className="hfg-line inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-10">
            Yellow Brolly Co
          </span>

          <h1 className="font-display font-bold tracking-tight text-black mb-10">
            <span className="hfg-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">When growth</span>
            <span className="hfg-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">gets complex,</span>
            <span className="hfg-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mt-2">we help you</span>
            <span className="hfg-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">move forward.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-4xl">
            <p className="hfg-sub text-lg md:text-xl text-black/55 max-w-md leading-relaxed">
              We help organizations strengthen leadership, modernize operations, and implement change that lasts.
            </p>
            <Button to="/contact" variant="dark" size="lg" className="hfg-cta flex-shrink-0">
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
