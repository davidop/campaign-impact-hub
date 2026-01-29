import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Target, 
  Users, 
  Sparkle, 
  Megaphone, 
  CheckCircle, 
  Rocket,
  Warning,
  TrendUp
} from '@phosphor-icons/react'

interface CampaignOverviewProps {
  data: {
    objective?: string
    kpi?: string
    primaryAudience?: string
    valueProposition?: string
    mainMessage?: string
    rtbs?: string[]
    recommendedCTA?: string
    launchPriority?: string[]
    alerts?: {
      tbds: string[]
      risks: string[]
    }
  }
  language: 'es' | 'en'
}

export function CampaignOverview({ data, language }: CampaignOverviewProps) {
  const t = (es: string, en: string) => language === 'es' ? es : en

  const {
    objective = t('Por definir', 'TBD'),
    kpi = t('Por definir', 'TBD'),
    primaryAudience = t('Por definir', 'TBD'),
    valueProposition = t('Por definir', 'TBD'),
    mainMessage = t('Por definir', 'TBD'),
    rtbs = [],
    recommendedCTA = t('Por definir', 'TBD'),
    launchPriority = [],
    alerts = { tbds: [], risks: [] }
  } = data

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-panel p-5 border-2 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <Target size={20} weight="fill" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                {t('Objetivo', 'Objective')}
              </h3>
              <p className="text-base font-semibold leading-tight">
                {objective}
              </p>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center gap-2">
            <TrendUp size={16} weight="bold" className="text-success" />
            <div className="space-y-1 min-w-0 flex-1">
              <h4 className="text-xs font-bold text-muted-foreground uppercase">
                {t('KPI Principal', 'Main KPI')}
              </h4>
              <p className="text-sm font-medium">
                {kpi}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-panel p-5 border-2 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0">
              <Users size={20} weight="fill" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                {t('Audiencia Primaria', 'Primary Audience')}
              </h3>
              <p className="text-base font-semibold leading-tight">
                {primaryAudience}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass-panel p-6 border-2 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
            <Sparkle size={22} weight="fill" />
          </div>
          <div className="space-y-2 min-w-0 flex-1">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
              {t('Propuesta de Valor', 'Value Proposition')}
            </h3>
            <p className="text-lg font-bold leading-tight text-primary">
              {valueProposition}
            </p>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <Megaphone size={22} weight="fill" />
          </div>
          <div className="space-y-2 min-w-0 flex-1">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
              {t('Mensaje Principal', 'Main Message')}
            </h3>
            <p className="text-base font-medium leading-snug">
              {mainMessage}
            </p>
          </div>
        </div>
      </Card>

      <Card className="glass-panel p-6 border-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-success/10 text-success">
            <CheckCircle size={22} weight="fill" />
          </div>
          <h3 className="text-base font-bold">
            {t('Razones para Creer (RTBs)', 'Reasons to Believe (RTBs)')}
          </h3>
        </div>
        
        {rtbs.length === 0 ? (
          <Alert className="bg-muted/50">
            <AlertDescription className="text-sm italic text-muted-foreground">
              {t('No se han definido RTBs todavía', 'No RTBs defined yet')}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            {rtbs.slice(0, 3).map((rtb, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  {rtb}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-panel p-5 border-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <Megaphone size={18} weight="fill" />
            </div>
            <h3 className="text-sm font-bold">
              {t('CTA Recomendado', 'Recommended CTA')}
            </h3>
          </div>
          <div className="p-4 rounded-lg bg-accent/5 border-2 border-accent/30 text-center">
            <p className="text-lg font-bold text-accent">
              {recommendedCTA}
            </p>
          </div>
        </Card>

        <Card className="glass-panel p-5 border-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Rocket size={18} weight="fill" />
            </div>
            <h3 className="text-sm font-bold">
              {t('Qué Lanzar Primero', 'Launch Priority')}
            </h3>
          </div>
          {launchPriority.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              {t('Por definir', 'TBD')}
            </p>
          ) : (
            <ol className="space-y-2">
              {launchPriority.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="shrink-0 w-5 h-5 flex items-center justify-center p-0 text-xs font-bold">
                    {idx + 1}
                  </Badge>
                  <span className="font-medium leading-tight">{item}</span>
                </li>
              ))}
            </ol>
          )}
        </Card>
      </div>

      {(alerts.tbds.length > 0 || alerts.risks.length > 0) && (
        <Card className="glass-panel p-6 border-2 border-warning/30 bg-warning/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-warning/20 text-warning">
              <Warning size={22} weight="fill" />
            </div>
            <h3 className="text-base font-bold">
              {t('Alertas', 'Alerts')}
            </h3>
          </div>
          
          <div className="space-y-4">
            {alerts.tbds.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-warning uppercase tracking-wide">
                  {t('Por Definir (TBDs)', 'To Be Defined (TBDs)')}
                </h4>
                <ul className="space-y-1.5">
                  {alerts.tbds.map((tbd, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-warning font-bold mt-0.5">•</span>
                      <span>{tbd}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {alerts.risks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-destructive uppercase tracking-wide">
                  {t('Riesgos', 'Risks')}
                </h4>
                <ul className="space-y-1.5">
                  {alerts.risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-destructive font-bold mt-0.5">⚠</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
