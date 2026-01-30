import { toast as sonnerToast } from 'sonner'
import { getCopy } from './premiumCopy'

type ToastType = 'success' | 'error' | 'info' | 'warning'

export function toast(type: ToastType, message: string, description?: string) {
  const content = description ? `${message}\n${description}` : message
  
  if (type === 'success') {
    sonnerToast.success(message, { description })
  } else if (type === 'error') {
    sonnerToast.error(message, { description })
  } else if (type === 'warning') {
    sonnerToast.warning(message, { description })
  } else {
    sonnerToast.info(message, { description })
  }
}

export function premiumToast(language: 'es' | 'en' = 'es') {
  const copy = getCopy(language)
  
  return {
    saved: () => toast('success', copy.success.saved),
    copied: () => toast('success', copy.success.copied),
    generated: () => toast('success', copy.success.generated),
    exported: () => toast('success', copy.success.exported),
    
    genericError: () => toast('error', copy.errors.generic),
    networkError: () => toast('error', copy.errors.network),
    generationError: () => toast('error', copy.errors.generation),
    saveError: () => toast('error', copy.errors.save),
    exportError: () => toast('error', copy.errors.export),
    validationError: () => toast('error', copy.errors.validation),
    emptyBriefError: () => toast('error', copy.errors.emptyBrief),
    
    custom: (type: ToastType, message: string, description?: string) => 
      toast(type, message, description)
  }
}
