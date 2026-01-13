import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, CheckIcon } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function ApproachTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { stages } = siteContent.approach;

  useEffect(() => {
    if (prefersReducedMotion || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      const stageCards = gsap.utils.toArray<HTMLElement>('.timeline-stage');

      stageCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -80 : 80, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        const connector = card.querySelector('.timeline-connector');
        if (connector) {
          gsap.fromTo(
            connector,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Animate the number badge
        const badge = card.querySelector('.timeline-number');
        if (badge) {
          gsap.fromTo(
            badge,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 0.2,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="black">
      <div ref={timelineRef} className="relative max-w-5xl mx-auto">
        {/* Timeline center line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-primary via-yellow-primary/50 to-transparent" />
        </div>

        <div className="space-y-12 lg:space-y-0">
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className={`timeline-stage relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}
            >
              <div
                className={`lg:mb-24 ${
                  index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:col-start-2 lg:pl-12'
                }`}
              >
                {/* Timeline number badge */}
                <div className="timeline-number hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-yellow-primary text-black font-display font-bold items-center justify-center text-xl z-10 shadow-[0_0_30px_rgba(255,221,0,0.4)]">
                  {index + 1}
                </div>

                {index < stages.length - 1 && (
                  <div className="timeline-connector hidden lg:block absolute left-1/2 -translate-x-1/2 top-14 w-px h-full bg-gradient-to-b from-yellow-primary to-yellow-primary/30 origin-top" />
                )}

                <div className="bg-dark-elevated rounded-2xl p-8 border border-dark-border hover:border-yellow-primary/30 transition-all duration-500 group">
                  {/* Mobile number badge */}
                  <div className="lg:hidden flex w-12 h-12 rounded-full bg-yellow-primary text-black font-display font-bold items-center justify-center text-lg mb-5">
                    {index + 1}
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-yellow-primary transition-colors duration-300">
                    {stage.name}
                  </h3>
                  <p className="text-yellow-primary font-medium mb-3">
                    {stage.tagline}
                  </p>
                  
                  {stage.whoThisIsFor && (
                    <p className="text-sm text-gray mb-5 italic border-l-2 border-yellow-primary/30 pl-3">
                      {stage.whoThisIsFor}
                    </p>
                  )}

                  <ul className="space-y-3 mb-6">
                    {stage.activities.map((activity) => (
                      <li
                        key={activity}
                        className="flex items-start gap-3 text-gray"
                      >
                        <CheckIcon
                          size={18}
                          className="text-yellow-primary flex-shrink-0 mt-0.5"
                        />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 pt-5 border-t border-dark-border">
                    <p className="text-sm font-medium text-light-gray">
                      <span className="text-yellow-primary font-semibold">Outcome:</span>{' '}
                      {stage.outcome}
                    </p>
                    {stage.timeline && (
                      <p className="text-xs text-gray">
                        <span className="text-yellow-primary font-semibold">Timeline:</span>{' '}
                        {stage.timeline}
                      </p>
                    )}
                    {stage.communication && (
                      <p className="text-xs text-gray">
                        <span className="text-yellow-primary font-semibold">Communication:</span>{' '}
                        {stage.communication}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {index % 2 === 0 && <div className="hidden lg:block" />}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
