import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/texta
import { Badge } from '@/components/ui/badg
import { Palette, Plus, X, Check } from '@phosp
import type { Language } from '@/lib/i18n'
interface BrandKitEditorProps {
}
export function BrandKitEditor({ language }: 
    voice: '',
    doList: [],
    forbiddenWords: [],
    useEmojis: false,


  const [dontInput, 
 

    voice: '',
    doList: [],
    forbiddenW
    useEmojis
    examples: [

    setBrandKit((curren
      return {
        [field]: valu
    })

    if (!value.trim()) return
    setBrandKit((current) => {
      const base = current || defaultBrandKit
      const currentList = (base[field] as string[]) || []
      return {
        ...base,
        [field]: [...currentList, value.trim()]
      }
    })
    setter('')
    toast.success(language === 'es' ? 'Agregado' : 'Added')
  }

  const removeFromList = (field: keyof BrandKit, index: number) => {
    setBrandKit((current) => {
      const base = current || defaultBrandKit
      const currentList = (base[field] as string[]) || []
      return {
        ...base,
        [field]: currentList.filter((_, i) => i !== index)
      }
    })
  }

  return (
    <Card className="glass-panel p-6 border-2 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <Palette size={28} weight="fill" className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          {language === 'es' ? 'Brand Kit' : 'Brand Kit'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {language === 'es' 
          ? 'Define las reglas y estilo de tu marca para que todo el copy generado sea consistente.' 
          : 'Define your brand rules and style so all generated copy is consistent.'}
      </p>
      <ScrollArea className="h-[calc(100vh-280px)] pr-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold tracking-wider text-primary">
              {language === 'es' ? 'Voz de Marca' : 'Brand Voice'}
            </Label>
            <Textarea
              value={brandKit?.voice || ''}
              onChange={(e) => handleUpdate('voice', e.target.value)}
              placeholder={language === 'es' ? 'ej., Profesional, cercano, innovador' : 'e.g., Professional, approachable, innovative'}
              className="glass-panel-hover border-2 rounded-xl resize-none"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold tracking-wider text-primary">
              {language === 'es' ? 'Tono' : 'Tone'}
            </Label>
            <Textarea
              value={brandKit?.tone || ''}
              onChange={(e) => handleUpdate('tone', e.target.value)}
              placeholder={language === 'es' ? 'ej., Confiado pero no arrogante, técnico pero accesible' : 'e.g., Confident but not arrogant, technical but accessible'}
              className="glass-panel-hover border-2 rounded-xl resize-none"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Nivel de Formalidad' : 'Formality Level'}
              </Label>
              <Select value={brandKit?.formality || 'professional'} onValueChange={(v: any) => handleUpdate('formality', v)}>
                <SelectTrigger className="glass-panel-hover border-2 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-panel border-2">
                  <SelectItem value="casual">{language === 'es' ? 'Casual' : 'Casual'}</SelectItem>
                  <SelectItem value="professional">{language === 'es' ? 'Profesional' : 'Professional'}</SelectItem>
                  <SelectItem value="formal">{language === 'es' ? 'Formal' : 'Formal'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Usar Emojis' : 'Use Emojis'}
              </Label>
              <div className="flex items-center h-10 px-4 glass-panel-hover border-2 rounded-xl">
                <Switch
                  checked={brandKit?.useEmojis || false}
                  onCheckedChange={(v) => handleUpdate('useEmojis', v)}
                />
                <span className="ml-3 text-sm font-medium">
                  {brandKit?.useEmojis ? (language === 'es' ? 'Sí' : 'Yes') : (language === 'es' ? 'No' : 'No')}
                </span>
              </div>
            </div>
          </div>

              <Label className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Nivel de Formalidad' : 'Formality Level'}
              </Label>
              <Select value={brandKit?.formality || 'professional'} onValueChange={(v: any) => handleUpdate('formality', v)}>
                <SelectTrigger className="glass-panel-hover border-2 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-panel border-2">
                  <SelectItem value="casual">{language === 'es' ? 'Casual' : 'Casual'}</SelectItem>
                  <SelectItem value="professional">{language === 'es' ? 'Profesional' : 'Professional'}</SelectItem>
                  <SelectItem value="formal">{language === 'es' ? 'Formal' : 'Formal'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold tracking-wider text-primary">
                {language === 'es' ? 'Usar Emojis' : 'Use Emojis'}
              </Label>
              <div className="flex items-center h-10 px-4 glass-panel-hover border-2 rounded-xl">
                <Switch
                  checked={brandKit?.useEmojis || false}
                  onCheckedChange={(v) => handleUpdate('useEmojis', v)}
                />
                <span className="ml-3 text-sm font-medium">
                  {brandKit?.useEmojis ? (language === 'es' ? 'Sí' : 'Yes') : (language === 'es' ? 'No' : 'No')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold tracking-wider text-success flex items-center gap-2">
              <Check size={16} weight="bold" />
              {language === 'es' ? 'Siempre Hacer (Do)' : 'Always Do'}
            </Label>
            <div className="flex gap-2">
              <Input
                value={doInput}
                onChange={(e) => setDoInput(e.target.value)}
                placeholder={language === 'es' ? 'ej., Mencionar ROI' : 'e.g., Mention ROI'}
                className="glass-panel-hover border-2 rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('doList', doInput, setDoInput))}
              />
              <Button type="button" onClick={() => addToList('doList', doInput, setDoInput)} variant="outline" className="rounded-xl">
                <Plus size={18} weight="bold" />
              </Button>
            </div>
            {brandKit?.doList && brandKit.doList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {brandKit.doList.map((item, idx) => (
                  <Badge key={idx} variant="default" className="rounded-lg cursor-pointer bg-success" onClick={() => removeFromList('doList', idx)}>
                    {item} <X size={14} className="ml-1" weight="bold" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold tracking-wider text-destructive flex items-center gap-2">
              <X size={16} weight="bold" />
              {language === 'es' ? 'Nunca Hacer (Don\'t)' : 'Never Do'}
            </Label>
            <div className="flex gap-2">
              <Input
                value={dontInput}
                onChange={(e) => setDontInput(e.target.value)}
                placeholder={language === 'es' ? 'ej., Usar jerga técnica compleja' : 'e.g., Use complex technical jargon'}
                className="glass-panel-hover border-2 rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('dontList', dontInput, setDontInput))}
              />
              <Button type="button" onClick={() => addToList('dontList', dontInput, setDontInput)} variant="outline" className="rounded-xl">
                <Plus size={18} weight="bold" />
              </Button>
            </div>
            {brandKit?.dontList && brandKit.dontList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {brandKit.dontList.map((item, idx) => (
                  <Badge key={idx} variant="destructive" className="rounded-lg cursor-pointer" onClick={() => removeFromList('dontList', idx)}>
                    {item} <X size={14} className="ml-1" weight="bold" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold tracking-wider text-destructive">
              {language === 'es' ? 'Palabras Prohibidas' : 'Forbidden Words'}
            </Label>
            <div className="flex gap-2">
              <Input
                value={forbiddenInput}
                onChange={(e) => setForbiddenInput(e.target.value)}
                placeholder={language === 'es' ? 'ej., barato, gratis' : 'e.g., cheap, free'}
                className="glass-panel-hover border-2 rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('forbiddenWords', forbiddenInput, setForbiddenInput))}
              />
              <Button type="button" onClick={() => addToList('forbiddenWords', forbiddenInput, setForbiddenInput)} variant="outline" className="rounded-xl">
                <Plus size={18} weight="bold" />
              </Button>
            </div>
            {brandKit?.forbiddenWords && brandKit.forbiddenWords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {brandKit.forbiddenWords.map((item, idx) => (
                  <Badge key={idx} variant="outline" className="rounded-lg cursor-pointer border-destructive text-destructive" onClick={() => removeFromList('forbiddenWords', idx)}>
                    {item} <X size={14} className="ml-1" weight="bold" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold tracking-wider text-success">
              {language === 'es' ? 'Claims Permitidos' : 'Allowed Claims'}
            </Label>
            <div className="flex gap-2">
              <Input
                value={claimInput}
                onChange={(e) => setClaimInput(e.target.value)}
                placeholder={language === 'es' ? 'ej., #1 en seguridad cloud' : 'e.g., #1 in cloud security'}
                className="glass-panel-hover border-2 rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('allowedClaims', claimInput, setClaimInput))}
              />
              <Button type="button" onClick={() => addToList('allowedClaims', claimInput, setClaimInput)} variant="outline" className="rounded-xl">
                <Plus size={18} weight="bold" />
              </Button>
            </div>
              </Button>
            </div>
            {brandKit?.examples && brandKit.examples.length > 0 && (
              <div className="space-y-2 mt-2">
                {brandKit.examples.map((item, idx) => (
                  <div key={idx} className="glass-panel p-3 rounded-xl border-2 relative group">
                    <p className="text-sm font-medium pr-8">{item}</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromList('examples', idx)}
                    >
                      <X size={16} weight="bold" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
}
