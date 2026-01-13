import { Section, SectionHeader, Card } from '../common';
import { siteContent } from '../../data/content';

export function ProcessTransparency() {
  const { processTransparency } = siteContent.approach;

  if (!processTransparency) return null;

  return (
    <Section background="dark">
      <SectionHeader
        headline={processTransparency.headline}
        eyebrow="Working with Us"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {processTransparency.details.map((detail, index) => (
          <Card key={index}>
            <h3 className="text-xl font-display font-bold text-white mb-3">
              {detail.title}
            </h3>
            <p className="text-gray leading-relaxed">{detail.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
