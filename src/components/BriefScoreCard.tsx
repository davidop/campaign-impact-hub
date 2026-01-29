import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { Card } from "@/components/ui/card"

  statusText?: string

  score,
  recommendations = [],
  statusText?: string
}

export default function BriefScoreCard({
  score,
  missing = [],
  recommendations = [],
  statusText = "Listo para generar"
}: BriefScoreCardProps) {
  const safeScore = Math.max(0, Math.min(100, Number.isFinite(score) ? score : 0))

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Brief Score</h3>
        <span className="text-sm font-medium">{safeScore}/100</span>
      </div>

      <Progress value={safeScore} />

      {missing.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-semibold">Qué falta</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {missing.map((item, idx) => (
              <li key={idx}>{item}</li>
        <AlertD
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (

          <p className="text-sm font-semibold">Cómo mejorarlo</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {recommendations.map((tip, idx) => (

            ))}

        </div>


      <Alert>
        <AlertDescription className="text-sm">{statusText}</AlertDescription>

    </Card>
  )
}
