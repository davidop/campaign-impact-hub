export interface BrandKit {
  voice: string
  tone: string
  doList: string[]
  dontList: string[]
  forbiddenWords: string[]
  allowedClaims: string[]
  useEmojis: boolean
  formality: 'casual' | 'professional' | 'formal'
  examples: string[]
}

export interface CampaignBriefData {
  product: string
  audience: string
  goals: string
  budget: string
  channels: string[]
  price?: string
  margin?: string
  mainPromise?: string
  proof?: string[]
  competitors?: string[]
  timeline?: string
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

export interface CampaignOutput {
  strategy: string
  creativeRoutes: string
  funnelBlueprint: string
  paidPack: string
  landingKit: string
  contentCalendar: ContentCalendarItem[]
  emailFlow: string
  whatsappFlow: string
  experimentPlan: string
  measurementUtms: string
  risks: string
  executionChecklist: string
  copyVariations: CopyVariation[]
}

export interface CampaignVersion {
  id: string
  version: number
  timestamp: number
  outputs: CampaignOutput
  changelog: string
}
