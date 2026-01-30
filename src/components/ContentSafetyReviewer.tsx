import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  ShieldCheck, 
  ShieldWarning, 
  Warning, 
  CheckCircle, 
  Copy,
  Sparkle,
  FileText
} from '@phosphor-icons/react'
import { checkContentSafety, generateSafetyRewritePrompt, type SafetyReport, type SafetyIssue } from '@/lib/contentSafetyChecker'
import { toast } from 'sonner'

interface ContentSafetyReviewerProps {
  content: string
  title: string
  sector?: string
  hasProof?: boolean
  brandKit?: any
  onApplyRewrite?: (newContent: string) => void
  language?: 'es' | 'en'
}

export function ContentSafetyReviewer({
  content,
  title,
  sector,
  hasProof = false,
  brandKit,
  onApplyRewrite,
  language = 'es'
}: ContentSafetyReviewerProps) {
  const [report, setReport] = useState<SafetyReport | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isRewriting, setIsRewriting] = useState(false)
  const [rewrittenContent, setRewrittenContent] = useState<string>('')

  const labels = language === 'es' ? {
    analyze: 'Analizar Seguridad',
    analyzing: 'Analizando...',
    score: 'Puntuación de Seguridad',
    issues: 'Problemas',
    high: 'Alta',
    medium: 'Media',
    low: 'Baja',
    severity: 'Severidad',
    original: 'Original',
    issue: 'Problema',
    suggestion: 'Sugerencia Segura',
    copy: 'Copiar',
    rewriteAll: 'Reescribir Todo (IA)',
    rewriting: 'Reescribiendo...',
    allIssues: 'Todos los Problemas',
    highSeverity: 'Alta Severidad',
    mediumSeverity: 'Media Severidad',
    lowSeverity: 'Baja Severidad',
    noIssues: '¡Contenido seguro! No se detectaron problemas legales o claims no verificables.',
    rewritten: 'Versión Reescrita',
    apply: 'Aplicar Reescritura',
    categories: {
      'unverifiable-claim': 'Claim No Verificable',
      'exaggerated-promise': 'Promesa Exagerada',
      'legal-risk': 'Riesgo Legal',
      'missing-proof': 'Falta Evidencia',
      'superlative': 'Superlativo sin Respaldo'
    }
  } : {
    analyze: 'Analyze Safety',
    analyzing: 'Analyzing...',
    score: 'Safety Score',
    issues: 'Issues',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    severity: 'Severity',
    original: 'Original',
    issue: 'Issue',
    suggestion: 'Safe Suggestion',
    copy: 'Copy',
    rewriteAll: 'Rewrite All (AI)',
    rewriting: 'Rewriting...',
    allIssues: 'All Issues',
    highSeverity: 'High Severity',
    mediumSeverity: 'Medium Severity',
    lowSeverity: 'Low Severity',
    noIssues: 'Safe content! No legal issues or unverifiable claims detected.',
    rewritten: 'Rewritten Version',
    apply: 'Apply Rewrite',
    categories: {
      'unverifiable-claim': 'Unverifiable Claim',
      'exaggerated-promise': 'Exaggerated Promise',
      'legal-risk': 'Legal Risk',
      'missing-proof': 'Missing Proof',
      'superlative': 'Unsupported Superlative'
    }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      const safetyReport = checkContentSafety(content, sector, hasProof)
      setReport(safetyReport)
      setIsAnalyzing(false)

      if (safetyReport.score < 70) {
        toast.warning(
          language === 'es' 
            ? `${safetyReport.highSeverity} problemas críticos detectados`
            : `${safetyReport.highSeverity} critical issues detected`
        )
      } else {
        toast.success(
          language === 'es'
            ? 'Análisis completado'
            : 'Analysis completed'
        )
      }
    }, 800)
  }

  const handleRewriteAll = async () => {
    if (!report || report.issues.length === 0) return

    setIsRewriting(true)
    try {
      const prompt = generateSafetyRewritePrompt(content, report.issues, brandKit)
      
      const llmPrompt = (window as any).spark.llmPrompt`${prompt}`
      const result = await (window as any).spark.llm(llmPrompt)
      
      setRewrittenContent(result)
      toast.success(
        language === 'es'
          ? 'Contenido reescrito con versión segura'
          : 'Content rewritten with safe version'
      )
    } catch (error) {
      console.error('Rewrite error:', error)
      toast.error(
        language === 'es'
          ? 'Error al reescribir contenido'
          : 'Error rewriting content'
      )
    } finally {
      setIsRewriting(false)
    }
  }

  const handleCopySuggestion = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success(language === 'es' ? 'Copiado' : 'Copied')
  }

  const handleApplyRewrite = () => {
    if (onApplyRewrite && rewrittenContent) {
      onApplyRewrite(rewrittenContent)
      toast.success(
        language === 'es'
          ? 'Reescritura aplicada'
          : 'Rewrite applied'
      )
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground'
      case 'medium': return 'bg-accent text-accent-foreground'
      case 'low': return 'bg-muted text-muted-foreground'
      default: return 'bg-secondary text-secondary-foreground'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success'
    if (score >= 70) return 'text-primary'
    if (score >= 50) return 'text-accent'
    return 'text-destructive'
  }

  const filterIssuesBySeverity = (severity: string) => {
    return report?.issues.filter(i => i.severity === severity) || []
  }

  return (
    <Card className="glass-panel p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={24} weight="fill" className="text-primary" />
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {language === 'es' 
                ? 'Revisión de seguridad legal y verificabilidad'
                : 'Legal safety and verifiability review'}
            </p>
          </div>
        </div>

        <Button 
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="gap-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
              {labels.analyzing}
            </>
          ) : (
            <>
              <ShieldWarning size={18} weight="fill" />
              {labels.analyze}
            </>
          )}
        </Button>
      </div>

      {report && (
        <div className="space-y-6 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{labels.score}</span>
                <span className={`text-2xl font-bold ${getScoreColor(report.score)}`}>
                  {report.score}
                </span>
              </div>
              <Progress value={report.score} className="h-2" />
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2">
                <Warning size={16} weight="fill" className="text-destructive" />
                <span className="text-xs font-medium text-muted-foreground">{labels.high}</span>
              </div>
              <div className="text-2xl font-bold text-destructive">{report.highSeverity}</div>
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2">
                <Warning size={16} className="text-accent" />
                <span className="text-xs font-medium text-muted-foreground">{labels.medium}</span>
              </div>
              <div className="text-2xl font-bold text-accent">{report.mediumSeverity}</div>
            </div>

            <div className="glass-panel p-4 space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">{labels.low}</span>
              </div>
              <div className="text-2xl font-bold text-muted-foreground">{report.lowSeverity}</div>
            </div>
          </div>

          <Alert>
            <AlertDescription>{report.summary}</AlertDescription>
          </Alert>

          {report.issues.length > 0 && (
            <>
              <div className="flex gap-2">
                <Button 
                  onClick={handleRewriteAll}
                  disabled={isRewriting}
                  className="gap-2"
                  variant="default"
                >
                  {isRewriting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                      {labels.rewriting}
                    </>
                  ) : (
                    <>
                      <Sparkle size={18} weight="fill" />
                      {labels.rewriteAll}
                    </>
                  )}
                </Button>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">
                    {labels.allIssues} ({report.totalIssues})
                  </TabsTrigger>
                  <TabsTrigger value="high">
                    {labels.highSeverity} ({report.highSeverity})
                  </TabsTrigger>
                  <TabsTrigger value="medium">
                    {labels.mediumSeverity} ({report.mediumSeverity})
                  </TabsTrigger>
                  <TabsTrigger value="low">
                    {labels.lowSeverity} ({report.lowSeverity})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-3 mt-4">
                  {report.issues.map((issue, idx) => (
                    <IssueCard 
                      key={idx} 
                      issue={issue} 
                      labels={labels}
                      getSeverityColor={getSeverityColor}
                      onCopy={handleCopySuggestion}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="high" className="space-y-3 mt-4">
                  {filterIssuesBySeverity('high').length === 0 ? (
                    <Alert>
                      <CheckCircle size={16} weight="fill" className="text-success" />
                      <AlertDescription>
                        {language === 'es' 
                          ? 'No hay problemas de alta severidad'
                          : 'No high severity issues'}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    filterIssuesBySeverity('high').map((issue, idx) => (
                      <IssueCard 
                        key={idx} 
                        issue={issue} 
                        labels={labels}
                        getSeverityColor={getSeverityColor}
                        onCopy={handleCopySuggestion}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="medium" className="space-y-3 mt-4">
                  {filterIssuesBySeverity('medium').length === 0 ? (
                    <Alert>
                      <CheckCircle size={16} weight="fill" className="text-success" />
                      <AlertDescription>
                        {language === 'es' 
                          ? 'No hay problemas de media severidad'
                          : 'No medium severity issues'}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    filterIssuesBySeverity('medium').map((issue, idx) => (
                      <IssueCard 
                        key={idx} 
                        issue={issue} 
                        labels={labels}
                        getSeverityColor={getSeverityColor}
                        onCopy={handleCopySuggestion}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="low" className="space-y-3 mt-4">
                  {filterIssuesBySeverity('low').length === 0 ? (
                    <Alert>
                      <CheckCircle size={16} weight="fill" className="text-success" />
                      <AlertDescription>
                        {language === 'es' 
                          ? 'No hay problemas de baja severidad'
                          : 'No low severity issues'}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    filterIssuesBySeverity('low').map((issue, idx) => (
                      <IssueCard 
                        key={idx} 
                        issue={issue} 
                        labels={labels}
                        getSeverityColor={getSeverityColor}
                        onCopy={handleCopySuggestion}
                      />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}

          {report.issues.length === 0 && (
            <Alert className="border-success/50 bg-success/10">
              <CheckCircle size={20} weight="fill" className="text-success" />
              <AlertDescription className="text-success font-medium">
                {labels.noIssues}
              </AlertDescription>
            </Alert>
          )}

          {rewrittenContent && (
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText size={20} weight="fill" />
                  {labels.rewritten}
                </h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopySuggestion(rewrittenContent)}
                  >
                    <Copy size={16} />
                  </Button>
                  {onApplyRewrite && (
                    <Button
                      size="sm"
                      onClick={handleApplyRewrite}
                    >
                      {labels.apply}
                    </Button>
                  )}
                </div>
              </div>
              <div className="glass-panel p-4 text-sm whitespace-pre-wrap">
                {rewrittenContent}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

interface IssueCardProps {
  issue: SafetyIssue
  labels: any
  getSeverityColor: (severity: string) => string
  onCopy: (text: string) => void
}

function IssueCard({ issue, labels, getSeverityColor, onCopy }: IssueCardProps) {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Badge className={getSeverityColor(issue.severity)}>
              {labels[issue.severity]}
            </Badge>
            <Badge variant="outline">
              {labels.categories[issue.type]}
            </Badge>
            {issue.category && (
              <Badge variant="secondary">{issue.category}</Badge>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{labels.original}:</p>
            <p className="text-sm italic text-muted-foreground bg-muted/50 p-2 rounded">
              {issue.original}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{labels.issue}:</p>
            <p className="text-sm text-destructive">
              {issue.issue}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{labels.suggestion}:</p>
            <div className="flex items-start gap-2">
              <p className="text-sm flex-1 bg-success/10 text-success p-2 rounded border border-success/30">
                {issue.suggestion}
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onCopy(issue.suggestion)}
              >
                <Copy size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
