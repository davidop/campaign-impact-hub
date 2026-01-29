import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/tex
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Palette, Plus, X, Check } from 'lucide-react'
}
import type { Language } from '@/lib/i18n'
  const defaultBrandKit: BrandKit = {

    doList: [],
  language: Language
 

export function BrandKitEditor({ language }: BrandKitEditorProps) {
  const defaultBrandKit: BrandKit = {
  const [brand
    tone: '',
  const [forbid
    dontList: [],

    allowedClaims: [],
      const base = cu
    formality: 'professional',
    examples: []
  }

  const [brandKit, setBrandKit] = useKV<BrandKit>('brand-kit', defaultBrandKit)
  const [doInput, setDoInput] = useState('')
  const [dontInput, setDontInput] = useState('')
  const [forbiddenInput, setForbiddenInput] = useState('')
  const [claimInput, setClaimInput] = useState('')
  const [exampleInput, setExampleInput] = useState('')

    setter('')
    setBrandKit((current) => {
      const base = current || defaultBrandKit
      return {
        ...base,
        [field]: value
       
    })
   

  const addToList = (field: keyof BrandKit, value: string, setter: (v: string) => void) => {
    if (!value.trim()) return
    setBrandKit((current) => {
      const base = current || defaultBrandKit
      const currentList = (base[field] as string[]) || []
      return {
      </div>
        [field]: [...currentList, value.trim()]
       
    })
      <ScrollA
    toast.success(language === 'es' ? 'Agregado' : 'Added')
   

  const removeFromList = (field: keyof BrandKit, index: number) => {
    setBrandKit((current) => {
              placeholder={language === 'es' 
      const currentList = (base[field] as string[]) || []
            />
        ...base,
        [field]: currentList.filter((_, i) => i !== index)
      }
      
  }

  return (
    <Card className="glass-panel p-6 border-2 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10">
          <Palette size={28} className="text-primary" />
              
        <h2 className="text-2xl font-bold tracking-tight">
          {language === 'es' ? 'Brand Kit' : 'Brand Kit'}
        </h2>
            
      <p className="text-sm text-muted-foreground mb-6">
        {language === 'es' 
          ? 'Define las reglas y estilo de tu marca para que todo el copy generado sea consistente.' 
          : 'Define your brand rules and style so all generated copy is consistent.'}
      </p>
      <ScrollArea className="h-[calc(100vh-280px)] pr-4">
        <div className="space-y-6">
            {brandKit?.doList && bran
            <Label className="text-xs uppercase font-bold tracking-wider text-primary">
              {language === 'es' ? 'Voz de Marca' : 'Brand Voice'}
            </Label>
            <Textarea
              value={brandKit?.voice || ''}
              onChange={(e) => handleUpdate('voice', e.target.value)}
              placeholder={language === 'es' ? 'ej., Profesional, cercano, innovador' : 'e.g., Professional, approachable, innovative'}
                    {item} <X size={14} className="ml-1" />
                ))}
            )}


            </Label>
              <Input
                onChange={(e) => setForbiddenInput(
                clas
              />
                <Plus size={18} />
            </div>
              <div className="flex flex-wrap gap-2 mt-2">
                  <Badge key={idx} variant="outline" className="rounded-lg 
                  </Ba
              
          </div>

              {language === 'es' ? 'Claims Permiti
            <div className="flex gap-2"
                value={claimInput}
                placeholder={language === 'es' ? 'ej., #1 en seguridad cloud' :
                onKeyP
              <Button type="button" onClick={() => addToList('allowedClaims', claimInput, setClaimInput)} variant="outline" c
              </Button>
            {brandKit?.allowedCla
                {brandKit.allowe
                    {item} <X size={14} className="ml-1" />
                ))}
            )}

            <Label className="te
            </Label>
              <Tex

                className="glass-panel-
              />
                <Plus size={18} />
            </div>
              <div className="space-y-2 mt-2">
                  <div 
                    <Button
                      variant="ghost"
                  
                    >
                    </Button>
                ))}
            )}
        </div>
    </Card>
































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

              </Button>
            </div>
            {brandKit?.dontList && brandKit.dontList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {brandKit.dontList.map((item, idx) => (
                  <Badge key={idx} variant="destructive" className="rounded-lg cursor-pointer" onClick={() => removeFromList('dontList', idx)}>

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

              </Button>
            </div>
            {brandKit?.forbiddenWords && brandKit.forbiddenWords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {brandKit.forbiddenWords.map((item, idx) => (
                  <Badge key={idx} variant="outline" className="rounded-lg cursor-pointer border-destructive text-destructive" onClick={() => removeFromList('forbiddenWords', idx)}>

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
