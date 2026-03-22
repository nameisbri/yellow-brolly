import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * Option D: Split layout with animated photo reveal
 * Text on the left animates in. On the right, a people photo is
 * revealed with a curtain wipe effect (a yellow overlay slides away).
 * The umbrella floats between the two halves. Mouse tilt on the photo.
 */
export default function HeroD_SplitPhoto() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Photo curtain reveal
      tl.fromTo('.hd-curtain', { xPercent: 0 }, { xPercent: 100, duration: 1.4, ease: 'power3.inOut' })
        .fromTo('.hd-photo', { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0)
        // Text staggers in from left
        .fromTo('.hd-eyebrow', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.3)
        .fromTo('.hd-headline', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, 0.4)
        .fromTo('.hd-sub', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0.6)
        .fromTo('.hd-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.8)
        // Umbrella drops in
        .fromTo('.hd-umbrella', { y: -100, opacity: 0, rotation: -30 }, { y: 0, opacity: 1, rotation: 0, duration: 1, ease: 'power3.out' }, 0.6);
    }, sectionRef);

    // Mouse tilt on photo
    const photo = photoRef.current;
    if (!photo) return () => ctx.revert();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = photo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to('.hd-photo', {
        rotationY: x * 6,
        rotationX: y * -6,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to('.hd-photo', { rotationY: 0, rotationX: 0, duration: 0.6 });
    };

    photo.addEventListener('mousemove', handleMouseMove);
    photo.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctx.revert();
      photo.removeEventListener('mousemove', handleMouseMove);
      photo.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text — left */}
          <div>
            <span className="hd-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
              Yellow Brolly Co
            </span>
            <h1 className="hd-headline text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-6 text-black">
              When growth gets complex, we help you move forward.
            </h1>
            <p className="hd-sub text-base md:text-lg text-black/60 max-w-lg mb-10 leading-relaxed">
              We help organizations strengthen leadership, modernize operations, and implement change that lasts.
            </p>
            <Button to="/contact" variant="dark" size="lg" className="hd-cta">
              Book a Discovery Call
            </Button>
          </div>

          {/* Photo — right, with curtain reveal */}
          <div ref={photoRef} className="relative" style={{ perspective: '600px' }}>
            <div className="rounded-xl overflow-hidden relative">
              <img
                src="/images/photos/homepage-pmc.jpg"
                alt="Team collaborating around a table"
                className="hd-photo w-full aspect-[4/3] object-cover will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              />
              {/* Curtain overlay */}
              <div className="hd-curtain absolute inset-0 bg-yellow-primary z-10" />
            </div>

            {/* Umbrella floating between the halves */}
            <img
              src="/images/brand/Brolly_Icon_Black.png"
              alt="" aria-hidden="true"
              className="hd-umbrella absolute -top-8 -left-8 w-28 md:w-36 object-contain opacity-20 select-none pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
