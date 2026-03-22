import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * D3: Brand illustration collage
 * The existing brand illustrations scattered as a subtle background layer
 * at varying scales and low opacity, floating with individual drift patterns.
 * Mouse parallax on the illustration layer.
 */
export default function HeroD3_IllustrationCollage() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // Illustrations float in from scattered positions
      const items = gsap.utils.toArray<HTMLElement>('.hd3-illust');
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, scale: 0.5, y: 60 + Math.random() * 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1 + Math.random() * 0.5, delay: i * 0.15, ease: 'power3.out' }
        );

        // Individual drift
        gsap.to(item, {
          y: `+=${8 + Math.random() * 16}`,
          x: `+=${(Math.random() - 0.5) * 12}`,
          rotation: `+=${(Math.random() - 0.5) * 6}`,
          duration: 4 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });
      });

      // Text
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hd3-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.5)
        .fromTo('.hd3-word', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 }, 0.6)
        .fromTo('.hd3-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1)
        .fromTo('.hd3-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2);
    }, sectionRef);

    // Mouse parallax on illustration layer
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to('.hd3-illust-layer', { x: x * 30, y: y * 20, duration: 1.5, ease: 'power2.out' });
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  const illustrations = [
    { src: '/images/brand/winged-pencil.png', top: '8%', left: '65%', size: 'w-32 md:w-44', opacity: 0.1, rotation: -8 },
    { src: '/images/brand/coffee-person.png', top: '55%', left: '72%', size: 'w-28 md:w-36', opacity: 0.09, rotation: 5 },
    { src: '/images/brand/trophy-winner.png', top: '18%', left: '85%', size: 'w-24 md:w-32', opacity: 0.08, rotation: -3 },
    { src: '/images/brand/magnifying-glass.png', top: '70%', left: '58%', size: 'w-20 md:w-28', opacity: 0.1, rotation: 10 },
    { src: '/images/brand/creative-thinker.png', top: '40%', left: '78%', size: 'w-26 md:w-36', opacity: 0.07, rotation: -5 },
    { src: '/images/brand/Brolly_Icon_Black.png', top: '75%', left: '88%', size: 'w-16 md:w-24', opacity: 0.12, rotation: 12 },
    { src: '/images/brand/thumbs-up.png', top: '5%', left: '80%', size: 'w-18 md:w-24', opacity: 0.08, rotation: -15 },
    { src: '/images/brand/creative-artist.png', top: '45%', left: '60%', size: 'w-20 md:w-28', opacity: 0.06, rotation: 7 },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center cursor-default">
      {/* Illustration layer — moves with mouse */}
      <div className="hd3-illust-layer absolute inset-0 pointer-events-none will-change-transform">
        {illustrations.map((ill, i) => (
          <img key={i}
            src={ill.src} alt="" aria-hidden="true"
            className={`hd3-illust absolute ${ill.size} object-contain select-none will-change-transform`}
            style={{
              top: ill.top, left: ill.left,
              opacity: ill.opacity,
              transform: `rotate(${ill.rotation}deg)`,
            }}
            loading="lazy"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl">
          <span className="hd3-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => (
              <span key={i} className="hd3-word inline-block mr-[0.25em] last:mr-0 text-black/85">{word}</span>
            ))}
          </h1>
          <p className="hd3-sub text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hd3-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
