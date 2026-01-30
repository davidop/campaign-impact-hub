import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, Warning, CaretDown, CaretUp, Sparkle } from "@phosphor-icons/react";
import { formatBreakdownForDisplay, type BriefAnalysisResult } from "@/lib/briefAnalyzer";
import { getCopy } from "@/lib/premiumCopy";

interface BriefScoreCardProps {
  analysis: BriefAnalysisResult;
  onShowQuestions?: () => void;
  language?: 'es' | 'en';
}

export function BriefScoreCard({
  analysis,
  onShowQuestions,
  language = 'es',
}: BriefScoreCardProps) {
  const [showBreakdown, setShowBreakdown] = React.useState(false);
  const [showRisks, setShowRisks] = React.useState(false);
  const copy = getCopy(language);

  const safeScore = Math.max(0, Math.min(100, Number.isFinite(analysis.score) ? analysis.score : 0));
  const breakdownItems = formatBreakdownForDisplay(analysis.breakdown);
  
  const getScoreColor = () => {
    if (safeScore >= 80) return 'text-success';
    if (safeScore >= 60) return 'text-accent';
    return 'text-destructive';
  };

  const getStatusIcon = () => {
    if (analysis.status === 'ready') {
      return <CheckCircle size={20} weight="fill" className="text-success" />;
    }
    return <Warning size={20} weight="fill" className="text-destructive" />;
  };

  return (
    <Card className="p-5 space-y-4 glass-panel border-2 marketing-shine">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
          <Sparkle size={16} weight="fill" />
          {copy.briefScore.title}
        </h3>
        <Badge variant="outline" className={`text-xl font-bold px-3 py-1 ${getScoreColor()}`}>
          {safeScore}<span className="text-xs opacity-70">/{copy.briefScore.outOf}</span>
        </Badge>
      </div>

      <Progress value={safeScore} className="h-3" />

      <Alert className={analysis.status === 'ready' ? 'border-success bg-success/10' : 'border-destructive bg-destructive/10'}>
        <div className="flex items-start gap-2">
          {getStatusIcon()}
          <AlertDescription className="text-xs font-medium flex-1">
            {analysis.statusText}
          </AlertDescription>
        </div>
      </Alert>

      {analysis.criticalQuestions.length > 0 && (
        <div className="space-y-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-1">
              <Warning size={14} weight="fill" />
              {language === 'es' 
                ? `${analysis.criticalQuestions.length} Preguntas Críticas` 
                : `${analysis.criticalQuestions.length} Critical Questions`}
            </p>
            <Badge variant="destructive" className="text-xs">
              {analysis.criticalQuestions.filter(q => q.priority === 'critical').length} {language === 'es' ? 'críticas' : 'critical'}
            </Badge>
          </div>
          {onShowQuestions && (
            <Button 
              onClick={onShowQuestions} 
              variant="outline" 
              className="w-full text-xs font-bold glass-panel-hover"
              size="sm"
            >
              <Sparkle size={14} weight="fill" className="mr-2" />
              {language === 'es' ? 'Completar Datos Críticos' : 'Complete Critical Data'}
            </Button>
          )}
        </div>
      )}

      <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full justify-between text-xs font-medium">
            <span>
              {language === 'es' ? 'Ver Desglose Detallado' : 'View Detailed Breakdown'}
            </span>
            {showBreakdown ? <CaretUp size={14} /> : <CaretDown size={14} />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {breakdownItems.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">{item.label}</span>
                <span className="font-bold text-foreground">
                  {item.score}/{item.max}
                </span>
              </div>
              <Progress value={item.percentage} className="h-1.5" />
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {analysis.missing.length > 0 && (
        <div className="space-y-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
          <p className="text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-1">
            <Warning size={14} weight="fill" />
            {copy.briefScore.whatsMissing}
          </p>
          <ul className="list-disc pl-5 text-xs space-y-1 text-foreground/80">
            {analysis.missing.slice(0, 5).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          {analysis.missing.length > 5 && (
            <p className="text-xs text-muted-foreground italic">
              {language === 'es' 
                ? `...y ${analysis.missing.length - 5} datos más` 
                : `...and ${analysis.missing.length - 5} more items`}
            </p>
          )}
        </div>
      )}

      {analysis.recommendations.length > 0 && (
        <div className="space-y-2 p-3 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
            <Sparkle size={14} weight="fill" />
            {copy.briefScore.howToImprove}
          </p>
          <ul className="list-disc pl-5 text-xs space-y-1 text-foreground/80">
            {analysis.recommendations.slice(0, 3).map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
          {analysis.recommendations.length > 3 && (
            <p className="text-xs text-muted-foreground italic">
              {language === 'es' 
                ? `...más ${analysis.recommendations.length - 3} recomendaciones` 
                : `...${analysis.recommendations.length - 3} more recommendations`}
            </p>
          )}
        </div>
      )}

      {analysis.risks.length > 0 && (
        <Collapsible open={showRisks} onOpenChange={setShowRisks}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between text-destructive text-xs font-medium">
              <span className="flex items-center gap-1">
                <Warning size={14} weight="fill" />
                {language === 'es' 
                  ? `${analysis.risks.length} Riesgos Detectados` 
                  : `${analysis.risks.length} Risks Detected`}
              </span>
              {showRisks ? <CaretUp size={14} /> : <CaretDown size={14} />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
            <ul className="list-disc pl-5 text-xs space-y-1 text-foreground/80">
              {analysis.risks.map((risk, idx) => (
                <li key={idx}>{risk}</li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </Card>
  );
}

export default BriefScoreCard;
