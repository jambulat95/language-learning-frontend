import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PlayCircle } from "lucide-react";
import type { DashboardCardSetItem } from "@/types";

interface DueCardsCtaProps {
  totalDueCards: number;
  sets: DashboardCardSetItem[];
}

export function DueCardsCta({ totalDueCards, sets }: DueCardsCtaProps) {
  const setsWithDue = sets.filter((s) => s.due_cards > 0);
  const firstSetWithDue = setsWithDue[0];

  if (totalDueCards === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-green-50 py-8 text-center dark:bg-green-950/30">
        <CheckCircle2 className="size-12 text-green-500" />
        <p className="text-lg font-semibold">Всё повторено!</p>
        <p className="text-sm text-muted-foreground">
          Вы на высоте — возвращайтесь позже
        </p>
      </div>
    );
  }

  const studyLink = firstSetWithDue
    ? `/study?setId=${firstSetWithDue.id}`
    : "/study";

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-primary/5 py-8">
      <span className="text-5xl font-extrabold">{totalDueCards}</span>
      <span className="text-sm text-muted-foreground">
        {cardWord(totalDueCards)} к повторению
      </span>

      <Button asChild size="lg" className="mt-1 gap-2 text-base">
        <Link to={studyLink}>
          <PlayCircle className="size-5" />
          Начать повторение
        </Link>
      </Button>

      {setsWithDue.length > 0 && (
        <p className="mt-1 max-w-xs text-center text-xs text-muted-foreground">
          {setsWithDue.map((s) => s.title).join(", ")}
        </p>
      )}
    </div>
  );
}

function cardWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return "карточек";
  if (mod10 === 1) return "карточка";
  if (mod10 >= 2 && mod10 <= 4) return "карточки";
  return "карточек";
}
