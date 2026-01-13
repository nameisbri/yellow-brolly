import { Section, SectionHeader, ServiceCard, Button, ArrowRightIcon, getServiceIcon } from '../common';
import { siteContent } from '../../data/content';

export function ServicesPreview() {
  const { servicesPreview } = siteContent.home;

  return (
    <Section background="black">
      <SectionHeader
        headline="What We Do"
        subhead="Comprehensive solutions that bridge technology, strategy, and culture."
        eyebrow="Services"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesPreview.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            icon={getServiceIcon(service.icon)}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button to="/services" variant="outline" size="lg">
          Explore All Services
          <ArrowRightIcon size={18} className="ml-2" />
        </Button>
      </div>
    </Section>
  );
}
