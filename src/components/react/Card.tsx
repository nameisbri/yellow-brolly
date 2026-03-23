import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className = '',
  animate = true,
  hoverEffect = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current || !animate) return;

    const card = cardRef.current;

    gsap.fromTo(
      card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === card) t.kill();
      });
    };
  }, [animate, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current || !hoverEffect) return;

    const card = cardRef.current;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoverEffect, prefersReducedMotion]);

  return (
    <div
      ref={cardRef}
      className={`bg-dark-elevated rounded-xl p-8 border border-light-border transition-colors duration-500 ${className}`}
    >
      {children}
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  outcome?: string;
  whatWeDo?: string[];
  whatYouGet?: string;
  timeline?: string;
  investment?: string;
  accentColor?: string;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  outcome,
  whatWeDo,
  whatYouGet,
  timeline,
  investment,
  accentColor,
  className = '',
}: ServiceCardProps) {
  return (
    <Card className={`group relative overflow-hidden ${className}`}>
      {/* Colored top accent line */}
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ backgroundColor: accentColor }}
        />
      )}
      <div className="relative z-10">
        <div
          className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
            !accentColor ? 'bg-sand text-text-secondary group-hover:text-yellow-primary' : ''
          }`}
          style={accentColor ? {
            backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
            color: accentColor,
          } : undefined}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-3">
          {title}
        </h3>
        <p className="text-text-muted leading-relaxed mb-4">{description}</p>

        {whatWeDo && whatWeDo.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wider">
              What we do
            </h4>
            <ul className="space-y-2 text-sm text-text-muted">
              {whatWeDo.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-text-secondary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {whatYouGet && (
          <div className="mb-4 p-3 bg-sand rounded-lg border border-light-border">
            <h4 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wider">
              What you get
            </h4>
            <p className="text-sm text-text-muted leading-relaxed">{whatYouGet}</p>
          </div>
        )}

        {(timeline || investment) && (
          <div className="mb-4 pt-4 border-t border-light-border flex gap-4 text-xs text-text-muted">
            {timeline && (
              <span>
                <span className="text-text-secondary font-semibold">Timeline:</span> {timeline}
              </span>
            )}
            {investment && (
              <span>
                <span className="text-text-secondary font-semibold">Investment:</span> {investment}
              </span>
            )}
          </div>
        )}

        {outcome && (
          <p className="text-sm font-medium text-text-secondary border-t border-light-border pt-4">
            <span className="text-text-muted mr-2">→</span>
            {outcome}
          </p>
        )}
      </div>
    </Card>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  className = '',
}: TestimonialCardProps) {
  return (
    <Card className={`relative ${className}`}>
      <div className="absolute -top-2 left-6 text-8xl text-yellow-primary/10 font-display leading-none">
        "
      </div>
      <blockquote className="relative z-10">
        <p className="text-xl text-text-secondary mb-6 leading-relaxed font-light italic">
          {quote}
        </p>
        <footer className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-primary flex items-center justify-center text-black font-bold text-lg">
            {author.charAt(0)}
          </div>
          <div>
            <cite className="not-italic font-semibold text-text-primary block">
              {author}
            </cite>
            <p className="text-sm text-text-muted">{role}</p>
          </div>
        </footer>
      </blockquote>
    </Card>
  );
}

interface CaseStudyCardProps {
  title: string;
  clientType: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics?: string[];
  sectorPainPoint?: string;
  before?: {
    tools?: string;
    timeLost?: string;
    adoption?: string;
    security?: string;
    chaos?: string;
    processes?: string;
  };
  after?: {
    tools?: string;
    timeSaved?: string;
    adoption?: string;
    security?: string;
    roadmap?: string;
    chaos?: string;
    processes?: string;
  };
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  className?: string;
}

export function CaseStudyCard({
  title,
  clientType,
  challenge,
  solution,
  outcome,
  metrics,
  sectorPainPoint,
  before,
  after,
  quote,
  quoteAuthor,
  quoteRole,
  className = '',
}: CaseStudyCardProps) {
  return (
    <Card className={`group ${className}`}>
      <span className="inline-block px-4 py-1.5 text-sm font-medium bg-yellow-primary text-black rounded-full mb-5">
        {clientType}
      </span>
      <h3 className="text-2xl font-bold text-text-primary mb-5">
        {title}
      </h3>

      {sectorPainPoint && (
        <div className="mb-4 p-4 bg-sand rounded-lg border border-light-border">
          <p className="text-sm text-text-muted italic">{sectorPainPoint}</p>
        </div>
      )}

      <div className="space-y-4 text-text-muted">
        <div>
          <span className="font-semibold text-text-secondary text-sm uppercase tracking-wider">
            Challenge
          </span>
          <p className="mt-2 text-text-secondary">{challenge}</p>
        </div>
        <div>
          <span className="font-semibold text-text-secondary text-sm uppercase tracking-wider">
            Solution
          </span>
          <p className="mt-2 text-text-secondary">{solution}</p>
        </div>

        {before && after && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-light-border">
            <div>
              <span className="font-semibold text-red-600 text-sm uppercase tracking-wider">
                Before
              </span>
              <ul className="mt-2 space-y-1 text-xs text-text-muted">
                {before.tools && <li>• {before.tools}</li>}
                {before.timeLost && <li>• {before.timeLost}</li>}
                {before.adoption && <li>• {before.adoption}</li>}
                {before.security && <li>• {before.security}</li>}
                {before.chaos && <li>• {before.chaos}</li>}
                {before.processes && <li>• {before.processes}</li>}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-text-secondary text-sm uppercase tracking-wider">
                After
              </span>
              <ul className="mt-2 space-y-1 text-xs text-text-muted">
                {after.tools && <li>• {after.tools}</li>}
                {after.timeSaved && <li>• {after.timeSaved}</li>}
                {after.adoption && <li>• {after.adoption}</li>}
                {after.security && <li>• {after.security}</li>}
                {after.roadmap && <li>• {after.roadmap}</li>}
                {after.chaos && <li>• {after.chaos}</li>}
                {after.processes && <li>• {after.processes}</li>}
              </ul>
            </div>
          </div>
        )}

        <div>
          <span className="font-semibold text-text-secondary text-sm uppercase tracking-wider">
            Outcome
          </span>
          <p className="mt-2 text-text-secondary">{outcome}</p>
        </div>
      </div>

      {quote && (
        <div className="mt-6 pt-6 border-t border-light-border">
          <blockquote className="text-text-secondary italic mb-3">
            "{quote}"
          </blockquote>
          {quoteAuthor && (
            <footer className="text-sm text-text-muted">
              {quoteAuthor}{quoteRole && `, ${quoteRole}`}
            </footer>
          )}
        </div>
      )}

      {metrics && metrics.length > 0 && (
        <div className="mt-6 pt-6 border-t border-light-border">
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm bg-sand text-text-secondary rounded-full font-medium metrics-badge"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
