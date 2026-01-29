import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ChatCircle, Sparkle, Lightning } from '@phosphor-icons/react'

interface WarRoomChatProps {
  language: 'es' | 'en'
  onCommand?: (command: string) => void
}

const COMMANDS = [
  { cmd: '/mejora-hooks', label: { es: 'Mejorar Hooks', en: 'Improve Hooks' } },
  { cmd: '/más-premium', label: { es: 'Más Premium', en: 'More Premium' } },
  { cmd: '/b2b', label: { es: 'Enfoque B2B', en: 'B2B Focus' } },
  { cmd: '/reduce-riesgo', label: { es: 'Reducir Riesgo', en: 'Reduce Risk' } },
  { cmd: '/regenera-bloque', label: { es: 'Regenerar Bloque', en: 'Regenerate Block' } },
  { cmd: '/crea-landing', label: { es: 'Crear Landing', en: 'Create Landing' } },
  { cmd: '/paid-pack', label: { es: 'Pack Paid Media', en: 'Paid Pack' } },
  { cmd: '/flow-email', label: { es: 'Flow Email', en: 'Email Flow' } }
]

export function WarRoomChat({ language, onCommand }: WarRoomChatProps) {
  const [showCommands, setShowCommands] = useState(false)

  return (
    <Card className="glass-panel h-full flex flex-col overflow-hidden border-2 marketing-shine">
      <div className="p-5 border-b-2 border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <ChatCircle size={28} weight="fill" className="text-secondary float-animate" />
          <h2 className="text-lg font-bold uppercase tracking-tight bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            {language === 'es' ? 'War Room' : 'War Room'}
          </h2>
          <Badge variant="outline" className="ml-auto text-xs">
            <Lightning size={12} weight="fill" className="mr-1" />
            {language === 'es' ? 'IA Premium' : 'Premium AI'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          {language === 'es' ? 'Comandos rápidos para optimizar tu campaña' : 'Quick commands to optimize your campaign'}
        </p>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3 text-xs font-bold"
          onClick={() => setShowCommands(!showCommands)}
        >
          <Sparkle size={14} weight="fill" className="mr-1" />
          {showCommands 
            ? (language === 'es' ? 'Ocultar Comandos' : 'Hide Commands')
            : (language === 'es' ? 'Ver Comandos' : 'Show Commands')}
        </Button>
      </div>
      
      {showCommands && (
        <div className="p-4 border-b-2 border-border/50 bg-muted/20">
          <ScrollArea className="h-[200px]">
            <div className="grid grid-cols-1 gap-2 pr-4">
              {COMMANDS.map((item) => (
                <Button
                  key={item.cmd}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs font-mono glass-panel-hover rounded-lg"
                  onClick={() => onCommand?.(item.cmd)}
                >
                  <span className="text-primary font-bold mr-2">{item.cmd}</span>
                  <span className="text-muted-foreground">{item.label[language]}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      
      <div className="flex-1 relative">
        <iframe 
          src="https://copilotstudio.microsoft.com/environments/Default-eb4fd47b-46a3-452c-9d3e-caab10ab3805/bots/copilots_header_49046/webchat?__version__=2"
          className="w-full h-full border-0 rounded-b-xl"
          title="Microsoft Copilot Chat"
        />
      </div>
    </Card>
  )
}
