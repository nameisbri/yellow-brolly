import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, SectionHeader, Card } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function TeamSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { team } = siteContent.about;

  useEffect(() => {
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.team-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animate avatars with elastic effect
      const avatars = gsap.utils.toArray<HTMLElement>('.team-avatar');
      avatars.forEach((avatar, index) => {
        gsap.fromTo(
          avatar,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.8,
            delay: 0.3 + index * 0.15,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="black">
      <SectionHeader
        headline={team.headline}
        subhead={team.subhead}
        eyebrow="Our People"
      />

      {team.combinedExperience && (
        <p className="text-center text-gray mb-12 max-w-2xl mx-auto">
          {team.combinedExperience}
        </p>
      )}

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {team.members.map((member) => (
          <div key={member.name} className="team-card">
            <Card className="text-center group h-full">
              <div className="team-avatar w-28 h-28 rounded-full bg-gradient-to-br from-yellow-primary to-yellow-hover mx-auto mb-5 flex items-center justify-center shadow-[0_0_40px_rgba(255,221,0,0.2)] group-hover:shadow-[0_0_60px_rgba(255,221,0,0.4)] transition-shadow duration-500">
                <span className="text-4xl font-display font-bold text-black">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-white group-hover:text-yellow-primary transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-yellow-primary font-medium mb-2">{member.role}</p>
              {member.tagline && (
                <p className="text-sm text-gray mb-4 italic">{member.tagline}</p>
              )}
              <p className="text-gray text-sm leading-relaxed">{member.bio}</p>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
