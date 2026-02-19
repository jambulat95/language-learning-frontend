import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { WeeklyDialogueStatus } from "@/types/conversation";

interface WeeklyStatusProps {
  status: WeeklyDialogueStatus;
}

export function WeeklyStatus({ status }: WeeklyStatusProps) {
  if (status.is_premium) {
    return (
      <Badge variant="secondary" className="gap-1">
        <MessageSquare className="size-3" />
        Unlimited
      </Badge>
    );
  }

  const remaining = Math.max(0, status.limit - status.used);
  const isLow = remaining <= 1;

  return (
    <Badge
      variant={isLow ? "destructive" : "secondary"}
      className="gap-1"
    >
      <MessageSquare className="size-3" />
      {status.used}/{status.limit} this week
    </Badge>
  );
}
