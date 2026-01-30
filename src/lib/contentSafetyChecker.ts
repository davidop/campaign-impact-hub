export interface SafetyIssue {
  type: 'unverifiable-claim' | 'exaggerated-promise' | 'legal-risk' | 'missing-proof' | 'superlative'
  severity: 'high' | 'medium' | 'low'
  original: string
  issue: string
  suggestion: string
  category?: string
  sector?: string
}

export interface SafetyReport {
  score: number
  totalIssues: number
  highSeverity: number
  mediumSeverity: number
  lowSeverity: number
  issues: SafetyIssue[]
  summary: string
}

const UNVERIFIABLE_PATTERNS = [
  /el mejor/gi,
  /el más/gi,
  /líder del mercado/gi,
  /número uno/gi,
  /garantizado/gi,
  /100% efectivo/gi,
  /resultados inmediatos/gi,
  /sin esfuerzo/gi,
  /todos consiguen/gi,
  /siempre funciona/gi,
  /nunca falla/gi,
  /multiplica por \d+/gi,
  /aumenta en \d+%/gi,
  /revolucionario/gi,
  /único en el mundo/gi,
  /incomparable/gi
]

const EXAGGERATION_PATTERNS = [
  /increíble/gi,
  /asombroso/gi,
  /extraordinario/gi,
  /milagroso/gi,
  /mágico/gi,
  /perfecto/gi,
  /absoluto/gi,
  /total/gi,
  /completo éxito/gi,
  /imposible de/gi,
  /nunca has visto/gi,
  /cambiará tu vida/gi,
  /te hará rico/gi
]

const LEGAL_RISK_PATTERNS = {
  health: [
    /cura/gi,
    /elimina la enfermedad/gi,
    /tratamiento definitivo/gi,
    /sanación/gi
  ],
  finance: [
    /retorno garantizado/gi,
    /sin riesgo/gi,
    /gana dinero fácil/gi,
    /inversión segura/gi,
    /beneficio garantizado/gi
  ],
  general: [
    /aprobado por/gi,
    /certificado por/gi,
    /recomendado por expertos/gi,
    /probado científicamente/gi
  ]
}

const SUPERLATIVES = [
  /el primero/gi,
  /el único/gi,
  /el mejor/gi,
  /el más avanzado/gi,
  /el más innovador/gi,
  /el más completo/gi
]

export function checkContentSafety(
  content: string,
  sector?: string,
  hasProof?: boolean
): SafetyReport {
  const issues: SafetyIssue[] = []

  UNVERIFIABLE_PATTERNS.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        const context = extractContext(content, match)
        issues.push({
          type: 'unverifiable-claim',
          severity: 'high',
          original: context,
          issue: `"${match}" es un claim no verificable sin datos de respaldo`,
          suggestion: makeSafeVersion(context, match, 'claim')
        })
      })
    }
  })

  EXAGGERATION_PATTERNS.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        const context = extractContext(content, match)
        issues.push({
          type: 'exaggerated-promise',
          severity: 'medium',
          original: context,
          issue: `"${match}" es lenguaje exagerado que puede reducir credibilidad`,
          suggestion: makeSafeVersion(context, match, 'exaggeration')
        })
      })
    }
  })

  SUPERLATIVES.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        const context = extractContext(content, match)
        issues.push({
          type: 'superlative',
          severity: hasProof ? 'low' : 'high',
          original: context,
          issue: `"${match}" es un superlativo que requiere evidencia legal para ser usado`,
          suggestion: hasProof 
            ? makeSafeVersion(context, match, 'superlative-with-proof')
            : makeSafeVersion(context, match, 'superlative')
        })
      })
    }
  })

  if (sector) {
    checkSectorSpecificRisks(content, sector, issues)
  }

  const highSeverity = issues.filter(i => i.severity === 'high').length
  const mediumSeverity = issues.filter(i => i.severity === 'medium').length
  const lowSeverity = issues.filter(i => i.severity === 'low').length

  const score = calculateSafetyScore(highSeverity, mediumSeverity, lowSeverity)

  return {
    score,
    totalIssues: issues.length,
    highSeverity,
    mediumSeverity,
    lowSeverity,
    issues,
    summary: generateSummary(score, issues.length, highSeverity)
  }
}

function checkSectorSpecificRisks(
  content: string,
  sector: string,
  issues: SafetyIssue[]
): void {
  const sectorLower = sector.toLowerCase()

  if (sectorLower.includes('salud') || sectorLower.includes('health') || 
      sectorLower.includes('medic') || sectorLower.includes('farmac')) {
    LEGAL_RISK_PATTERNS.health.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          const context = extractContext(content, match)
          issues.push({
            type: 'legal-risk',
            severity: 'high',
            original: context,
            issue: `"${match}" es un claim regulado en sector salud. Requiere autorización sanitaria.`,
            suggestion: makeSafeVersion(context, match, 'health'),
            category: 'Sector Salud',
            sector: 'health'
          })
        })
      }
    })
  }

  if (sectorLower.includes('financ') || sectorLower.includes('invers') || 
      sectorLower.includes('banco') || sectorLower.includes('cripto')) {
    LEGAL_RISK_PATTERNS.finance.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        matches.forEach(match => {
          const context = extractContext(content, match)
          issues.push({
            type: 'legal-risk',
            severity: 'high',
            original: context,
            issue: `"${match}" es un claim regulado en sector financiero. Prohibido por normativa CNMV/SEC.`,
            suggestion: makeSafeVersion(context, match, 'finance'),
            category: 'Sector Financiero',
            sector: 'finance'
          })
        })
      }
    })
  }

  LEGAL_RISK_PATTERNS.general.forEach(pattern => {
    const matches = content.match(pattern)
    if (matches) {
      matches.forEach(match => {
        const context = extractContext(content, match)
        issues.push({
          type: 'legal-risk',
          severity: 'medium',
          original: context,
          issue: `"${match}" requiere documentación legal de respaldo`,
          suggestion: makeSafeVersion(context, match, 'general-legal'),
          category: 'Documentación Legal'
        })
      })
    }
  })
}

