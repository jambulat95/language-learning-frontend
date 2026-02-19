import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { SetStrength } from "@/types";

interface StrengthsSectionProps {
  sets: SetStrength[];
}

function getAccuracyVariant(accuracy: number): "default" | "secondary" | "destructive" | "outline" {
  if (accuracy >= 80) return "default";
  if (accuracy >= 60) return "secondary";
  return "destructive";
}

function getAccuracyLabel(accuracy: number): string {
  if (accuracy >= 90) return "Отлично";
  if (accuracy >= 80) return "Хорошо";
  if (accuracy >= 60) return "Неплохо";
  if (accuracy >= 40) return "Нужна работа";
  return "Слабо";
}

export function StrengthsSection({ sets }: StrengthsSectionProps) {
  if (sets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Сильные и слабые стороны</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-4 text-center">
            Изучите наборы карточек, чтобы увидеть здесь свои результаты.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Сильные и слабые стороны</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sets.map((set) => (
          <div key={set.set_id} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium truncate">{set.set_title}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">
                  {set.accuracy}%
                </span>
                <Badge variant={getAccuracyVariant(set.accuracy)} className="text-[10px] px-1.5 py-0">
                  {getAccuracyLabel(set.accuracy)}
                </Badge>
              </div>
            </div>
            <Progress value={set.accuracy} />
            <div className="flex gap-3 text-[11px] text-muted-foreground">
              <span>{set.cards_studied}/{set.total_cards} изучено</span>
              <span>{set.mastered_cards} освоено</span>
              <span>{set.total_reviews} повторений</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
