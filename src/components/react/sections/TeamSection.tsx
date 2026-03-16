import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { team } = siteContent.about;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
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
    <Section background="cream">
      <div ref={sectionRef}>
        <div className="team-heading mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            {team.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {team.members.map((member) => (
            <div
              key={member.name}
              className="team-member bg-white border border-light-border rounded-2xl overflow-hidden hover:border-yellow-primary/30 transition-all duration-300 group"
            >
              {/* Large portrait photo */}
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                {'image' in member && member.image ? (
                  <img
                    src={member.image as string}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-yellow-primary/20 to-white flex items-center justify-center">
                    <span className="text-6xl font-bold text-yellow-primary/40 font-display">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                {/* Subtle gradient overlay at bottom for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Info section */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-text-primary">{member.name}</h3>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-yellow-primary transition-colors duration-200"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon size={16} />
                    </a>
                  )}
                </div>
                <p className="text-yellow-text text-sm font-medium mb-4">{member.role}</p>
                <p className="text-text-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Collaborators */}
        {'collaborators' in team && (
          <div className="team-member mt-8 p-6 bg-white/50 border border-light-border rounded-xl text-center">
            <h3 className="text-lg font-display font-bold text-text-primary mb-2">Key Collaborators & Partners</h3>
            <p className="text-text-muted text-sm">{(team as { collaborators: string }).collaborators}</p>
          </div>
        )}
      </div>
    </Section>
  );
}
