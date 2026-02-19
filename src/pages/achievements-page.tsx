import { Badge } from "@/components/ui/badge";
import { AchievementCard } from "@/components/gamification/achievement-card";
import { AchievementsSkeleton } from "@/components/gamification/achievements-skeleton";
import { useAchievements } from "@/hooks/use-gamification";

export function AchievementsPage() {
  const { data: achievements, isLoading, error } = useAchievements();

  if (isLoading) return <AchievementsSkeleton />;

  if (error || !achievements) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Достижения</h1>
        <p className="text-destructive">
          Не удалось загрузить достижения. Попробуйте позже.
        </p>
      </div>
    );
  }

  const unlockedCount = achievements.filter((a) => a.unlocked_at !== null).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Достижения</h1>
        <Badge variant="outline">
          {unlockedCount} / {achievements.length}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
