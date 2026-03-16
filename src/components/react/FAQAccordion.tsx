import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  questions: FAQItem[];
}

export default function FAQAccordion({ questions }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {questions.map((item, index) => (
        <div key={index} className="border-b border-light-border">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left flex items-center justify-between py-5 group transition-colors"
          >
            <h3 className="text-lg font-bold text-text-primary group-hover:text-yellow-text transition-colors duration-300 pr-8">
              {item.question}
            </h3>
            <svg
              className={`flex-shrink-0 text-text-muted transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: openIndex === index ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="text-text-muted leading-relaxed text-base pb-5">{item.answer}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
