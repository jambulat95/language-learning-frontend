import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface StudyEmptyProps {
  setId: string;
}

export function StudyEmpty({ setId }: StudyEmptyProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <CheckCircle2 className="size-12 text-green-500" />
      <h2 className="text-2xl font-bold">Всё повторено!</h2>
      <p className="text-muted-foreground">
        Сейчас нет карточек для повторения. Возвращайтесь позже или добавьте ещё карточек.
      </p>
      <Button asChild>
        <Link to={`/sets/${setId}`}>К набору</Link>
      </Button>
    </div>
  );
}
