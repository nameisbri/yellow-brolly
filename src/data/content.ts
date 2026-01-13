export const siteContent = {
  brand: {
    name: 'Yellow Brolly Co',
    tagline: 'Technology-forward strategy. Human-first results.',
  },

  navigation: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'The YB Approach', path: '/approach' },
    { label: 'What We Do', path: '/services' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Blog', path: '/blog' },
    { label: "Let's Talk", path: '/contact', isCta: true },
  ],

  home: {
    hero: {
      headline: 'Technology-forward strategy. Human-first results.',
      subhead:
        'We make digital make sense—bridging the gaps in technology, strategy, and your culture to accelerate and scale your business outcomes.',
      ctaPrimary: 'Book a Discovery Call',
      ctaSecondary: 'Explore What We Have to Offer',
    },
    approachPreview: {
      headline: 'We translate complexity into clarity.',
      stages: [
        { name: 'Assess', description: 'Uncover real challenges' },
        { name: 'Align', description: 'Map strategy to operations' },
        { name: 'Activate', description: 'Deploy tools and support' },
        { name: 'Amplify', description: 'Optimize and scale' },
      ],
    },
    servicesPreview: [
      {
        title: 'Deploy Tools You Need At Every Stage',
        description: 'Digital readiness assessments, roadmap development, and future-proof planning.',
        icon: 'tools',
      },
      {
        title: 'ReThink Brand & Culture',
        description: 'Brand workshops, communication frameworks, and cultural playbooks.',
        icon: 'culture',
      },
      {
        title: 'Secure Your Digital Properties',
        description: 'Cyber audits, policy support, and digital hygiene protocols.',
        icon: 'security',
      },
      {
        title: 'AI – Your Way',
        description: 'Workflow automation, AI integration, and adoption strategy.',
        icon: 'ai',
      },
    ],
    socialProof: {
      headline: 'Trusted by teams who care about people and performance',
      testimonials: [
        {
          quote: 'YellowBrolly transformed how we think about technology. They made it human.',
          author: 'Sarah M.',
          role: 'Executive Director, Nonprofit',
        },
        {
          quote: 'Finally, a consulting firm that speaks our language and understands our values.',
          author: 'David K.',
          role: 'Founder, Creative Agency',
        },
      ],
    },
  },

  about: {
    hero: {
      headline: 'Tech with soul. Strategy with impact.',
      mission:
        'To empower people-first organizations to thrive in a digital world—securely, strategically, and sustainably.',
    },
    story: {
      headline: 'Our Story',
      content:
        'Founded at the intersection of creativity, consulting, and community—bringing together Creative Brand Insight, Technical know-how (AI, cybersecurity, automation), and Culture Alignment.',
    },
    values: [
      {
        title: 'Clarity Over Complexity',
        description: 'Simplify systems to unlock momentum',
        icon: 'clarity',
      },
      {
        title: 'People-First Tech',
        description: 'Tools serve people, not the reverse',
        icon: 'people',
      },
      {
        title: 'Secure by Design',
        description: 'Safety and trust built in',
        icon: 'secure',
      },
      {
        title: 'Purpose + Progress',
        description: 'Supporting meaningful work',
        icon: 'purpose',
      },
    ],
    pmcWay: {
      headline: 'The PMC Way',
      description:
        'People Matter Culture—integrity, practical creativity, thought diversity, Kingdom values foundation.',
    },
    team: [
      {
        name: 'Aimee Slater',
        role: 'Founder & Strategic Lead',
        bio: 'Bringing strategic vision and human-centered leadership to every engagement.',
      },
      {
        name: 'Abbey Ferreira',
        role: 'Founder',
        bio: 'Expert in brand development and organizational culture transformation.',
      },
      {
        name: 'Jon Ferreira',
        role: 'Founder',
        bio: 'Technical architect specializing in secure, scalable digital solutions.',
      },
    ],
    cta: "Let's bring strategy, systems, and soul together.",
  },

  approach: {
    hero: {
      headline: 'The YB Approach: Translating Complexity into Clarity',
      subhead: "We don't just deploy tools—we align them to your strategy, culture, and people.",
    },
    stages: [
      {
        name: 'Assess',
        tagline: 'Uncover real challenges',
        activities: [
          'Discovery calls',
          'Pain point identification',
          'Tech audits',
          'Cybersecurity assessment',
          'Stakeholder interviews',
          'Culture mapping',
        ],
        outcome: 'Full-scope snapshot of current state and blockers',
      },
      {
        name: 'Align',
        tagline: 'Map strategy to operations',
        activities: [
          'Executive summary',
          'Strategic goals',
          'Brand check-in',
          'Team capacity review',
          'Tech + culture roadmap',
        ],
        outcome: 'Everyone pulling in the same direction',
      },
      {
        name: 'Activate',
        tagline: 'Deploy tools and support',
        activities: [
          'Implementation',
          'Staff training',
          'Process optimization',
          'Cyber policy integration',
        ],
        outcome: 'Working systems, confident people, measurable results',
      },
      {
        name: 'Amplify',
        tagline: 'Optimize and scale',
        activities: [
          'Usage audits',
          'Process improvement',
          'New integrations',
          'Strategic reporting',
        ],
        outcome: 'Sustainable foundation for long-term growth',
      },
    ],
    cta: "We'll meet you where you are—and build from there.",
  },

  services: {
    hero: {
      headline: 'Smart Tech. Strong Culture. Strategic Outcomes.',
    },
    pillars: [
      {
        title: 'Deploy Tools You Need At Every Stage',
        description:
          'Digital readiness assessments, roadmap development, team capacity planning, tool recommendations.',
        outcome: 'Future-proof plan with buy-in',
        icon: 'tools',
      },
      {
        title: 'ReThink Brand & Culture',
        description:
          'Brand workshops, internal communication frameworks, change readiness, cultural playbooks, leadership development.',
        outcome: 'Stronger engagement, smoother change',
        icon: 'culture',
      },
      {
        title: 'Secure Your Digital Properties',
        description:
          'Cyber audits, policy support, phishing simulations, digital hygiene protocols.',
        outcome: 'Peace of mind, IRCC-ready protocols',
        icon: 'security',
      },
      {
        title: 'AI – Your Way',
        description:
          'Workflow automation, AI integration, tool stack audits, adoption strategy.',
        outcome: 'Streamlined workflows, better insights',
        icon: 'ai',
      },
    ],
    cta: "Let's build something that works—technically and culturally.",
  },

  caseStudies: {
    hero: {
      headline: 'Real Results. Real Organizations.',
    },
    studies: [
      {
        title: "Scaling a Nonprofit's Tech Stack",
        clientType: 'Nonprofit Organization',
        challenge: 'Outdated systems causing inefficiencies and audit risks',
        solution: 'Comprehensive tech stack overhaul with documented SOPs',
        outcome: '38% time savings, documented SOPs, passed audit with zero flags',
        metrics: ['38% time savings', 'Zero audit flags', 'Full documentation'],
      },
      {
        title: 'Creative Studio → Secure Systems',
        clientType: 'Creative Agency',
        challenge: 'Remote team with security vulnerabilities and scattered workflows',
        solution: 'Implemented cybersecurity protocols and streamlined file-sharing',
        outcome: 'Secure remote operations, improved client onboarding',
        metrics: ['100% remote security', 'Streamlined onboarding', 'Unified file system'],
      },
      {
        title: 'Startup in Chaos → Structured & Secure',
        clientType: 'Tech Startup',
        challenge: 'Rapid growth causing workflow chaos and security gaps',
        solution: 'Workflow mapping and structured process implementation',
        outcome: 'Reduced noise, mapped workflows, clear ownership',
        metrics: ['50% less noise', 'Clear ownership', 'Mapped processes'],
      },
      {
        title: 'Faith-Based Org → Tech-Literate Culture',
        clientType: 'Faith-Based Organization',
        challenge: 'Staff resistance to technology adoption',
        solution: 'Training program and unified platform implementation',
        outcome: 'All staff trained, unified platform adoption',
        metrics: ['100% staff trained', 'Unified platform', 'Cultural buy-in'],
      },
    ],
    cta: "You're not starting from scratch. Let's build on what's working—and fix what's not.",
  },

  blog: {
    hero: {
      headline: 'Insights & Ideas',
      subhead: 'Thoughts on technology, culture, and people-first strategy.',
    },
    posts: [
      {
        id: '1',
        title: 'Why People-First Tech Matters More Than Ever',
        excerpt:
          'In a world racing toward automation, the organizations that thrive are those that keep humans at the center.',
        date: '2024-01-15',
        category: 'Culture',
        image: '/blog/people-first.jpg',
      },
      {
        id: '2',
        title: '5 Signs Your Tech Stack Needs an Audit',
        excerpt:
          'Is your technology helping or hindering your team? Here are the warning signs to watch for.',
        date: '2024-01-08',
        category: 'Technology',
        image: '/blog/tech-audit.jpg',
      },
      {
        id: '3',
        title: 'Building a Culture of Digital Confidence',
        excerpt:
          'How to transform tech-resistant teams into confident digital adopters.',
        date: '2024-01-02',
        category: 'Strategy',
        image: '/blog/digital-confidence.jpg',
      },
    ],
    categories: ['All', 'Culture', 'Technology', 'Strategy', 'Security'],
  },

  contact: {
    hero: {
      headline: "Let's Talk",
      subhead: 'Ready to discuss your tech + strategy goals? We\'d love to hear from you.',
    },
    form: {
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'subject', label: 'Subject', type: 'text', required: false },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
      ],
      submitLabel: 'Send Message',
    },
    calendly: {
      headline: 'Or book a discovery call directly',
      url: 'https://calendly.com/yellowbrolly',
    },
  },

  footer: {
    tagline: 'Technology-forward strategy. Human-first results.',
    copyright: '© 2024 Yellow Brolly Co. All rights reserved.',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  },
};

export type SiteContent = typeof siteContent;
