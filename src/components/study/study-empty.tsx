import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RotateCcw } from "lucide-react";

interface StudyEmptyProps {
  setId: string;
  isPractice?: boolean;
}

export function StudyEmpty({ setId, isPractice }: StudyEmptyProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <CheckCircle2 className="size-12 text-green-500" />
      <h2 className="text-2xl font-bold">Всё повторено!</h2>
      <p className="text-muted-foreground">
        Сейчас нет карточек для повторения. Возвращайтесь позже или добавьте ещё карточек.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link to={`/sets/${setId}`}>К набору</Link>
        </Button>
        {!isPractice && (
          <Button variant="outline" asChild>
            <Link to={`/study/${setId}?practice=true`}>
              <RotateCcw className="size-4" />
              Повторить все
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
