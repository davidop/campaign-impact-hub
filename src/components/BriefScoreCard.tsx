import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import type { CampaignBriefData } from "@/lib/types";

interface BriefScoreCardProps {
  formData: CampaignBriefData;
  language: 'es' | 'en';
}

export function BriefScoreCard({ formData, language }: BriefScoreCardProps) {
  const calculateScore = (): number => {
    let score = 0;
    const weights = {
      objective: 10,
      kpi: 10,
      segments: 10,
      pains: 10,
      product: 10,
      usp: 10,
      channels: 10,
      budget: 10,
      timing: 10,
      objections: 5,
      buyingContext: 5,
      price: 5,
      geography: 5
    };

    if (formData.objective) score += weights.objective;
    if (formData.kpi) score += weights.kpi;
    if (formData.segments) score += weights.segments;
    if (formData.pains) score += weights.pains;
    if (formData.product) score += weights.product;
    if (formData.usp) score += weights.usp;
    if (formData.channels && formData.channels.length > 0) score += weights.channels;
    if (formData.budget) score += weights.budget;
    if (formData.timing) score += weights.timing;
    if (formData.objections) score += weights.objections;
    if (formData.buyingContext) score += weights.buyingContext;
    if (formData.price) score += weights.price;
    if (formData.geography) score += weights.geography;

    return score;
  };

  const getMissingFields = (): string[] => {
    const missing: string[] = [];
    const isSpanish = language === 'es';

    if (!formData.objective) missing.push(isSpanish ? 'Objetivo de campaña' : 'Campaign objective');
    if (!formData.kpi) missing.push(isSpanish ? 'KPI Principal' : 'Main KPI');
    if (!formData.segments) missing.push(isSpanish ? 'Segmentos de audiencia' : 'Audience segments');
    if (!formData.pains) missing.push(isSpanish ? 'Dolores/Necesidades' : 'Pains/Needs');
    if (!formData.product) missing.push(isSpanish ? 'Producto/Servicio' : 'Product/Service');
    if (!formData.usp) missing.push(isSpanish ? 'Propuesta única de valor' : 'Unique value proposition');
    if (!formData.channels || formData.channels.length === 0) missing.push(isSpanish ? 'Canales' : 'Channels');
    if (!formData.budget) missing.push(isSpanish ? 'Presupuesto' : 'Budget');
    if (!formData.timing) missing.push(isSpanish ? 'Timing/Calendario' : 'Timing/Schedule');

    return missing;
  };

  const getRecommendations = (): string[] => {
    const recommendations: string[] = [];
    const isSpanish = language === 'es';
    const score = calculateScore();

    if (score < 50) {
      recommendations.push(
        isSpanish 
          ? 'Completa los campos esenciales marcados con asterisco (*)' 
          : 'Complete essential fields marked with asterisk (*)'
      );
    }

    if (!formData.objections) {
      recommendations.push(
        isSpanish 
          ? 'Añade objeciones comunes para anticipar preguntas' 
          : 'Add common objections to anticipate questions'
      );
    }

    if (!formData.buyingContext) {
      recommendations.push(
        isSpanish 
          ? 'Define el contexto de compra para mejor targeting' 
          : 'Define buying context for better targeting'
      );
    }

    if (!formData.price) {
      recommendations.push(
        isSpanish 
          ? 'Especifica el precio para afinar el mensaje' 
          : 'Specify price to refine messaging'
      );
    }

    if (!formData.geography) {
      recommendations.push(
        isSpanish 
          ? 'Indica geografía y idioma para personalización' 
          : 'Indicate geography and language for personalization'
      );
    }

    return recommendations;
  };

  const score = calculateScore();
  const missing = getMissingFields();
  const recommendations = getRecommendations();

  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusText = () => {
    if (language === 'es') {
      if (score >= 80) return "Excelente - Brief completo";
      if (score >= 50) return "Casi listo - Completa algunos campos";
      return "Necesita más información";
    } else {
      if (score >= 80) return "Excellent - Complete brief";
      if (score >= 50) return "Almost ready - Complete some fields";
      return "Needs more information";
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Brief Score</h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${getScoreColor()}`}>
            {score}
          </span>
          <span className="text-muted-foreground text-sm">/100</span>
        </div>
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
