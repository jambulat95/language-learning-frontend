import { Crown } from "lucide-react";
import { useAuthStore } from "@/stores";
import { useDashboard } from "@/hooks/use-dashboard";
import { useUsageLimits } from "@/hooks/use-limits";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { XpProgressCard } from "@/components/dashboard/xp-progress-card";
import { DailyTasksCard } from "@/components/dashboard/daily-tasks-card";
import { RecentSetsCard } from "@/components/dashboard/recent-sets-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, error } = useDashboard();
  const { data: limits } = useUsageLimits();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Главная</h1>
        <p className="text-destructive">
          Не удалось загрузить главную страницу. Попробуйте позже.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WelcomeHeader
        userName={user?.full_name ?? "User"}
        streak={data.gamification.current_streak}
      />

      <QuickActions />

      <XpProgressCard
        todayXp={data.today_xp}
        dailyGoal={data.daily_xp_goal}
        level={data.gamification.level}
        totalXp={data.gamification.total_xp}
        league={data.gamification.league}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <DailyTasksCard todayReviews={data.today_reviews} />
        <RecentSetsCard sets={data.recent_sets} />
      </div>

      {limits && !limits.is_premium && (
        <div className="flex items-center gap-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <Crown className="size-6 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="flex-1 text-sm text-amber-700 dark:text-amber-400">
            Перейдите на Premium для неограниченного количества карточек, AI-диалогов и многого другого
          </div>
        </div>
      )}
    </div>
  );
}
