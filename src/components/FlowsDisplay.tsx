import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Copy, EnvelopeSimple, WhatsappLogo, Sparkle, Clock, Target } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { FlowSequence } from '@/lib/types'

interface FlowsDisplayProps {
  flows: FlowSequence[]
  language: string
}

export default function FlowsDisplay({ flows, language }: FlowsDisplayProps) {
  const isSpanish = language === 'es'

  const handleCopyMessage = (messageBody: string, messageId: string) => {
    navigator.clipboard.writeText(messageBody)
    toast.success(isSpanish ? 'Mensaje copiado' : 'Message copied')
  }

  const handleCopySequence = (sequence: FlowSequence) => {
    const text = sequence.messages.map((msg, idx) => {
      const header = msg.channel === 'email' 
        ? `\n--- ${isSpanish ? 'Email' : 'Email'} ${idx + 1} ---\n${isSpanish ? 'Asunto' : 'Subject'}: ${msg.subject}\n\n`
        : `\n--- WhatsApp ${idx + 1} ---\n${isSpanish ? 'Primera línea' : 'First line'}: ${msg.firstLine}\n\n`
      
      return `${header}${msg.body}\n\n${isSpanish ? 'CTA' : 'CTA'}: ${msg.cta}\n${isSpanish ? 'Objetivo' : 'Objective'}: ${msg.objective}\n${isSpanish ? 'Timing' : 'Timing'}: ${msg.timing}`
    }).join('\n\n')

    navigator.clipboard.writeText(`${sequence.name}\n${sequence.description}\n${text}`)
    toast.success(isSpanish ? 'Secuencia completa copiada' : 'Full sequence copied')
  }

  const getFlowIcon = (type: string) => {
    switch (type) {
      case 'bienvenida':
        return <Sparkle size={20} weight="fill" className="text-primary" />
      case 'nurturing':
        return <EnvelopeSimple size={20} weight="fill" className="text-accent" />
      case 'winback':
        return <WhatsappLogo size={20} weight="fill" className="text-secondary" />
      default:
        return <EnvelopeSimple size={20} weight="fill" />
    }
  }

  const getFlowBadgeColor = (type: string) => {
    switch (type) {
      case 'bienvenida':
        return 'bg-primary/20 text-primary border-primary/30'
      case 'nurturing':
        return 'bg-accent/20 text-accent-foreground border-accent/30'
      case 'winback':
        return 'bg-secondary/20 text-secondary-foreground border-secondary/30'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  if (!flows || flows.length === 0) {
    return (
      <Card className="glass-panel p-8 text-center">
        <p className="text-muted-foreground">
          {isSpanish ? 'No hay flows generados aún' : 'No flows generated yet'}
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue={flows[0]?.id} className="w-full">
        <TabsList className="glass-panel w-full justify-start overflow-x-auto flex-nowrap">
          {flows.map((flow) => (
            <TabsTrigger
              key={flow.id}
              value={flow.id}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {getFlowIcon(flow.type)}
              <span className="font-semibold">{flow.name}</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {flow.totalMessages}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {flows.map((flow) => (
          <TabsContent key={flow.id} value={flow.id} className="mt-4 space-y-4">
            <Card className="glass-panel p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getFlowIcon(flow.type)}
                    <h3 className="text-2xl font-bold">{flow.name}</h3>
                    <Badge className={getFlowBadgeColor(flow.type)}>
                      {flow.type === 'bienvenida' && (isSpanish ? 'Lead Magnet' : 'Lead Magnet')}
                      {flow.type === 'nurturing' && (isSpanish ? 'Nurturing' : 'Nurturing')}
                      {flow.type === 'winback' && (isSpanish ? 'Reactivación' : 'Winback')}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{flow.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopySequence(flow)}
                  className="flex items-center gap-2"
                >
                  <Copy size={16} />
                  {isSpanish ? 'Copiar secuencia' : 'Copy sequence'}
                </Button>
              </div>

              <div className="space-y-4">
                {flow.messages.map((message, idx) => (
                  <Card
                    key={message.id}
                    className="p-5 border-2 hover:border-primary/50 transition-colors bg-card/50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 font-bold text-primary">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {message.channel === 'email' ? (
                              <EnvelopeSimple size={18} weight="fill" className="text-muted-foreground" />
                            ) : (
                              <WhatsappLogo size={18} weight="fill" className="text-green-500" />
                            )}
                            <span className="text-xs font-semibold text-muted-foreground uppercase">
                              {message.channel === 'email' ? 'Email' : 'WhatsApp'}
                            </span>
                          </div>
                          {message.channel === 'email' && message.subject && (
                            <p className="font-bold text-lg">{message.subject}</p>
                          )}
                          {message.channel === 'whatsapp' && message.firstLine && (
                            <p className="font-bold text-lg">{message.firstLine}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyMessage(message.body, message.id)}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>

                    <div className="ml-13 space-y-3">
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                          {message.body}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          size="sm"
                          className="neon-glow font-semibold"
                        >
                          {message.cta}
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm">
                          <Target size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {isSpanish ? 'Objetivo' : 'Objective'}:
                          </span>
                          <span className="font-medium">{message.objective}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {isSpanish ? 'Timing' : 'Timing'}:
                          </span>
                          <span className="font-medium">{message.timing}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
