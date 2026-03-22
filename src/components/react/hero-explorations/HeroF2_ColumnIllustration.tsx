import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * F2: Illustration as vertical column divider
 * The winged pencil sits at full height in a narrow column between
 * two text blocks — headline left, subhead right. It acts as a
 * structural element, not decoration. Rotates slowly, breathes,
 * and the whole layout has mouse parallax.
 */
export default function HeroF2_ColumnIllustration() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Left text slides in
      tl.fromTo('.hf2-left', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });

      // Illustration rises from below
      tl.fromTo('.hf2-illust', { y: 200, opacity: 0, rotation: -20 },
        { y: 0, opacity: 1, rotation: 0, duration: 1.2, ease: 'power3.out' }, 0.15);

      // Right text slides in
      tl.fromTo('.hf2-right', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.3);

      // Slow continuous rotation on illustration
      gsap.to('.hf2-illust-img', {
        rotation: 8, scale: 1.05,
        duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }, sectionRef);

    // Mouse parallax — three layers at different rates
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to('.hf2-left', { x: x * -20, y: y * -10, duration: 1.2, ease: 'power2.out' });
      gsap.to('.hf2-illust', { x: x * 30, y: y * 20, duration: 1.5, ease: 'power2.out' });
      gsap.to('.hf2-right', { x: x * -15, y: y * -8, duration: 1.2, ease: 'power2.out' });
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
        {/* Three-column layout: headline | illustration | subhead+CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left — headline */}
          <div className="hf2-left lg:col-span-5 will-change-transform">
            <span className="inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
              Yellow Brolly Co
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.02] tracking-tight text-black">
              When growth gets complex, we help you move forward.
            </h1>
          </div>

          {/* Center — illustration as divider */}
          <div className="hf2-illust lg:col-span-2 flex justify-center will-change-transform py-8 lg:py-0">
            <img src="/images/brand/winged-pencil.png" alt="" aria-hidden="true"
              className="hf2-illust-img w-32 md:w-40 lg:w-full max-w-[180px] object-contain opacity-[0.22] will-change-transform" />
          </div>

          {/* Right — subhead + CTA */}
          <div className="hf2-right lg:col-span-5 will-change-transform">
            <p className="text-lg md:text-xl text-black/55 mb-10 leading-relaxed max-w-md">
              We help organizations strengthen leadership, modernize operations, and implement change that lasts.
            </p>
            <Button to="/contact" variant="dark" size="lg">
              Book a Discovery Call
            </Button>

            {/* Small umbrella accent below CTA */}
            <div className="mt-12 flex items-center gap-3 opacity-30">
              <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
                className="w-8 h-8 object-contain" />
              <div className="w-16 h-px bg-black/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
