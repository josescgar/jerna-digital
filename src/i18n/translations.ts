/**
 * Type-safe translations for the Jerna Digital website.
 * Architecture supports adding new languages by extending the translations object.
 */

export const languages = {
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

export interface TranslationStrings {
  // Site metadata
  site: {
    name: string;
    tagline: string;
    description: string;
  };
  // Navigation
  nav: {
    home: string;
    about: string;
    services: string;
    caseStudies: string;
    contact: string;
  };
  // Hero section
  hero: {
    greeting: string;
    name: string;
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
  };
  // Services section
  services: {
    title: string;
    subtitle: string;
    technical: {
      title: string;
      description: string;
    };
    management: {
      title: string;
      description: string;
    };
    fractional: {
      title: string;
      description: string;
    };
    cta: string;
  };
  // About section
  about: {
    title: string;
    subtitle: string;
    intro: string;
    approach: {
      title: string;
      description: string;
    };
    values: {
      title: string;
      items: string[];
    };
  };
  // Contact section
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  // Case studies
  caseStudies: {
    title: string;
    subtitle: string;
    viewCase: string;
    comingSoon: string;
  };
  // Footer
  footer: {
    copyright: string;
    builtWith: string;
  };
  // Common
  common: {
    learnMore: string;
    getStarted: string;
    viewAll: string;
    readMore: string;
    backToTop: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    site: {
      name: 'Jerna Digital',
      tagline: 'Engineering Excellence, Delivered',
      description:
        'Software Development and Engineering Management Consulting. Helping startups and scale-ups build exceptional engineering teams and products.',
    },
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      caseStudies: 'Case Studies',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'Jose',
      title: 'I help companies build exceptional engineering teams and products.',
      subtitle:
        'Fractional CTO, Engineering Management Consultant, and Technical Advisor for startups and scale-ups.',
      cta: "Let's Talk",
      secondaryCta: 'View Services',
    },
    services: {
      title: 'Services',
      subtitle: 'How I can help your company succeed',
      technical: {
        title: 'Technical Consulting',
        description:
          'Architecture reviews, code quality assessments, tech stack decisions, and technical debt remediation. Get expert guidance on your most challenging technical decisions.',
      },
      management: {
        title: 'Engineering Management',
        description:
          'Team building, hiring processes, engineering culture, agile practices, and leadership coaching. Build high-performing engineering teams that deliver results.',
      },
      fractional: {
        title: 'Fractional CTO/VPE',
        description:
          'Part-time executive technical leadership for companies that need strategic technical direction without the full-time commitment. Scale your technical capabilities efficiently.',
      },
      cta: 'Learn More',
    },
    about: {
      title: 'About',
      subtitle: 'Your trusted engineering partner',
      intro:
        "I'm Jose, a software engineer and engineering leader with over a decade of experience building products and teams at startups and scale-ups. I've seen what works and what doesn't, and I'm here to help you avoid common pitfalls and accelerate your success.",
      approach: {
        title: 'My Approach',
        description:
          "I believe in pragmatic, results-oriented consulting. Every company is different, and cookie-cutter solutions don't work. I take the time to understand your unique challenges and work alongside your team to implement solutions that stick.",
      },
      values: {
        title: 'Values',
        items: [
          'Trust & Transparency',
          'Pragmatic Problem Solving',
          'Continuous Improvement',
          'Human-Centered Leadership',
        ],
      },
    },
    contact: {
      title: 'Get in Touch',
      subtitle:
        "Ready to take your engineering organization to the next level? Let's discuss how I can help.",
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project or challenge...',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent! I\'ll get back to you soon.',
        error: 'Something went wrong. Please try again or email me directly.',
      },
    },
    caseStudies: {
      title: 'Case Studies',
      subtitle: 'See how I\'ve helped companies like yours',
      viewCase: 'View Case Study',
      comingSoon: 'Case studies coming soon',
    },
    footer: {
      copyright: '© {year} Jerna Digital. All rights reserved.',
      builtWith: 'Built with Astro',
    },
    common: {
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      viewAll: 'View All',
      readMore: 'Read More',
      backToTop: 'Back to Top',
    },
  },
};

/**
 * Get translations for a specific language.
 * Falls back to English if the language is not found.
 */
export function getTranslations(lang: Language = defaultLanguage): TranslationStrings {
  return translations[lang] ?? translations[defaultLanguage];
}

/**
 * Get the current language from the URL path.
 * Returns the default language if no language prefix is found.
 */
export function getLanguageFromUrl(url: URL): Language {
  const [, langOrPage] = url.pathname.split('/');
  if (langOrPage && langOrPage in languages) {
    return langOrPage as Language;
  }
  return defaultLanguage;
}
