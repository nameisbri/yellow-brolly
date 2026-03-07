import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { team } = siteContent.about;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        '.team-heading',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
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

      // Stagger members
      gsap.fromTo(
        '.team-member',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.15,
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
    <Section background="black">
      <div ref={sectionRef}>
        <div className="team-heading">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {team.headline}
          </h2>

          {team.combinedExperience && (
            <p className="text-gray text-sm mb-12">
              {team.combinedExperience}
            </p>
          )}
        </div>

        <div className="space-y-0">
          {team.members.map((member, index) => (
            <div
              key={member.name}
              className={`team-member flex flex-col md:flex-row gap-6 md:gap-8${
                index < team.members.length - 1
                  ? ' border-b border-dark-border pb-8 mb-8'
                  : ''
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-primary to-yellow-hover flex-shrink-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-black">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-yellow-primary text-sm font-medium">{member.role}</p>
                {member.tagline && (
                  <p className="italic text-sm text-gray">{member.tagline}</p>
                )}
                <p className="text-gray text-sm leading-relaxed mt-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
