import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/componen
import { cn } from '@/lib/utils'

  formData: Partial<CampaignBrie
}

  value: number
  recommendation: string

 

      label: t('Objet
      met: Bool
        'Define
      )
  recommendation: string
}

export function BriefScoreCard({ formData, language }: BriefScoreCardProps) {
  const t = (es: string, en: string) => language === 'es' ? es : en

  const scoreItems: ScoreItem[] = [
     
      )
    {
      value: 10,
      recommendation: t(
        'Define what makes your offer unique. Why choose you over competitors?'
    },
      l
      
     
      )
    {
      value: 10,
      recommendation: t(
        'Select marketing channels and assign a total budget.'
    },
      l
      
     
      )
    {
      value: 10,
      recommendation: t(
        'Specify start/end dates and target geography with relevant languages.'
    }

  cons

    if (totalScore >= 80) return {
      color: 'te
      borderColor: 'border-success',
      variant: 'success'
        'Define qué hace única tu oferta. ¿Por qué elegirte sobre la competencia?',
        'Define what makes your offer unique. Why choose you over competitors?'
      )
    },
    {
      label: t('Prueba social / Evidencia', 'Social proof / Evidence'),
      value: 15,
      met: Boolean(formData.proof && formData.proof.length > 0),
      recommendation: t(
  const status = getScoreStatus()

    <Ca
      
     
          </h3>
            <spa
            </span>
          </div>


       
      
     
                  `El resultado será más genérico por falta de datos. Completa ${
                
            )}
        </Alert>
        {missingItems.length > 0 && (
            <div className="flex items-center gap-2">
       
      
     
                <li key={idx} className="flex items-start gap-2
                
                  )}>
                  </div>
                </li>
            </ul>
       
     
   

              </h4>
            <ul className="space-y-2">
                <li key={idx} className="flex items-start ga

                  )}>
                  </div>
                </li>
            </ul>
        )}
        {missingItems.length > 0 && 
            <div classNa
              <h4 className="text
     
            <ul className="space-y
                <li key={idx} className="text
                    <span c
                      <span cl
                    </div>
                </li
            </ul>
     
    </Card>
}























































































































