export interface BrandKit {
  tone: string
  tone: string
  doList: string[]
  dontList: string[]
  forbiddenWords: string[]
  allowedClaims: string[]
  useEmojis: boolean
  pains: string
  buyingContext: str
 

  channels: string[]
  timing: string
  language: s
  brandVoice: stri
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

  goals: string
  mainPromise?: string
  proof?: string[]
  competitors?: string[]
  timeline?: string
  margin?: string
}

export interface CopyVariation {
  funnelBlue
  angle: 'beneficio' | 'urgencia' | 'autoridad' | 'emocion' | 'objeciones'
  contentCalen
  promise: string
  experimentPla
  cta: string
  risk: 'bajo' | 'medio' | 'alto'
}

export interface ContentCalendarItem {
  version: num
  platform: string
  contentType: string
  objective: string
  funnelPhase: 'awareness' | 'consideration' | 'conversion' | 'retention'
  cta: string

  description: string


export interface CampaignOutput {
  strategy: string

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


export interface CampaignVersion {
  id: string

  timestamp: number
  outputs: CampaignOutput
  changelog: string
}
