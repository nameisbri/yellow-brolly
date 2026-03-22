import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * G: Illustration stack — 3 illustrations in offset frames on the right,
 * sliding in from right with staggered timing. Editorial line-broken headline.
 * Solid warm frames (no glassmorphism). Mobile-friendly single illustration fallback.
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

      // Mobile illustration
      tl.fromTo('.hg-mobile-illust', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5);

      // Headline lines stagger in
      tl.fromTo('.hg-line', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.3);

      // Bottom content
      tl.fromTo('.hg-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9)
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

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center cursor-default">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text — left, editorial line breaks */}
          <div className="lg:col-span-8 hg-text will-change-transform">
            <span className="hg-line inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
              Yellow Brolly Co
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] xl:text-[5.25rem] font-display font-bold leading-[1.05] tracking-tight text-black mb-8">
              {'When growth gets complex, we help you move forward.'.split(' ').map((word, i) => (
                <span key={i} className="hg-line inline-block mr-[0.22em] last:mr-0">{word}</span>
              ))}
            </h1>

            {/* Mobile illustration — single representative, visible below lg */}
            <div className="hg-mobile-illust flex gap-4 items-center mb-8 lg:hidden">
              <img src="/images/brand/creative-designer.png" alt="" aria-hidden="true"
                className="w-20 h-20 object-contain opacity-[0.25]" />
              <img src="/images/brand/trophy-winner.png" alt="" aria-hidden="true"
                className="w-16 h-16 object-contain opacity-[0.2]" />
              <img src="/images/brand/thumbs-up.png" alt="" aria-hidden="true"
                className="w-14 h-14 object-contain opacity-[0.18]" />
            </div>

            <p className="hg-sub text-lg md:text-xl text-black/60 max-w-lg mb-10 leading-relaxed">
              We help organizations strengthen leadership, modernize operations, and implement change that lasts.
            </p>
            <Button to="/contact" variant="dark" size="lg" className="hg-cta">
              Book a Discovery Call
            </Button>
          </div>

          {/* Illustration stack — right, desktop only */}
          {/* No boxes — illustrations float freely with drop shadows for separation */}
          <div className="lg:col-span-4 hg-stack relative hidden lg:block will-change-transform" style={{ height: '580px' }}>
            {/* Pencil — top, pushed left so it overlaps with coffee person */}
            <div className="hg-frame-1 absolute -top-4 -right-4 will-change-transform"
              style={{ transform: 'rotate(5deg)', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))' }}>
              <img src="/images/brand/creative-designer.png" alt="" aria-hidden="true"
                className="w-72 h-72 object-contain" />
            </div>

            {/* Trophy — middle, offset left */}
            <div className="hg-frame-2 absolute top-[28%] -left-8 will-change-transform"
              style={{ transform: 'rotate(-3deg)', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))' }}>
              <img src="/images/brand/trophy-winner.png" alt="" aria-hidden="true"
                className="w-80 h-80 object-contain" />
            </div>

            {/* Thumbs up — bottom-right */}
            <div className="hg-frame-3 absolute -bottom-[15%] -right-[5%] will-change-transform"
              style={{ transform: 'rotate(2deg) scale(1.05)', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.08))' }}>
              <img src="/images/brand/thumbs-up.png" alt="" aria-hidden="true"
                className="w-64 h-64 object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
