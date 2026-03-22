import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * FG: Combined — editorial headline broken across lines with multiple
 * illustrations overlapping the text at different depths. Each illustration
 * drops in at different times and positions. 3D tilt on cursor.
 * The illustrations ARE the visual — no frames, no cards, just raw overlap.
 */
export default function HeroFG_Combined() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Illustrations cascade in from different directions
      tl.fromTo('.hfg-ill-1', { y: -180, rotation: 20, opacity: 0, scale: 0.5 },
        { y: 0, rotation: -6, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' })
        .fromTo('.hfg-ill-2', { x: 200, rotation: -15, opacity: 0, scale: 0.6 },
          { x: 0, rotation: 4, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }, 0.2)
        .fromTo('.hfg-ill-3', { y: 150, rotation: 10, opacity: 0, scale: 0.5 },
          { y: 0, rotation: -3, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, 0.35);

      // Headline lines
      tl.fromTo('.hfg-line', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.3);

      // Bottom content
      tl.fromTo('.hfg-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9)
        .fromTo('.hfg-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.1);

      // Individual breathing on each illustration
      gsap.to('.hfg-ill-1', { scale: 1.04, rotation: -3, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hfg-ill-2', { scale: 1.03, rotation: 6, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
      gsap.to('.hfg-ill-3', { scale: 1.05, rotation: -5, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
    }, sectionRef);

    // Multi-layer parallax — each illustration at a different rate
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to('.hfg-ill-1', { x: x * 40, y: y * 25, rotationY: x * 8, rotationX: y * -6, duration: 1.2, ease: 'power2.out' });
      gsap.to('.hfg-ill-2', { x: x * 60, y: y * 35, rotationY: x * 10, rotationX: y * -8, duration: 1.4, ease: 'power2.out' });
      gsap.to('.hfg-ill-3', { x: x * 30, y: y * 20, rotationY: x * 6, rotationX: y * -5, duration: 1, ease: 'power2.out' });
      gsap.to('.hfg-text', { x: x * -10, y: y * -6, duration: 1.2, ease: 'power2.out' });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center cursor-default"
      style={{ perspective: '800px' }}>

      {/* Illustration 1 — winged pencil, top-right, largest */}
      <img src="/images/brand/winged-pencil.png" alt="" aria-hidden="true"
        className="hfg-ill-1 absolute top-[8%] right-[12%] w-52 md:w-72 lg:w-80 object-contain opacity-[0.18] pointer-events-none select-none will-change-transform"
        style={{ transformStyle: 'preserve-3d' }} />

      {/* Illustration 2 — coffee person, mid-right, overlaps headline */}
      <img src="/images/brand/coffee-person.png" alt="" aria-hidden="true"
        className="hfg-ill-2 absolute top-[40%] right-[5%] md:right-[18%] w-44 md:w-56 lg:w-64 object-contain opacity-[0.14] pointer-events-none select-none will-change-transform"
        style={{ transformStyle: 'preserve-3d' }} />

      {/* Illustration 3 — trophy, bottom-left of text, smallest */}
      <img src="/images/brand/trophy-winner.png" alt="" aria-hidden="true"
        className="hfg-ill-3 absolute bottom-[12%] left-[8%] md:left-[25%] w-32 md:w-40 lg:w-48 object-contain opacity-[0.12] pointer-events-none select-none will-change-transform"
        style={{ transformStyle: 'preserve-3d' }} />

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
