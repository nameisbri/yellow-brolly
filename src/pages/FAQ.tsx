import { useState } from 'react';
import { PageHero } from '../components/sections';
import { Section, Card } from '../components/common';
import { siteContent } from '../data/content';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faq } = siteContent;

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <PageHero
        headline={faq.hero.headline}
        subhead={faq.hero.subhead}
        eyebrow="FAQ"
      />

      <Section background="dark">
        <div className="max-w-4xl mx-auto space-y-4">
          {faq.questions.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full text-left flex items-center justify-between p-6 hover:bg-dark/50 transition-colors"
              >
                <h3 className="text-xl font-display font-bold text-white pr-8">
                  {item.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-yellow-dim flex items-center justify-center text-yellow-primary transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray leading-relaxed">
                  {item.answer}
                </div>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
