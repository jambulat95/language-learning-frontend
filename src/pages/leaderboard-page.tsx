import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardList } from "@/components/gamification/leaderboard-list";
import { LeaderboardSkeleton } from "@/components/gamification/leaderboard-skeleton";
import { useLeaderboard } from "@/hooks/use-gamification";
import { useAuthStore } from "@/stores";

const periods = [
  { value: "weekly", label: "Неделя" },
  { value: "monthly", label: "Месяц" },
  { value: "all_time", label: "Всё время" },
] as const;

export function LeaderboardPage() {
  const [period, setPeriod] = useState("weekly");
  const { data, isLoading, error } = useLeaderboard(period);
  const user = useAuthStore((s) => s.user);

  if (isLoading) return <LeaderboardSkeleton />;

  if (error || !data) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Таблица лидеров</h1>
        <p className="text-destructive">
          Не удалось загрузить таблицу лидеров. Попробуйте позже.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Таблица лидеров</h1>

      <Tabs value={period} onValueChange={setPeriod}>
        <TabsList>
          {periods.map((p) => (
            <TabsTrigger key={p.value} value={p.value}>
              {p.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <LeaderboardList
        entries={data.entries}
        currentUserId={user?.id}
        userRank={data.user_rank}
      />
    </div>
  );
}
