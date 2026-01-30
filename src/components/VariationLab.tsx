import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lightning, Copy, Target, Clock, ShieldCheck, Heart, ChatCircle, MagnifyingGlass, Sparkle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { CopyVariation, VariationChannel, VariationObjective, HookType, CopyAngle, BrandKit } from '@/lib/types'

interface VariationLabProps {
  variations: CopyVariation[]
  isGenerating: boolean
  language: 'es' | 'en'
}

const ANGLE_ICONS = {
  beneficio: <Target size={18} weight="fill" className="text-primary" />,
  urgencia: <Clock size={18} weight="fill" className="text-destructive" />,
  autoridad: <ShieldCheck size={18} weight="fill" className="text-success" />,
  emocion: <Heart size={18} weight="fill" className="text-secondary" />,
  objeciones: <ChatCircle size={18} weight="fill" className="text-accent" />
}

const ANGLE_LABELS = {
  es: {
    beneficio: 'Beneficio',
    urgencia: 'Urgencia',
    autoridad: 'Autoridad',
    emocion: 'Emoción',
    objeciones: 'Objeciones'
  },
  en: {
    beneficio: 'Benefit',
    urgencia: 'Urgency',
    autoridad: 'Authority',
    emocion: 'Emotion',
    objeciones: 'Objections'
  }
}

const HOOK_TYPE_LABELS = {
  es: {
    curiosidad: 'Curiosidad',
    beneficio: 'Beneficio',
    autoridad: 'Autoridad',
    urgencia: 'Urgencia',
    objecion: 'Objeción'
  },
  en: {
    curiosidad: 'Curiosity',
    beneficio: 'Benefit',
    autoridad: 'Authority',
    urgencia: 'Urgency',
    objecion: 'Objection'
  }
}

const RISK_COLORS = {
  bajo: 'text-success border-success bg-success/10',
  medio: 'text-accent border-accent bg-accent/10',
  alto: 'text-destructive border-destructive bg-destructive/10'
}

const RISK_LABELS = {
  es: { bajo: 'Bajo', medio: 'Medio', alto: 'Alto' },
  en: { bajo: 'Low', medio: 'Medium', alto: 'High' }
}

const CHANNEL_OPTIONS: VariationChannel[] = ['LinkedIn', 'Instagram', 'Reels', 'Ads', 'Email', 'Landing']
const OBJECTIVE_OPTIONS: VariationObjective[] = ['leads', 'ventas']

