import { useState, useEffect, useRef, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { Button } from '../Button';
import { CheckIcon } from '../Icons';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const industryOptions = [
  'Nonprofit / Charity',
  'Creative Agency / Studio',
  'Professional Services (Legal, Accounting, Consulting)',
  'Healthcare / Wellness',
  'Education / Training',
  'Technology / SaaS',
  'Retail / E-commerce',
  'Construction / Trades',
  'Faith-Based / Ministry',
  'Government / Public Sector',
  'Other',
];

const orgTypeOptions = [
  'Nonprofit',
  'For-Profit Business',
  'Social Enterprise',
  'Public Sector / Government',
  'Startup / Early Stage',
  'Other',
];

const teamSizeOptions = [
  'Just me',
  '2-10',
  '11-50',
  '51-200',
  '200+',
];

const serviceOptions = [
  'Strategy & Organizational Development',
  'Digital Readiness & Enablement',
  'Brand, Culture & Communication',
  'Funding, Grants & Government Readiness',
  'Implementation Support',
  'Not sure yet, I need help figuring that out',
];

const referralOptions = [
  'Referral',
  'Google Search',
  'LinkedIn',
  'Instagram',
  'Event / Conference',
  'Brand Archetype Quiz',
  'Other',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  orgType: string;
  teamSize: string;
  serviceInterest: string;
  budget: string;
  referralSource: string;
  additionalInfo: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  companyName: '',
  industry: '',
  orgType: '',
  teamSize: '',
  serviceInterest: '',
  budget: '',
  referralSource: '',
  additionalInfo: '',
};

interface ContactFormProps {
  headline?: string;
  subheading?: string;
  submitLabel?: string;
  successHeadline?: string;
  successMessage?: string;
}

export default function ContactForm({ headline, subheading, submitLabel, successHeadline, successMessage }: ContactFormProps = {}) {
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
          phone: formData.phone,
          company_name: formData.companyName,
          industry: formData.industry,
          organization_type: formData.orgType,
          team_size: formData.teamSize,
          service_interest: formData.serviceInterest,
          estimated_budget: formData.budget,
          referral_source: formData.referralSource,
          additional_info: formData.additionalInfo,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData(initialFormData);
      } else {
        setSubmitError('Something went wrong. Please try again or email us directly at team@yellowbrollyco.com');
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

  const inputClasses = 'w-full px-5 py-4 rounded-xl bg-white border border-light-border text-text-primary placeholder-text-muted/50 focus:border-yellow-primary focus:outline-none focus:ring-2 focus:ring-yellow-primary/20 transition-all';

  return (
    <Section background="cream">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-4">
            {headline || "Let's talk about your tech and strategy goals"}
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {subheading || "Whether you're exploring a digital overhaul, need help with AI or cybersecurity, or want to align your tools with your team, we're ready to chat."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form (takes 3 cols) */}
          <div className="contact-form-panel lg:col-span-3">
            {isSubmitted ? (
              <div className="bg-white border border-light-border rounded-xl p-10 text-center">
                <div className="w-20 h-20 bg-yellow-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckIcon size={40} className="text-black" />
                </div>
                <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                  {successHeadline || 'Thank you!'}
                </h3>
                <p className="text-text-muted mb-6">
                  {successMessage || "We've received your inquiry and will be in touch shortly."}
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
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Name <span className="text-yellow-text">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email <span className="text-yellow-text">*</span>
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
                </div>

                {/* Row 2: Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
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
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-text-secondary mb-2">
                      Company / Organization Name <span className="text-yellow-text">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Your company or organization"
                    />
                  </div>
                </div>

                {/* Row 3: Industry + Org Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-text-secondary mb-2">
                      Industry <span className="text-yellow-text">*</span>
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="">Select your industry</option>
                      {industryOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="orgType" className="block text-sm font-medium text-text-secondary mb-2">
                      Organization Type <span className="text-yellow-text">*</span>
                    </label>
                    <select
                      id="orgType"
                      name="orgType"
                      value={formData.orgType}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="">Select type</option>
                      {orgTypeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Team Size + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="teamSize" className="block text-sm font-medium text-text-secondary mb-2">
                      Team Size <span className="text-yellow-text">*</span>
                    </label>
                    <select
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="">Select team size</option>
                      {teamSizeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="serviceInterest" className="block text-sm font-medium text-text-secondary mb-2">
                      Service Looking For <span className="text-yellow-text">*</span>
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-text-secondary mb-2">
                    Estimated Budget
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="What's your estimated budget for this project?"
                  />
                  <p className="text-xs text-text-muted mt-1.5">No pressure here. A rough range helps us tailor the conversation.</p>
                </div>

                {/* Referral Source */}
                <div>
                  <label htmlFor="referralSource" className="block text-sm font-medium text-text-secondary mb-2">
                    How Did You Hear About Us?
                  </label>
                  <select
                    id="referralSource"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="">Select an option</option>
                    {referralOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Additional Info */}
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-text-secondary mb-2">
                    Anything else you'd like to share?
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    maxLength={1000}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us a bit about what you're working on, what's not working, or what you're hoping to achieve."
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-700 text-center">{submitError}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : (submitLabel || 'Send Inquiry')}
                </Button>
              </form>
            )}
          </div>

          {/* What to Expect sidebar (takes 2 cols) */}
          <div className="contact-info-panel lg:col-span-2">
            <div className="bg-white rounded-xl p-6 md:p-8 border border-light-border lg:sticky lg:top-28 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-primary/5 rounded-full blur-3xl" />

              <h2 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-6 relative">
                What to Expect
              </h2>

              <ol className="space-y-6 relative">
                {[
                  {
                    step: '1',
                    title: 'Fill out the form',
                    description: 'Tell us a bit about your organization, your goals, and what you need help with.',
                  },
                  {
                    step: '2',
                    title: 'We review your submission',
                    description: 'Our team will take a look at your details and prepare for a meaningful conversation.',
                  },
                  {
                    step: '3',
                    title: 'We schedule a discovery call',
                    description: "We'll reach out to book a time that works for you — no pressure, just a conversation.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-yellow-primary flex items-center justify-center flex-shrink-0 text-black font-bold text-sm font-display">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-text-primary text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Async contact */}
              <div className="mt-8 pt-6 border-t border-light-border relative">
                <p className="text-sm text-text-muted">
                  Prefer email? Reach us at{' '}
                  <a href="mailto:team@yellowbrollyco.com" className="text-yellow-text hover:underline">
                    team@yellowbrollyco.com
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
