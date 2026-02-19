import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/types";

interface AchievementCardProps {
  achievement: Achievement;
}

const conditionLabels: Record<string, string> = {
  cards_learned: "Карточек изучено",
  streak_days: "Дней подряд",
  conversations: "Разговоров",
  xp_earned: "XP заработано",
  sets_created: "Наборов создано",
  perfect_reviews: "Идеальных повторений",
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = achievement.unlocked_at !== null;

  return (
    <Card className={cn(!isUnlocked && "opacity-60")}>
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
          {isUnlocked ? (
            <CheckCircle2 className="size-5 text-green-500" />
          ) : (
            <Lock className="size-5 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-medium">{achievement.title}</h3>
            <Badge variant="secondary" className="shrink-0">
              +{achievement.xp_reward} XP
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {achievement.description}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {conditionLabels[achievement.condition_type] ?? achievement.condition_type}:{" "}
            {achievement.condition_value}
          </p>
          {isUnlocked && achievement.unlocked_at && (
            <p className="mt-1 text-xs text-green-600">
              Получено {new Date(achievement.unlocked_at).toLocaleDateString("ru")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
