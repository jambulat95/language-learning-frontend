import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import type { DashboardCardSetItem } from "@/types";

interface RecentSetsCardProps {
  sets: DashboardCardSetItem[];
}

export function RecentSetsCard({ sets }: RecentSetsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="size-5 text-purple-500" />
          Недавние наборы
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sets.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              У вас пока нет наборов карточек.
            </p>
            <Button asChild size="sm">
              <Link to="/sets">
                <Plus className="size-4" />
                Создайте свой первый набор
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {sets.map((set) => {
              const progress =
                set.card_count > 0
                  ? (set.learned_cards / set.card_count) * 100
                  : 0;

              return (
                <li key={set.id}>
                  <Link
                    to={`/sets/${set.id}`}
                    className="block space-y-2 rounded-lg border p-3 transition-colors hover:bg-accent/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium leading-tight">
                        {set.title}
                      </span>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {set.difficulty_level}
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {set.learned_cards}/{set.card_count} изучено
                      </span>
                      {set.due_cards > 0 && (
                        <span className="text-orange-500">
                          {set.due_cards} к повторению
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
