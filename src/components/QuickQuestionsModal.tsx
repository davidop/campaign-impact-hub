import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import { Check, Question, Sparkle } from "@phosphor-icons/react";

import type { QuickQuestion } from "@/lib/briefGapDetector";

type QuickQuestionOption = { label: string; value: string };

interface QuickQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: Record<string, any>) => void;
  questions: QuickQuestion[];
  language?: "es" | "en";
}

export function QuickQuestionsModal({
  isOpen,
  onClose,
  onComplete,
  questions,
  language = "es",
}: QuickQuestionsModalProps) {
  const safeQuestions = useMemo(
    () => (Array.isArray(questions) ? questions : []),
    [questions]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const current = safeQuestions[currentIndex];

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(0);
      setAnswers({});
    }
  }, [isOpen]);

  const progress = safeQuestions.length
    ? ((currentIndex + 1) / safeQuestions.length) * 100
    : 0;

  const currentKey = String((current as any)?.id ?? currentIndex);

  const getAnswer = () => answers[currentKey] ?? "";
  const setAnswer = (value: any) =>
    setAnswers((prev) => ({ ...prev, [currentKey]: value }));

  const toggleOption = (value: string) => {
    const prev = getAnswer();
    const arr: string[] = Array.isArray(prev) ? prev : [];
    if (arr.includes(value)) {
      setAnswer(arr.filter((v) => v !== value));
    } else {
      setAnswer([...arr, value]);
    }
  };

  const canProceed = () => {
    if (!current) return false;
    const type = (current as any)?.type ?? "text";
    const answer = getAnswer();

    if (type === "multiselect") return Array.isArray(answer) && answer.length > 0;
    if (type === "select") return typeof answer === "string" && answer.trim().length > 0;
    if (type === "textarea") return typeof answer === "string" && answer.trim().length > 0;

    return typeof answer === "string" ? answer.trim().length > 0 : Boolean(answer);
  };

  const handleNext = () => {
    if (currentIndex < safeQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onComplete(answers);
      onClose();
    }
  };

  const handleSkip = () => {
    if (currentIndex < safeQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onComplete(answers);
      onClose();
    }
  };

  const renderQuestionInput = () => {
    if (!current) return null;

    const type = (current as any)?.type ?? "text";
    const placeholder = (current as any)?.placeholder ?? "";
    const options: QuickQuestionOption[] = (current as any)?.options ?? [];

    if (type === "multiselect") {
      const selected: string[] = Array.isArray(getAnswer()) ? getAnswer() : [];
      return (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleOption(opt.value)}
                className={[
                  "flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition",
                  isSelected ? "border-primary bg-primary/10" : "hover:border-primary/60",
                ].join(" ")}
              >
                {isSelected ? <Check size={16} /> : <span className="w-4" />}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (type === "select") {
      const answer = String(getAnswer() ?? "");
      return (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const isSelected = answer === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAnswer(opt.value)}
                className={[
                  "rounded-md border px-3 py-2 text-sm transition",
                  isSelected ? "border-primary bg-primary/10" : "hover:border-primary/60",
                ].join(" ")}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      );
    }

    if (type === "textarea") {
      return (
        <Textarea
          rows={4}
          value={String(getAnswer() ?? "")}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={placeholder}
        />
      );
    }

    return (
      <Input
        value={String(getAnswer() ?? "")}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={placeholder}
      />
    );
  };

  if (!isOpen) return null;

  const title = language === "es" ? "Preguntas rápidas" : "Quick questions";
  const subtitle =
    language === "es"
      ? "Responde esto y la campaña saldrá mucho más precisa."
      : "Answer these to generate a much more accurate campaign.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-background shadow-lg border p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkle size={18} />
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          <Button variant="ghost" onClick={onClose}>
            {language === "es" ? "Cerrar" : "Close"}
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Question size={18} />
            <span>
              {(current as any)?.label ??
                (language === "es" ? "Pregunta" : "Question")}{" "}
              {safeQuestions.length ? `${currentIndex + 1}/${safeQuestions.length}` : ""}
            </span>
          </div>
          <Badge variant="secondary">{Math.round(progress)}%</Badge>
        </div>

        <div className="space-y-2">
          {(current as any)?.question && (
            <p className="text-base font-medium">{(current as any).question}</p>
          )}
          {renderQuestionInput()}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <Button variant="outline" onClick={handleSkip}>
            {language === "es" ? "Saltar" : "Skip"}
          </Button>

          <Button onClick={handleNext} disabled={!canProceed()}>
            {currentIndex >= safeQuestions.length - 1
              ? language === "es"
                ? "Completar"
                : "Finish"
              : language === "es"
              ? "Siguiente"
              : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuickQuestionsModal;
