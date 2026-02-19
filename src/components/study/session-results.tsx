import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RotateCcw, Trophy, XCircle, Zap } from "lucide-react";

interface SessionResultsProps {
  totalReviewed: number;
  correctCount: number;
  incorrectCount: number;
  xpEarned: number;
  setId: string;
  onStudyAgain: () => void;
}

export function SessionResults({
  totalReviewed,
  correctCount,
  incorrectCount,
  xpEarned,
  setId,
  onStudyAgain,
}: SessionResultsProps) {
  const accuracy =
    totalReviewed > 0 ? Math.round((correctCount / totalReviewed) * 100) : 0;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <Trophy className="size-12 text-yellow-500" />
        <h2 className="text-2xl font-bold">Сессия завершена!</h2>
        <p className="text-muted-foreground">
          Вы повторили {totalReviewed} карточек.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Результаты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Точность</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-500">
                {correctCount}
              </p>
              <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <CheckCircle2 className="size-3" />
                Правильно
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-500">
                {incorrectCount}
              </p>
              <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <XCircle className="size-3" />
                Неправильно
              </p>
            </div>
          </div>

          {xpEarned > 0 && (
            <div className="flex items-center justify-center gap-2 rounded-md bg-yellow-500/10 py-2">
              <Zap className="size-5 text-yellow-500" />
              <span className="text-lg font-semibold">+{xpEarned} XP</span>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" asChild>
          <Link to={`/sets/${setId}`}>К набору</Link>
        </Button>
        <Button className="flex-1" onClick={onStudyAgain}>
          <RotateCcw className="size-4" />
          Учить снова
        </Button>
      </div>
    </div>
  );
}
