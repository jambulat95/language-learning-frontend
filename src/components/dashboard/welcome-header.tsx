import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Zap } from "lucide-react";
import type { League } from "@/types";

interface WelcomeHeaderProps {
  userName: string;
  streak: number;
  todayXp: number;
  dailyGoal: number;
  level: number;
  league: League;
}

export function WelcomeHeader({
  userName,
  streak,
  todayXp,
  dailyGoal,
  level,
  league,
}: WelcomeHeaderProps) {
  const firstName = userName.split(" ")[0];
  const xpPercent = Math.min((todayXp / dailyGoal) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          С возвращением, {firstName}!
        </h1>
        {streak > 0 && (
          <Badge variant="secondary" className="gap-1 text-sm">
            <Flame className="size-4 text-orange-500" />
            {streak}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Zap className="size-4 text-yellow-500" />
        <span className="tabular-nums">
          {todayXp}/{dailyGoal} XP
        </span>
        <Progress value={xpPercent} className="h-1.5 flex-1" />
        <span className="whitespace-nowrap">
          Ур.{level} · {league}
        </span>
      </div>
    </div>
  );
}
