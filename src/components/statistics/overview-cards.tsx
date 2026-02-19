import { BookOpen, CheckCircle2, Target, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { StatisticsOverview } from "@/types";

interface OverviewCardsProps {
  data: StatisticsOverview;
}

const cards = [
  {
    key: "words_learned" as const,
    label: "Слов изучено",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    key: "words_mastered" as const,
    label: "Слов освоено",
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    key: "accuracy" as const,
    label: "Точность",
    icon: Target,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    suffix: "%",
  },
  {
    key: "study_days" as const,
    label: "Дней учёбы",
    icon: Calendar,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export function OverviewCards({ data }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.key}>
          <CardContent className="flex items-center gap-4">
            <div className={`rounded-lg p-2.5 ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {data[card.key]}
                {card.suffix ?? ""}
              </p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
