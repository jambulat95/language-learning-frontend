import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, ListChecks } from "lucide-react";

interface DailyTasksCardProps {
  todayReviews: number;
}

interface DailyTask {
  label: string;
  completed: boolean;
}

export function DailyTasksCard({ todayReviews }: DailyTasksCardProps) {
  const tasks: DailyTask[] = [
    { label: "Повторить 10 карточек", completed: todayReviews >= 10 },
    { label: "Повторить 25 карточек", completed: todayReviews >= 25 },
    { label: "Повторить 50 карточек", completed: todayReviews >= 50 },
  ];

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="size-5 text-blue-500" />
          Ежедневные задания
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {completedCount}/{tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.label} className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-500" />
              ) : (
                <Circle className="size-5 shrink-0 text-muted-foreground/40" />
              )}
              <span
                className={
                  task.completed
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }
              >
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
