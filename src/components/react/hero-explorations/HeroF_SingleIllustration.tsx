import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * F: Overlapping illustration — the winged pencil breaks out of the text,
 * overlapping the headline at massive scale. Text wraps around it visually.
 * The illustration breathes and tilts subtly with the cursor.
 */
export default function HeroF_SingleIllustration() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Illustration drops in from above, slightly rotated, overlapping the text
      tl.fromTo('.hf-illust',
        { y: -200, rotation: 25, opacity: 0, scale: 0.6 },
        { y: 0, rotation: -6, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
      );

      // Headline lines stagger in
      tl.fromTo('.hf-line', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, 0.3);

      // Subhead + CTA
      tl.fromTo('.hf-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9)
        .fromTo('.hf-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.1);

      // Breathing
      gsap.to('.hf-illust', {
        scale: 1.03, rotation: -3,
        duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }, sectionRef);

    // Cursor tilt on illustration
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to('.hf-illust', {
        rotationY: x * 10,
        rotationX: y * -8,
        duration: 1, ease: 'power2.out',
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center cursor-default" style={{ perspective: '800px' }}>
      {/* Illustration — overlapping the text area, positioned to break the grid */}
      <div className="absolute top-[12%] right-[8%] md:right-[15%] lg:right-[20%] pointer-events-none select-none z-20"
        style={{ transformStyle: 'preserve-3d' }}>
        <img src="/images/brand/winged-pencil.png" alt="" aria-hidden="true"
          className="hf-illust w-48 md:w-64 lg:w-80 xl:w-96 object-contain will-change-transform opacity-[0.2]" />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-6xl">
          {/* Eyebrow tucked into top-left */}
          <span className="hf-line inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-10">
            Yellow Brolly Co
          </span>

          {/* Headline — large, broken across lines to leave space for the illustration to overlap */}
          <h1 className="font-display font-bold tracking-tight text-black mb-10">
            <span className="hf-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">
              When growth
            </span>
            <span className="hf-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">
              gets complex,
            </span>
            <span className="hf-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mt-2">
              we help you
            </span>
            <span className="hf-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">
              move forward.
            </span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 max-w-4xl">
            <p className="hf-sub text-lg md:text-xl text-black/55 max-w-md leading-relaxed">
              We help organizations strengthen leadership, modernize operations, and implement change that lasts.
            </p>
            <Button to="/contact" variant="dark" size="lg" className="hf-cta flex-shrink-0">
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
