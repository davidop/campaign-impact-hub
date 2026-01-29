import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Lightning, CaretDown, Check, CheckCircle, WarningCircle, ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { CampaignBriefData } from '@/lib/types'

interface BriefWizardProps {
  onGenerate: (data: CampaignBriefData) => void
  isGenerating: boolean
  language: 'es' | 'en'
}

const AVAILABLE_CHANNELS = [
  { value: 'email', label: 'Email' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'google', label: 'Google' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'youtube', label: 'YouTube' }
]

export function BriefWizard({ onGenerate, isGenerating, language }: BriefWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [briefScore, setBriefScore] = useState(0)
  const [isChannelOpen, setIsChannelOpen] = useState(false)
  
  const [formData, setFormData] = useState<CampaignBriefData>({
    product: 'Azure ARC',
    audience: 'CEO, CTO, Responsables de IT',
    goals: 'Implementación de Azure ARC en OnPremise y aumentar el ACR',
    budget: '€3,000',
    channels: ['email'],
    price: '',
    margin: '',
    mainPromise: '',
    proof: [],
    competitors: [],
    timeline: ''
  })

  const [proofInput, setProofInput] = useState('')
  const [competitorInput, setCompetitorInput] = useState('')

  const steps = language === 'es' 
    ? ['Básico', 'Detalles', 'Evidencia', 'Validación']
    : ['Basic', 'Details', 'Evidence', 'Validation']

  useEffect(() => {
    calculateScore()
  }, [formData])

  const calculateScore = () => {
    let score = 0
    const weights = {
      product: 10,
      audience: 10,
      goals: 10,
      budget: 10,
      channels: 10,
      price: 15,
      margin: 10,
      mainPromise: 15,
      proof: 10,
      competitors: 5,
      timeline: 5
    }

    if (formData.product.trim()) score += weights.product
    if (formData.audience.trim()) score += weights.audience
    if (formData.goals.trim()) score += weights.goals
    if (formData.budget.trim()) score += weights.budget
    if (formData.channels.length > 0) score += weights.channels
    if (formData.price?.trim()) score += weights.price
    if (formData.margin?.trim()) score += weights.margin
    if (formData.mainPromise?.trim()) score += weights.mainPromise
    if (formData.proof && formData.proof.length > 0) score += weights.proof
    if (formData.competitors && formData.competitors.length > 0) score += weights.competitors
    if (formData.timeline?.trim()) score += weights.timeline

    setBriefScore(score)
  }

  const handleChange = (field: keyof CampaignBriefData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleChannel = (channelValue: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channelValue)
        ? prev.channels.filter(ch => ch !== channelValue)
        : [...prev.channels, channelValue]
    }))
  }

  const addProof = () => {
    if (proofInput.trim()) {
      setFormData(prev => ({
        ...prev,
        proof: [...(prev.proof || []), proofInput.trim()]
      }))
      setProofInput('')
    }
  }

  const addCompetitor = () => {
    if (competitorInput.trim()) {
      setFormData(prev => ({
        ...prev,
        competitors: [...(prev.competitors || []), competitorInput.trim()]
      }))
      setCompetitorInput('')
    }
  }

  const removeProof = (index: number) => {
    setFormData(prev => ({
      ...prev,
      proof: prev.proof?.filter((_, i) => i !== index)
    }))
  }

  const removeCompetitor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      competitors: prev.competitors?.filter((_, i) => i !== index)
    }))
  }

  const getChannelDisplayText = () => {
    if (formData.channels.length === 0) {
      return language === 'es' ? 'Selecciona canales...' : 'Select channels...'
    }
    return formData.channels
      .map(ch => AVAILABLE_CHANNELS.find(c => c.value === ch)?.label)
      .filter(Boolean)
      .join(', ')
  }

  const getScoreColor = () => {
    if (briefScore >= 80) return 'text-success'
    if (briefScore >= 60) return 'text-accent'
    return 'text-destructive'
  }

  const getScoreBadge = () => {
    if (briefScore >= 80) return language === 'es' ? 'Excelente' : 'Excellent'
    if (briefScore >= 60) return language === 'es' ? 'Bueno' : 'Good'
    if (briefScore >= 40) return language === 'es' ? 'Regular' : 'Fair'
    return language === 'es' ? 'Incompleto' : 'Incomplete'
  }

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.product.trim() && formData.audience.trim() && formData.goals.trim()
    }
    if (currentStep === 1) {
      return formData.budget.trim() && formData.channels.length > 0
    }
    return true
  }

  const handleSubmit = () => {
    onGenerate(formData)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="product" className="text-xs uppercase font-bold tracking-wider text-primary flex items-center gap-2">
                {language === 'es' ? 'Producto/Servicio' : 'Product/Service'}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => handleChange('product', e.target.value)}
                placeholder={language === 'es' ? 'ej., Azure ARC' : 'e.g., Azure ARC'}
                className="glass-panel-hover border-2 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience" className="text-xs uppercase font-bold tracking-wider text-primary flex items-center gap-2">
                {language === 'es' ? 'Público Objetivo' : 'Target Audience'}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="audience"
                value={formData.audience}
                onChange={(e) => handleChange('audience', e.target.value)}
                placeholder={language === 'es' ? 'ej., CEO, CTO, Responsables de IT' : 'e.g., CEO, CTO, IT Managers'}
                className="glass-panel-hover resize-none border-2 rounded-xl"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals" className="text-xs uppercase font-bold tracking-wider text-primary flex items-center gap-2">
                {language === 'es' ? 'Objetivos de Campaña' : 'Campaign Goals'}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => handleChange('goals', e.target.value)}
                placeholder={language === 'es' ? 'ej., Aumentar ACR en 30%' : 'e.g., Increase ACR by 30%'}
                className="glass-panel-hover resize-none border-2 rounded-xl"
                rows={3}
                required
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-xs uppercase font-bold tracking-wider text-primary flex items-center gap-2">
                {language === 'es' ? 'Presupuesto' : 'Budget'}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                placeholder={language === 'es' ? 'ej., €3,000' : 'e.g., €3,000'}
                className="glass-panel-hover border-2 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channels" className="text-xs uppercase font-bold tracking-wider text-primary flex items-center gap-2">
                {language === 'es' ? 'Canales de Marketing' : 'Marketing Channels'}
                <span className="text-destructive">*</span>
              </Label>
              <Popover open={isChannelOpen} onOpenChange={setIsChannelOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="channels"
                    variant="outline"
                    role="combobox"
                    aria-expanded={isChannelOpen}
                    className={cn(
                      "w-full justify-between font-normal glass-panel-hover border-2 rounded-xl",
                      formData.channels.length === 0 && "text-muted-foreground"
                    )}
                  >
                    <span className="truncate font-medium">{getChannelDisplayText()}</span>
                    <CaretDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 glass-panel border-2" align="start">
                  <div className="p-2 space-y-1">
                    {AVAILABLE_CHANNELS.map((channel) => (
                      <div
                        key={channel.value}
                        className="flex items-center space-x-2 rounded-xl px-3 py-2 hover:bg-accent/30 cursor-pointer transition-all"
                        onClick={() => toggleChannel(channel.value)}
                      >
                        <Checkbox
                          checked={formData.channels.includes(channel.value)}
                          onCheckedChange={() => toggleChannel(channel.value)}
                          className="pointer-events-none"
                        />
                        <label className="flex-1 text-sm font-semibold cursor-pointer pointer-events-none">
                          {channel.label}
                        </label>
                        {formData.channels.includes(channel.value) && (
                          <Check className="h-4 w-4 text-primary" weight="bold" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline" className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Duración / Timeline' : 'Timeline / Duration'}
              </Label>
              <Input
                id="timeline"
                value={formData.timeline || ''}
                onChange={(e) => handleChange('timeline', e.target.value)}
                placeholder={language === 'es' ? 'ej., 3 meses, Q1 2024' : 'e.g., 3 months, Q1 2024'}
                className="glass-panel-hover border-2 rounded-xl"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Precio del Producto' : 'Product Price'}
              </Label>
              <Input
                id="price"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder={language === 'es' ? 'ej., €500/mes' : 'e.g., €500/month'}
                className="glass-panel-hover border-2 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="margin" className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Margen / ROI Esperado' : 'Margin / Expected ROI'}
              </Label>
              <Input
                id="margin"
                value={formData.margin || ''}
                onChange={(e) => handleChange('margin', e.target.value)}
                placeholder={language === 'es' ? 'ej., 40%, 3:1 ROI' : 'e.g., 40%, 3:1 ROI'}
                className="glass-panel-hover border-2 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainPromise" className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Promesa Principal' : 'Main Promise'}
              </Label>
              <Textarea
                id="mainPromise"
                value={formData.mainPromise || ''}
                onChange={(e) => handleChange('mainPromise', e.target.value)}
                placeholder={language === 'es' ? 'ej., Gestión híbrida unificada que reduce costos 30%' : 'e.g., Unified hybrid management that reduces costs by 30%'}
                className="glass-panel-hover resize-none border-2 rounded-xl"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Pruebas / Evidencias' : 'Proof / Evidence'}
              </Label>
              <div className="flex gap-2">
                <Input
                  value={proofInput}
                  onChange={(e) => setProofInput(e.target.value)}
                  placeholder={language === 'es' ? 'ej., Case study Microsoft' : 'e.g., Microsoft case study'}
                  className="glass-panel-hover border-2 rounded-xl"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProof())}
                />
                <Button type="button" onClick={addProof} variant="outline" className="rounded-xl">
                  {language === 'es' ? 'Añadir' : 'Add'}
                </Button>
              </div>
              {formData.proof && formData.proof.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.proof.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="rounded-lg cursor-pointer" onClick={() => removeProof(idx)}>
                      {item} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Competidores' : 'Competitors'}
              </Label>
              <div className="flex gap-2">
                <Input
                  value={competitorInput}
                  onChange={(e) => setCompetitorInput(e.target.value)}
                  placeholder={language === 'es' ? 'ej., AWS Outposts' : 'e.g., AWS Outposts'}
                  className="glass-panel-hover border-2 rounded-xl"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetitor())}
                />
                <Button type="button" onClick={addCompetitor} variant="outline" className="rounded-xl">
                  {language === 'es' ? 'Añadir' : 'Add'}
                </Button>
              </div>
              {formData.competitors && formData.competitors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.competitors.map((item, idx) => (
                    <Badge key={idx} variant="secondary" className="rounded-lg cursor-pointer" onClick={() => removeCompetitor(idx)}>
                      {item} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-5">
            <div className="glass-panel p-6 rounded-2xl border-2">
              <h3 className="text-lg font-bold mb-4 text-foreground">
                {language === 'es' ? 'Resumen del Brief' : 'Brief Summary'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                    {language === 'es' ? 'Producto' : 'Product'}
                  </p>
                  <p className="text-sm font-medium">{formData.product || 'TBD'}</p>
                </div>
                
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                    {language === 'es' ? 'Audiencia' : 'Audience'}
                  </p>
                  <p className="text-sm font-medium">{formData.audience || 'TBD'}</p>
                </div>
                
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                    {language === 'es' ? 'Presupuesto' : 'Budget'}
                  </p>
                  <p className="text-sm font-medium">{formData.budget || 'TBD'}</p>
                </div>
                
                <div>
                  <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                    {language === 'es' ? 'Canales' : 'Channels'}
                  </p>
                  <p className="text-sm font-medium">{formData.channels.length > 0 ? formData.channels.join(', ') : 'TBD'}</p>
                </div>

                {!formData.price && (
                  <div className="flex items-start gap-2 bg-destructive/10 p-3 rounded-lg border border-destructive/30">
                    <WarningCircle size={20} className="text-destructive mt-0.5" weight="fill" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-destructive mb-1">
                        {language === 'es' ? 'Precio no especificado' : 'Price not specified'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'es' 
                          ? 'Recomendamos incluir el precio para generar estrategias de pricing más precisas'
                          : 'We recommend including the price for more accurate pricing strategies'}
                      </p>
                    </div>
                  </div>
                )}

                {!formData.mainPromise && (
                  <div className="flex items-start gap-2 bg-accent/10 p-3 rounded-lg border border-accent/30">
                    <WarningCircle size={20} className="text-accent mt-0.5" weight="fill" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-accent mb-1">
                        {language === 'es' ? 'Promesa principal no definida' : 'Main promise not defined'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {language === 'es' 
                          ? 'La promesa principal ayuda a crear mensajes más impactantes'
                          : 'The main promise helps create more impactful messages'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="glass-panel p-6 border-2 marketing-shine">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Lightning size={28} weight="fill" className="text-primary float-animate" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {language === 'es' ? 'Brief de Campaña' : 'Campaign Brief'}
            </span>
          </h2>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full px-3 py-1 font-bold">
              {language === 'es' ? 'Score' : 'Score'}: <span className={cn("ml-1", getScoreColor())}>{briefScore}/100</span>
            </Badge>
            <Badge className={cn("rounded-full px-3 py-1", briefScore >= 80 ? "bg-success" : briefScore >= 60 ? "bg-accent" : "bg-destructive")}>
              {getScoreBadge()}
            </Badge>
          </div>
        </div>

        <Progress value={briefScore} className="h-2 mb-4" />

        <div className="flex items-center justify-between mb-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all",
                idx < currentStep ? "bg-primary text-primary-foreground border-primary" :
                idx === currentStep ? "bg-accent text-accent-foreground border-accent" :
                "bg-muted text-muted-foreground border-muted"
              )}>
                {idx < currentStep ? <CheckCircle size={20} weight="fill" /> : idx + 1}
              </div>
              <span className="text-xs font-bold hidden md:block">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {renderStepContent()}

        <div className="flex gap-3 pt-4">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex-1 rounded-xl border-2"
            >
              <ArrowLeft size={18} weight="bold" />
              {language === 'es' ? 'Anterior' : 'Previous'}
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="flex-1 rounded-xl border-2"
            >
              {language === 'es' ? 'Siguiente' : 'Next'}
              <ArrowRight size={18} weight="bold" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isGenerating || !canProceed()}
              className="flex-1 neon-glow-accent font-bold uppercase tracking-wider rounded-xl py-6 border-2 border-accent/50"
            >
              {isGenerating ? (
                <span className="animate-pulse">{language === 'es' ? 'Generando...' : 'Generating...'}</span>
              ) : (
                <>
                  <Lightning size={20} weight="fill" className="sparkle-animate" />
                  {language === 'es' ? 'Generar Campaña' : 'Generate Campaign'}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
