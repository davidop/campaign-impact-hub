import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

import { cn } from '@/lib/utils'
}

  value: number
  formData: CampaignBriefData
  recommendation: strin
}

interface ScoreItem {
  label: string
  value: number
      met: Bool
        'Define el objetivo específico (ej. aum
      )
    {
 

      recommendation: t(
        'Describe the audience segment with job title, company size

      label: t('Dolores + objecione
     
      met: Boolean(formData.pains && formData.objections),
      value: 15,
      )
    {
      value: 15,
      recommendation: t(
      recommendation: t(
        'Describe the product and the core promise you offer (the main value).'
    },
    },
     
      met: Boolean(formData.usp),
        'Define 
      )
    {
      value: 10,
      recommendation: t(
      recommendation: t(
        'Add verifiable claims (e.g., "reduces costs 30%"), case studies, testimonials or certifications
      )
      
    {
      met: Boolean(formData.channels.length > 0 && formData.b
        'Selecci
      )
    {
      value: 10,
      recommendation: t(
      recommendation: t(
        'Define communication tone, forbidden words and legal requirements (GDPR, terms, 
    },
    },
     
      met: Boolean(formData.timing || formData.geography),
        'Especif
      )
  ]
  const totalScore = scoreItems.reduce((sum, item) => sum + (
  const completedItems =
  const getScoreStatus = () => {
      label: t('Listo para generar', 'Ready to generate'),
      )
      
    {
      label: t('Casi listo', 'Almost ready'),
      bgColor: '
      icon: Warning
    }
      label: t('Necesita completa
      recommendation: t(
        'Define qué hace única tu oferta. ¿Por qué elegirte vs competidores? Sé específico.',
        'Define what makes your offer unique. Why choose you vs competitors? Be specific.'
      )
    },
    {
      label: t('Prueba social / Evidencia', 'Social proof / Evidence'),
      value: 10,
      field: 'multi',
      checkFn: (data) => Boolean(data.allowedClaims || data.availableAssets),
      met: Boolean(formData.allowedClaims || formData.availableAssets),
      recommendation: t(
        'Añade claims verificables (ej. "reduce costos 30%"), casos de éxito, testimonios o certificaciones.',
        'Add verifiable claims (e.g., "reduces costs 30%"), case studies, testimonials or certifications.'
      )
    },
    {
      label: t('Canales + presupuesto', 'Channels + budget'),
      value: 10,
      field: 'multi',
      checkFn: (data) => Boolean(data.channels.length > 0 && data.budget),
      met: Boolean(formData.channels.length > 0 && formData.budget),
      recommendation: t(
        'Selecciona los canales de marketing y asigna un presupuesto total con duración.',
        'Select marketing channels and assign a total budget with duration.'
      )
    },
    {
      label: t('Restricciones de marca / legales', 'Brand / legal restrictions'),
      value: 10,
      field: 'multi',
      checkFn: (data) => Boolean(data.tone || data.legalRequirements || data.forbiddenWords),
      met: Boolean(formData.tone || formData.legalRequirements || formData.forbiddenWords),
      recommendation: t(
        'Define el tono de comunicación, palabras prohibidas y requisitos legales (GDPR, términos, etc.).',
        'Define communication tone, forbidden words and legal requirements (GDPR, terms, etc.).'
      )
    },
    {
      label: t('Timing / Geografía', 'Timing / Geography'),
      value: 5,
      field: 'multi',
      checkFn: (data) => Boolean(data.timing || data.geography),
      met: Boolean(formData.timing || formData.geography),
      recommendation: t(
        'Especifica fechas de inicio/fin y geografía objetivo con idiomas relevantes.',
        'Specify start/end dates and target geography with relevant languages.'
      )
     
  ]

  const totalScore = scoreItems.reduce((sum, item) => sum + (item.met ? item.value : 0), 0)
  const missingItems = scoreItems.filter(item => !item.met)
  const completedItems = scoreItems.filter(item => item.met)

  const getScoreStatus = () => {
    if (totalScore >= 80) return {
      label: t('Listo para generar', 'Ready to generate'),
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success',
      icon: CheckCircle,
      variant: 'success' as const
    }
    if (totalScore >= 50) return {
      label: t('Casi listo', 'Almost ready'),

      bgColor: 'bg-accent/10',

      icon: Warning,
      variant: 'warning' as const
    }
    return {
      label: t('Necesita completar datos', 'Needs more data'),
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',

      icon: XCircle,
      variant: 'destructive' as const
    }



  const StatusIcon = status.icon

  return (
    <Card className="glass-panel border-2 p-5">
      <div className="space-y-4">

          <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">

            {t('Brief Score', 'Brief Score')}
          </h3>

            <span className={cn("text-2xl font-bold", status.color)}>
              {totalScore}
            </span>
            <span className="text-sm text-muted-foreground font-semibold">/100</span>

        </div>

        <Progress value={totalScore} className="h-3" />

        <Alert className={cn("border-2", status.borderColor, status.bgColor)}>

          <AlertDescription className="ml-2">
            <span className={cn("font-bold", status.color)}>{status.label}</span>
            {totalScore < 80 && (
              <span className="block text-xs mt-1 text-muted-foreground">
                {t(
                  `El resultado será más genérico por falta de datos. Completa ${100 - totalScore} puntos más para una campaña optimizada.`,
                  `The result will be more generic due to missing data. Complete ${100 - totalScore} more points for an optimized campaign.`

              </span>
            )}
          </AlertDescription>
        </Alert>

        {missingItems.length > 0 && (
          <div className="space-y-3">

              <XCircle size={16} weight="fill" className="text-destructive" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-destructive">
                {t('Qué falta', 'What\'s missing')} ({missingItems.length})

            </div>

              {missingItems.map((item, idx) => (

                  <div className={cn(
                    "min-w-[32px] h-5 rounded-md flex items-center justify-center font-bold text-[10px]",
                    "bg-destructive/20 text-destructive"

                    +{item.value}

                  <span className="text-foreground/80 font-medium leading-5">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}


          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} weight="fill" className="text-success" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-success">
                {t('Completado', 'Completed')} ({completedItems.length})

            </div>

              {completedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <div className={cn(
                    "min-w-[32px] h-5 rounded-md flex items-center justify-center font-bold text-[10px]",
                    "bg-success/20 text-success"

                    {item.value}
                  </div>
                  <span className="text-foreground/70 font-medium leading-5">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}


          <div className="space-y-3 pt-2 border-t border-border">

              <Lightbulb size={16} weight="fill" className="text-accent" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent">
                {t('Cómo mejorarlo', 'How to improve')}
              </h4>
            </div>
            <ul className="space-y-3">
              {missingItems.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-xs space-y-1">
                  <div className="font-bold text-primary">{item.label}</div>
                  <div className="text-muted-foreground leading-relaxed pl-3 border-l-2 border-accent/30">
                    {item.recommendation}

                </li>

            </ul>
            {missingItems.length > 3 && (
              <p className="text-xs text-muted-foreground italic">

                  `+ ${missingItems.length - 3} recomendaciones más...`,
                  `+ ${missingItems.length - 3} more recommendations...`
                )}
              </p>
            )}

        )}

    </Card>

}
