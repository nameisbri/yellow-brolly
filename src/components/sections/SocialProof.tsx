import { Section, SectionHeader, TestimonialCard } from '../common';
import { siteContent } from '../../data/content';

export function SocialProof() {
  const { socialProof } = siteContent.home;

  return (
    <Section background="dark" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,221,0,0.05),transparent_50%)]" />

      <SectionHeader
        headline={socialProof.headline}
        eyebrow="Testimonials"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
        {socialProof.testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
          />
        ))}
      </div>
    </Section>
  );
}
