import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * Option E: Typewriter cascade with staggered line reveals
 * Each line of the headline cascades in from different X offsets,
 * creating a kinetic typography feel. The umbrella draws itself
 * in behind the text with a clip-path reveal. A vertical marquee
 * of service keywords scrolls slowly on the right edge.
 */
export default function HeroE_TypewriterCascade() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Lines cascade in from alternating sides
      tl.fromTo('.he-line-1', { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
        .fromTo('.he-line-2', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.15)
        .fromTo('.he-line-3', { x: -150, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.3)
        .fromTo('.he-line-4', { x: 180, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.45);

      // Umbrella clip-path reveal (circle expanding from center)
      tl.fromTo('.he-umbrella',
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0.15 },
        { clipPath: 'circle(75% at 50% 50%)', opacity: 0.15, duration: 1.5, ease: 'power2.inOut' },
        0.3
      );

      // Bottom content
      tl.fromTo('.he-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 0.8)
        .fromTo('.he-bottom', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 1);

      // Vertical marquee — continuous scroll
      gsap.to('.he-marquee-inner', {
        yPercent: -50,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const services = ['Strategy', 'Culture', 'Digital', 'Brand', 'Implementation', 'Leadership', 'Operations', 'Growth'];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      {/* Umbrella behind text — clip-path animated */}
      <div className="he-umbrella absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-none select-none">
        <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
          className="w-[500px] md:w-[700px] lg:w-[800px] object-contain" />
      </div>

      {/* Vertical scrolling services marquee — right edge */}
      <div className="absolute right-6 md:right-10 top-0 bottom-0 w-8 overflow-hidden opacity-[0.08] pointer-events-none select-none">
        <div className="he-marquee-inner flex flex-col">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="text-xs font-bold uppercase tracking-widest text-black whitespace-nowrap py-6"
              style={{ writingMode: 'vertical-lr' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-6xl">
          {/* Kinetic headline — each line cascades from alternating sides */}
          <div className="mb-10">
            <h1 className="font-display font-bold tracking-tight text-black">
              <span className="he-line-1 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.95] will-change-transform">
                When growth
              </span>
              <span className="he-line-2 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.95] text-black/35 will-change-transform">
                gets complex,
              </span>
              <span className="he-line-3 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.95] will-change-transform">
                we help you
              </span>
              <span className="he-line-4 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.95] text-black/35 will-change-transform">
                move forward.
              </span>
            </h1>
          </div>

          {/* Divider */}
          <div className="he-divider h-px bg-black/15 mb-10 origin-left" />

          {/* Bottom row */}
          <div className="he-bottom flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-lg md:text-xl text-black/55 max-w-lg leading-relaxed">
              We help organizations strengthen leadership, modernize operations, and implement change that lasts.
            </p>
            <Button to="/contact" variant="dark" size="lg" className="flex-shrink-0">
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
