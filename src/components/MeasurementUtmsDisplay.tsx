import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Copy, Check, ChartBar, Tag, ListChecks, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface MeasurementUtmsDisplayProps {
  data?: MeasurementUtmsData
  language?: 'es' | 'en'
}

export interface MeasurementUtmsData {
  kpisByPhase: Array<{
    phase: 'awareness' | 'consideration' | 'conversion' | 'retention'
    phaseLabel: string
    primaryKPI: string
    secondaryKPIs: string[]
    benchmarks?: string
    tools: string[]
  }>
  recommendedEvents: Array<{
    eventName: string
    eventType: 'view_content' | 'lead' | 'purchase' | 'add_to_cart' | 'begin_checkout' | 'sign_up' | 'contact' | 'custom'
    funnelPhase: string
    description: string
    parameters: string[]
    priority: 'critical' | 'important' | 'nice-to-have'
  }>
  namingConvention: {
    structure: string
    rules: string[]
    examples: Array<{
      campaignType: string
      exampleName: string
      explanation: string
    }>
  }
  utmTemplate: {
    structure: string
    parameters: Array<{
      parameter: 'source' | 'medium' | 'campaign' | 'content' | 'term'
      description: string
      examples: string[]
      rules: string[]
    }>
    exampleUrls: Array<{
      channel: string
      url: string
      breakdown: string
    }>
  }
  trackingChecklist: Array<{
    category: string
    items: Array<{
      task: string
      critical: boolean
      details?: string
    }>
  }>
}

