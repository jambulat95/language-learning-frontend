import { Skeleton } from "@/components/ui/skeleton";
import { OverviewCards } from "@/components/statistics/overview-cards";
import { ActivityHeatmap } from "@/components/statistics/activity-heatmap";
import { XpProgressChart } from "@/components/statistics/xp-progress-chart";
import { StrengthsSection } from "@/components/statistics/strengths-section";
import { LevelPredictionCard } from "@/components/statistics/level-prediction-card";
import {
  useStatisticsOverview,
  useStatisticsActivity,
  useStatisticsProgress,
  useStatisticsStrengths,
} from "@/hooks/use-statistics";

function StatisticsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-40" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-64 rounded-xl lg:col-span-2" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
      <Skeleton className="h-80 rounded-xl" />
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

export function StatisticsPage() {
  const { data: overview, isLoading: loadingOverview } = useStatisticsOverview();
  const { data: activity, isLoading: loadingActivity } = useStatisticsActivity(90);
  const { data: progress, isLoading: loadingProgress } = useStatisticsProgress(12);
  const { data: strengths, isLoading: loadingStrengths } = useStatisticsStrengths();

  const isLoading = loadingOverview || loadingActivity || loadingProgress || loadingStrengths;

  if (isLoading) return <StatisticsSkeleton />;

  if (!overview) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Статистика</h1>
        <p className="text-destructive">
          Не удалось загрузить статистику. Попробуйте позже.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Статистика</h1>

      <OverviewCards data={overview} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityHeatmap days={activity?.days ?? []} />
        </div>
        <LevelPredictionCard prediction={overview.level_prediction} />
      </div>

      <XpProgressChart weeks={progress?.weeks ?? []} />

      <StrengthsSection sets={strengths?.sets ?? []} />
    </div>
  );
}
