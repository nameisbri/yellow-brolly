import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * Option A: Mouse-driven parallax layers
 * The umbrella, headline, and background elements all shift at different
 * rates as the cursor moves — creating depth without scroll.
 */
export default function HeroA_ParallaxLayers() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;

    // Entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.ha-eyebrow', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo('.ha-word', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 }, 0.1)
      .fromTo('.ha-subhead', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
      .fromTo('.ha-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
      .fromTo('.ha-umbrella', { scale: 0.6, opacity: 0, rotation: -20 }, { scale: 1, opacity: 0.12, rotation: 0, duration: 1.2, ease: 'power3.out' }, 0.2);

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to('.ha-umbrella', { x: x * 60, y: y * 40, duration: 1.2, ease: 'power2.out' });
      gsap.to('.ha-text-block', { x: x * -15, y: y * -10, duration: 1.2, ease: 'power2.out' });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center cursor-default">
      {/* Umbrella — parallax layer (deepest) */}
      <div className="ha-umbrella absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none select-none will-change-transform">
        <img
          src="/images/brand/Brolly_Icon_Black.png"
          alt="" aria-hidden="true"
          className="w-64 md:w-80 lg:w-[420px] object-contain"
        />
      </div>

      {/* Text — parallax layer (closest, moves opposite) */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="ha-text-block max-w-4xl will-change-transform">
          <span className="ha-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => (
              <span key={i} className="ha-word inline-block mr-[0.25em] last:mr-0 overflow-hidden">
                <span className="inline-block text-black/85">{word}</span>
              </span>
            ))}
          </h1>
          <p className="ha-subhead text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="ha-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
