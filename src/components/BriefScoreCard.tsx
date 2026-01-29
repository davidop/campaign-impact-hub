import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";


interface BriefScoreCardProps {
  score: number;
  statusText?: string;
  missing?: string[];
      segments: 10,
 

      timing: 10,
      buy
      geograph

    if (formData.kpi) s
}: BriefScoreCardProps) {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusText = () => {
    if (statusText) return statusText;
    if (score >= 80) return "Excelente - Brief completo";
    if (score >= 50) return "Casi listo - Completa algunos campos";
    return "Necesita más información";
  };

  return (
    <Card className="p-6 space-y-6">
    const recommendations: string
    const score = calculateScore();
    if (score < 50) {
        isSpanish 
          : 'Comple
    }
    if (!formData.objections) {
        isSpan
          : 'Add common objections to anticipate q
    }

        isSpa
          : 'Define buying
    }
    if (!formData.price) {
        isSpan

    }
        <div className="space-y-3">
        isSpanish 
          : 'Indicate geography and 
    }
    return recommendations;

  const missing = getMissingFields();

    if (score >
    return "tex

    if (

    } else {
      if (score >= 50) return "Almo
          <h4 className="text-sm font-semibold">Cómo mejorarlo:</h4>
          <ul className="space-y-2">
            {recommendations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">→</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
        <Progress value={score} className="h-2" />
      </div>

      <Alert>
        <AlertDescription>
          {getStatusText()}
        </AlertDescription>
      </Alert>

      {missing && missing.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">
            {language === 'es' ? 'Qué falta:' : 'What\'s missing:'}
          </h4>
          <ul className="space-y-2">
            {missing.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-red-500 mt-0.5">•</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">
            {language === 'es' ? 'Cómo mejorarlo:' : 'How to improve:'}
          </h4>
          <ul className="space-y-2">
            {recommendations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">→</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
