import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ChartBar, Calendar, TrendUp, Sparkle } from '@phosphor-icons/react'
import { useTranslation, type Language } from '@/lib/i18n'

interface OutputsPanelProps {
  outputs: {
    strategy: string
    copyA: string
    copyB: string
    calendar: string
    kpis: string
  }
  isGenerating: boolean
  language: Language
}

export function OutputsPanel({ outputs, isGenerating, language }: OutputsPanelProps) {
  const t = useTranslation(language)
  
  return (
    <Card className="glass-panel p-6 border-2 marketing-shine">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Sparkle size={28} weight="fill" className="text-accent sparkle-animate" />
          <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
            {t.outputs.title}
          </span>
        </h2>
        <p className="text-sm text-muted-foreground mt-2 font-medium">
          {t.outputs.subtitle}
        </p>
      </div>

      <Tabs defaultValue="strategy" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-panel mb-4 border-2 rounded-xl p-1">
          <TabsTrigger value="strategy" className="text-xs rounded-lg font-bold data-[state=active]:neon-glow">
            <ChartBar size={18} className="mr-1" />
            {t.outputs.strategy}
          </TabsTrigger>
          <TabsTrigger value="copy" className="text-xs rounded-lg font-bold data-[state=active]:neon-glow">
            {t.outputs.copy}
          </TabsTrigger>
          <TabsTrigger value="calendar" className="text-xs rounded-lg font-bold data-[state=active]:neon-glow">
            <Calendar size={18} className="mr-1" />
            {t.outputs.calendar}
          </TabsTrigger>
          <TabsTrigger value="kpis" className="text-xs rounded-lg font-bold data-[state=active]:neon-glow">
            <TrendUp size={18} className="mr-1" />
            {t.outputs.kpis}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategy" className="mt-0">
          <ScrollArea className="h-[600px] pr-4">
            {isGenerating && !outputs.strategy ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4 rounded-xl" />
                <Skeleton className="h-4 w-5/6 rounded-xl" />
                <Skeleton className="h-4 w-2/3 rounded-xl" />
                <div className="pt-4">
                  <Skeleton className="h-4 w-full rounded-xl" />
                  <Skeleton className="h-4 w-4/5 rounded-xl" />
                </div>
              </div>
            ) : outputs.strategy ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed font-medium">
                  {outputs.strategy}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ChartBar size={56} className="mx-auto mb-4 opacity-40 float-animate" />
                <p className="font-semibold">{t.outputs.strategyEmpty}</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="copy" className="mt-0">
          <ScrollArea className="h-[600px] pr-4">
            {isGenerating && !outputs.copyA ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-24 rounded-xl" />
                  <Skeleton className="h-4 w-full rounded-xl" />
                  <Skeleton className="h-4 w-5/6 rounded-xl" />
                </div>
                <Separator />
                <div className="space-y-3">
                  <Skeleton className="h-6 w-24 rounded-xl" />
                  <Skeleton className="h-4 w-full rounded-xl" />
                  <Skeleton className="h-4 w-5/6 rounded-xl" />
                </div>
              </div>
            ) : outputs.copyA ? (
              <div className="space-y-6">
                <div className="glass-panel p-5 rounded-2xl neon-border border-primary/60 hover:scale-105 transition-transform">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    {t.outputs.versionA}
                  </h3>
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed font-medium">
                    {outputs.copyA}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="glass-panel p-5 rounded-2xl neon-border border-accent/60 hover:scale-105 transition-transform">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                    {t.outputs.versionB}
                  </h3>
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed font-medium">
                    {outputs.copyB}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkle size={56} className="mx-auto mb-4 opacity-40 sparkle-animate" />
                <p className="font-semibold">{t.outputs.copyEmpty}</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <ScrollArea className="h-[600px] pr-4">
            {isGenerating && !outputs.calendar ? (
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32 rounded-xl" />
                    <Skeleton className="h-4 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            ) : outputs.calendar ? (
              <div className="whitespace-pre-wrap text-foreground leading-relaxed font-medium">
                {outputs.calendar}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar size={56} className="mx-auto mb-4 opacity-40 float-animate" />
                <p className="font-semibold">{t.outputs.calendarEmpty}</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="kpis" className="mt-0">
          <ScrollArea className="h-[600px] pr-4">
            {isGenerating && !outputs.kpis ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-40 rounded-xl" />
                    <Skeleton className="h-4 w-full rounded-xl" />
                    <Skeleton className="h-4 w-32 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : outputs.kpis ? (
              <div className="whitespace-pre-wrap text-foreground leading-relaxed mono text-sm">
                {outputs.kpis}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <TrendUp size={56} className="mx-auto mb-4 opacity-40 float-animate" />
                <p className="font-semibold">{t.outputs.kpisEmpty}</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}