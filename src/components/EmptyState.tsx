import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkle } from '@phosphor-icons/react'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  subtitle: string
  actionLabel?: string
  onAction?: () => void
  variant?: 'default' | 'compact'
}

export function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  variant = 'default'
}: EmptyStateProps) {
  const padding = variant === 'compact' ? 'p-8' : 'p-12'
  const iconSize = variant === 'compact' ? 40 : 56
  const titleSize = variant === 'compact' ? 'text-base' : 'text-lg'
  
  return (
    <Card className={`glass-panel ${padding} border-2 marketing-shine`}>
      <div className="text-center space-y-4 max-w-md mx-auto">
        <div className="flex justify-center opacity-40">
          {icon}
        </div>
        
        <div className="space-y-2">
          <h3 className={`${titleSize} font-bold text-foreground`}>
            {title}
          </h3>
          <p className="text-xs text-muted-foreground font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        {actionLabel && onAction && (
          <Button 
            onClick={onAction} 
            variant="outline"
            className="glass-panel-hover font-bold text-xs"
            size="sm"
          >
            <Sparkle size={14} weight="fill" className="mr-2" />
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  )
}
