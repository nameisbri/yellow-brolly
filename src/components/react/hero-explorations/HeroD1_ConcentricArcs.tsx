import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * D1: Concentric arcs — the scalloped umbrella canopy shape
 * repeated as radiating arcs in brand accent colors.
 */
export default function HeroD1_ConcentricArcs() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Arcs draw in from center
      gsap.fromTo('.hd1-arc',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out' }
      );

      // Text
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hd1-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6)
        .fromTo('.hd1-word', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 }, 0.7)
        .fromTo('.hd1-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.1)
        .fromTo('.hd1-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.3);

      // Slow rotation on the arc group
      gsap.to('.hd1-arc-group', {
        rotation: 15,
        duration: 40,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');
  const arcColors = [
    'rgba(107,158,158,0.18)',
    'rgba(196,149,106,0.15)',
    'rgba(122,158,122,0.18)',
    'rgba(155,126,160,0.14)',
    'rgba(242,189,78,0.2)',
    'rgba(107,158,158,0.1)',
    'rgba(196,149,106,0.08)',
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      {/* Concentric scalloped arcs */}
      <div className="hd1-arc-group absolute will-change-transform" style={{ right: '-15%', top: '-20%', width: '80vw', height: '80vw' }}>
        {arcColors.map((color, i) => {
          const size = 300 + i * 140;
          return (
            <svg key={i} className="hd1-arc absolute will-change-transform" width={size} height={size}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              viewBox="0 0 200 200" fill="none">
              {/* Scalloped arc — 3 bumps like the umbrella canopy */}
              <path
                d={`M 20 120
                    Q 50 ${40 - i * 3} 80 120
                    Q 100 ${30 - i * 3} 120 120
                    Q 150 ${40 - i * 3} 180 120`}
                stroke={color}
                strokeWidth={2.5 - i * 0.2}
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          );
        })}
      </div>

      {/* Small umbrella accent */}
      <div className="absolute bottom-[15%] right-[12%] pointer-events-none select-none">
        <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
          className="w-20 md:w-28 object-contain opacity-[0.08]" />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl">
          <span className="hd1-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => (
              <span key={i} className="hd1-word inline-block mr-[0.25em] last:mr-0 text-black/85">{word}</span>
            ))}
          </h1>
          <p className="hd1-sub text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hd1-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
