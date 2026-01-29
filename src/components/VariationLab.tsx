import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lightning, Copy, Target, Clock, ShieldCheck, Heart, ChatCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { CopyVariation } from '@/lib/types'

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

const RISK_COLORS = {
  bajo: 'text-success border-success',
  medio: 'text-accent border-accent',
  alto: 'text-destructive border-destructive'
}

const RISK_LABELS = {
  es: { bajo: 'Bajo', medio: 'Medio', alto: 'Alto' },
  en: { bajo: 'Low', medio: 'Medium', alto: 'High' }
}

export function VariationLab({ variations, isGenerating, language }: VariationLabProps) {
  const [selectedAngle, setSelectedAngle] = useState<string>('all')
  const [selectedRisk, setSelectedRisk] = useState<string>('all')

  const filteredVariations = variations.filter(v => {
    const angleMatch = selectedAngle === 'all' || v.angle === selectedAngle
    const riskMatch = selectedRisk === 'all' || v.risk === selectedRisk
    return angleMatch && riskMatch
  })

  const copyVariation = (variation: CopyVariation) => {
    const text = `Hook: ${variation.hook}\nPromesa: ${variation.promise}\nPrueba: ${variation.proof}\nCTA: ${variation.cta}`
    navigator.clipboard.writeText(text)
    toast.success(language === 'es' ? 'Copiado' : 'Copied')
  }

  const groupedByAngle = variations.reduce((acc, v) => {
    if (!acc[v.angle]) acc[v.angle] = []
    acc[v.angle].push(v)
    return acc
  }, {} as Record<string, CopyVariation[]>)

  return (
    <Card className="glass-panel p-6 border-2 marketing-shine">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Lightning size={28} weight="fill" className="text-accent sparkle-animate" />
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                {language === 'es' ? 'Variation Lab' : 'Variation Lab'}
              </span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              {language === 'es' 
                ? `${variations.length} variaciones por ángulo estratégico` 
                : `${variations.length} variations by strategic angle`}
            </p>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs font-bold">
              {filteredVariations.length} {language === 'es' ? 'mostradas' : 'shown'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          variant={selectedAngle === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedAngle('all')}
          className="rounded-full text-xs font-bold"
        >
          {language === 'es' ? 'Todos' : 'All'}
        </Button>
        {Object.keys(ANGLE_ICONS).map((angle) => (
          <Button
            key={angle}
            variant={selectedAngle === angle ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAngle(angle)}
            className="rounded-full text-xs font-bold"
          >
            {ANGLE_ICONS[angle as keyof typeof ANGLE_ICONS]}
            {ANGLE_LABELS[language][angle as keyof typeof ANGLE_LABELS.es]}
          </Button>
        ))}
      </div>

      <div className="mb-4 flex gap-2">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {language === 'es' ? 'Filtrar por riesgo:' : 'Filter by risk:'}
        </span>
        <Button
          variant={selectedRisk === 'all' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedRisk('all')}
          className="h-6 px-2 text-xs font-bold"
        >
          {language === 'es' ? 'Todos' : 'All'}
        </Button>
        {['bajo', 'medio', 'alto'].map((risk) => (
          <Button
            key={risk}
            variant={selectedRisk === risk ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedRisk(risk)}
            className="h-6 px-2 text-xs font-bold"
          >
            {RISK_LABELS[language][risk as keyof typeof RISK_LABELS.es]}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="glass-panel mb-4 border-2 rounded-xl">
          <TabsTrigger value="grid" className="text-xs font-bold rounded-lg">
            {language === 'es' ? 'Vista Grid' : 'Grid View'}
          </TabsTrigger>
          <TabsTrigger value="grouped" className="text-xs font-bold rounded-lg">
            {language === 'es' ? 'Por Ángulo' : 'By Angle'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-0">
          {filteredVariations.length > 0 ? (
            <ScrollArea className="h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                {filteredVariations.map((variation) => (
                  <Card key={variation.id} className="glass-panel p-4 border-2 hover:scale-[1.02] transition-transform">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {ANGLE_ICONS[variation.angle]}
                        <Badge variant="outline" className="text-xs font-bold">
                          {ANGLE_LABELS[language][variation.angle]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs font-bold border-2", RISK_COLORS[variation.risk])}
                        >
                          {RISK_LABELS[language][variation.risk]}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyVariation(variation)}
                          className="h-7 w-7 p-0"
                        >
                          <Copy size={14} weight="bold" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                          {language === 'es' ? 'Hook' : 'Hook'}
                        </p>
                        <p className="text-sm font-bold text-foreground">{variation.hook}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                          {language === 'es' ? 'Promesa' : 'Promise'}
                        </p>
                        <p className="text-sm font-medium text-foreground">{variation.promise}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground mb-1">
                          {language === 'es' ? 'Prueba' : 'Proof'}
                        </p>
                        <p className="text-xs text-muted-foreground">{variation.proof}</p>
                      </div>

                      <div>
                        <p className="text-xs uppercase font-bold text-muted-foreground mb-1">CTA</p>
                        <p className="text-sm font-bold text-primary">{variation.cta}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Lightning size={56} className="mx-auto mb-4 opacity-40 sparkle-animate" />
              <p className="font-semibold">
                {language === 'es' ? 'No hay variaciones disponibles' : 'No variations available'}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="grouped" className="mt-0">
          <ScrollArea className="h-[600px]">
            <div className="space-y-6 pr-4">
              {Object.entries(groupedByAngle).map(([angle, vars]) => (
                <div key={angle}>
                  <div className="flex items-center gap-2 mb-3">
                    {ANGLE_ICONS[angle as keyof typeof ANGLE_ICONS]}
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      {ANGLE_LABELS[language][angle as keyof typeof ANGLE_LABELS.es]}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {vars.length}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {vars
                      .filter(v => selectedRisk === 'all' || v.risk === selectedRisk)
                      .map((variation) => (
                        <Card key={variation.id} className="glass-panel p-3 border">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <p className="text-sm font-bold text-foreground">{variation.hook}</p>
                              <p className="text-xs text-muted-foreground">{variation.promise}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-3">
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs font-bold border", RISK_COLORS[variation.risk])}
                              >
                                {RISK_LABELS[language][variation.risk]}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyVariation(variation)}
                                className="h-7 w-7 p-0"
                              >
                                <Copy size={14} weight="bold" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
