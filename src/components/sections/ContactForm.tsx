import { useState, useEffect, useRef, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, Button, CalendarIcon, CheckIcon } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function ContactForm() {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    email: '',
    organization: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-form-panel',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.contact-info-panel',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', organization: '', inquiryType: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Section background="dark">
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        <div className="contact-form-panel">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">Send Us a Message</h2>

          {isSubmitted ? (
            <div className="bg-dark-elevated border border-yellow-primary/30 rounded-2xl p-10 text-center">
              <div className="w-20 h-20 bg-yellow-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,221,0,0.3)]">
                <CheckIcon size={40} className="text-black" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                Message Sent!
              </h3>
              <p className="text-gray mb-6">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {siteContent.contact.form.fields.map((field) => (
                <div key={field.name} className="group">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-light-gray mb-2"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-yellow-primary ml-1">*</span>
                    )}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-dark-elevated border border-dark-border text-white placeholder-gray/50 focus:border-yellow-primary focus:outline-none focus:ring-2 focus:ring-yellow-primary/20 transition-all resize-none"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-5 py-4 rounded-xl bg-dark-elevated border border-dark-border text-white focus:border-yellow-primary focus:outline-none focus:ring-2 focus:ring-yellow-primary/20 transition-all"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full px-5 py-4 rounded-xl bg-dark-elevated border border-dark-border text-white placeholder-gray/50 focus:border-yellow-primary focus:outline-none focus:ring-2 focus:ring-yellow-primary/20 transition-all"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
              {siteContent.contact.form.responseTime && (
                <p className="text-xs text-gray text-center">
                  {siteContent.contact.form.responseTime}
                </p>
              )}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : siteContent.contact.form.submitLabel}
              </Button>
            </form>
          )}
        </div>

        <div className="contact-info-panel lg:pl-8">
          <div className="bg-dark-elevated rounded-2xl p-8 border border-dark-border lg:sticky lg:top-28 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-primary/10 rounded-full blur-3xl" />

            <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-4 relative">
              {siteContent.contact.calendly.headline}
            </h2>
            <p className="text-sm md:text-base text-gray mb-8 relative">
              Schedule a free 30-minute discovery call to discuss your needs.
            </p>
            <Button
              href={siteContent.contact.calendly.url}
              variant="primary"
              size="lg"
              className="w-full relative"
            >
              <CalendarIcon size={20} className="mr-2" />
              Schedule a Call
            </Button>

            <div className="mt-10 pt-8 border-t border-dark-border relative">
              <h3 className="font-display font-bold text-white mb-5">What to Expect</h3>
              <ul className="space-y-4">
                {[
                  '30-minute introductory conversation',
                  'Understanding of your challenges and goals',
                  'Initial recommendations and next steps',
                  'No pressure, no obligations',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray text-sm">
                    <span className="w-5 h-5 rounded-full bg-yellow-dim flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon size={12} className="text-yellow-primary" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
