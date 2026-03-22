import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * D4: Diagonal stripe pattern
 * Bold diagonal stripes in alternating yellow/cream tones with
 * thin accent color stripes. On load, stripes slide in from
 * offscreen. The umbrella overlaps the stripe boundary.
 */
export default function HeroD4_DiagonalStripes() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Stripes slide in from left
      gsap.fromTo('.hd4-stripe',
        { xPercent: -110 },
        { xPercent: 0, duration: 1, stagger: 0.06, ease: 'power4.out' }
      );

      // Umbrella scales up from behind stripes
      gsap.fromTo('.hd4-umbrella',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 0.14, duration: 1.2, delay: 0.5, ease: 'power3.out' }
      );

      // Text
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hd4-eyebrow', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.7)
        .fromTo('.hd4-word', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 }, 0.8)
        .fromTo('.hd4-sub', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, 1.2)
        .fromTo('.hd4-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.4);

      // Slow continuous drift on stripes
      gsap.to('.hd4-stripe-group', {
        x: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  const stripes = [
    { color: 'rgba(255,252,247,0.4)', width: '120px' },       // cream
    { color: 'rgba(107,158,158,0.15)', width: '4px' },         // teal accent
    { color: 'rgba(242,189,78,0.25)', width: '80px' },         // yellow
    { color: 'rgba(196,149,106,0.12)', width: '3px' },         // amber accent
    { color: 'rgba(255,252,247,0.35)', width: '60px' },        // cream
    { color: 'rgba(122,158,122,0.15)', width: '4px' },         // sage accent
    { color: 'rgba(242,189,78,0.15)', width: '100px' },        // yellow
    { color: 'rgba(155,126,160,0.12)', width: '3px' },         // mauve accent
    { color: 'rgba(255,252,247,0.3)', width: '90px' },         // cream
    { color: 'rgba(107,158,158,0.1)', width: '3px' },          // teal
    { color: 'rgba(242,189,78,0.2)', width: '70px' },          // yellow
    { color: 'rgba(196,149,106,0.1)', width: '4px' },          // amber
    { color: 'rgba(255,252,247,0.25)', width: '110px' },       // cream
    { color: 'rgba(122,158,122,0.12)', width: '3px' },         // sage
    { color: 'rgba(242,189,78,0.18)', width: '85px' },         // yellow
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      {/* Diagonal stripes */}
      <div className="hd4-stripe-group absolute inset-0 pointer-events-none will-change-transform"
        style={{ transform: 'rotate(-12deg) scale(1.5)', transformOrigin: 'center center' }}>
        <div className="flex h-full" style={{ marginLeft: '-20%' }}>
          {stripes.map((stripe, i) => (
            <div key={i} className="hd4-stripe h-[200%] flex-shrink-0 will-change-transform"
              style={{ width: stripe.width, backgroundColor: stripe.color, marginTop: '-50%' }} />
          ))}
          {/* Repeat for coverage */}
          {stripes.map((stripe, i) => (
            <div key={`r${i}`} className="hd4-stripe h-[200%] flex-shrink-0 will-change-transform"
              style={{ width: stripe.width, backgroundColor: stripe.color, marginTop: '-50%' }} />
          ))}
        </div>
      </div>

      {/* Umbrella overlapping the stripe boundary */}
      <div className="hd4-umbrella absolute right-[8%] top-1/2 -translate-y-1/2 pointer-events-none select-none will-change-transform">
        <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
          className="w-60 md:w-80 lg:w-[400px] object-contain" />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl">
          <span className="hd4-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => (
              <span key={i} className="hd4-word inline-block mr-[0.25em] last:mr-0 text-black/85">{word}</span>
            ))}
          </h1>
          <p className="hd4-sub text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hd4-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
