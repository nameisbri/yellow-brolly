import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * Option C: Magnetic umbrella
 * The umbrella follows the cursor with elastic, magnetic physics.
 * It tilts toward the cursor direction, creating a playful, living feel.
 * Text has a subtle counter-parallax. Dark theme.
 */
export default function HeroC_MagneticUmbrella() {
  const sectionRef = useRef<HTMLElement>(null);
  const umbrellaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const section = sectionRef.current;

    // Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.hc-umbrella-img', { scale: 0, rotation: -45, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 1.2 })
      .fromTo('.hc-word', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 }, 0.3)
      .fromTo('.hc-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.8)
      .fromTo('.hc-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 1);

    // Magnetic follow
    let mouseX = 0, mouseY = 0;
    let umbrellaX = 0, umbrellaY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    // Smooth lerp animation loop
    const ticker = () => {
      umbrellaX += (mouseX * 120 - umbrellaX) * 0.06;
      umbrellaY += (mouseY * 80 - umbrellaY) * 0.06;

      const tiltX = mouseY * -12;
      const tiltY = mouseX * 15;

      gsap.set('.hc-umbrella-img', {
        x: umbrellaX,
        y: umbrellaY,
        rotationX: tiltX,
        rotationY: tiltY,
        rotation: mouseX * 8,
      });

      // Counter-parallax on text
      gsap.set('.hc-text-block', {
        x: mouseX * -20,
        y: mouseY * -12,
      });
    };

    gsap.ticker.add(ticker);
    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      gsap.ticker.remove(ticker);
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');
  const highlightWords = ['move', 'forward.'];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black min-h-screen flex items-center cursor-default" style={{ perspective: '800px' }}>
      {/* Horizontal accent line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-primary/15 to-transparent" />

      {/* Magnetic umbrella */}
      <div ref={umbrellaRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none" style={{ transformStyle: 'preserve-3d' }}>
        <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
          className="hc-umbrella-img w-[300px] md:w-[400px] lg:w-[500px] object-contain will-change-transform"
          style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(70%) saturate(500%) hue-rotate(5deg) brightness(105%)', opacity: 0.18 }}
        />
      </div>

      {/* Text */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="hc-text-block max-w-5xl will-change-transform">
          <div className="flex items-center gap-4 mb-10">
            <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
              className="w-9 h-9 object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(70%) saturate(500%) hue-rotate(5deg) brightness(105%)' }}
            />
            <span className="text-yellow-primary/50 text-sm font-semibold tracking-[0.3em] uppercase">Yellow Brolly Co</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => {
              const isHL = highlightWords.includes(word.toLowerCase()) || highlightWords.includes(word);
              return (
                <span key={i} className="hc-word inline-block mr-[0.25em] last:mr-0 overflow-hidden">
                  <span className={`inline-block ${isHL ? 'text-yellow-primary' : 'text-white'}`}>{word}</span>
                </span>
              );
            })}
          </h1>
          <p className="hc-sub text-lg md:text-xl text-gray max-w-2xl mb-12 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <div className="hc-cta">
            <Button to="/contact" variant="primary" size="lg">
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
