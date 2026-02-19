import { Progress } from "@/components/ui/progress";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface StudyProgressBarProps {
  current: number;
  total: number;
  setId: string;
}

export function StudyProgressBar({ current, total, setId }: StudyProgressBarProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon-sm" asChild>
        <Link to={`/sets/${setId}`}>
          <ArrowLeft className="size-4" />
        </Link>
      </Button>
      <div className="flex-1 space-y-1">
        <Progress value={percent} className="h-2" />
      </div>
      <span className="text-sm tabular-nums text-muted-foreground">
        {current}/{total}
      </span>
      <Button variant="ghost" size="icon-sm" asChild>
        <Link to={`/sets/${setId}`}>
          <X className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
