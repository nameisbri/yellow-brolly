import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { socialProof } = siteContent.home;
  const [firstTestimonial, ...restTestimonials] = socialProof.testimonials;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Accent bar draws in
      gsap.fromTo(
        '.accent-bar',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Featured quote slides up with stagger per line
      gsap.fromTo(
        '.featured-quote',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stat counter
      gsap.fromTo(
        '.stat-number',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Secondary quotes stagger in
      gsap.fromTo(
        '.secondary-quote',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.secondary-quotes-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="cream">
      <div ref={sectionRef}>
        {/* Featured testimonial — editorial pull quote */}
        <div className="mb-16 md:mb-24">
          <div className="flex gap-6 md:gap-10 items-stretch">
            {/* Thick accent bar */}
            <div className="accent-bar w-1.5 md:w-2 bg-yellow-primary rounded-full origin-top flex-shrink-0" />

            <div className="flex-1">
              {/* The quote — massive editorial typography */}
              <blockquote className="featured-quote">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-[1.2] tracking-tight">
                  {firstTestimonial.quote}
                </p>
                <footer className="mt-8 md:mt-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold font-display text-lg">
                      {firstTestimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-text-primary font-semibold">
                      {firstTestimonial.author}
                    </span>
                    {firstTestimonial.role && (
                      <span className="block text-sm text-text-muted">
                        {firstTestimonial.role}
                      </span>
                    )}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Stat + secondary quotes */}
        <div className="secondary-quotes-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Client count as bold stat */}
          <div className="secondary-quote flex flex-col justify-center p-6 md:p-8 rounded-xl bg-sand">
            <span className="stat-number text-5xl md:text-6xl font-display font-bold text-text-primary leading-none mb-3">
              45+
            </span>
            <span className="text-sm text-text-muted leading-relaxed">
              organizations across nonprofit, agency, and tech sectors
            </span>
          </div>

          {/* Secondary testimonials */}
          {restTestimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="secondary-quote flex flex-col justify-between p-6 md:p-8 rounded-lg border border-light-border"
            >
              <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
                {testimonial.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-primary/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-text font-bold text-xs">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-text-primary font-medium">
                    {testimonial.author}
                  </span>
                  {testimonial.role && (
                    <span className="block text-xs text-text-muted">
                      {testimonial.role}
                    </span>
                  )}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </Section>
  );
}
