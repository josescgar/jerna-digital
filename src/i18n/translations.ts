/**
 * Type-safe translations for the Jerna Digital website.
 * Architecture supports adding new languages by extending the translations object.
 */

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'en';

/**
 * Locale metadata for SEO and i18n
 */
export const localeMetadata: Record<
  Language,
  { locale: string; hreflang: string }
> = {
  en: { locale: 'en_US', hreflang: 'en' },
  es: { locale: 'es_ES', hreflang: 'es' },
};

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
    availableForProjects: string;
    experience: string;
    startupsScaleups: string;
    remoteFirst: string;
  };
  // Services section
  services: {
    title: string;
    subtitle: string;
    technical: {
      title: string;
      description: string;
      features: string[];
    };
    management: {
      title: string;
      description: string;
      features: string[];
    };
    fractional: {
      title: string;
      description: string;
      features: string[];
    };
    cta: string;
    whatsIncluded: string;
    bestFor: string;
    howWeWork: string;
    howWeWorkSubtitle: string;
    process: {
      discovery: { title: string; description: string };
      assessment: { title: string; description: string };
      proposal: { title: string; description: string };
      engagement: { title: string; description: string };
    };
    details: {
      technical: string[];
      management: string[];
      fractional: string[];
    };
    useCases: {
      technical: string[];
      management: string[];
      fractional: string[];
    };
  };
  // About section
  about: {
    title: string;
    subtitle: string;
    intro: string;
    journey: string;
    approach: {
      title: string;
      description: string;
      items: { title: string; description: string }[];
    };
    values: {
      title: string;
      items: string[];
    };
    milestones: {
      year: string;
      title: string;
      description: string;
    }[];
    learnMore: string;
  };
  // Contact section
  contact: {
    title: string;
    subtitle: string;
    sendMessage: string;
    sendMessageSubtitle: string;
    otherWays: string;
    otherWaysSubtitle: string;
    whatToExpect: string;
    expectations: string[];
    methods: {
      email: { title: string; description: string };
      linkedin: { title: string; description: string };
      schedule: { title: string; description: string; comingSoon: string };
    };
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
      successSubtitle: string;
      error: string;
      errorSubtitle: string;
      tryAgain: string;
      validation: {
        nameRequired: string;
        nameMinLength: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
        messageMinLength: string;
      };
    };
  };
  // Case studies
  caseStudies: {
    title: string;
    subtitle: string;
    viewCase: string;
    comingSoon: string;
    comingSoonBadge: string;
    fullCaseStudyComingSoon: string;
    inTheMeantime: string;
    getInTouchToLearnMore: string;
  };
  // CTA section
  cta: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  // Footer
  footer: {
    copyright: string;
    builtWith: string;
    navigation: string;
    getInTouch: string;
    getInTouchSubtitle: string;
  };
  // Common
  common: {
    learnMore: string;
    getStarted: string;
    viewAll: string;
    readMore: string;
    backToTop: string;
  };
  // Language switcher
  languageSwitcher: {
    label: string;
    selectLanguage: string;
  };
  // Theme switcher
  themeSwitcher: {
    label: string;
    toggleTheme: string;
    light: string;
    dark: string;
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
      title:
        'I help companies build exceptional engineering teams and products.',
      subtitle:
        'Fractional CTO, Engineering Management Consultant, and Technical Advisor for startups and scale-ups.',
      cta: "Let's Talk",
      secondaryCta: 'View Services',
      availableForProjects: 'Available for new projects',
      experience: '10+ years experience',
      startupsScaleups: 'Startups & Scale-ups',
      remoteFirst: 'Remote-first',
    },
    services: {
      title: 'Services',
      subtitle: 'How I can help your company succeed',
      technical: {
        title: 'Technical Consulting',
        description:
          'Architecture reviews, code quality assessments, tech stack decisions, and technical debt remediation. Get expert guidance on your most challenging technical decisions.',
        features: [
          'Architecture reviews',
          'Code quality assessments',
          'Tech stack decisions',
          'Technical debt remediation',
        ],
      },
      management: {
        title: 'Engineering Management',
        description:
          'Team building, hiring processes, engineering culture, agile practices, and leadership coaching. Build high-performing engineering teams that deliver results.',
        features: [
          'Team building & hiring',
          'Engineering culture',
          'Agile practices',
          'Leadership coaching',
        ],
      },
      fractional: {
        title: 'Fractional CTO/VPE',
        description:
          'Part-time executive technical leadership for companies that need strategic technical direction without the full-time commitment. Scale your technical capabilities efficiently.',
        features: [
          'Strategic direction',
          'Executive leadership',
          'Stakeholder management',
          'Technical roadmapping',
        ],
      },
      cta: 'Learn More',
      whatsIncluded: "What's included",
      bestFor: 'Best for',
      howWeWork: 'How We Work Together',
      howWeWorkSubtitle:
        'A straightforward process designed to get you results quickly.',
      process: {
        discovery: {
          title: 'Discovery Call',
          description:
            'We start with a free 30-minute call to understand your situation and determine if I can help.',
        },
        assessment: {
          title: 'Assessment',
          description:
            'I conduct a thorough assessment of your current state, challenges, and goals.',
        },
        proposal: {
          title: 'Proposal',
          description:
            'You receive a detailed proposal with recommendations and engagement options.',
        },
        engagement: {
          title: 'Engagement',
          description:
            'We work together to implement solutions and achieve your goals.',
        },
      },
      details: {
        technical: [
          'System architecture review and recommendations',
          'Code quality and best practices assessment',
          'Technology stack evaluation and selection',
          'Technical debt identification and remediation planning',
          'Performance optimization strategies',
          'Security posture review',
        ],
        management: [
          'Engineering team structure and organization',
          'Hiring process design and interview training',
          'Engineering culture and values definition',
          'Agile and delivery process optimization',
          'Career ladders and growth frameworks',
          'One-on-one coaching for engineering managers',
        ],
        fractional: [
          'Strategic technical direction and roadmapping',
          'Executive-level stakeholder communication',
          'Board and investor relations on technical matters',
          'Vendor and partnership evaluation',
          'Build vs. buy decision making',
          'Technical risk management',
        ],
      },
      useCases: {
        technical: [
          'Before a major refactoring initiative',
          'When selecting technologies for a new project',
          'During due diligence for M&A',
          'When experiencing scaling challenges',
        ],
        management: [
          'Scaling from a small team to multiple teams',
          'Improving engineering velocity and delivery',
          'Building a strong engineering culture',
          'Developing your engineering managers',
        ],
        fractional: [
          'Startups needing senior technical leadership',
          'Companies between CTOs/VPEs',
          'Organizations needing part-time strategic guidance',
          'Companies preparing for fundraising',
        ],
      },
    },
    about: {
      title: 'About',
      subtitle: 'Your trusted engineering partner',
      intro:
        "I'm Jose, a software engineer and engineering leader with over a decade of experience building products and teams at startups and scale-ups. I've seen what works and what doesn't, and I'm here to help you avoid common pitfalls and accelerate your success.",
      journey: 'My Journey',
      approach: {
        title: 'My Approach',
        description:
          "I believe in pragmatic, results-oriented consulting. Every company is different, and cookie-cutter solutions don't work. I take the time to understand your unique challenges and work alongside your team to implement solutions that stick.",
        items: [
          {
            title: 'Listen First',
            description:
              'Every engagement starts with understanding your unique situation, challenges, and goals.',
          },
          {
            title: 'Pragmatic Solutions',
            description:
              'No ivory tower advice. I focus on practical solutions that work in the real world.',
          },
          {
            title: 'Knowledge Transfer',
            description:
              "I don't just solve problems—I help your team learn to solve them independently.",
          },
          {
            title: 'Long-term Thinking',
            description:
              'Solutions designed for sustainability, not just quick fixes that create tech debt.',
          },
        ],
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
      milestones: [
        {
          year: '2010s',
          title: 'Started in Tech',
          description:
            'Began my career as a software engineer, working on web applications and learning the fundamentals of building scalable systems.',
        },
        {
          year: 'Mid 2010s',
          title: 'Engineering Leadership',
          description:
            'Transitioned into engineering management, leading teams and discovering my passion for building high-performing engineering organizations.',
        },
        {
          year: 'Late 2010s',
          title: 'Scale-up Experience',
          description:
            'Helped scale engineering teams at fast-growing startups, navigating the challenges of rapid growth and technical complexity.',
        },
        {
          year: '2020s',
          title: 'Consulting & Advisory',
          description:
            'Founded Jerna Digital to help other companies benefit from my experience building and leading engineering teams.',
        },
      ],
      learnMore: 'Learn more about my approach',
    },
    contact: {
      title: 'Get in Touch',
      subtitle:
        "Ready to take your engineering organization to the next level? Let's discuss how I can help.",
      sendMessage: 'Send a message',
      sendMessageSubtitle:
        "Fill out the form below and I'll get back to you within 24-48 hours.",
      otherWays: 'Other ways to reach me',
      otherWaysSubtitle:
        'Prefer a different method? Feel free to reach out through any of these channels.',
      whatToExpect: 'What to expect',
      expectations: [
        'Response within 24-48 hours',
        'Free 30-minute discovery call',
        'No obligations or pressure',
        'Confidential discussion',
      ],
      methods: {
        email: { title: 'Email', description: 'For general inquiries' },
        linkedin: { title: 'LinkedIn', description: 'Connect professionally' },
        schedule: {
          title: 'Schedule',
          description: 'Book a discovery call',
          comingSoon: 'Coming soon',
        },
      },
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project or challenge...',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        successSubtitle: "I'll get back to you within 24-48 hours.",
        error: 'Something went wrong',
        errorSubtitle:
          'Please try again or email me directly at hello@jernadigital.com',
        tryAgain: 'Try again',
        validation: {
          nameRequired: 'Name is required',
          nameMinLength: 'Name must be at least 2 characters',
          emailRequired: 'Email is required',
          emailInvalid: 'Please enter a valid email address',
          messageRequired: 'Message is required',
          messageMinLength: 'Message must be at least 10 characters',
        },
      },
    },
    caseStudies: {
      title: 'Case Studies',
      subtitle: "See how I've helped companies like yours",
      viewCase: 'View Case Study',
      comingSoon: 'Case studies coming soon',
      comingSoonBadge: 'Coming Soon',
      fullCaseStudyComingSoon: 'Full case study coming soon',
      inTheMeantime:
        'Detailed case studies are being prepared. In the meantime, feel free to reach out to discuss my experience with similar challenges.',
      getInTouchToLearnMore: 'Get in touch to learn more',
    },
    cta: {
      title: 'Ready to',
      titleHighlight: 'transform',
      subtitle:
        "Let's discuss how I can help you build exceptional engineering teams and products. No commitment, just a conversation.",
    },
    footer: {
      copyright: '© {year} Jerna Digital. All rights reserved.',
      builtWith: 'Built with Astro',
      navigation: 'Navigation',
      getInTouch: 'Get in Touch',
      getInTouchSubtitle: "Ready to discuss your project? Let's talk.",
    },
    common: {
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      viewAll: 'View All',
      readMore: 'Read More',
      backToTop: 'Back to Top',
    },
    languageSwitcher: {
      label: 'Language',
      selectLanguage: 'Select language',
    },
    themeSwitcher: {
      label: 'Theme',
      toggleTheme: 'Toggle theme',
      light: 'Light',
      dark: 'Dark',
    },
  },
  es: {
    site: {
      name: 'Jerna Digital',
      tagline: 'Excelencia en Ingeniería, Entregada',
      description:
        'Consultoría de Desarrollo de Software y Gestión de Ingeniería. Ayudando a startups y scale-ups a construir equipos de ingeniería y productos excepcionales.',
    },
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      services: 'Servicios',
      caseStudies: 'Casos de Éxito',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, soy',
      name: 'Jose',
      title:
        'Ayudo a empresas a construir equipos de ingeniería y productos excepcionales.',
      subtitle:
        'CTO Fraccional, Consultor de Gestión de Ingeniería y Asesor Técnico para startups y scale-ups.',
      cta: 'Hablemos',
      secondaryCta: 'Ver Servicios',
      availableForProjects: 'Disponible para nuevos proyectos',
      experience: '+10 años de experiencia',
      startupsScaleups: 'Startups y Scale-ups',
      remoteFirst: 'Trabajo remoto',
    },
    services: {
      title: 'Servicios',
      subtitle: 'Cómo puedo ayudar a tu empresa a tener éxito',
      technical: {
        title: 'Consultoría Técnica',
        description:
          'Revisiones de arquitectura, evaluaciones de calidad de código, decisiones de stack tecnológico y remediación de deuda técnica. Obtén orientación experta en tus decisiones técnicas más desafiantes.',
        features: [
          'Revisiones de arquitectura',
          'Evaluaciones de calidad de código',
          'Decisiones de stack tecnológico',
          'Remediación de deuda técnica',
        ],
      },
      management: {
        title: 'Gestión de Ingeniería',
        description:
          'Construcción de equipos, procesos de contratación, cultura de ingeniería, prácticas ágiles y coaching de liderazgo. Construye equipos de ingeniería de alto rendimiento que entregan resultados.',
        features: [
          'Construcción de equipos y contratación',
          'Cultura de ingeniería',
          'Prácticas ágiles',
          'Coaching de liderazgo',
        ],
      },
      fractional: {
        title: 'CTO/VPE Fraccional',
        description:
          'Liderazgo técnico ejecutivo a tiempo parcial para empresas que necesitan dirección técnica estratégica sin el compromiso a tiempo completo. Escala tus capacidades técnicas de manera eficiente.',
        features: [
          'Dirección estratégica',
          'Liderazgo ejecutivo',
          'Gestión de stakeholders',
          'Roadmapping técnico',
        ],
      },
      cta: 'Saber Más',
      whatsIncluded: 'Qué incluye',
      bestFor: 'Ideal para',
      howWeWork: 'Cómo Trabajamos Juntos',
      howWeWorkSubtitle:
        'Un proceso sencillo diseñado para obtener resultados rápidamente.',
      process: {
        discovery: {
          title: 'Llamada de Descubrimiento',
          description:
            'Comenzamos con una llamada gratuita de 30 minutos para entender tu situación y determinar si puedo ayudar.',
        },
        assessment: {
          title: 'Evaluación',
          description:
            'Realizo una evaluación exhaustiva de tu estado actual, desafíos y objetivos.',
        },
        proposal: {
          title: 'Propuesta',
          description:
            'Recibes una propuesta detallada con recomendaciones y opciones de colaboración.',
        },
        engagement: {
          title: 'Colaboración',
          description:
            'Trabajamos juntos para implementar soluciones y alcanzar tus objetivos.',
        },
      },
      details: {
        technical: [
          'Revisión de arquitectura de sistemas y recomendaciones',
          'Evaluación de calidad de código y mejores prácticas',
          'Evaluación y selección de stack tecnológico',
          'Identificación de deuda técnica y planificación de remediación',
          'Estrategias de optimización de rendimiento',
          'Revisión de postura de seguridad',
        ],
        management: [
          'Estructura y organización del equipo de ingeniería',
          'Diseño de procesos de contratación y formación en entrevistas',
          'Definición de cultura y valores de ingeniería',
          'Optimización de procesos ágiles y de entrega',
          'Planes de carrera y frameworks de crecimiento',
          'Coaching individual para managers de ingeniería',
        ],
        fractional: [
          'Dirección técnica estratégica y roadmapping',
          'Comunicación con stakeholders a nivel ejecutivo',
          'Relaciones con inversores y junta directiva en temas técnicos',
          'Evaluación de proveedores y partnerships',
          'Toma de decisiones build vs. buy',
          'Gestión de riesgos técnicos',
        ],
      },
      useCases: {
        technical: [
          'Antes de una iniciativa de refactorización importante',
          'Al seleccionar tecnologías para un nuevo proyecto',
          'Durante la due diligence para M&A',
          'Cuando se experimentan desafíos de escalabilidad',
        ],
        management: [
          'Escalando de un equipo pequeño a múltiples equipos',
          'Mejorando la velocidad de ingeniería y entrega',
          'Construyendo una cultura de ingeniería sólida',
          'Desarrollando a tus managers de ingeniería',
        ],
        fractional: [
          'Startups que necesitan liderazgo técnico senior',
          'Empresas entre CTOs/VPEs',
          'Organizaciones que necesitan guía estratégica a tiempo parcial',
          'Empresas preparándose para rondas de financiación',
        ],
      },
    },
    about: {
      title: 'Sobre mí',
      subtitle: 'Tu socio de confianza en ingeniería',
      intro:
        'Soy Jose, ingeniero de software y líder de ingeniería con más de una década de experiencia construyendo productos y equipos en startups y scale-ups. He visto qué funciona y qué no, y estoy aquí para ayudarte a evitar errores comunes y acelerar tu éxito.',
      journey: 'Mi Trayectoria',
      approach: {
        title: 'Mi Enfoque',
        description:
          'Creo en la consultoría pragmática y orientada a resultados. Cada empresa es diferente, y las soluciones genéricas no funcionan. Me tomo el tiempo para entender tus desafíos únicos y trabajo junto a tu equipo para implementar soluciones que perduren.',
        items: [
          {
            title: 'Escuchar Primero',
            description:
              'Cada colaboración comienza entendiendo tu situación única, desafíos y objetivos.',
          },
          {
            title: 'Soluciones Pragmáticas',
            description:
              'Sin consejos teóricos. Me enfoco en soluciones prácticas que funcionan en el mundo real.',
          },
          {
            title: 'Transferencia de Conocimiento',
            description:
              'No solo resuelvo problemas—ayudo a tu equipo a aprender a resolverlos de forma independiente.',
          },
          {
            title: 'Pensamiento a Largo Plazo',
            description:
              'Soluciones diseñadas para la sostenibilidad, no solo arreglos rápidos que crean deuda técnica.',
          },
        ],
      },
      values: {
        title: 'Valores',
        items: [
          'Confianza y Transparencia',
          'Resolución Pragmática de Problemas',
          'Mejora Continua',
          'Liderazgo Centrado en las Personas',
        ],
      },
      milestones: [
        {
          year: '2010s',
          title: 'Inicio en Tecnología',
          description:
            'Comencé mi carrera como ingeniero de software, trabajando en aplicaciones web y aprendiendo los fundamentos de construir sistemas escalables.',
        },
        {
          year: 'Mediados 2010s',
          title: 'Liderazgo en Ingeniería',
          description:
            'Transicioné a gestión de ingeniería, liderando equipos y descubriendo mi pasión por construir organizaciones de ingeniería de alto rendimiento.',
        },
        {
          year: 'Finales 2010s',
          title: 'Experiencia en Scale-ups',
          description:
            'Ayudé a escalar equipos de ingeniería en startups de rápido crecimiento, navegando los desafíos del crecimiento rápido y la complejidad técnica.',
        },
        {
          year: '2020s',
          title: 'Consultoría y Asesoría',
          description:
            'Fundé Jerna Digital para ayudar a otras empresas a beneficiarse de mi experiencia construyendo y liderando equipos de ingeniería.',
        },
      ],
      learnMore: 'Conoce más sobre mi enfoque',
    },
    contact: {
      title: 'Contacto',
      subtitle:
        '¿Listo para llevar tu organización de ingeniería al siguiente nivel? Hablemos sobre cómo puedo ayudar.',
      sendMessage: 'Envía un mensaje',
      sendMessageSubtitle:
        'Completa el formulario y te responderé en 24-48 horas.',
      otherWays: 'Otras formas de contactarme',
      otherWaysSubtitle:
        '¿Prefieres otro método? No dudes en contactarme por cualquiera de estos canales.',
      whatToExpect: 'Qué esperar',
      expectations: [
        'Respuesta en 24-48 horas',
        'Llamada de descubrimiento gratuita de 30 minutos',
        'Sin obligaciones ni presión',
        'Conversación confidencial',
      ],
      methods: {
        email: { title: 'Email', description: 'Para consultas generales' },
        linkedin: {
          title: 'LinkedIn',
          description: 'Conecta profesionalmente',
        },
        schedule: {
          title: 'Agendar',
          description: 'Reserva una llamada de descubrimiento',
          comingSoon: 'Próximamente',
        },
      },
      form: {
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntame sobre tu proyecto o desafío...',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado con éxito!',
        successSubtitle: 'Te responderé en 24-48 horas.',
        error: 'Algo salió mal',
        errorSubtitle:
          'Por favor intenta de nuevo o escríbeme directamente a hello@jernadigital.com',
        tryAgain: 'Intentar de nuevo',
        validation: {
          nameRequired: 'El nombre es obligatorio',
          nameMinLength: 'El nombre debe tener al menos 2 caracteres',
          emailRequired: 'El email es obligatorio',
          emailInvalid: 'Por favor ingresa un email válido',
          messageRequired: 'El mensaje es obligatorio',
          messageMinLength: 'El mensaje debe tener al menos 10 caracteres',
        },
      },
    },
    caseStudies: {
      title: 'Casos de Éxito',
      subtitle: 'Descubre cómo he ayudado a empresas como la tuya',
      viewCase: 'Ver Caso de Éxito',
      comingSoon: 'Casos de éxito próximamente',
      comingSoonBadge: 'Próximamente',
      fullCaseStudyComingSoon: 'Caso de estudio completo próximamente',
      inTheMeantime:
        'Los casos de estudio detallados están siendo preparados. Mientras tanto, no dudes en contactarme para discutir mi experiencia con desafíos similares.',
      getInTouchToLearnMore: 'Contáctame para saber más',
    },
    cta: {
      title: '¿Listo para',
      titleHighlight: 'transformar',
      subtitle:
        'Hablemos sobre cómo puedo ayudarte a construir equipos de ingeniería y productos excepcionales. Sin compromiso, solo una conversación.',
    },
    footer: {
      copyright: '© {year} Jerna Digital. Todos los derechos reservados.',
      builtWith: 'Construido con Astro',
      navigation: 'Navegación',
      getInTouch: 'Contacto',
      getInTouchSubtitle: '¿Listo para discutir tu proyecto? Hablemos.',
    },
    common: {
      learnMore: 'Saber Más',
      getStarted: 'Comenzar',
      viewAll: 'Ver Todo',
      readMore: 'Leer Más',
      backToTop: 'Volver Arriba',
    },
    languageSwitcher: {
      label: 'Idioma',
      selectLanguage: 'Seleccionar idioma',
    },
    themeSwitcher: {
      label: 'Tema',
      toggleTheme: 'Cambiar tema',
      light: 'Claro',
      dark: 'Oscuro',
    },
  },
};

/**
 * Get translations for a specific language.
 * Falls back to English if the language is not found.
 */
export function getTranslations(
  lang: Language = defaultLanguage
): TranslationStrings {
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
