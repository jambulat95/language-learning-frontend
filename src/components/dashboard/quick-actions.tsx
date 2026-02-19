import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Sparkles } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex gap-3">
      <Button asChild className="flex-1">
        <Link to="/sets">
          <BookOpen className="size-4" />
          Учить карточки
        </Link>
      </Button>
      <Button asChild variant="outline" className="flex-1">
        <Link to="/generate">
          <Sparkles className="size-4" />
          AI-генерация
        </Link>
      </Button>
      <Button asChild variant="outline" className="flex-1">
        <Link to="/conversations">
          <MessageSquare className="size-4" />
          AI-чат
        </Link>
      </Button>
    </div>
  );
}
