export const premiumCopy = {
  es: {
    briefWizard: {
      title: 'Brief Estratégico',
      subtitle: 'Define tu campaña con precisión quirúrgica',
      steps: ['Objetivo', 'Audiencia', 'Oferta', 'Canales', 'Restricciones'],
      demoButton: 'Cargar Ejemplo Completo',
      generateButton: 'Crear Campaña Estratégica',
      generating: 'Generando tu campaña...',
      nextStep: 'Siguiente Paso',
      prevStep: 'Paso Anterior',
      
      step1: {
        objective: {
          label: 'Objetivo de Campaña',
          tooltip: 'Define el norte estratégico. Ejemplo: "Leads" para capturar contactos B2B calificados',
          placeholder: 'Selecciona tu objetivo estratégico...',
          options: {
            awareness: 'Awareness — Posicionamiento y visibilidad de marca',
            leads: 'Leads — Captación de contactos cualificados',
            ventas: 'Ventas — Conversión directa y cierre',
            retencion: 'Retención — Fidelización y LTV'
          }
        },
        kpi: {
          label: 'KPI Principal',
          tooltip: 'Define éxito con números concretos. Ejemplo: "500 MQLs en Q1 con CPL < €50"',
          placeholder: 'ej., 500 MQLs en 90 días con CPL inferior a €50'
        }
      },
      
      step2: {
        segments: {
          label: 'Segmentos de Audiencia',
          tooltip: 'Sé quirúrgico, no genérico. Ejemplo: "CTOs en fintech 50-500 empleados, España"',
          placeholder: 'ej., CTOs y Directores IT en empresas tech, 50-500 empleados'
        },
        pains: {
          label: 'Dolores Reales',
          tooltip: 'Qué les quita el sueño. Ejemplo: "Costos cloud fuera de control, sin visibilidad centralizada"',
          placeholder: 'ej., Costos de infraestructura fuera de control, gestión compleja'
        },
        objections: {
          label: 'Objeciones Frecuentes',
          tooltip: 'Qué te dirán para no comprar. Ejemplo: "Ya tenemos AWS", "Es muy complejo"',
          placeholder: 'ej., "Ya usamos otra solución", "No es el momento"'
        },
        buyingContext: {
          label: 'Contexto de Compra',
          tooltip: 'Cómo deciden. Ejemplo: "Ciclo 3-6 meses, decisión en comité, requieren demo y ROI"',
          placeholder: 'ej., Ciclo de compra de 90 días, decisión en comité técnico'
        }
      },
      
      step3: {
        product: {
          label: 'Producto / Servicio',
          tooltip: 'Qué vendes, en una línea clara. Ejemplo: "Azure ARC - Gestión híbrida multi-cloud"',
          placeholder: 'ej., Azure ARC - Plataforma de gestión híbrida multi-cloud'
        },
        sector: {
          label: 'Sector / Industria',
          tooltip: 'Ayuda a detectar riesgos legales. Ejemplo: "Salud", "Financiero", "Tech", "Retail"',
          placeholder: 'ej., Tecnología, Salud, Financiero...'
        },
        price: {
          label: 'Precio',
          tooltip: 'Fundamental para definir posicionamiento. Ejemplo: "€500/mes + €50 por servidor"',
          placeholder: 'ej., €500/mes base + variables por uso'
        },
        promo: {
          label: 'Promoción u Oferta',
          tooltip: 'Tu incentivo de conversión. Ejemplo: "Primer mes gratis + consultoría incluida"',
          placeholder: 'ej., Primer mes gratis + onboarding sin costo'
        },
        guarantee: {
          label: 'Garantía',
          tooltip: 'Reduce el riesgo percibido. Ejemplo: "30 días devolución. SLA 99.9%"',
          placeholder: 'ej., 30 días garantía o reembolso completo'
        },
        usp: {
          label: 'USP — Diferenciador Único',
          tooltip: 'Por qué elegirte sobre competencia. Ejemplo: "Único que unifica AWS, Azure y GCP en un solo panel"',
          placeholder: 'ej., Única solución que integra todos tus clouds desde un solo panel'
        },
        mainPromise: {
          label: 'Promesa Principal',
          tooltip: 'El resultado final. Ejemplo: "Reduce costos cloud 30% en 60 días"',
          placeholder: 'ej., Reduce costos cloud 30% y simplifica gestión en 60 días'
        }
      },
      
      step4: {
        channels: {
          label: 'Canales de Marketing',
          tooltip: 'Dónde encontrarás a tu audiencia. Selecciona todos los relevantes',
          placeholder: 'Selecciona canales estratégicos...'
        },
        budget: {
          label: 'Presupuesto',
          tooltip: 'Define la inversión. Ejemplo: "€15,000/mes durante Q1" o "€45,000 total"',
          placeholder: 'ej., €15,000 mensuales o €50,000 para toda la campaña'
        },
        timing: {
          label: 'Timing & Duración',
          tooltip: 'Cuándo y cuánto tiempo. Ejemplo: "Q1 2024 - Lanzamiento 15 enero, cierre 31 marzo"',
          placeholder: 'ej., Q1 2024 (enero a marzo) - 90 días de ejecución'
        },
        geography: {
          label: 'Geografía e Idioma',
          tooltip: 'Dónde y en qué idioma. Ejemplo: "España (Madrid, Barcelona). Idioma: Español"',
          placeholder: 'ej., España - Madrid y Barcelona / Idioma: Castellano'
        }
      },
      
      step5: {
        tone: {
          label: 'Tono de Marca',
          tooltip: 'Cómo hablas. Ejemplo: "Profesional pero cercano, técnico sin intimidar"',
          placeholder: 'ej., Profesional con toque humano, técnico pero accesible'
        },
        brandVoice: {
          label: 'Voz de Marca',
          tooltip: 'Tu personalidad en copy. Ejemplo: "Experto cercano. Claridad > Jerga."',
          placeholder: 'ej., Experto confiable, claridad sobre tecnicismos'
        },
        forbiddenWords: {
          label: 'Palabras Prohibidas',
          tooltip: 'Lo que NUNCA usarás. Ejemplo: "revolucionario, disruptivo, mágico"',
          placeholder: 'ej., revolucionario, disruptivo, problema, obsoleto'
        },
        allowedClaims: {
          label: 'Claims Permitidos',
          tooltip: 'Lo que SÍ puedes prometer. Ejemplo: "Reduce costos 30%, ISO 27001"',
          placeholder: 'ej., Certificado ISO 27001, Reduce costos hasta 30%'
        },
        legalRequirements: {
          label: 'Requisitos Legales',
          tooltip: 'Compliance necesario. Ejemplo: "Incluir GDPR, link a T&C"',
          placeholder: 'ej., Mencionar GDPR, incluir link a términos legales'
        },
        availableAssets: {
          label: 'Assets Disponibles',
          tooltip: 'Qué material tienes. Ejemplo: "Logo SVG, video demo 2min, case study PDF"',
          placeholder: 'ej., Logo en SVG, video demo, screenshots, case studies'
        },
        links: {
          label: 'Links Relevantes',
          tooltip: 'URLs clave. Ejemplo: "Landing: example.com, Demo: calendly.com/demo"',
          placeholder: 'ej., Landing principal, calendario demo, case studies'
        }
      }
    },
    
    campaignDashboard: {
      emptyState: {
        title: 'Tu Lienzo Está Listo',
        subtitle: 'Completa el brief estratégico y observa cómo creamos tu campaña ejecutable con método, no magia',
        cta: 'Comenzar Brief'
      },
      generating: {
        title: 'Generando Estrategia',
        subtitle: 'Analizando brief, audiencia y competencia...'
      },
      tabs: {
        overview: 'Overview',
        strategy: 'Estrategia',
        creative: 'Rutas Creativas',
        funnel: 'Funnel',
        paid: 'Paid Pack',
        landing: 'Landing Kit',
        calendar: 'Calendario',
        flows: 'Flows',
        experiments: 'Experimentos',
        measurement: 'Medición',
        risks: 'Riesgos',
        checklist: 'Checklist'
      },
      actions: {
        copy: 'Copiar',
        regenerate: 'Regenerar',
        edit: 'Editar',
        save: 'Guardar Versión',
        export: 'Exportar'
      }
    },
    
    variationLab: {
      title: 'Variation Lab',
      subtitle: 'Copy estratégico por ángulo, listo para testear',
      emptyState: {
        title: 'Laboratorio Preparado',
        subtitle: 'Genera una campaña para crear variaciones de copy optimizadas por ángulo y canal',
        cta: 'Volver al Brief'
      },
      filters: {
        channel: 'Canal',
        objective: 'Objetivo',
        angle: 'Ángulo',
        tone: 'Tono',
        sort: 'Ordenar por'
      },
      sortOptions: {
        none: 'Sin orden',
        scoreDesc: 'Score: Alto → Bajo',
        scoreAsc: 'Score: Bajo → Alto',
        clarity: 'Mayor Claridad',
        specificity: 'Mayor Especificidad',
        differentiation: 'Mayor Diferenciación',
        audience: 'Mejor Fit Audiencia',
        brand: 'Mejor Fit Marca'
      },
      angles: {
        beneficio: 'Beneficio',
        urgencia: 'Urgencia',
        autoridad: 'Autoridad',
        emocion: 'Emoción',
        objeciones: 'Objeciones'
      },
      copyScore: {
        title: 'Copy Score',
        clarity: 'Claridad',
        specificity: 'Especificidad',
        differentiation: 'Diferenciación',
        audience: 'Fit Audiencia',
        brand: 'Fit Marca'
      },
      risk: {
        bajo: 'Riesgo Bajo',
        medio: 'Riesgo Medio',
        alto: 'Riesgo Alto'
      },
      favorite: 'Añadir a favoritos',
      unfavorite: 'Quitar de favoritos'
    },
    
    brandKit: {
      title: 'Brand Kit',
      subtitle: 'Define tu identidad para garantizar consistencia en toda la campaña',
      save: 'Guardar Cambios',
      saved: 'Brand Kit actualizado',
      tone: {
        label: 'Tono de Marca',
        cercano: 'Cercano',
        profesional: 'Profesional',
        premium: 'Premium',
        canalla: 'Canalla',
        tech: 'Tech'
      },
      formality: {
        label: 'Nivel de Formalidad',
        description: '1 = Muy informal • 5 = Muy formal'
      },
      emojis: {
        label: 'Uso de Emojis',
        yes: 'Sí, usar emojis',
        no: 'No usar emojis',
        style: {
          label: 'Estilo de Emojis',
          pocos: 'Pocos (1-2 por texto)',
          moderados: 'Moderados (3-5 por texto)',
          muchos: 'Muchos (5+ por texto)'
        }
      },
      words: {
        forbidden: {
          label: 'Palabras Prohibidas',
          placeholder: 'Añadir palabra prohibida...',
          description: 'Palabras que NUNCA debe usar tu marca'
        },
        preferred: {
          label: 'Palabras Preferidas',
          placeholder: 'Añadir palabra preferida...',
          description: 'Palabras que SÍ representan tu marca'
        }
      },
      claims: {
        allowed: {
          label: 'Claims Permitidos',
          placeholder: 'Añadir claim permitido...',
          description: 'Promesas que puedes hacer (con evidencia)'
        },
        notAllowed: {
          label: 'Claims No Permitidos',
          placeholder: 'Añadir claim prohibido...',
          description: 'Promesas que NO puedes hacer (sin evidencia o legalmente)'
        }
      },
      examples: {
        yes: {
          label: 'Sí Suena a Mi Marca',
          placeholder: 'Añadir ejemplo positivo...',
          description: 'Ejemplos de copy que SÍ representan tu voz'
        },
        no: {
          label: 'No Suena a Mi Marca',
          placeholder: 'Añadir ejemplo negativo...',
          description: 'Ejemplos de copy que NO representan tu voz'
        }
      },
      cta: {
        label: 'CTA Preferido',
        options: {
          agenda: 'Agenda Demo',
          contacta: 'Contáctanos',
          descarga: 'Descarga Gratis',
          compra: 'Comprar Ahora',
          prueba: 'Prueba Gratis',
          suscribe: 'Suscríbete',
          masinfo: 'Más Información'
        }
      },
      evaluateConsistency: 'Evaluar Consistencia de Marca'
    },
    
    contentSafety: {
      title: 'Revisión de Seguridad Legal',
      analyzing: 'Analizando contenido...',
      emptyState: {
        title: 'Sin Contenido para Revisar',
        subtitle: 'Genera una campaña primero para revisar la seguridad legal y cumplimiento normativo'
      },
      sections: {
        claims: 'Claims Detectados',
        risks: 'Riesgos Legales',
        compliance: 'Compliance',
        suggestions: 'Mejoras Sugeridas'
      },
      riskLevel: {
        bajo: 'Riesgo Bajo',
        medio: 'Riesgo Medio',
        alto: 'Riesgo Alto',
        critico: 'Riesgo Crítico'
      }
    },
    
    warRoom: {
      title: 'War Room',
      subtitle: 'Comandos rápidos para optimizar tu campaña',
      showCommands: 'Ver Comandos',
      hideCommands: 'Ocultar Comandos',
      premiumAI: 'IA Premium',
      commands: {
        mejoraHooks: 'Mejorar Hooks',
        masPremium: 'Más Premium',
        b2b: 'Enfoque B2B',
        reduceRiesgo: 'Reducir Riesgo',
        regeneraBloque: 'Regenerar Bloque',
        creaLanding: 'Crear Landing',
        paidPack: 'Pack Paid Media',
        flowEmail: 'Flow Email'
      }
    },
    
    briefScore: {
      title: 'Brief Score',
      outOf: 'de 100',
      whatsMissing: 'Qué Falta',
      howToImprove: 'Cómo Mejorarlo',
      ready: 'Listo para Generar',
      needsWork: 'Necesita Completarse',
      statusMessages: {
        excellent: 'Excelente. Tu brief está completo y estratégico.',
        good: 'Buen nivel. Revisa las recomendaciones para mayor precisión.',
        needsImprovement: 'Completar datos críticos mejorará la calidad de la campaña.',
        incomplete: 'Brief incompleto. La campaña será genérica sin estos datos.'
      }
    },
    
    quickQuestions: {
      title: 'Preguntas Rápidas',
      subtitle: 'Completa estos datos críticos para una campaña más precisa',
      skip: 'Omitir y Generar',
      complete: 'Completar y Generar',
      questions: {
        price: 'No has definido precio. ¿Cuál es el rango de precio o modelo de precio?',
        usp: 'No detectamos un diferenciador claro. ¿Qué te hace único vs. competencia?',
        proof: 'No hay prueba social. ¿Tienes reviews, casos de éxito, cifras o garantías?',
        segments: 'Audiencia muy amplia. ¿Cuál es el segmento prioritario (1-2 máximo)?',
        budget: 'Incluyes paid media. ¿Cuál es el presupuesto mínimo y objetivo (CPA/ROAS)?',
        claims: 'Sector regulado detectado. ¿Hay claims prohibidos u obligatorios?'
      }
    },
    
    errors: {
      generic: 'Algo no salió como esperábamos. Intenta de nuevo.',
      network: 'Sin conexión. Verifica tu internet y reinténtalo.',
      generation: 'Error al generar campaña. Revisa el brief y vuelve a intentarlo.',
      save: 'No pudimos guardar los cambios. Intenta nuevamente.',
      export: 'Error al exportar. Verifica el formato y reinténtalo.',
      validation: 'Completa los campos obligatorios antes de continuar.',
      emptyBrief: 'El brief está vacío. Completa al menos los campos críticos.'
    },
    
    success: {
      saved: 'Guardado correctamente',
      copied: 'Copiado al portapapeles',
      generated: 'Campaña generada con éxito',
      exported: 'Exportado correctamente'
    }
  },
  
  en: {
    briefWizard: {
      title: 'Strategic Brief',
      subtitle: 'Define your campaign with surgical precision',
      steps: ['Objective', 'Audience', 'Offer', 'Channels', 'Restrictions'],
      demoButton: 'Load Full Example',
      generateButton: 'Create Strategic Campaign',
      generating: 'Generating your campaign...',
      nextStep: 'Next Step',
      prevStep: 'Previous Step',
      
      step1: {
        objective: {
          label: 'Campaign Objective',
          tooltip: 'Define strategic north. Example: "Leads" to capture qualified B2B contacts',
          placeholder: 'Select your strategic objective...',
          options: {
            awareness: 'Awareness — Brand positioning and visibility',
            leads: 'Leads — Qualified contact acquisition',
            ventas: 'Sales — Direct conversion and closing',
            retencion: 'Retention — Loyalty and LTV'
          }
        },
        kpi: {
          label: 'Main KPI',
          tooltip: 'Define success with concrete numbers. Example: "500 MQLs in Q1 with CPL < €50"',
          placeholder: 'e.g., 500 MQLs in 90 days with CPL under €50'
        }
      },
      
      step2: {
        segments: {
          label: 'Audience Segments',
          tooltip: 'Be surgical, not generic. Example: "CTOs in 50-500 employee fintech, Spain"',
          placeholder: 'e.g., CTOs and IT Directors in tech companies, 50-500 employees'
        },
        pains: {
          label: 'Real Pain Points',
          tooltip: 'What keeps them up at night. Example: "Cloud costs out of control, no centralized visibility"',
          placeholder: 'e.g., Infrastructure costs out of control, complex management'
        },
        objections: {
          label: 'Common Objections',
          tooltip: 'What they\'ll say to avoid buying. Example: "We already have AWS", "It\'s too complex"',
          placeholder: 'e.g., "We already use another solution", "Not the right time"'
        },
        buyingContext: {
          label: 'Buying Context',
          tooltip: 'How they decide. Example: "3-6 month cycle, committee decision, require demo and ROI"',
          placeholder: 'e.g., 90-day buying cycle, technical committee decision'
        }
      },
      
      step3: {
        product: {
          label: 'Product / Service',
          tooltip: 'What you sell, in one clear line. Example: "Azure ARC - Multi-cloud hybrid management"',
          placeholder: 'e.g., Azure ARC - Multi-cloud hybrid management platform'
        },
        sector: {
          label: 'Sector / Industry',
          tooltip: 'Helps detect legal risks. Example: "Healthcare", "Finance", "Tech", "Retail"',
          placeholder: 'e.g., Technology, Healthcare, Finance...'
        },
        price: {
          label: 'Price',
          tooltip: 'Fundamental for positioning. Example: "€500/month + €50 per server"',
          placeholder: 'e.g., €500/month base + usage variables'
        },
        promo: {
          label: 'Promotion or Offer',
          tooltip: 'Your conversion incentive. Example: "First month free + included consulting"',
          placeholder: 'e.g., First month free + onboarding at no cost'
        },
        guarantee: {
          label: 'Guarantee',
          tooltip: 'Reduces perceived risk. Example: "30-day refund. 99.9% SLA"',
          placeholder: 'e.g., 30-day guarantee or full refund'
        },
        usp: {
          label: 'USP — Unique Differentiator',
          tooltip: 'Why choose you over competition. Example: "Only one that unifies AWS, Azure and GCP in one panel"',
          placeholder: 'e.g., Only solution integrating all your clouds from one panel'
        },
        mainPromise: {
          label: 'Main Promise',
          tooltip: 'The end result. Example: "Reduce cloud costs 30% in 60 days"',
          placeholder: 'e.g., Reduce cloud costs 30% and simplify management in 60 days'
        }
      },
      
      step4: {
        channels: {
          label: 'Marketing Channels',
          tooltip: 'Where you\'ll find your audience. Select all relevant ones',
          placeholder: 'Select strategic channels...'
        },
        budget: {
          label: 'Budget',
          tooltip: 'Define investment. Example: "€15,000/month during Q1" or "€45,000 total"',
          placeholder: 'e.g., €15,000 monthly or €50,000 for entire campaign'
        },
        timing: {
          label: 'Timing & Duration',
          tooltip: 'When and how long. Example: "Q1 2024 - Launch Jan 15, close Mar 31"',
          placeholder: 'e.g., Q1 2024 (January to March) - 90-day execution'
        },
        geography: {
          label: 'Geography & Language',
          tooltip: 'Where and in what language. Example: "Spain (Madrid, Barcelona). Language: Spanish"',
          placeholder: 'e.g., Spain - Madrid and Barcelona / Language: Spanish'
        }
      },
      
      step5: {
        tone: {
          label: 'Brand Tone',
          tooltip: 'How you speak. Example: "Professional but approachable, technical without intimidating"',
          placeholder: 'e.g., Professional with human touch, technical but accessible'
        },
        brandVoice: {
          label: 'Brand Voice',
          tooltip: 'Your copy personality. Example: "Approachable expert. Clarity > Jargon."',
          placeholder: 'e.g., Trustworthy expert, clarity over technicalities'
        },
        forbiddenWords: {
          label: 'Forbidden Words',
          tooltip: 'What you\'ll NEVER use. Example: "revolutionary, disruptive, magic"',
          placeholder: 'e.g., revolutionary, disruptive, problem, obsolete'
        },
        allowedClaims: {
          label: 'Allowed Claims',
          tooltip: 'What you CAN promise. Example: "Reduces costs 30%, ISO 27001"',
          placeholder: 'e.g., ISO 27001 certified, Reduces costs up to 30%'
        },
        legalRequirements: {
          label: 'Legal Requirements',
          tooltip: 'Necessary compliance. Example: "Include GDPR, link to T&C"',
          placeholder: 'e.g., Mention GDPR, include link to legal terms'
        },
        availableAssets: {
          label: 'Available Assets',
          tooltip: 'What material you have. Example: "SVG logo, 2min demo video, PDF case study"',
          placeholder: 'e.g., Logo in SVG, demo video, screenshots, case studies'
        },
        links: {
          label: 'Relevant Links',
          tooltip: 'Key URLs. Example: "Landing: example.com, Demo: calendly.com/demo"',
          placeholder: 'e.g., Main landing, demo calendar, case studies'
        }
      }
    },
    
    campaignDashboard: {
      emptyState: {
        title: 'Your Canvas Is Ready',
        subtitle: 'Complete the strategic brief and watch us create your executable campaign with method, not magic',
        cta: 'Start Brief'
      },
      generating: {
        title: 'Generating Strategy',
        subtitle: 'Analyzing brief, audience and competition...'
      },
      tabs: {
        overview: 'Overview',
        strategy: 'Strategy',
        creative: 'Creative Routes',
        funnel: 'Funnel',
        paid: 'Paid Pack',
        landing: 'Landing Kit',
        calendar: 'Calendar',
        flows: 'Flows',
        experiments: 'Experiments',
        measurement: 'Measurement',
        risks: 'Risks',
        checklist: 'Checklist'
      },
      actions: {
        copy: 'Copy',
        regenerate: 'Regenerate',
        edit: 'Edit',
        save: 'Save Version',
        export: 'Export'
      }
    },
    
    variationLab: {
      title: 'Variation Lab',
      subtitle: 'Strategic copy by angle, ready to test',
      emptyState: {
        title: 'Lab Ready',
        subtitle: 'Generate a campaign to create copy variations optimized by angle and channel',
        cta: 'Back to Brief'
      },
      filters: {
        channel: 'Channel',
        objective: 'Objective',
        angle: 'Angle',
        tone: 'Tone',
        sort: 'Sort by'
      },
      sortOptions: {
        none: 'No order',
        scoreDesc: 'Score: High → Low',
        scoreAsc: 'Score: Low → High',
        clarity: 'Best Clarity',
        specificity: 'Best Specificity',
        differentiation: 'Best Differentiation',
        audience: 'Best Audience Fit',
        brand: 'Best Brand Fit'
      },
      angles: {
        beneficio: 'Benefit',
        urgencia: 'Urgency',
        autoridad: 'Authority',
        emocion: 'Emotion',
        objeciones: 'Objections'
      },
      copyScore: {
        title: 'Copy Score',
        clarity: 'Clarity',
        specificity: 'Specificity',
        differentiation: 'Differentiation',
        audience: 'Audience Fit',
        brand: 'Brand Fit'
      },
      risk: {
        bajo: 'Low Risk',
        medio: 'Medium Risk',
        alto: 'High Risk'
      },
      favorite: 'Add to favorites',
      unfavorite: 'Remove from favorites'
    },
    
    brandKit: {
      title: 'Brand Kit',
      subtitle: 'Define your identity to ensure consistency across the campaign',
      save: 'Save Changes',
      saved: 'Brand Kit updated',
      tone: {
        label: 'Brand Tone',
        cercano: 'Friendly',
        profesional: 'Professional',
        premium: 'Premium',
        canalla: 'Edgy',
        tech: 'Tech'
      },
      formality: {
        label: 'Formality Level',
        description: '1 = Very informal • 5 = Very formal'
      },
      emojis: {
        label: 'Emoji Usage',
        yes: 'Yes, use emojis',
        no: 'Don\'t use emojis',
        style: {
          label: 'Emoji Style',
          pocos: 'Few (1-2 per text)',
          moderados: 'Moderate (3-5 per text)',
          muchos: 'Many (5+ per text)'
        }
      },
      words: {
        forbidden: {
          label: 'Forbidden Words',
          placeholder: 'Add forbidden word...',
          description: 'Words your brand should NEVER use'
        },
        preferred: {
          label: 'Preferred Words',
          tooltip: 'Words that DO represent your brand',
          placeholder: 'Add preferred word...',
          description: 'Words that DO represent your brand'
        }
      },
      claims: {
        allowed: {
          label: 'Allowed Claims',
          placeholder: 'Add allowed claim...',
          description: 'Promises you can make (with evidence)'
        },
        notAllowed: {
          label: 'Not Allowed Claims',
          placeholder: 'Add forbidden claim...',
          description: 'Promises you CAN\'T make (without evidence or legally)'
        }
      },
      examples: {
        yes: {
          label: 'Sounds Like My Brand',
          placeholder: 'Add positive example...',
          description: 'Copy examples that DO represent your voice'
        },
        no: {
          label: 'Doesn\'t Sound Like My Brand',
          placeholder: 'Add negative example...',
          description: 'Copy examples that DON\'T represent your voice'
        }
      },
      cta: {
        label: 'Preferred CTA',
        options: {
          agenda: 'Schedule Demo',
          contacta: 'Contact Us',
          descarga: 'Download Free',
          compra: 'Buy Now',
          prueba: 'Try Free',
          suscribe: 'Subscribe',
          masinfo: 'More Info'
        }
      },
      evaluateConsistency: 'Evaluate Brand Consistency'
    },
    
    contentSafety: {
      title: 'Legal Safety Review',
      analyzing: 'Analyzing content...',
      emptyState: {
        title: 'No Content to Review',
        subtitle: 'Generate a campaign first to review legal safety and regulatory compliance'
      },
      sections: {
        claims: 'Detected Claims',
        risks: 'Legal Risks',
        compliance: 'Compliance',
        suggestions: 'Suggested Improvements'
      },
      riskLevel: {
        bajo: 'Low Risk',
        medio: 'Medium Risk',
        alto: 'High Risk',
        critico: 'Critical Risk'
      }
    },
    
    warRoom: {
      title: 'War Room',
      subtitle: 'Quick commands to optimize your campaign',
      showCommands: 'Show Commands',
      hideCommands: 'Hide Commands',
      premiumAI: 'Premium AI',
      commands: {
        mejoraHooks: 'Improve Hooks',
        masPremium: 'More Premium',
        b2b: 'B2B Focus',
        reduceRiesgo: 'Reduce Risk',
        regeneraBloque: 'Regenerate Block',
        creaLanding: 'Create Landing',
        paidPack: 'Paid Pack',
        flowEmail: 'Email Flow'
      }
    },
    
    briefScore: {
      title: 'Brief Score',
      outOf: 'out of 100',
      whatsMissing: 'What\'s Missing',
      howToImprove: 'How to Improve',
      ready: 'Ready to Generate',
      needsWork: 'Needs Completion',
      statusMessages: {
        excellent: 'Excellent. Your brief is complete and strategic.',
        good: 'Good level. Review recommendations for greater precision.',
        needsImprovement: 'Completing critical data will improve campaign quality.',
        incomplete: 'Incomplete brief. Campaign will be generic without this data.'
      }
    },
    
    quickQuestions: {
      title: 'Quick Questions',
      subtitle: 'Complete these critical data points for a more precise campaign',
      skip: 'Skip and Generate',
      complete: 'Complete and Generate',
      questions: {
        price: 'You haven\'t defined price. What\'s the price range or pricing model?',
        usp: 'We don\'t detect a clear differentiator. What makes you unique vs. competition?',
        proof: 'No social proof. Do you have reviews, success cases, numbers or guarantees?',
        segments: 'Very broad audience. What\'s the priority segment (1-2 maximum)?',
        budget: 'You include paid media. What\'s the minimum budget and objective (CPA/ROAS)?',
        claims: 'Regulated sector detected. Are there prohibited or mandatory claims?'
      }
    },
    
    errors: {
      generic: 'Something didn\'t go as expected. Try again.',
      network: 'No connection. Check your internet and try again.',
      generation: 'Error generating campaign. Review brief and try again.',
      save: 'Couldn\'t save changes. Try again.',
      export: 'Export error. Check format and try again.',
      validation: 'Complete required fields before continuing.',
      emptyBrief: 'Brief is empty. Complete at least critical fields.'
    },
    
    success: {
      saved: 'Saved successfully',
      copied: 'Copied to clipboard',
      generated: 'Campaign generated successfully',
      exported: 'Exported successfully'
    }
  }
}

export function getCopy(language: 'es' | 'en') {
  return premiumCopy[language]
}
