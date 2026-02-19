import { Link } from "react-router-dom";
import { MessageSquare, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ConversationSummary } from "@/types/conversation";

interface ConversationHistoryItemProps {
  conversation: ConversationSummary;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ConversationHistoryItem({
  conversation,
}: ConversationHistoryItemProps) {
  return (
    <Link to={`/conversations/${conversation.id}`}>
      <Card className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md">
        <CardContent className="flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-medium">{conversation.scenario_title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3" />
              {formatDate(conversation.started_at)}
              <span>-</span>
              <span>{conversation.total_turns} turns</span>
            </div>
          </div>
          <Badge variant={conversation.is_active ? "default" : "secondary"}>
            {conversation.is_active ? "Active" : "Completed"}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
