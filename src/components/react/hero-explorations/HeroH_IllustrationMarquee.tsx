import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * H: Illustration marquee — a horizontal band of brand illustrations
 * scrolls continuously behind the headline like a conveyor belt.
 * Text is centered and large. The marquee creates constant subtle motion.
 */
export default function HeroH_IllustrationMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hh-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo('.hh-word', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, 0.15)
        .fromTo('.hh-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
        .fromTo('.hh-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9);

      // Marquee band slides in from below
      tl.fromTo('.hh-marquee-band', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2);

      // Continuous marquee scroll
      gsap.to('.hh-marquee-track', {
        xPercent: -50,
        duration: 35,
        repeat: -1,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  const illustrationSet = [
    { src: '/images/brand/winged-pencil.png', size: 'w-24 h-24' },
    { src: '/images/brand/Brolly_Icon_Black.png', size: 'w-20 h-20' },
    { src: '/images/brand/coffee-person.png', size: 'w-28 h-28' },
    { src: '/images/brand/magnifying-glass.png', size: 'w-20 h-20' },
    { src: '/images/brand/trophy-winner.png', size: 'w-24 h-24' },
    { src: '/images/brand/creative-thinker.png', size: 'w-28 h-28' },
    { src: '/images/brand/thumbs-up.png', size: 'w-20 h-20' },
    { src: '/images/brand/creative-artist.png', size: 'w-24 h-24' },
    { src: '/images/brand/creative-designer.png', size: 'w-22 h-22' },
  ];

  // Double for seamless loop
  const marqueeItems = [...illustrationSet, ...illustrationSet];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      {/* Illustration marquee band — sits behind text at ~45% from top */}
      <div className="hh-marquee-band absolute left-0 right-0 top-[42%] h-36 md:h-44 overflow-hidden pointer-events-none select-none">
        <div className="hh-marquee-track flex items-center gap-12 md:gap-16 will-change-transform whitespace-nowrap h-full">
          {marqueeItems.map((ill, i) => (
            <img key={i} src={ill.src} alt="" aria-hidden="true"
              className={`${ill.size} object-contain flex-shrink-0 opacity-[0.08]`} />
          ))}
        </div>
      </div>

      {/* Text — centered, above the marquee */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="hh-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.02] tracking-tight mb-8 text-black">
            {words.map((word, i) => (
              <span key={i} className="hh-word inline-block mr-[0.25em] last:mr-0">{word}</span>
            ))}
          </h1>
          <p className="hh-sub text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hh-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