export function VariationLab({ variations, isGenerating, language }: VariationLabProps) {
  const [brandKit] = useKV<BrandKit>('brand-kit-v2', {
    tone: 'profesional',
    formality: 3,
    useEmojis: false,
    emojiStyle: 'moderados',
    forbiddenWords: [],
    preferredWords: [],
    allowedClaims: [],
    notAllowedClaims: [],
    brandExamplesYes: [],
    brandExamplesNo: [],
    preferredCTA: 'contacta'
  })

  const [selectedChannel, setSelectedChannel] = useState<VariationChannel | 'all'>('all')
  const [selectedObjective, setSelectedObjective] = useState<VariationObjective | 'all'>('all')
  const [selectedAngle, setSelectedAngle] = useState<CopyAngle | 'all'>('all')
  const [selectedHookType, setSelectedHookType] = useState<HookType | 'all'>('all')
  const [selectedRisk, setSelectedRisk] = useState<'bajo' | 'medio' | 'alto' | 'all'>('all')
  const [selectedTone, setSelectedTone] = useState<'cercano' | 'profesional' | 'premium' | 'canalla' | 'tech' | 'all'>('all')
  const [isGeneratingVariations, setIsGeneratingVariations] = useState(false)

  const filteredVariations = variations.filter(v => {
    const channelMatch = selectedChannel === 'all' || v.channel === selectedChannel
    const objectiveMatch = selectedObjective === 'all' || v.objective === selectedObjective
    const angleMatch = selectedAngle === 'all' || v.angle === selectedAngle
    const hookTypeMatch = selectedHookType === 'all' || v.hookType === selectedHookType
    const riskMatch = selectedRisk === 'all' || v.risk === selectedRisk
    const toneMatch = selectedTone === 'all' || v.tone === selectedTone
    return channelMatch && objectiveMatch && angleMatch && hookTypeMatch && riskMatch && toneMatch
  })

  const copyVariation = (variation: CopyVariation) => {
    const text = `Hook (${variation.hookType}): ${variation.hook}\nPromesa: ${variation.promise}\nPrueba: ${variation.proof}\nCTA: ${variation.cta}\nRiesgo: ${variation.risk} (${variation.riskReason})`
    navigator.clipboard.writeText(text)
    toast.success(language === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard')
  }

  const generateVariations = async () => {
    if (selectedChannel === 'all' || selectedObjective === 'all') {
      toast.error(language === 'es' 
        ? 'Selecciona un canal y objetivo específicos' 
        : 'Select a specific channel and objective')
      return
    }

    setIsGeneratingVariations(true)
    
    try {
      const lang = language
      const isSpanish = lang === 'es'
      
      const brandGuidelines = `
BRAND GUIDELINES:
- Tono: ${brandKit?.tone || 'profesional'}
- Nivel de Formalidad: ${brandKit?.formality || 3}/5
- Emojis: ${brandKit?.useEmojis ? `Sí, usar estilo ${brandKit.emojiStyle}` : 'No usar emojis'}
${brandKit?.forbiddenWords && brandKit.forbiddenWords.length > 0 ? `- Palabras PROHIBIDAS: ${brandKit.forbiddenWords.join(', ')}` : ''}
${brandKit?.preferredWords && brandKit.preferredWords.length > 0 ? `- Palabras PREFERIDAS: ${brandKit.preferredWords.join(', ')}` : ''}
${brandKit?.allowedClaims && brandKit.allowedClaims.length > 0 ? `- Claims PERMITIDOS: ${brandKit.allowedClaims.join(' | ')}` : ''}
${brandKit?.notAllowedClaims && brandKit.notAllowedClaims.length > 0 ? `- Claims NO PERMITIDOS: ${brandKit.notAllowedClaims.join(' | ')}` : ''}
- CTA Preferido: ${brandKit?.preferredCTA || 'contacta'}
`

      const promptContent = [
        isSpanish 
          ? 'Genera EXACTAMENTE 50 variaciones de copy (10 por cada uno de los 5 ángulos estratégicos) para:' 
          : 'Generate EXACTLY 50 copy variations (10 for each of the 5 strategic angles) for:',
        brandGuidelines,
        `Canal: ${selectedChannel}`,
        `Objetivo: ${selectedObjective}`,
        '',
        isSpanish ? 'Devuelve un objeto JSON con una propiedad "variations" que contenga un array de 50 objetos.' : 'Return a JSON object with a "variations" property containing an array of 50 objects.',
        '',
        isSpanish ? 'Los 5 ángulos estratégicos son:' : 'The 5 strategic angles are:',
        '1. beneficio (10 variaciones)',
        '2. urgencia (10 variaciones)',
        '3. autoridad (10 variaciones)',
        '4. emocion (10 variaciones)',
        '5. objeciones (10 variaciones)',
        '',
        isSpanish ? 'Para CADA variación (50 en total), el objeto debe contener:' : 'For EACH variation (50 in total), the object must contain:',
        '{',
        `  "channel": "${selectedChannel}",`,
        `  "objective": "${selectedObjective}",`,
        '  "angle": "beneficio" | "urgencia" | "autoridad" | "emocion" | "objeciones",',
        '  "hookType": "curiosidad" | "beneficio" | "autoridad" | "urgencia" | "objecion",',
        `  "hook": "${isSpanish ? '(Hook impactante de 8-15 palabras, optimizado para el canal seleccionado)' : '(Impactful 8-15 word hook, optimized for selected channel)'}",`,
        `  "promise": "${isSpanish ? '(Promesa clara: qué obtiene el usuario, 1-2 frases)' : '(Clear promise: what the user gets, 1-2 sentences)'}",`,
        `  "proof": "${isSpanish ? '(Evidencia o dato que respalda, o "TBD" si no hay prueba disponible)' : '(Evidence or supporting data, or "TBD" if no proof available)'}",`,
        `  "cta": "${isSpanish ? '(CTA específico de 2-5 palabras, accionable)' : '(Specific 2-5 word CTA, actionable)'}",`,
        '  "risk": "bajo" | "medio" | "alto",',
        `  "riskReason": "${isSpanish ? '(Explicación breve de por qué tiene ese nivel de riesgo)' : '(Brief explanation of why it has that risk level)'}",`,
        `  "tone": "${brandKit?.tone || 'profesional'}"`,
        '}',
        '',
        isSpanish ? 'Distribución de hookType por ángulo:' : 'HookType distribution per angle:',
        'Beneficio: 6 beneficio, 2 curiosidad, 2 autoridad',
        'Urgencia: 8 urgencia, 2 beneficio',
        'Autoridad: 7 autoridad, 3 beneficio',
        'Emoción: 5 curiosidad, 3 beneficio, 2 autoridad',
        'Objeciones: 8 objecion, 2 autoridad',
        '',
        isSpanish ? 'IMPORTANTE:' : 'IMPORTANT:',
        isSpanish ? '- Genera EXACTAMENTE 50 variaciones (10 por cada ángulo).' : '- Generate EXACTLY 50 variations (10 per angle).',
        isSpanish ? '- NO inventes datos o pruebas. Si no hay evidencia, marca como "TBD".' : '- DO NOT invent data or proof. If no evidence, mark as "TBD".',
        isSpanish ? '- Devuelve SOLO el JSON válido.' : '- Return ONLY valid JSON.'
      ].join('\n')

      const result = await spark.llm(promptContent, 'gpt-4o', true)
      
      const parsed = JSON.parse(result)
      if (parsed.variations && Array.isArray(parsed.variations)) {
        toast.success(language === 'es' 
          ? `${parsed.variations.length} variaciones generadas` 
          : `${parsed.variations.length} variations generated`)
      }
    } catch (error) {
      console.error('Error generating variations:', error)
      toast.error(language === 'es' 
        ? 'Error al generar variaciones' 
        : 'Error generating variations')
    } finally {
      setIsGeneratingVariations(false)
    }
  }

  const groupedByAngle = filteredVariations.reduce((acc, v) => {
    if (!acc[v.angle]) acc[v.angle] = []
    acc[v.angle].push(v)
    return acc
  }, {} as Record<string, CopyVariation[]>)

  return (
    <Card className="glass-panel p-6 border-2 marketing-shine">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Lightning size={32} weight="fill" className="text-accent sparkle-animate" />
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Variation Lab
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              {language === 'es' 
                ? 'Genera hasta 50 variaciones por canal y objetivo con etiquetas estratégicas' 
                : 'Generate up to 50 variations per channel and objective with strategic labels'}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Badge variant="outline" className="text-xs font-bold">
              {filteredVariations.length} {language === 'es' ? 'mostradas' : 'shown'}
            </Badge>
            {variations.length > 0 && (
              <Badge variant="secondary" className="text-xs font-bold">
                {variations.length} {language === 'es' ? 'total' : 'total'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 glass-panel p-4 border-2 rounded-xl space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <MagnifyingGlass size={20} weight="bold" className="text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            {language === 'es' ? 'Configuración y Filtros' : 'Configuration & Filters'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase">
              {language === 'es' ? 'Canal' : 'Channel'}
            </label>
            <Select value={selectedChannel} onValueChange={(v) => setSelectedChannel(v as any)}>
              <SelectTrigger className="border-2 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'es' ? 'Todos' : 'All'}</SelectItem>
                {CHANNEL_OPTIONS.map(ch => (
                  <SelectItem key={ch} value={ch}>{ch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase">
              {language === 'es' ? 'Objetivo' : 'Objective'}
            </label>
            <Select value={selectedObjective} onValueChange={(v) => setSelectedObjective(v as any)}>
              <SelectTrigger className="border-2 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'es' ? 'Todos' : 'All'}</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="ventas">{language === 'es' ? 'Ventas' : 'Sales'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase">
              {language === 'es' ? 'Tono (Brand Kit)' : 'Tone (Brand Kit)'}
            </label>
            <Select value={selectedTone} onValueChange={(v) => setSelectedTone(v as any)}>
              <SelectTrigger className="border-2 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'es' ? 'Todos' : 'All'}</SelectItem>
                <SelectItem value="cercano">{language === 'es' ? 'Cercano' : 'Close'}</SelectItem>
                <SelectItem value="profesional">{language === 'es' ? 'Profesional' : 'Professional'}</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="canalla">{language === 'es' ? 'Canalla' : 'Edgy'}</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={generateVariations}
          disabled={isGeneratingVariations || selectedChannel === 'all' || selectedObjective === 'all'}
          className="w-full font-bold neon-glow"
          size="lg"
        >
          <Sparkle size={20} weight="fill" className="mr-2" />
          {isGeneratingVariations 
            ? (language === 'es' ? 'Generando 50 variaciones...' : 'Generating 50 variations...')
            : (language === 'es' ? 'Generar 50 variaciones' : 'Generate 50 variations')}
        </Button>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-2">
            {language === 'es' ? 'Ángulo:' : 'Angle:'}
          </span>
          <Button
            variant={selectedAngle === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAngle('all')}
            className="rounded-full text-xs font-bold h-7"
          >
            {language === 'es' ? 'Todos' : 'All'}
          </Button>
          {Object.keys(ANGLE_ICONS).map((angle) => (
            <Button
              key={angle}
              variant={selectedAngle === angle ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedAngle(angle as CopyAngle)}
              className="rounded-full text-xs font-bold h-7 gap-1"
            >
              {ANGLE_ICONS[angle as keyof typeof ANGLE_ICONS]}
              {ANGLE_LABELS[language][angle as keyof typeof ANGLE_LABELS.es]}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-2">
            {language === 'es' ? 'Tipo de Hook:' : 'Hook Type:'}
          </span>
          <Button
            variant={selectedHookType === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedHookType('all')}
            className="h-6 px-2 text-xs font-bold"
          >
            {language === 'es' ? 'Todos' : 'All'}
          </Button>
          {(['curiosidad', 'beneficio', 'autoridad', 'urgencia', 'objecion'] as HookType[]).map((hookType) => (
            <Button
              key={hookType}
              variant={selectedHookType === hookType ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedHookType(hookType)}
              className="h-6 px-2 text-xs font-bold"
            >
              {HOOK_TYPE_LABELS[language][hookType]}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mr-2">
            {language === 'es' ? 'Riesgo:' : 'Risk:'}
          </span>
          <Button
            variant={selectedRisk === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedRisk('all')}
            className="h-6 px-2 text-xs font-bold"
          >
            {language === 'es' ? 'Todos' : 'All'}
          </Button>
          {(['bajo', 'medio', 'alto'] as const).map((risk) => (
            <Button
              key={risk}
              variant={selectedRisk === risk ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedRisk(risk)}
              className="h-6 px-2 text-xs font-bold"
            >
              {RISK_LABELS[language][risk]}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="glass-panel mb-4 border-2 rounded-xl">
          <TabsTrigger value="grid" className="text-xs font-bold rounded-lg">
            {language === 'es' ? 'Vista Grid' : 'Grid View'}
          </TabsTrigger>
          <TabsTrigger value="grouped" className="text-xs font-bold rounded-lg">
            {language === 'es' ? 'Por Ángulo' : 'By Angle'}
          </TabsTrigger>
          <TabsTrigger value="table" className="text-xs font-bold rounded-lg">
            {language === 'es' ? 'Tabla' : 'Table'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-0">
          {filteredVariations.length > 0 ? (
            <ScrollArea className="h-[700px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pr-4">
                {filteredVariations.map((variation) => (
                  <Card key={variation.id} className="glass-panel p-4 border-2 hover:scale-[1.01] transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {ANGLE_ICONS[variation.angle]}
                        <Badge variant="outline" className="text-xs font-bold">
                          {ANGLE_LABELS[language][variation.angle]}
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-bold">
                          {HOOK_TYPE_LABELS[language][variation.hookType]}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyVariation(variation)}
                        className="h-7 w-7 p-0"
                      >
                        <Copy size={14} weight="bold" />
                      </Button>
                    </div>

                    <div className="mb-3 flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="font-bold">
                        {variation.channel}
                      </Badge>
                      <Badge variant="outline" className="font-bold">
                        {variation.objective === 'leads' ? 'Leads' : (language === 'es' ? 'Ventas' : 'Sales')}
                      </Badge>
                      {variation.tone && (
                        <Badge variant="secondary" className="text-xs">
                          {variation.tone}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                          Hook
                        </p>
                        <p className="text-sm font-bold text-foreground leading-tight">{variation.hook}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                          {language === 'es' ? 'Promesa' : 'Promise'}
                        </p>
                        <p className="text-sm font-medium text-foreground leading-snug">{variation.promise}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                          {language === 'es' ? 'Prueba' : 'Proof'}
                        </p>
                        <p className={cn(
                          "text-xs",
                          variation.proof === 'TBD' ? 'text-destructive font-bold' : 'text-muted-foreground'
                        )}>
                          {variation.proof}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground mb-1">CTA</p>
                        <p className="text-sm font-bold text-primary">{variation.cta}</p>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex items-start gap-2">
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs font-bold border-2", RISK_COLORS[variation.risk])}
                          >
                            {language === 'es' ? 'Riesgo' : 'Risk'}: {RISK_LABELS[language][variation.risk]}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          {variation.riskReason}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Lightning size={72} className="mx-auto mb-4 opacity-20 sparkle-animate" />
              <p className="font-semibold text-lg mb-2">
                {language === 'es' ? 'No hay variaciones disponibles' : 'No variations available'}
              </p>
              <p className="text-sm">
                {language === 'es' 
                  ? 'Selecciona un canal y objetivo, luego genera 50 variaciones' 
                  : 'Select a channel and objective, then generate 50 variations'}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="grouped" className="mt-0">
          <ScrollArea className="h-[700px]">
            <div className="space-y-6 pr-4">
              {Object.entries(groupedByAngle).map(([angle, vars]) => (
                <div key={angle}>
                  <div className="flex items-center gap-2 mb-3 sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">
                    {ANGLE_ICONS[angle as keyof typeof ANGLE_ICONS]}
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      {ANGLE_LABELS[language][angle as keyof typeof ANGLE_LABELS.es]}
                    </h3>
                    <Badge variant="secondary" className="text-xs font-bold">
                      {vars.length}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {vars.map((variation) => (
                      <Card key={variation.id} className="glass-panel p-3 border hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs font-bold">
                                {HOOK_TYPE_LABELS[language][variation.hookType]}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {variation.channel}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs border", RISK_COLORS[variation.risk])}
                              >
                                {RISK_LABELS[language][variation.risk]}
                              </Badge>
                            </div>
                            <p className="text-sm font-bold text-foreground">{variation.hook}</p>
                            <p className="text-xs text-muted-foreground">{variation.promise}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyVariation(variation)}
                            className="h-7 w-7 p-0 flex-shrink-0"
                          >
                            <Copy size={14} weight="bold" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <ScrollArea className="h-[700px]">
            <div className="pr-4">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-background/95 backdrop-blur-sm border-b-2">
                  <tr>
                    <th className="text-left p-2 font-bold uppercase">Canal</th>
                    <th className="text-left p-2 font-bold uppercase">Objetivo</th>
                    <th className="text-left p-2 font-bold uppercase">Ángulo</th>
                    <th className="text-left p-2 font-bold uppercase">Hook Type</th>
                    <th className="text-left p-2 font-bold uppercase w-1/3">Hook</th>
                    <th className="text-left p-2 font-bold uppercase">CTA</th>
                    <th className="text-left p-2 font-bold uppercase">Riesgo</th>
                    <th className="text-center p-2 font-bold uppercase">
                      <Copy size={14} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVariations.map((variation, idx) => (
                    <tr 
                      key={variation.id} 
                      className={cn(
                        "border-b hover:bg-muted/30 transition-colors",
                        idx % 2 === 0 ? 'bg-muted/5' : ''
                      )}
                    >
                      <td className="p-2">
                        <Badge variant="outline" className="text-xs">
                          {variation.channel}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline" className="text-xs">
                          {variation.objective}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          {ANGLE_ICONS[variation.angle]}
                          <span className="text-xs font-medium">
                            {ANGLE_LABELS[language][variation.angle]}
                          </span>
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant="secondary" className="text-xs">
                          {HOOK_TYPE_LABELS[language][variation.hookType]}
                        </Badge>
                      </td>
                      <td className="p-2 font-medium">
                        {variation.hook}
                      </td>
                      <td className="p-2 font-bold text-primary">
                        {variation.cta}
                      </td>
                      <td className="p-2">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs border", RISK_COLORS[variation.risk])}
                        >
                          {RISK_LABELS[language][variation.risk]}
                        </Badge>
                      </td>
                      <td className="p-2 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyVariation(variation)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy size={12} weight="bold" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
