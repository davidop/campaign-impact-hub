import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ChatCircle, Sparkle, Lightning } from '@phosphor-icons/react'
import { getCopy } from '@/lib/premiumCopy'

interface WarRoomChatProps {
  language: 'es' | 'en'
  onCommand?: (command: string) => void
}

const COMMANDS = [
  { cmd: '/mejora-hooks', key: 'mejoraHooks' as const },
  { cmd: '/más-premium', key: 'masPremium' as const },
  { cmd: '/b2b', key: 'b2b' as const },
  { cmd: '/reduce-riesgo', key: 'reduceRiesgo' as const },
  { cmd: '/regenera-bloque', key: 'regeneraBloque' as const },
  { cmd: '/crea-landing', key: 'creaLanding' as const },
  { cmd: '/paid-pack', key: 'paidPack' as const },
  { cmd: '/flow-email', key: 'flowEmail' as const }
]

export function WarRoomChat({ language, onCommand }: WarRoomChatProps) {
  const [showCommands, setShowCommands] = useState(false)
  const copy = getCopy(language)

  return (
    <Card className="glass-panel h-full flex flex-col overflow-hidden border-2 marketing-shine">
      <div className="p-5 border-b-2 border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <ChatCircle size={28} weight="fill" className="text-secondary float-animate" />
          <h2 className="text-lg font-bold uppercase tracking-tight bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            {copy.warRoom.title}
          </h2>
          <Badge variant="outline" className="ml-auto text-xs">
            <Lightning size={12} weight="fill" className="mr-1" />
            {copy.warRoom.premiumAI}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          {copy.warRoom.subtitle}
        </p>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3 text-xs font-bold"
          onClick={() => setShowCommands(!showCommands)}
        >
          <Sparkle size={14} weight="fill" className="mr-1" />
          {showCommands ? copy.warRoom.hideCommands : copy.warRoom.showCommands}
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
                  <span className="text-muted-foreground">{copy.warRoom.commands[item.key]}</span>
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