export default function MeasurementUtmsDisplay({ data, language = 'es' }: MeasurementUtmsDisplayProps) {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [utmInputs, setUtmInputs] = useState({
    baseUrl: 'https://tudominio.com/landing',
    source: 'facebook',
    medium: 'paid',
    campaign: 'launch-q1-2024',
    content: 'hero-video',
    term: 'ceo-tech'
  })

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItems(prev => new Set(prev).add(id))
    toast.success(language === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard')
    setTimeout(() => {
      setCopiedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 2000)
  }

  const toggleCheckItem = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const generateUtmUrl = () => {
    const params = new URLSearchParams({
      utm_source: utmInputs.source,
      utm_medium: utmInputs.medium,
      utm_campaign: utmInputs.campaign,
      utm_content: utmInputs.content,
      utm_term: utmInputs.term
    })
    return `${utmInputs.baseUrl}?${params.toString()}`
  }

  if (!data) {
    return (
      <Card className="glass-panel p-8">
        <div className="text-center space-y-3">
          <ChartBar size={48} weight="duotone" className="mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">
            {language === 'es' 
              ? 'Genera una campaña para ver el plan de medición y UTMs' 
              : 'Generate a campaign to see the measurement and UTMs plan'}
          </p>
        </div>
      </Card>
    )
  }

  const t = {
    title: language === 'es' ? 'Measurement & UTMs' : 'Measurement & UTMs',
    kpisTab: language === 'es' ? 'KPIs por Fase' : 'KPIs by Phase',
    eventsTab: language === 'es' ? 'Eventos' : 'Events',
    namingTab: language === 'es' ? 'Naming' : 'Naming',
    utmsTab: language === 'es' ? 'UTMs' : 'UTMs',
    checklistTab: language === 'es' ? 'Checklist' : 'Checklist',
    primaryKPI: language === 'es' ? 'KPI Principal' : 'Primary KPI',
    secondaryKPIs: language === 'es' ? 'KPIs Secundarios' : 'Secondary KPIs',
    benchmarks: language === 'es' ? 'Benchmarks' : 'Benchmarks',
    tools: language === 'es' ? 'Herramientas' : 'Tools',
    priority: language === 'es' ? 'Prioridad' : 'Priority',
    parameters: language === 'es' ? 'Parámetros' : 'Parameters',
    phase: language === 'es' ? 'Fase' : 'Phase',
    description: language === 'es' ? 'Descripción' : 'Description',
    examples: language === 'es' ? 'Ejemplos' : 'Examples',
    rules: language === 'es' ? 'Reglas' : 'Rules',
    structure: language === 'es' ? 'Estructura' : 'Structure',
    generate: language === 'es' ? 'Generar URL' : 'Generate URL',
    result: language === 'es' ? 'URL Generada' : 'Generated URL',
    critical: language === 'es' ? 'Crítico' : 'Critical',
    completed: language === 'es' ? 'Completados' : 'Completed'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ChartBar size={28} weight="duotone" className="text-primary" />
        <h2 className="text-2xl font-bold">{t.title}</h2>
      </div>

      <Tabs defaultValue="kpis" className="w-full">
        <TabsList className="glass-panel w-full justify-start overflow-x-auto">
          <TabsTrigger value="kpis" className="flex items-center gap-2">
            <ChartBar size={16} weight="fill" />
            {t.kpisTab}
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Sparkle size={16} weight="fill" />
            {t.eventsTab}
          </TabsTrigger>
          <TabsTrigger value="naming" className="flex items-center gap-2">
            <Tag size={16} weight="fill" />
            {t.namingTab}
          </TabsTrigger>
          <TabsTrigger value="utms" className="flex items-center gap-2">
            <Tag size={16} weight="fill" />
            {t.utmsTab}
          </TabsTrigger>
          <TabsTrigger value="checklist" className="flex items-center gap-2">
            <ListChecks size={16} weight="fill" />
            {t.checklistTab}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kpis" className="space-y-4 mt-4">
          {data.kpisByPhase.map((phaseData, idx) => (
            <Card key={idx} className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2" variant="outline">
                    {phaseData.phaseLabel}
                  </Badge>
                  <h3 className="text-lg font-semibold">{t.primaryKPI}</h3>
                  <p className="text-xl font-bold text-primary mt-1">{phaseData.primaryKPI}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(phaseData.primaryKPI, `kpi-${idx}`)}
                >
                  {copiedItems.has(`kpi-${idx}`) ? (
                    <Check size={16} className="text-success" />
                  ) : (
                    <Copy size={16} />
                  )}
                </Button>
              </div>

              {phaseData.secondaryKPIs.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">{t.secondaryKPIs}</h4>
                  <div className="flex flex-wrap gap-2">
                    {phaseData.secondaryKPIs.map((kpi, kpiIdx) => (
                      <Badge key={kpiIdx} variant="secondary">
                        {kpi}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {phaseData.benchmarks && (
                <div className="border-t pt-3">
                  <h4 className="text-sm font-semibold mb-1">{t.benchmarks}</h4>
                  <p className="text-sm text-muted-foreground">{phaseData.benchmarks}</p>
                </div>
              )}

              {phaseData.tools.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">{t.tools}</h4>
                  <div className="flex flex-wrap gap-2">
                    {phaseData.tools.map((tool, toolIdx) => (
                      <Badge key={toolIdx} variant="outline" className="font-mono text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-4 mt-4">
          {data.recommendedEvents.map((event, idx) => (
            <Card key={idx} className="glass-panel p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {event.eventName}
                    </code>
                    <Badge 
                      variant={
                        event.priority === 'critical' ? 'destructive' : 
                        event.priority === 'important' ? 'default' : 
                        'secondary'
                      }
                      className="text-xs"
                    >
                      {event.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {event.funnelPhase}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                  
                  {event.parameters.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold mb-2 text-muted-foreground">{t.parameters}</h4>
                      <div className="flex flex-wrap gap-1">
                        {event.parameters.map((param, paramIdx) => (
                          <code key={paramIdx} className="text-xs bg-accent/50 px-1.5 py-0.5 rounded">
                            {param}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(event.eventName, `event-${idx}`)}
                >
                  {copiedItems.has(`event-${idx}`) ? (
                    <Check size={16} className="text-success" />
                  ) : (
                    <Copy size={16} />
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="naming" className="space-y-4 mt-4">
          <Card className="glass-panel p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t.structure}</h3>
              <code className="block bg-muted p-3 rounded text-sm font-mono">
                {data.namingConvention.structure}
              </code>
            </div>

            {data.namingConvention.rules.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">{t.rules}</h3>
                <ul className="space-y-2">
                  {data.namingConvention.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.namingConvention.examples.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">{t.examples}</h3>
                <div className="space-y-3">
                  {data.namingConvention.examples.map((example, idx) => (
                    <div key={idx} className="border-l-2 border-primary pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline">{example.campaignType}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(example.exampleName, `naming-${idx}`)}
                        >
                          {copiedItems.has(`naming-${idx}`) ? (
                            <Check size={14} className="text-success" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </Button>
                      </div>
                      <code className="block bg-muted px-2 py-1 rounded text-xs font-mono mb-1">
                        {example.exampleName}
                      </code>
                      <p className="text-xs text-muted-foreground">{example.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="utms" className="space-y-4 mt-4">
          <Card className="glass-panel p-6 space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t.structure}</h3>
              <code className="block bg-muted p-3 rounded text-sm font-mono break-all">
                {data.utmTemplate.structure}
              </code>
            </div>

            <div className="space-y-3">
              {data.utmTemplate.parameters.map((param, idx) => (
                <div key={idx} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono font-semibold">utm_{param.parameter}</code>
                  </div>
                  <p className="text-sm text-muted-foreground">{param.description}</p>
                  
                  {param.examples.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold mb-1 text-muted-foreground">{t.examples}:</p>
                      <div className="flex flex-wrap gap-1">
                        {param.examples.map((ex, exIdx) => (
                          <Badge key={exIdx} variant="secondary" className="text-xs font-mono">
                            {ex}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {param.rules.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold mb-1 text-muted-foreground">{t.rules}:</p>
                      <ul className="space-y-1">
                        {param.rules.map((rule, ruleIdx) => (
                          <li key={ruleIdx} className="text-xs flex items-start gap-1">
                            <span className="text-primary">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t pt-5">
              <h3 className="text-lg font-semibold mb-3">
                {language === 'es' ? 'Generador de URL con UTMs' : 'UTM URL Generator'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="md:col-span-2">
                  <Label htmlFor="baseUrl" className="text-xs">Base URL</Label>
                  <Input
                    id="baseUrl"
                    value={utmInputs.baseUrl}
                    onChange={(e) => setUtmInputs(prev => ({ ...prev, baseUrl: e.target.value }))}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="source" className="text-xs">utm_source</Label>
                  <Input
                    id="source"
                    value={utmInputs.source}
                    onChange={(e) => setUtmInputs(prev => ({ ...prev, source: e.target.value }))}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="medium" className="text-xs">utm_medium</Label>
                  <Input
                    id="medium"
                    value={utmInputs.medium}
                    onChange={(e) => setUtmInputs(prev => ({ ...prev, medium: e.target.value }))}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="campaign" className="text-xs">utm_campaign</Label>
                  <Input
                    id="campaign"
                    value={utmInputs.campaign}
                    onChange={(e) => setUtmInputs(prev => ({ ...prev, campaign: e.target.value }))}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="content" className="text-xs">utm_content</Label>
                  <Input
                    id="content"
                    value={utmInputs.content}
                    onChange={(e) => setUtmInputs(prev => ({ ...prev, content: e.target.value }))}
                    className="font-mono text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="term" className="text-xs">utm_term</Label>
                  <Input
                    id="term"
                    value={utmInputs.term}
                    onChange={(e) => setUtmInputs(prev => ({ ...prev, term: e.target.value }))}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground">{t.result}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(generateUtmUrl(), 'generated-utm')}
                  >
                    {copiedItems.has('generated-utm') ? (
                      <Check size={14} className="text-success" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </Button>
                </div>
                <code className="block text-xs font-mono break-all">
                  {generateUtmUrl()}
                </code>
              </div>
            </div>

            {data.utmTemplate.exampleUrls.length > 0 && (
              <div className="border-t pt-5">
                <h3 className="text-lg font-semibold mb-3">
                  {language === 'es' ? 'Ejemplos por Canal' : 'Examples by Channel'}
                </h3>
                <div className="space-y-3">
                  {data.utmTemplate.exampleUrls.map((urlExample, idx) => (
                    <div key={idx} className="border-l-2 border-accent pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge>{urlExample.channel}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(urlExample.url, `url-${idx}`)}
                        >
                          {copiedItems.has(`url-${idx}`) ? (
                            <Check size={14} className="text-success" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </Button>
                      </div>
                      <code className="block bg-muted px-2 py-1 rounded text-xs font-mono break-all mb-2">
                        {urlExample.url}
                      </code>
                      <p className="text-xs text-muted-foreground">{urlExample.breakdown}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4 mt-4">
          <Card className="glass-panel p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {language === 'es' ? 'Checklist Pre-Lanzamiento' : 'Pre-Launch Checklist'}
              </h3>
              <div className="text-sm text-muted-foreground">
                {t.completed}: {checkedItems.size} / {data.trackingChecklist.reduce((acc, cat) => acc + cat.items.length, 0)}
              </div>
            </div>

            <div className="space-y-6">
              {data.trackingChecklist.map((category, catIdx) => (
                <div key={catIdx} className="space-y-3">
                  <h4 className="font-semibold text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                      {catIdx + 1}
                    </span>
                    {category.category}
                  </h4>
                  
                  <div className="space-y-2 ml-8">
                    {category.items.map((item, itemIdx) => {
                      const itemId = `check-${catIdx}-${itemIdx}`
                      return (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => toggleCheckItem(itemId)}
                        >
                          <Checkbox
                            id={itemId}
                            checked={checkedItems.has(itemId)}
                            onCheckedChange={() => toggleCheckItem(itemId)}
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={itemId}
                              className={`text-sm cursor-pointer flex items-center gap-2 ${
                                checkedItems.has(itemId) ? 'line-through text-muted-foreground' : ''
                              }`}
                            >
                              {item.task}
                              {item.critical && (
                                <Badge variant="destructive" className="text-xs">
                                  {t.critical}
                                </Badge>
                              )}
                            </label>
                            {item.details && (
                              <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
