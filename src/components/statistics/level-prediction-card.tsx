import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { LevelPrediction } from "@/types";

interface LevelPredictionCardProps {
  prediction: LevelPrediction;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("ru", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function LevelPredictionCard({ prediction }: LevelPredictionCardProps) {
  const progressPercent =
    prediction.next_cefr_xp && prediction.next_cefr_xp > 0
      ? Math.min((prediction.current_xp / prediction.next_cefr_xp) * 100, 100)
      : 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4" />
          Прогноз уровня
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Текущий уровень</p>
            <Badge variant="outline" className="mt-1 text-lg px-3 py-0.5">
              {prediction.current_cefr}
            </Badge>
          </div>
          {prediction.next_cefr && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Следующий уровень</p>
              <Badge variant="secondary" className="mt-1 text-lg px-3 py-0.5">
                {prediction.next_cefr}
              </Badge>
            </div>
          )}
        </div>

        {prediction.next_cefr_xp !== null && (
          <div className="space-y-1.5">
            <Progress value={progressPercent} />
            <p className="text-xs text-muted-foreground text-center">
              {prediction.current_xp.toLocaleString()} / {prediction.next_cefr_xp!.toLocaleString()} XP
            </p>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Сред. XP в день</span>
            <span className="font-medium">{Math.round(prediction.avg_daily_xp)}</span>
          </div>
          {prediction.estimated_date && prediction.next_cefr && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ориентировочно {prediction.next_cefr} к</span>
              <span className="font-medium">{formatDate(prediction.estimated_date)}</span>
            </div>
          )}
          {!prediction.next_cefr && (
            <p className="text-center text-muted-foreground text-xs pt-2">
              Вы достигли наивысшего уровня CEFR!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
