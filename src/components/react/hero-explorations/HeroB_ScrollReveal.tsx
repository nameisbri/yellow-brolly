import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Option B: Scroll-driven word reveal
 * The hero is 200vh tall. As you scroll, each word fades from muted to solid,
 * the umbrella slowly rotates and scales, and accent lines draw in.
 * A cinematic "reading" experience.
 */
export default function HeroB_ScrollReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Umbrella slow rotation + scale on scroll
      gsap.fromTo('.hb-umbrella',
        { rotation: -15, scale: 0.8, opacity: 0.05 },
        {
          rotation: 10, scale: 1, opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // Each word reveals from 20% opacity to 100% as you scroll
      const wordEls = gsap.utils.toArray<HTMLElement>('.hb-word');
      wordEls.forEach((word, i) => {
        gsap.fromTo(word,
          { opacity: 0.15, y: 10 },
          {
            opacity: 1, y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${5 + i * 6}% top`,
              end: `${15 + i * 6}% top`,
              scrub: true,
            },
          }
        );
      });

      // Subhead + CTA fade in at the end
      gsap.fromTo('.hb-bottom',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '70% top',
            end: '85% top',
            scrub: true,
          },
        }
      );

      // Vertical progress line
      gsap.fromTo('.hb-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  return (
    <section ref={sectionRef} className="relative bg-yellow-primary" style={{ height: '200vh' }}>
      {/* Sticky content */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Umbrella */}
        <div className="hb-umbrella absolute right-[8%] top-1/2 -translate-y-1/2 pointer-events-none select-none will-change-transform">
          <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
            className="w-60 md:w-80 lg:w-[380px] object-contain" />
        </div>

        {/* Scroll progress line */}
        <div className="absolute left-8 md:left-12 top-[15%] bottom-[15%] w-px">
          <div className="hb-progress w-full h-full bg-black/25 origin-top" />
        </div>

        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
          <div className="max-w-4xl pl-8 md:pl-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.05] tracking-tight mb-10">
              {words.map((word, i) => (
                <span key={i} className="hb-word inline-block mr-[0.25em] last:mr-0 text-black will-change-[opacity,transform]">
                  {word}
                </span>
              ))}
            </h1>

            <div className="hb-bottom">
              <p className="text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
                We help organizations strengthen leadership, modernize operations, and implement change that lasts.
              </p>
              <Button to="/contact" variant="dark" size="lg">
                Book a Discovery Call
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
      </div>
    </section>
  );
}
