import { useAuthStore } from "@/stores";
import { useDashboard } from "@/hooks/use-dashboard";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { DueCardsCta } from "@/components/dashboard/due-cards-cta";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentSetsCard } from "@/components/dashboard/recent-sets-card";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, error } = useDashboard();

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
        todayXp={data.today_xp}
        dailyGoal={data.daily_xp_goal}
        level={data.gamification.level}
        league={data.gamification.league}
      />

      <DueCardsCta
        totalDueCards={data.total_due_cards}
        sets={data.recent_sets}
      />

      <QuickActions />

      <RecentSetsCard sets={data.recent_sets} />
    </div>
  );
}
