import {
  Flame,
  Trophy,
  Star,
  BookOpen,
  GraduationCap,
  Calendar,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeagueBadge } from "@/components/gamification/league-badge";
import type { FriendGamificationStats, FriendStudyStats } from "@/types";

interface FriendProgressStatsProps {
  gamification: FriendGamificationStats;
  study: FriendStudyStats;
}

export function FriendProgressStats({
  gamification,
  study,
}: FriendProgressStatsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Геймификация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatItem
              icon={<Star className="size-4 text-yellow-500" />}
              label="Всего XP"
              value={gamification.total_xp.toLocaleString()}
            />
            <StatItem
              icon={<Trophy className="size-4 text-purple-500" />}
              label="Уровень"
              value={gamification.level}
            />
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <Trophy className="size-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Лига</p>
                <LeagueBadge league={gamification.league} />
              </div>
            </div>
            <StatItem
              icon={<Flame className="size-4 text-orange-500" />}
              label="Текущая серия"
              value={`${gamification.current_streak}d`}
            />
            <StatItem
              icon={<Flame className="size-4 text-red-500" />}
              label="Лучшая серия"
              value={`${gamification.longest_streak}d`}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Прогресс обучения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatItem
              icon={<BookOpen className="size-4 text-blue-500" />}
              label="Слов изучено"
              value={study.words_learned}
            />
            <StatItem
              icon={<GraduationCap className="size-4 text-green-500" />}
              label="Слов освоено"
              value={study.words_mastered}
            />
            <StatItem
              icon={<Target className="size-4 text-indigo-500" />}
              label="Точность"
              value={`${Math.round(study.accuracy * 100)}%`}
            />
            <StatItem
              icon={<Calendar className="size-4 text-teal-500" />}
              label="Дней учёбы"
              value={study.study_days}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
