import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { 
  Copy, 
  ArrowsClockwise, 
  PencilSimple, 
  FloppyDisk,
  Check,
  X
} from '@phosphor-icons/react'

interface OutputCardProps {
  title: string
  icon: React.ReactNode
  content: string
  isLoading: boolean
  emptyMessage: string
  language: 'es' | 'en'
  onRegenerate?: () => void
  onSaveVersion?: (content: string) => void
  blockName?: string
}

export function OutputCard({
  title,
  icon,
  content,
  isLoading,
  emptyMessage,
  language,
  onRegenerate,
  onSaveVersion,
  blockName
}: OutputCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    toast.success(language === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard')
  }

  const handleSaveEdit = () => {
    if (onSaveVersion) {
      onSaveVersion(editedContent)
      toast.success(language === 'es' ? 'Cambios guardados' : 'Changes saved')
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedContent(content)
    setIsEditing(false)
  }

  const handleSaveAsVersion = () => {
    if (onSaveVersion) {
      onSaveVersion(content)
      toast.success(
        language === 'es' 
          ? 'Versión guardada correctamente' 
          : 'Version saved successfully'
      )
    }
  }

  if (isLoading) {
    return (
      <Card className="glass-panel p-6 border-2">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>
    )
  }

  if (!content) {
    return (
      <Card className="glass-panel p-6 border-2 border-dashed">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm italic">{emptyMessage}</p>
      </Card>
    )
  }

  return (
    <Card className="glass-panel p-6 border-2 hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            {blockName && (
              <Badge variant="outline" className="text-xs mt-1">
                {blockName}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancelEdit}
                className="h-8 px-3"
              >
                <X size={16} className="mr-1" />
                {language === 'es' ? 'Cancelar' : 'Cancel'}
              </Button>
              <Button
                size="sm"
                onClick={handleSaveEdit}
                className="h-8 px-3"
              >
                <Check size={16} className="mr-1" />
                {language === 'es' ? 'Guardar' : 'Save'}
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="h-8 px-3"
              >
                <Copy size={16} className="mr-1" />
                {language === 'es' ? 'Copiar' : 'Copy'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 px-3"
              >
                <PencilSimple size={16} className="mr-1" />
                {language === 'es' ? 'Editar' : 'Edit'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onRegenerate}
                className="h-8 px-3"
              >
                <ArrowsClockwise size={16} className="mr-1" />
                {language === 'es' ? 'Regenerar' : 'Regenerate'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSaveAsVersion}
                className="h-8 px-3"
              >
                <FloppyDisk size={16} className="mr-1" />
                {language === 'es' ? 'Guardar versión' : 'Save version'}
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />
      ) : (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </Card>
  )
}
