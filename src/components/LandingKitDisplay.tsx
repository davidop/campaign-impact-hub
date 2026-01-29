import React from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Star, ShieldCheck, Users, TrendUp, Certificate } from '@phosphor-icons/react'
import type { LandingKitData } from '@/lib/types'

interface LandingKitDisplayProps {
  data: LandingKitData
  language: 'es' | 'en'
}

export default function LandingKitDisplay({ data, language }: LandingKitDisplayProps) {
  const t = {
    es: {
      wireframe: 'Wireframe',
      copyOptions: 'Opciones de Copy',
      formFields: 'Campos de Formulario',
      formMicrocopy: 'Microcopy de Formulario',
      faqs: 'FAQs',
      trustSignals: 'Señales de Confianza',
      privacy: 'Privacidad',
      submit: 'Botón',
      success: 'Mensaje de Éxito',
      label: 'Label',
      placeholder: 'Placeholder',
      error: 'Error',
      help: 'Ayuda',
      type: 'Tipo',
      recommendation: 'Recomendación',
      option: 'Opción'
    },
    en: {
      wireframe: 'Wireframe',
      copyOptions: 'Copy Options',
      formFields: 'Form Fields',
      formMicrocopy: 'Form Microcopy',
      faqs: 'FAQs',
      trustSignals: 'Trust Signals',
      privacy: 'Privacy',
      submit: 'Submit Button',
      success: 'Success Message',
      label: 'Label',
      placeholder: 'Placeholder',
      error: 'Error',
      help: 'Help Text',
      type: 'Type',
      recommendation: 'Recommendation',
      option: 'Option'
    }
  }

  const text = t[language]

  const getTrustIcon = (type: string) => {
    switch (type) {
      case 'reviews': return <Star size={20} weight="fill" className="text-accent" />
      case 'logos': return <Certificate size={20} weight="fill" className="text-primary" />
      case 'garantias': return <ShieldCheck size={20} weight="fill" className="text-success" />
      case 'cifras': return <TrendUp size={20} weight="fill" className="text-secondary" />
      case 'certificaciones': return <CheckCircle size={20} weight="fill" className="text-primary" />
      case 'casos': return <Users size={20} weight="fill" className="text-accent" />
      default: return <CheckCircle size={20} weight="fill" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="glass-panel w-full grid grid-cols-3 lg:grid-cols-4 gap-2 p-1">
          <TabsTrigger value="sections" className="text-xs lg:text-sm">
            {text.wireframe}
          </TabsTrigger>
          <TabsTrigger value="form" className="text-xs lg:text-sm">
            {text.formMicrocopy}
          </TabsTrigger>
          <TabsTrigger value="faqs" className="text-xs lg:text-sm">
            {text.faqs}
          </TabsTrigger>
          <TabsTrigger value="trust" className="text-xs lg:text-sm">
            {text.trustSignals}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="mt-4 space-y-4">
          {data.sections.map((section, idx) => (
            <Card key={idx} className="glass-panel p-5 space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="font-bold text-sm">
                  {section.sectionName}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">{text.wireframe}</h4>
                  <div className="bg-muted/30 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {section.wireframe}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">{text.copyOptions}</h4>
                  <div className="space-y-3">
                    {section.copyOptions.map((option, optIdx) => (
                      <div key={optIdx} className="bg-card/60 border border-border/50 p-4 rounded-lg space-y-1">
                        <div className="flex items-start gap-2">
                          <Badge variant="outline" className="text-xs shrink-0">
                            {text.option} {optIdx + 1}
                          </Badge>
                          <p className="text-sm leading-relaxed">{option}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="form" className="mt-4">
          <Card className="glass-panel p-5 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">{text.formFields}</h3>
              <div className="space-y-4">
                {data.formMicrocopy.fields.map((field, idx) => (
                  <Card key={idx} className="bg-card/40 border border-border/60 p-4 space-y-3">
                    <div className="font-semibold text-foreground">{field.fieldName}</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground font-medium">{text.label}: </span>
                        <span className="text-foreground">{field.label}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">{text.placeholder}: </span>
                        <span className="text-foreground italic">{field.placeholder}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">{text.error}: </span>
                        <span className="text-destructive">{field.errorState}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">{text.help}: </span>
                        <span className="text-muted-foreground">{field.helpText}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">{text.submit}</h4>
                <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-center font-semibold">
                  {data.formMicrocopy.submitButton}
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <h4 className="text-sm font-semibold text-muted-foreground">{text.success}</h4>
                <div className="bg-success/10 border border-success/30 p-4 rounded-lg text-sm">
                  {data.formMicrocopy.successMessage}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground">{text.privacy}</h4>
              <div className="bg-muted/30 p-4 rounded-lg text-xs leading-relaxed text-muted-foreground">
                {data.formMicrocopy.privacyText}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="mt-4">
          <Card className="glass-panel p-5 space-y-4">
            <h3 className="text-lg font-bold">{text.faqs}</h3>
            <div className="space-y-3">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="bg-card/40 border border-border/60 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-foreground flex items-start gap-2">
                    <span className="text-primary shrink-0">{idx + 1}.</span>
                    {faq.question}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trust" className="mt-4">
          <Card className="glass-panel p-5 space-y-4">
            <h3 className="text-lg font-bold">{text.trustSignals}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.trustSignals.map((signal, idx) => (
                <Card key={idx} className="bg-card/40 border border-border/60 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    {getTrustIcon(signal.type)}
                    <div>
                      <Badge variant="secondary" className="text-xs">
                        {signal.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {signal.description}
                    </p>
                    <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded border-l-2 border-primary/50">
                      <span className="font-semibold">{text.recommendation}: </span>
                      {signal.recommendation}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
