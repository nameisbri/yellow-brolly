import { useState, useEffect, useRef, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { Button } from '../Button';
import { CalendarIcon, CheckIcon } from '../Icons';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
  'Strategy & Org Development',
  'Digital Readiness & Enablement',
  'Brand/Culture/Communication',
  'Funding/Grants/Government Readiness',
  'Implementation Support',
  'Not Sure Yet',
];

const budgetOptions = [
  'Under $5K',
  '$5K\u2013$15K',
  '$15K\u2013$50K',
  '$50K+',
  'Not Sure Yet',
];

interface FormData {
  name: string;
  companyName: string;
  industry: string;
  serviceInterest: string;
  email: string;
  phone: string;
  budget: string;
  additionalInfo: string;
}

const initialFormData: FormData = {
  name: '',
  companyName: '',
  industry: '',
  serviceInterest: '',
  email: '',
  phone: '',
  budget: '',
  additionalInfo: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-form-panel',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
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
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
          subject: `New intake from ${formData.name} at ${formData.companyName} - ${formData.serviceInterest || 'General'}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          company_name: formData.companyName,
          industry: formData.industry,
          service_interest: formData.serviceInterest,
          phone: formData.phone,
          estimated_budget: formData.budget,
          additional_info: formData.additionalInfo,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData(initialFormData);
      } else {
        setSubmitError('Something went wrong. Please try again or email us directly at hello@yellowbrolly.co');
      }
    } catch {
      setSubmitError('Could not send your message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses = 'w-full px-5 py-4 rounded-xl bg-dark-elevated border border-dark-border text-white placeholder-gray/50 focus:border-yellow-primary focus:outline-none focus:ring-2 focus:ring-yellow-primary/20 transition-all';

  return (
    <Section background="dark">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Let's talk about your tech and strategy goals
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Whether you're exploring a digital overhaul, need help with AI or cybersecurity, or want to align your tools with your team, we're ready to chat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form (takes 3 cols) */}
          <div className="contact-form-panel lg:col-span-3">
            {isSubmitted ? (
              <div className="bg-dark-elevated border border-dark-border rounded-2xl p-10 text-center">
                <div className="w-20 h-20 bg-yellow-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckIcon size={40} className="text-black" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  Thank you!
                </h3>
                <p className="text-gray mb-6">
                  We've received your inquiry and will be in touch shortly.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-light-gray mb-2">
                      Name <span className="text-yellow-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-light-gray mb-2">
                      Company Name <span className="text-yellow-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Your company"
                    />
                  </div>
                </div>

                {/* Row 2: Industry + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-light-gray mb-2">
                      Industry
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="e.g. Nonprofit, Tech, Healthcare"
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceInterest" className="block text-sm font-medium text-light-gray mb-2">
                      Service Looking For
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-light-gray mb-2">
                      Email <span className="text-yellow-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-light-gray mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-light-gray mb-2">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="">Select a range</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Additional Info */}
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-light-gray mb-2">
                    Any other information you would like to share with us
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your goals, challenges, or timeline..."
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-400 text-center">{submitError}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </Button>
              </form>
            )}
          </div>

          {/* Calendly sidebar (takes 2 cols) */}
          <div className="contact-info-panel lg:col-span-2">
            <div className="bg-dark-elevated rounded-2xl p-6 md:p-8 border border-dark-border lg:sticky lg:top-28 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-primary/5 rounded-full blur-3xl" />

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
                      <span className="w-5 h-5 rounded-full bg-dark-border/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon size={12} className="text-light-gray" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Async contact */}
              <div className="mt-8 pt-6 border-t border-dark-border relative">
                <p className="text-sm text-gray">
                  Prefer email? Reach us at{' '}
                  <a href="mailto:hello@yellowbrolly.co" className="text-yellow-primary hover:underline">
                    hello@yellowbrolly.co
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
