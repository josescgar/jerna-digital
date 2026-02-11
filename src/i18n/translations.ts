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
    titleSuffix: string;
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
      tagline: 'AI-First Technical Leadership',
      description:
        'Fractional CTO & Technical Consulting for early-stage startups. AI-augmented development, architecture, and engineering team building from first commit to Series A.',
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
        'I help startups build the right technical foundations from first commit to Series A.',
      subtitle:
        'Fractional CTO & Technical Consultant. I use AI agents as force multipliers to ship faster without cutting corners.',
      cta: "Let's Talk",
      secondaryCta: 'View Services',
      availableForProjects: 'Open to new projects',
      experience: 'Hands-on engineering leadership',
      startupsScaleups: 'Seed to Series A',
      remoteFirst: 'AI-augmented development',
    },
    services: {
      title: 'Services',
      subtitle:
        'Three ways I help early-stage startups get their technical foundations right',
      technical: {
        title: 'Technical Consulting',
        description:
          'Software auditing, architecture reviews, and AI-augmented workflows. I review your code, define the right patterns, and set up the tooling your team will actually use.',
        features: [
          'Architecture reviews & audits',
          'Code reviews & patterns',
          'AI-augmented workflows',
          'Technical debt remediation',
        ],
      },
      management: {
        title: 'Engineering Management',
        description:
          'Team building, hiring, culture, and delivery processes. Pragmatic engineering management — no cargo-cult agile, no unnecessary ceremonies. Just what works for your stage.',
        features: [
          'Team building & hiring',
          'Engineering culture',
          'Delivery processes',
          'Modern tooling adoption',
        ],
      },
      fractional: {
        title: 'Fractional CTO',
        description:
          "The technical co-founder you need but don't have yet. I provide senior technical leadership for non-technical founders — from architecture decisions to investor conversations about your tech.",
        features: [
          'Technical strategy',
          'Founder partnership',
          'Investor readiness',
          'AI tooling strategy',
        ],
      },
      cta: 'Learn More',
      whatsIncluded: "What's included",
      bestFor: 'Best for',
      howWeWork: 'How We Work Together',
      howWeWorkSubtitle:
        'A straightforward process from discovery to a clear action plan.',
      process: {
        discovery: {
          title: 'Discovery Call',
          description:
            'A free 30-minute call to understand where you are and where you need to go. No pitch, just an honest conversation.',
        },
        assessment: {
          title: 'Assessment',
          description:
            'I dig into your codebase, team, and processes to find the real blockers — not just the symptoms.',
        },
        proposal: {
          title: 'Action Plan',
          description:
            'You get a concrete action plan with priorities, timelines, and clear next steps. No fluff.',
        },
        engagement: {
          title: 'Advisory & Support',
          description:
            'I guide your team through implementation with ongoing reviews, check-ins, and course corrections.',
        },
      },
      details: {
        technical: [
          'System architecture review and recommendations',
          'Code quality and best practices assessment',
          'Technology stack evaluation and selection',
          'AI-augmented development workflow setup',
          'Performance optimization strategies',
          'Security posture review',
        ],
        management: [
          'Engineering team structure and organization',
          'Hiring process design and interview training',
          'Engineering culture and values definition',
          'Pragmatic delivery process optimization',
          'Career ladders and growth frameworks',
          'One-on-one coaching for engineering managers',
        ],
        fractional: [
          'Technical strategy and roadmapping',
          'Founder-level partnership on technical decisions',
          'Investor and board communication on tech matters',
          'Vendor and partnership evaluation',
          'Build vs. buy decision making',
          'AI tooling strategy and adoption',
        ],
      },
      useCases: {
        technical: [
          'Before a major refactoring initiative',
          'When selecting technologies for a new product',
          'During due diligence for fundraising',
          'When scaling challenges start hitting',
        ],
        management: [
          'Scaling from founding engineers to multiple teams',
          'Improving engineering velocity and delivery',
          'Building an engineering culture from scratch',
          'Developing your first engineering managers',
        ],
        fractional: [
          'Non-technical founders needing a technical partner',
          'Pre-seed to Series A startups without a CTO',
          'Companies preparing for their next funding round',
          'Teams needing senior technical direction part-time',
        ],
      },
    },
    about: {
      title: 'About',
      subtitle: 'The technical partner startups need at their earliest stages',
      intro:
        "I'm Jose, a software engineer and engineering leader who spent over a decade building products and scaling teams in the iGaming industry — one of the most regulated, high-stakes, and technically demanding sectors out there. I've held CTO and Head of Engineering roles at companies shipping software at massive scale under strict compliance. Now I bring that same rigor to early-stage startups, augmented by AI tools that multiply what a small team can deliver.",
      journey: 'My Journey',
      approach: {
        title: 'My Approach',
        description:
          "I've been the engineer, the tech lead, the engineering manager, the head of engineering and the CTO. I know what it's like at every level, and I bring that full-stack perspective to every engagement.",
        items: [
          {
            title: 'Strategic, Then Tactical',
            description:
              'I start with the big picture — architecture, strategy, priorities — then get into the details through reviews and guidance.',
          },
          {
            title: 'AI as a Force Multiplier',
            description:
              'I use AI agents daily to multiply output — and I teach your team to do the same.',
          },
          {
            title: 'Transfer Everything',
            description:
              'My goal is to make myself unnecessary. Every process, decision, and pattern gets documented and handed over.',
          },
          {
            title: 'Startup-Stage Pragmatism',
            description:
              'Perfect is the enemy of shipped. I optimize for what moves the needle now, not what looks good in a design doc.',
          },
        ],
      },
      values: {
        title: 'Values',
        items: [
          'Radical Honesty',
          'Ship Over Perfect',
          "Teach, Don't Just Do",
          'People First',
        ],
      },
      milestones: [
        {
          year: '2012',
          title: 'Software Engineer',
          description:
            'Started building web applications and backend systems, learning the fundamentals of scalable software from the ground up.',
        },
        {
          year: '2016',
          title: 'Engineering Lead',
          description:
            'Moved into technical leadership in the iGaming industry, leading teams building high-throughput, regulated platforms.',
        },
        {
          year: '2019',
          title: 'CTO & Head of Engineering',
          description:
            'Held CTO and Head of Engineering roles in the iGaming industry, scaling teams and shipping products in one of the most demanding regulated sectors.',
        },
        {
          year: '2026',
          title: 'Jerna Digital',
          description:
            'Founded Jerna Digital to help early-stage startups build their technical foundations right — with AI-augmented workflows from day one.',
        },
      ],
      learnMore: 'Learn more about my approach',
    },
    contact: {
      title: 'Get in Touch',
      subtitle:
        "Need a technical audit, a fractional CTO, or help building your engineering team? Let's figure out the right next step together.",
      sendMessage: 'Send a message',
      sendMessageSubtitle:
        "Fill out the form below and I'll get back to you within 24-48 hours.",
      otherWays: 'Other ways to reach me',
      otherWaysSubtitle:
        'Prefer a different method? Feel free to reach out through any of these channels.',
      whatToExpect: 'What to expect',
      expectations: [
        'Response within 24-48 hours',
        'No obligations or pressure',
        "Honest assessment — if I can't help, I'll tell you",
      ],
      methods: {
        email: { title: 'Email', description: 'For general inquiries' },
        linkedin: { title: 'LinkedIn', description: 'Connect professionally' },
      },
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder:
          'Tell me about your startup and where you need technical help...',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        successSubtitle: "I'll get back to you within 24-48 hours.",
        error: 'Something went wrong',
        errorSubtitle:
          'Please try again or email me directly at jose.escobar.dev@gmail.com',
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
      subtitle: 'Real problems, real solutions — from early-stage to scale',
      viewCase: 'View Case Study',
      comingSoon: 'Case studies coming soon',
      comingSoonBadge: 'Coming Soon',
      fullCaseStudyComingSoon: 'Full case study coming soon',
      inTheMeantime:
        'Detailed case studies are being prepared. In the meantime, feel free to reach out to discuss my experience with similar challenges.',
      getInTouchToLearnMore: 'Get in touch to learn more',
    },
    cta: {
      title: 'Need a technical partner for',
      titleHighlight: 'your startup',
      titleSuffix: '?',
      subtitle:
        "Drop me a message — no pitch deck required. Let's figure out if I can help.",
    },
    footer: {
      copyright: '\u00A9 {year} Jerna Digital. All rights reserved.',
      builtWith: 'Built with Astro',
      navigation: 'Navigation',
      getInTouch: 'Get in Touch',
      getInTouchSubtitle:
        "Building something and need a technical partner? Let's talk.",
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
      tagline: 'Liderazgo T\u00E9cnico AI-First',
      description:
        'CTO Fraccional y Consultor\u00EDa T\u00E9cnica para startups en fase inicial. Desarrollo potenciado por IA, arquitectura y construcci\u00F3n de equipos de ingenier\u00EDa desde el primer commit hasta la Serie A.',
    },
    nav: {
      home: 'Inicio',
      about: 'Sobre m\u00ED',
      services: 'Servicios',
      caseStudies: 'Casos de \u00C9xito',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, soy',
      name: 'Jose',
      title:
        'Ayudo a startups a construir las bases t\u00E9cnicas correctas desde el primer commit hasta la Serie A.',
      subtitle:
        'CTO Fraccional y Consultor T\u00E9cnico. Uso agentes de IA como multiplicadores de fuerza para entregar m\u00E1s r\u00E1pido sin sacrificar calidad.',
      cta: 'Hablemos',
      secondaryCta: 'Ver Servicios',
      availableForProjects: 'Abierto a nuevos proyectos',
      experience: 'Liderazgo de ingenier\u00EDa hands-on',
      startupsScaleups: 'De Seed a Serie A',
      remoteFirst: 'Desarrollo potenciado por IA',
    },
    services: {
      title: 'Servicios',
      subtitle:
        'Tres formas en las que ayudo a startups en fase inicial a sentar sus bases t\u00E9cnicas',
      technical: {
        title: 'Consultor\u00EDa T\u00E9cnica',
        description:
          'Auditor\u00EDa de software, revisiones de arquitectura y flujos de trabajo potenciados por IA. Reviso tu c\u00F3digo, defino los patrones correctos y configuro las herramientas que tu equipo realmente usar\u00E1.',
        features: [
          'Revisiones y auditor\u00EDas de arquitectura',
          'Revisiones de c\u00F3digo y patrones',
          'Flujos de trabajo con IA',
          'Remediaci\u00F3n de deuda t\u00E9cnica',
        ],
      },
      management: {
        title: 'Engineering Management',
        description:
          'Construcci\u00F3n de equipos, contrataci\u00F3n, cultura y procesos de entrega. Gesti\u00F3n pragm\u00E1tica \u2014 sin agile de manual, sin ceremonias innecesarias. Solo lo que funciona para tu etapa.',
        features: [
          'Construcci\u00F3n de equipos y contrataci\u00F3n',
          'Cultura de ingenier\u00EDa',
          'Procesos de entrega',
          'Adopci\u00F3n de herramientas modernas',
        ],
      },
      fractional: {
        title: 'CTO Fraccional',
        description:
          'El cofundador t\u00E9cnico que necesitas pero a\u00FAn no tienes. Proporciono liderazgo t\u00E9cnico senior para founders no t\u00E9cnicos \u2014 desde decisiones de arquitectura hasta conversaciones con inversores sobre tu tecnolog\u00EDa.',
        features: [
          'Estrategia t\u00E9cnica',
          'Partnership con founders',
          'Preparaci\u00F3n para inversores',
          'Estrategia de herramientas IA',
        ],
      },
      cta: 'Saber M\u00E1s',
      whatsIncluded: 'Qu\u00E9 incluye',
      bestFor: 'Ideal para',
      howWeWork: 'C\u00F3mo Trabajamos Juntos',
      howWeWorkSubtitle:
        'Un proceso directo desde el descubrimiento hasta un plan de acci\u00F3n claro.',
      process: {
        discovery: {
          title: 'Llamada de Descubrimiento',
          description:
            'Una llamada gratuita de 30 minutos para entender d\u00F3nde est\u00E1s y a d\u00F3nde necesitas llegar. Sin pitch, solo una conversaci\u00F3n honesta.',
        },
        assessment: {
          title: 'Evaluaci\u00F3n',
          description:
            'Analizo tu c\u00F3digo, equipo y procesos para encontrar los verdaderos bloqueos \u2014 no solo los s\u00EDntomas.',
        },
        proposal: {
          title: 'Plan de Acci\u00F3n',
          description:
            'Recibes un plan de acci\u00F3n concreto con prioridades, plazos y pr\u00F3ximos pasos claros. Sin relleno.',
        },
        engagement: {
          title: 'Asesor\u00EDa y Soporte',
          description:
            'Gu\u00EDo a tu equipo durante la implementaci\u00F3n con revisiones continuas, seguimiento y correcciones de rumbo.',
        },
      },
      details: {
        technical: [
          'Revisi\u00F3n de arquitectura de sistemas y recomendaciones',
          'Evaluaci\u00F3n de calidad de c\u00F3digo y mejores pr\u00E1cticas',
          'Evaluaci\u00F3n y selecci\u00F3n de stack tecnol\u00F3gico',
          'Configuraci\u00F3n de flujos de desarrollo con IA',
          'Estrategias de optimizaci\u00F3n de rendimiento',
          'Revisi\u00F3n de postura de seguridad',
        ],
        management: [
          'Estructura y organizaci\u00F3n del equipo de ingenier\u00EDa',
          'Dise\u00F1o de procesos de contrataci\u00F3n y formaci\u00F3n en entrevistas',
          'Definici\u00F3n de cultura y valores de ingenier\u00EDa',
          'Optimizaci\u00F3n pragm\u00E1tica de procesos de entrega',
          'Planes de carrera y frameworks de crecimiento',
          'Coaching individual para managers de ingenier\u00EDa',
        ],
        fractional: [
          'Estrategia t\u00E9cnica y roadmapping',
          'Partnership a nivel de founder en decisiones t\u00E9cnicas',
          'Comunicaci\u00F3n con inversores y junta sobre temas t\u00E9cnicos',
          'Evaluaci\u00F3n de proveedores y partnerships',
          'Toma de decisiones build vs. buy',
          'Estrategia de adopci\u00F3n de herramientas IA',
        ],
      },
      useCases: {
        technical: [
          'Antes de una iniciativa de refactorizaci\u00F3n importante',
          'Al seleccionar tecnolog\u00EDas para un nuevo producto',
          'Durante la due diligence para rondas de financiaci\u00F3n',
          'Cuando empiezan los problemas de escalabilidad',
        ],
        management: [
          'Escalando de los ingenieros fundadores a m\u00FAltiples equipos',
          'Mejorando la velocidad de ingenier\u00EDa y entrega',
          'Construyendo una cultura de ingenier\u00EDa desde cero',
          'Desarrollando a tus primeros managers de ingenier\u00EDa',
        ],
        fractional: [
          'Founders no t\u00E9cnicos que necesitan un socio t\u00E9cnico',
          'Startups de pre-seed a Serie A sin CTO',
          'Empresas prepar\u00E1ndose para su pr\u00F3xima ronda',
          'Equipos que necesitan direcci\u00F3n t\u00E9cnica senior a tiempo parcial',
        ],
      },
    },
    about: {
      title: 'Sobre m\u00ED',
      subtitle:
        'El socio t\u00E9cnico que las startups necesitan en sus primeras etapas',
      intro:
        'Soy Jose, ingeniero de software y l\u00EDder de ingenier\u00EDa con m\u00E1s de una d\u00E9cada de experiencia construyendo productos y escalando equipos en la industria del iGaming \u2014 uno de los sectores m\u00E1s regulados, exigentes y t\u00E9cnicamente complejos que existen. He ocupado puestos de CTO y Head of Engineering en empresas que entregaban software a gran escala bajo estricto cumplimiento normativo. Ahora llevo ese mismo rigor a startups en fase inicial, potenciado por herramientas de IA que multiplican lo que un equipo peque\u00F1o puede entregar.',
      journey: 'Mi Trayectoria',
      approach: {
        title: 'Mi Enfoque',
        description:
          'He sido el ingeniero, el tech lead, el engineering manager, el head of engineering y el CTO. S\u00E9 c\u00F3mo es en cada nivel, y llevo esa perspectiva completa a cada colaboraci\u00F3n.',
        items: [
          {
            title: 'Estrat\u00E9gico, Luego T\u00E1ctico',
            description:
              'Empiezo con la visi\u00F3n general \u2014 arquitectura, estrategia, prioridades \u2014 y luego entro en los detalles con revisiones y gu\u00EDa.',
          },
          {
            title: 'IA como Multiplicador de Fuerza',
            description:
              'Uso agentes de IA a diario para multiplicar resultados \u2014 y ense\u00F1o a tu equipo a hacer lo mismo.',
          },
          {
            title: 'Transferir Todo',
            description:
              'Mi objetivo es hacerme innecesario. Cada proceso, decisi\u00F3n y patr\u00F3n queda documentado y entregado.',
          },
          {
            title: 'Pragmatismo de Startup',
            description:
              'Lo perfecto es enemigo de lo entregado. Optimizo para lo que mueve la aguja ahora, no para lo que queda bonito en un documento.',
          },
        ],
      },
      values: {
        title: 'Valores',
        items: [
          'Honestidad Radical',
          'Entregar Antes que Perfeccionar',
          'Ense\u00F1ar, No Solo Hacer',
          'Las Personas Primero',
        ],
      },
      milestones: [
        {
          year: '2012',
          title: 'Ingeniero de Software',
          description:
            'Comenc\u00E9 construyendo aplicaciones web y sistemas backend, aprendiendo los fundamentos del software escalable desde la base.',
        },
        {
          year: '2016',
          title: 'L\u00EDder de Ingenier\u00EDa',
          description:
            'Pas\u00E9 al liderazgo t\u00E9cnico en la industria del iGaming, liderando equipos que constru\u00EDan plataformas reguladas de alto rendimiento.',
        },
        {
          year: '2019',
          title: 'CTO y Head of Engineering',
          description:
            'Ocup\u00E9 roles de CTO y Head of Engineering en la industria del iGaming, escalando equipos y entregando productos en uno de los sectores regulados m\u00E1s exigentes.',
        },
        {
          year: '2026',
          title: 'Jerna Digital',
          description:
            'Fund\u00E9 Jerna Digital para ayudar a startups en fase inicial a construir sus bases t\u00E9cnicas correctamente \u2014 con flujos de trabajo potenciados por IA desde el d\u00EDa uno.',
        },
      ],
      learnMore: 'Conoce m\u00E1s sobre mi enfoque',
    },
    contact: {
      title: 'Contacto',
      subtitle:
        '\u00BFNecesitas una auditor\u00EDa t\u00E9cnica, un CTO fraccional o ayuda construyendo tu equipo de ingenier\u00EDa? Busquemos juntos el siguiente paso correcto.',
      sendMessage: 'Env\u00EDa un mensaje',
      sendMessageSubtitle:
        'Completa el formulario y te responder\u00E9 en 24-48 horas.',
      otherWays: 'Otras formas de contactarme',
      otherWaysSubtitle:
        '\u00BFPrefieres otro m\u00E9todo? No dudes en contactarme por cualquiera de estos canales.',
      whatToExpect: 'Qu\u00E9 esperar',
      expectations: [
        'Respuesta en 24-48 horas',
        'Sin obligaciones ni presi\u00F3n',
        'Evaluaci\u00F3n honesta \u2014 si no puedo ayudar, te lo dir\u00E9',
      ],
      methods: {
        email: { title: 'Email', description: 'Para consultas generales' },
        linkedin: {
          title: 'LinkedIn',
          description: 'Conecta profesionalmente',
        },
      },
      form: {
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        message: 'Mensaje',
        messagePlaceholder:
          'Cu\u00E9ntame sobre tu startup y d\u00F3nde necesitas ayuda t\u00E9cnica...',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '\u00A1Mensaje enviado con \u00E9xito!',
        successSubtitle: 'Te responder\u00E9 en 24-48 horas.',
        error: 'Algo sali\u00F3 mal',
        errorSubtitle:
          'Por favor intenta de nuevo o escr\u00EDbeme directamente a jose.escobar.dev@gmail.com',
        tryAgain: 'Intentar de nuevo',
        validation: {
          nameRequired: 'El nombre es obligatorio',
          nameMinLength: 'El nombre debe tener al menos 2 caracteres',
          emailRequired: 'El email es obligatorio',
          emailInvalid: 'Por favor ingresa un email v\u00E1lido',
          messageRequired: 'El mensaje es obligatorio',
          messageMinLength: 'El mensaje debe tener al menos 10 caracteres',
        },
      },
    },
    caseStudies: {
      title: 'Casos de \u00C9xito',
      subtitle:
        'Problemas reales, soluciones reales \u2014 desde fase inicial hasta escala',
      viewCase: 'Ver Caso de \u00C9xito',
      comingSoon: 'Casos de \u00E9xito pr\u00F3ximamente',
      comingSoonBadge: 'Pr\u00F3ximamente',
      fullCaseStudyComingSoon: 'Caso de estudio completo pr\u00F3ximamente',
      inTheMeantime:
        'Los casos de estudio detallados est\u00E1n siendo preparados. Mientras tanto, no dudes en contactarme para discutir mi experiencia con desaf\u00EDos similares.',
      getInTouchToLearnMore: 'Cont\u00E1ctame para saber m\u00E1s',
    },
    cta: {
      title: '\u00BFNecesitas un socio t\u00E9cnico para',
      titleHighlight: 'tu startup',
      titleSuffix: '?',
      subtitle: 'Escr\u00EDbeme, sin pitch deck. Veamos si puedo ayudar.',
    },
    footer: {
      copyright: '\u00A9 {year} Jerna Digital. Todos los derechos reservados.',
      builtWith: 'Construido con Astro',
      navigation: 'Navegaci\u00F3n',
      getInTouch: 'Contacto',
      getInTouchSubtitle:
        '\u00BFConstruyendo algo y necesitas un socio t\u00E9cnico? Hablemos.',
    },
    common: {
      learnMore: 'Saber M\u00E1s',
      getStarted: 'Comenzar',
      viewAll: 'Ver Todo',
      readMore: 'Leer M\u00E1s',
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
