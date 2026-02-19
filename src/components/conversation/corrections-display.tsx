import { AlertTriangle, Lightbulb } from "lucide-react";
import type { GrammarCorrection } from "@/types/conversation";

interface CorrectionsDisplayProps {
  corrections: GrammarCorrection[];
  suggestions?: string[] | null;
}

export function CorrectionsDisplay({
  corrections,
  suggestions,
}: CorrectionsDisplayProps) {
  return (
    <div className="space-y-2 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3 text-sm">
      {corrections.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 font-medium text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="size-3.5" />
            <span>Corrections</span>
          </div>
          {corrections.map((c, i) => (
            <div key={i} className="ml-5 space-y-0.5">
              <p>
                <span className="text-red-500 line-through">{c.original}</span>
                {" "}
                <span className="text-green-600 dark:text-green-400 font-medium">{c.corrected}</span>
              </p>
              <p className="text-xs text-muted-foreground">{c.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
            <Lightbulb className="size-3.5" />
            <span>Suggestions</span>
          </div>
          <ul className="ml-5 list-disc space-y-0.5 text-muted-foreground">
            {suggestions.map((s, i) => (
              <li key={i} className="ml-3">{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