function extractContext(text: string, match: string, contextLength: number = 80): string {
  const index = text.toLowerCase().indexOf(match.toLowerCase())
  if (index === -1) return match

  const start = Math.max(0, index - contextLength / 2)
  const end = Math.min(text.length, index + match.length + contextLength / 2)
  
  let context = text.substring(start, end)
  
  if (start > 0) context = '...' + context
  if (end < text.length) context = context + '...'
  
  return context
}

function makeSafeVersion(context: string, problematicWord: string, type: string): string {
  const lowerContext = context.toLowerCase()
  const lowerWord = problematicWord.toLowerCase()

  const replacements: Record<string, string[]> = {
    'claim': [
      'el mejor → uno de los más valorados',
      'el más → entre los más',
      'líder del mercado → reconocido en el sector',
      'número uno → referente en',
      'garantizado → diseñado para',
      '100% efectivo → altamente efectivo',
      'resultados inmediatos → resultados en tiempo récord',
      'sin esfuerzo → de forma sencilla',
      'todos consiguen → nuestros clientes consiguen',
      'siempre funciona → funciona de forma consistente',
      'nunca falla → altamente fiable',
      'revolucionario → innovador',
      'único en el mundo → distintivo'
    ],
    'exaggeration': [
      'increíble → destacado',
      'asombroso → notable',
      'extraordinario → excepcional',
      'milagroso → efectivo',
      'mágico → intuitivo',
      'perfecto → optimizado',
      'cambiará tu vida → mejorará tu día a día',
      'imposible de → difícil de',
      'nunca has visto → poco habitual'
    ],
    'superlative': [
      'el primero → pionero',
      'el único → uno de los pocos',
      'el mejor → entre los mejores',
      'el más avanzado → tecnología avanzada',
      'el más innovador → altamente innovador',
      'el más completo → solución completa'
    ],
    'superlative-with-proof': [
      'el primero → el primero* (*según estudio X)',
      'el único → el único* (*en segmento Y)',
      'el mejor → el mejor* (*valorado por Z)'
    ],
    'health': [
      'cura → contribuye a mejorar',
      'elimina la enfermedad → ayuda a controlar',
      'tratamiento definitivo → tratamiento',
      'sanación → bienestar'
    ],
    'finance': [
      'retorno garantizado → retorno potencial',
      'sin riesgo → bajo riesgo (consultar condiciones)',
      'gana dinero fácil → oportunidad de rentabilidad',
      'inversión segura → inversión (sujeta a riesgo)',
      'beneficio garantizado → beneficio potencial'
    ],
    'general-legal': [
      'aprobado por → utilizado por',
      'certificado por → certificado por [especificar entidad]',
      'recomendado por expertos → recomendado por profesionales del sector',
      'probado científicamente → testeado / validado'
    ]
  }

  const applicableReplacements = replacements[type] || []
  
  for (const rule of applicableReplacements) {
    const [from, to] = rule.split(' → ')
    if (lowerWord.includes(from.toLowerCase())) {
      return context.replace(new RegExp(from, 'gi'), to)
    }
  }

  return context + ' [REQUIERE EVIDENCIA O REFORMULACIÓN]'
}

function calculateSafetyScore(high: number, medium: number, low: number): number {
  const penalty = (high * 15) + (medium * 7) + (low * 3)
  return Math.max(0, Math.min(100, 100 - penalty))
}

function generateSummary(score: number, totalIssues: number, highSeverity: number): string {
  if (score >= 90) {
    return 'Contenido seguro y verificable. Listo para publicar.'
  } else if (score >= 70) {
    return `Contenido mayormente seguro con ${totalIssues} ajustes menores recomendados.`
  } else if (score >= 50) {
    return `Contenido con ${totalIssues} problemas detectados. ${highSeverity} de alta severidad requieren atención inmediata.`
  } else {
    return `ADVERTENCIA: Contenido con alto riesgo legal. ${highSeverity} claims críticos deben ser corregidos antes de publicar.`
  }
}

export function applySafetySuggestion(original: string, suggestion: string): string {
  return suggestion.replace(/\.\.\./g, '').trim()
}

export function generateSafetyRewritePrompt(
  content: string,
  issues: SafetyIssue[],
  brandKit?: any
): string {
  const highIssues = issues.filter(i => i.severity === 'high')
  const issuesList = highIssues.map(i => `- ${i.original} → ${i.issue}`).join('\n')

  return `Reescribe este contenido aplicando las correcciones de seguridad legal:

CONTENIDO ORIGINAL:
${content}

PROBLEMAS IDENTIFICADOS:
${issuesList}

DIRECTRICES:
- Elimina todos los superlativos no verificables
- Reemplaza promesas absolutas por afirmaciones demostrables
- Añade disclaimers cuando sea necesario
- Mantén el impacto y beneficio pero con lenguaje seguro
${brandKit ? `- Respeta tono de marca: ${brandKit.tone}` : ''}
${brandKit?.forbiddenWords?.length ? `- Evita: ${brandKit.forbiddenWords.join(', ')}` : ''}

FORMATO: Devuelve solo el texto reescrito, sin comentarios adicionales.`
}
