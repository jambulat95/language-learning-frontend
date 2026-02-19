import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { LeagueBadge } from "@/components/gamification/league-badge";
import type { League } from "@/types";

interface XpProgressCardProps {
  todayXp: number;
  dailyGoal: number;
  level: number;
  totalXp: number;
  league: League;
}

export function XpProgressCard({
  todayXp,
  dailyGoal,
  level,
  totalXp,
  league,
}: XpProgressCardProps) {
  const progressPercent = Math.min((todayXp / dailyGoal) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-5 text-yellow-500" />
            Прогресс за сегодня
          </CardTitle>
          <div className="flex items-center gap-2">
            <LeagueBadge league={league} />
            <Badge variant="outline">Уровень {level}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold">{todayXp}</span>
          <span className="text-sm text-muted-foreground">/ {dailyGoal} XP (дневная цель)</span>
        </div>
        <Progress value={progressPercent} />
        <p className="text-xs text-muted-foreground">
          Всего XP: {totalXp.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
