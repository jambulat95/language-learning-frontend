import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { DashboardCardSetItem } from "@/types";

interface RecentSetsCardProps {
  sets: DashboardCardSetItem[];
}

export function RecentSetsCard({ sets }: RecentSetsCardProps) {
  if (sets.length === 0) {
    return (
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Недавние наборы
        </h2>
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-6 text-center">
          <p className="text-sm text-muted-foreground">
            У вас пока нет наборов карточек.
          </p>
          <Button asChild size="sm">
            <Link to="/sets">
              <Plus className="size-4" />
              Создать набор
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-muted-foreground">
        Недавние наборы
      </h2>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {sets.map((set) => {
          const progress =
            set.card_count > 0
              ? (set.learned_cards / set.card_count) * 100
              : 0;

          return (
            <Link
              key={set.id}
              to={`/sets/${set.id}`}
              className="flex w-40 shrink-0 flex-col gap-2 rounded-xl border bg-card p-3 transition-colors hover:bg-accent/50"
            >
              <span className="truncate text-sm font-medium">{set.title}</span>
              <Progress value={progress} className="h-1" />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>
                  {set.learned_cards}/{set.card_count}
                </span>
                {set.due_cards > 0 && (
                  <span className="text-orange-500">
                    {set.due_cards} к повт.
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
