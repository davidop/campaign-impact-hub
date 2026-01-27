import { Card } from '@/components/ui/card'
import { ChatCircle } from '@phosphor-icons/react'
import { useTranslation, type Language } from '@/lib/i18n'

interface LiveChatProps {
  language: Language
}

export function LiveChat({ language }: LiveChatProps) {
  const t = useTranslation(language);

  return (
    <Card className="glass-panel h-full flex flex-col overflow-hidden border-2 marketing-shine">
      <div className="p-5 border-b-2 border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <ChatCircle size={28} weight="fill" className="text-secondary float-animate" />
          <h2 className="text-lg font-bold uppercase tracking-tight bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            {t.chat.title}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground font-medium">{t.chat.subtitle}</p>
      </div>
      
      <div className="flex-1 relative">
        <iframe 
          src="https://copilotstudio.microsoft.com/environments/Default-eb4fd47b-46a3-452c-9d3e-caab10ab3805/bots/copilots_header_49046/webchat?__version__=2"
          className="w-full h-full border-0 rounded-b-xl"
          title="Microsoft Copilot Chat"
        />
      </div>
    </Card>
  );
}