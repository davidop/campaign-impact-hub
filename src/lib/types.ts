export interface BrandKit {
  tone: 'cercano' | 'profesional' | 'premium' | 'canalla' | 'tech'
  formality: number
  useEmojis: boolean
  emojiStyle: 'pocos' | 'moderados' | 'muchos'
  forbiddenWords: string[]
  preferredWords: string[]
  allowedClaims: string[]
  notAllowedClaims: string[]
  brandExamplesYes: string[]
  brandExamplesNo: string[]
  preferredCTA: 'agenda-demo' | 'compra' | 'descarga' | 'suscribete' | 'contacta'
}

export interface CampaignBriefData {
  objective: string
  kpi: string
  segments: string
  pains: string
  objections: string
  buyingContext: string
  product: string
  price?: string
  promo?: string
  guarantee?: string
  usp?: string
  channels: string[]
  budget: string
  timing: string
  geography: string
  language: string
  tone: string
  brandVoice: string
  forbiddenWords: string
  allowedClaims: string
  legalRequirements: string
  availableAssets: string
  links: string
  audience: string
  goals: string
  mainPromise?: string
  proof?: string[]
  competitors?: string[]
  timeline?: string
  margin?: string
}

export interface CopyVariation {
  id: string
  angle: 'beneficio' | 'urgencia' | 'autoridad' | 'emocion' | 'objeciones'
  hook: string
  promise: string
  proof: string
  cta: string
  risk: 'bajo' | 'medio' | 'alto'
}

export interface ContentCalendarItem {
  date: string
  platform: string
  contentType: string
  objective: string
  funnelPhase: 'awareness' | 'consideration' | 'conversion' | 'retention'
  cta: string
  format: string
  description: string
}

export interface CreativeRoute {
  type: 'safe' | 'bold' | 'premium'
  bigIdea: string
  tagline: string
  hooks: string[]
  adExamples: {
    title: string
    body: string
    cta: string
  }[]
  risk: 'bajo' | 'medio' | 'alto'
  whenToUse: string
  expectedResults: string
}

export interface FunnelPhase {
  phase: 'awareness' | 'consideration' | 'conversion' | 'retention'
  phaseLabel: string
  objective: string
  keyMessage: string
  formats: string[]
  cta: string
  kpis: string[]
  examples: {
    title: string
    description: string
    format: string
  }[]
}

export interface PaidPackData {
  campaignStructure: Array<{
    objective: string
    adsets: Array<{
      name: string
      audience: string
      bidStrategy: string
      budget: string
    }>
  }>
  audiences: Array<{
    type: 'cold' | 'lookalike' | 'retargeting'
    name: string
    size: string
    description: string
    criteria: string[]
  }>
  copyVariants: {
    hooks: string[]
    headlines: string[]
    descriptions: string[]
  }
  creativeAngles: Array<{
    angle: 'beneficio' | 'urgencia' | 'autoridad' | 'emocion' | 'objeciones'
    description: string
    whenToUse: string
    examples: string[]
  }>
  budgetDistribution: Array<{
    phase: string
    percentage: number
    allocation: string
    reasoning: string
  }>
  testPlan: Array<{
    priority: number
    testName: string
    hypothesis: string
    variants: string[]
    metric: string
    duration: string
    reasoning: string
  }>
  warnings: string[]
}

export interface LandingKitSection {
  sectionName: string
  wireframe: string
  copyOptions: string[]
}

export interface LandingKitFormField {
  fieldName: string
  label: string
  placeholder: string
  errorState: string
  helpText: string
}

export interface LandingKitFAQ {
  question: string
  answer: string
}

export interface LandingKitTrustSignal {
  type: 'reviews' | 'logos' | 'garantias' | 'cifras' | 'certificaciones' | 'casos'
  description: string
  recommendation: string
}

export interface LandingKitData {
  sections: LandingKitSection[]
  formMicrocopy: {
    fields: LandingKitFormField[]
    privacyText: string
    submitButton: string
    successMessage: string
  }
  faqs: LandingKitFAQ[]
  trustSignals: LandingKitTrustSignal[]
}

export interface CampaignOutput {
  overview?: {
    objective: string
    kpi: string
    primaryAudience: string
    valueProposition: string
    mainMessage: string
    rtbs: string[]
    recommendedCTA: string
    launchPriority: string[]
    alerts: {
      tbds: string[]
      risks: string[]
    }
  }
  strategy: string
  creativeRoutes: string | CreativeRoute[]
  funnelBlueprint: string | FunnelPhase[]
  paidPack: string | PaidPackData
  landingKit: string | LandingKitData
  contentCalendar: ContentCalendarItem[]
  emailFlow: string
  whatsappFlow: string
  experimentPlan: string
  measurementUtms: string
  risks: string
  executionChecklist: string
}

export interface CampaignVersion {
  id: string
  briefData: CampaignBriefData
  timestamp: number
  outputs: CampaignOutput
  changelog: string
}
