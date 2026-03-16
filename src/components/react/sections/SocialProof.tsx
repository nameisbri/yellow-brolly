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
      // Quotation mark fades in first
      gsap.fromTo(
        '.quote-mark',
        { opacity: 0, y: 20 },
        {
          opacity: 0.3,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Featured quote slides up
      gsap.fromTo(
        '.featured-quote',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Remaining quotes stagger in
      gsap.fromTo(
        '.rest-quote',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="light">
      <div ref={sectionRef} className="max-w-4xl">
        {/* Large decorative quotation mark */}
        <div className="quote-mark text-yellow-primary text-6xl md:text-8xl font-display leading-none opacity-30">
          &ldquo;
        </div>

        {/* Featured first testimonial as large pull quote */}
        <blockquote className="featured-quote mb-8">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light italic text-light-gray leading-relaxed">
            {firstTestimonial.quote}
          </p>
          <footer className="mt-6">
            <span className="text-base text-light-gray font-medium">
              {firstTestimonial.author}
            </span>
            {firstTestimonial.role && (
              <span className="text-base text-gray ml-2">
                &mdash; {firstTestimonial.role}
              </span>
            )}
          </footer>
        </blockquote>

        {/* Remaining testimonials, smaller with dividers */}
        {restTestimonials.map((testimonial, index) => (
          <blockquote key={index} className="rest-quote border-t border-gray/20 py-8">
            <p className="text-lg font-light italic text-light-gray">
              {testimonial.quote}
            </p>
            <footer className="mt-4">
              <span className="text-sm text-light-gray font-medium">
                {testimonial.author}
              </span>
              {testimonial.role && (
                <span className="text-sm text-gray ml-2">
                  &mdash; {testimonial.role}
                </span>
              )}
            </footer>
          </blockquote>
        ))}

        {/* Client count */}
        {socialProof.clientCount && (
          <p className="text-sm text-gray mt-4">
            {socialProof.clientCount}
          </p>
        )}
      </div>
    </Section>
  );
}
