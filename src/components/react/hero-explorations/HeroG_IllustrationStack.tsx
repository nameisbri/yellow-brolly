import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * G: Illustration stack — 3 illustrations stacked vertically on the right
 * in offset "card" frames, each sliding in from the right at different delays.
 * Creates a curated, gallery-like feel. Mouse parallax on the stack.
 */
export default function HeroG_IllustrationStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Illustration frames slide in from right, staggered and offset
      tl.fromTo('.hg-frame-1', { x: 300, rotation: 8, opacity: 0 }, { x: 0, rotation: 3, opacity: 1, duration: 1 })
        .fromTo('.hg-frame-2', { x: 350, rotation: -5, opacity: 0 }, { x: 0, rotation: -2, opacity: 1, duration: 1 }, 0.15)
        .fromTo('.hg-frame-3', { x: 280, rotation: 6, opacity: 0 }, { x: 0, rotation: 1, opacity: 1, duration: 1 }, 0.3);

      // Text
      tl.fromTo('.hg-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.4)
        .fromTo('.hg-word', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 }, 0.5)
        .fromTo('.hg-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9)
        .fromTo('.hg-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.1);
    }, sectionRef);

    // Mouse parallax — stack shifts slightly
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to('.hg-stack', { x: x * 25, y: y * 15, duration: 1.2, ease: 'power2.out' });
      gsap.to('.hg-text', { x: x * -8, y: y * -5, duration: 1.2, ease: 'power2.out' });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center cursor-default">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Text — left */}
          <div className="lg:col-span-6 hg-text will-change-transform">
            <span className="hg-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
              Yellow Brolly Co
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-6">
              {words.map((word, i) => (
                <span key={i} className="hg-word inline-block mr-[0.25em] last:mr-0 text-black/85">{word}</span>
              ))}
            </h1>
            <p className="hg-sub text-base md:text-lg text-black/60 max-w-lg mb-10 leading-relaxed">
              We help organizations strengthen leadership, modernize operations, and implement change that lasts.
            </p>
            <Button to="/contact" variant="dark" size="lg" className="hg-cta">
              Book a Discovery Call
            </Button>
          </div>

          {/* Illustration stack — right */}
          <div className="lg:col-span-6 hg-stack relative hidden lg:block will-change-transform" style={{ height: '500px' }}>
            {/* Frame 1 — top, offset right */}
            <div className="hg-frame-1 absolute top-0 right-0 bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg will-change-transform"
              style={{ transform: 'rotate(3deg)' }}>
              <img src="/images/brand/winged-pencil.png" alt="" aria-hidden="true"
                className="w-36 h-36 object-contain" />
            </div>

            {/* Frame 2 — middle, offset left */}
            <div className="hg-frame-2 absolute top-[35%] right-[25%] bg-white/40 backdrop-blur-sm rounded-xl p-5 shadow-lg will-change-transform"
              style={{ transform: 'rotate(-2deg)' }}>
              <img src="/images/brand/coffee-person.png" alt="" aria-hidden="true"
                className="w-44 h-44 object-contain" />
            </div>

            {/* Frame 3 — bottom, offset right */}
            <div className="hg-frame-3 absolute bottom-0 right-[8%] bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg will-change-transform"
              style={{ transform: 'rotate(1deg)' }}>
              <img src="/images/brand/trophy-winner.png" alt="" aria-hidden="true"
                className="w-32 h-32 object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
