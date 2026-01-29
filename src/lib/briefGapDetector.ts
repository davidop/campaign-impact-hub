import type { CampaignBriefData } from './types'

export interface QuickQuestion {
  id: string
  field: keyof CampaignBriefData
  question: string
  placeholder?: string
  type: 'text' | 'textarea' | 'select' | 'multiselect'
  options?: Array<{ value: string; label: string }>
  defaultValue?: string
  required?: boolean
}

export interface GapDetectionResult {
  hasGaps: boolean
  questions: QuickQuestion[]
}

const PAID_CHANNELS = ['google', 'facebook', 'instagram', 'linkedin', 'tiktok', 'youtube']
const REGULATED_SECTORS = ['financiero', 'salud', 'farmacéutico', 'legal', 'educación', 'seguros', 'inmobiliario', 'finance', 'health', 'pharmaceutical', 'legal', 'education', 'insurance', 'real estate']

export function detectBriefGaps(brief: CampaignBriefData, language: 'es' | 'en'): GapDetectionResult {
  const questions: QuickQuestion[] = []
  const isSpanish = language === 'es'

  const hasPaidChannels = brief.channels.some(ch => PAID_CHANNELS.includes(ch))
  const isRegulatedSector = REGULATED_SECTORS.some(sector => 
    brief.product?.toLowerCase().includes(sector) || 
    brief.segments?.toLowerCase().includes(sector)
  )

  const audienceWordCount = (brief.segments || '').split(' ').filter(w => w.length > 0).length
  const isAudienceTooVague = audienceWordCount < 5

  if (!brief.price || brief.price.trim().length === 0) {
    questions.push({
      id: 'missing-price',
      field: 'price',
      question: isSpanish 
        ? '¿Cuál es el rango de precio del producto/servicio?' 
        : 'What is the price range of the product/service?',
      placeholder: isSpanish 
        ? 'Ej: €299/mes, desde €500, €1,500 - €3,000' 
        : 'e.g., $299/month, from $500, $1,500 - $3,000',
      type: 'text',
      required: true
    })
  }

  if (!brief.usp || brief.usp.trim().length < 10) {
    questions.push({
      id: 'missing-usp',
      field: 'usp',
      question: isSpanish
        ? '¿Cuál es la propuesta de valor única (USP)? Elige o edita:'
        : 'What is the unique selling proposition (USP)? Choose or edit:',
      type: 'select',
      options: [
        {
          value: isSpanish ? 'Más rápido que alternativas del mercado' : 'Faster than market alternatives',
          label: isSpanish ? '⚡ Más rápido que alternativas del mercado' : '⚡ Faster than market alternatives'
        },
        {
          value: isSpanish ? 'Mayor ROI demostrable en casos de éxito' : 'Demonstrable higher ROI in success cases',
          label: isSpanish ? '💰 Mayor ROI demostrable en casos de éxito' : '💰 Demonstrable higher ROI in success cases'
        },
        {
          value: isSpanish ? 'Única solución que integra X + Y en un solo lugar' : 'Only solution that integrates X + Y in one place',
          label: isSpanish ? '🔗 Única solución que integra X + Y en un solo lugar' : '🔗 Only solution that integrates X + Y in one place'
        },
        {
          value: isSpanish ? 'Implementación más simple sin necesidad de equipo técnico' : 'Simpler implementation without technical team needed',
          label: isSpanish ? '🎯 Implementación más simple sin necesidad de equipo técnico' : '🎯 Simpler implementation without technical team needed'
        }
      ],
      required: true
    })
  }

  if (!brief.proof || brief.proof.length === 0 || (brief.proof.length === 1 && brief.proof[0].trim().length === 0)) {
    questions.push({
      id: 'missing-proof',
      field: 'mainPromise',
      question: isSpanish
        ? '¿Qué evidencia o prueba social tienes disponible?'
        : 'What evidence or social proof do you have available?',
      type: 'multiselect',
      options: [
        {
          value: isSpanish ? 'Reviews/testimonios de clientes (5★)' : 'Customer reviews/testimonials (5★)',
          label: isSpanish ? '⭐ Reviews/testimonios de clientes (5★)' : '⭐ Customer reviews/testimonials (5★)'
        },
        {
          value: isSpanish ? 'Cifras de impacto (ej: "500+ clientes", "30% ROI")' : 'Impact figures (e.g., "500+ customers", "30% ROI")',
          label: isSpanish ? '📊 Cifras de impacto (ej: "500+ clientes", "30% ROI")' : '📊 Impact figures (e.g., "500+ customers", "30% ROI")'
        },
        {
          value: isSpanish ? 'Caso de éxito documentado' : 'Documented case study',
          label: isSpanish ? '📄 Caso de éxito documentado' : '📄 Documented case study'
        },
        {
          value: isSpanish ? 'Garantía de satisfacción o devolución' : 'Satisfaction or money-back guarantee',
          label: isSpanish ? '✅ Garantía de satisfacción o devolución' : '✅ Satisfaction or money-back guarantee'
        },
        {
          value: isSpanish ? 'Certificaciones o premios' : 'Certifications or awards',
          label: isSpanish ? '🏆 Certificaciones o premios' : '🏆 Certifications or awards'
        }
      ],
      required: false
    })
  }

  if (isAudienceTooVague || audienceWordCount < 8) {
    questions.push({
      id: 'vague-audience',
      field: 'segments',
      question: isSpanish
        ? 'Tu audiencia parece muy amplia. ¿Puedes definir 1-2 segmentos prioritarios?'
        : 'Your audience seems too broad. Can you define 1-2 priority segments?',
      placeholder: isSpanish
        ? 'Ej: CTOs en empresas medianas (50-500 empleados) del sector fintech que buscan migrar a cloud'
        : 'e.g., CTOs in medium-sized companies (50-500 employees) in the fintech sector looking to migrate to cloud',
      type: 'textarea',
      required: true
    })
  }

  if (hasPaidChannels && (!brief.budget || brief.budget.trim().length === 0)) {
    questions.push({
      id: 'paid-budget',
      field: 'budget',
      question: isSpanish
        ? '¿Cuál es el presupuesto mínimo para canales pagados?'
        : 'What is the minimum budget for paid channels?',
      placeholder: isSpanish
        ? 'Ej: €5,000/mes durante 3 meses'
        : 'e.g., $5,000/month for 3 months',
      type: 'text',
      required: true
    })
  }

  if (hasPaidChannels && (!brief.kpi || !brief.kpi.toLowerCase().includes('cpa') && !brief.kpi.toLowerCase().includes('roas') && !brief.kpi.toLowerCase().includes('cpl'))) {
    questions.push({
      id: 'paid-objective',
      field: 'kpi',
      question: isSpanish
        ? '¿Cuál es el objetivo principal de las campañas pagadas?'
        : 'What is the main objective of the paid campaigns?',
      type: 'select',
      options: [
        {
          value: isSpanish ? 'CPA (Costo por Adquisición) < €X' : 'CPA (Cost per Acquisition) < $X',
          label: isSpanish ? '💰 CPA (Costo por Adquisición) < €X' : '💰 CPA (Cost per Acquisition) < $X'
        },
        {
          value: isSpanish ? 'ROAS (Return on Ad Spend) > 3x' : 'ROAS (Return on Ad Spend) > 3x',
          label: isSpanish ? '📈 ROAS (Return on Ad Spend) > 3x' : '📈 ROAS (Return on Ad Spend) > 3x'
        },
        {
          value: isSpanish ? 'CPL (Costo por Lead) < €X' : 'CPL (Cost per Lead) < $X',
          label: isSpanish ? '🎯 CPL (Costo por Lead) < €X' : '🎯 CPL (Cost per Lead) < $X'
        },
        {
          value: isSpanish ? 'CTR mínimo del 2%' : 'Minimum CTR of 2%',
          label: isSpanish ? '👆 CTR mínimo del 2%' : '👆 Minimum CTR of 2%'
        }
      ],
      required: true
    })
  }

  if (isRegulatedSector && (!brief.allowedClaims || brief.allowedClaims.trim().length === 0)) {
    questions.push({
      id: 'regulated-claims',
      field: 'allowedClaims',
      question: isSpanish
        ? 'Detectamos un sector regulado. ¿Qué claims están permitidos y cuáles prohibidos?'
        : 'We detected a regulated sector. Which claims are allowed and which are prohibited?',
      placeholder: isSpanish
        ? 'Ej: Permitido: "Reduce costos hasta 30%". Prohibido: "Cura definitiva", "100% garantizado"'
        : 'e.g., Allowed: "Reduces costs up to 30%". Prohibited: "Definitive cure", "100% guaranteed"',
      type: 'textarea',
      required: true
    })
  }

  if (isRegulatedSector && (!brief.legalRequirements || brief.legalRequirements.trim().length === 0)) {
    questions.push({
      id: 'legal-requirements',
      field: 'legalRequirements',
      question: isSpanish
        ? '¿Hay requisitos legales obligatorios que debamos incluir? (GDPR, disclaimers, etc.)'
        : 'Are there mandatory legal requirements we must include? (GDPR, disclaimers, etc.)',
      placeholder: isSpanish
        ? 'Ej: Incluir link a términos, mencionar GDPR compliance, disclaimer de precios sujetos a configuración'
        : 'e.g., Include link to terms, mention GDPR compliance, price disclaimer subject to configuration',
      type: 'textarea',
      required: false
    })
  }

  return {
    hasGaps: questions.length > 0,
    questions
  }
}
