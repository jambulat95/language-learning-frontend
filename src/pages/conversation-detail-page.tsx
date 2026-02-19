import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatMessage } from "@/components/conversation/chat-message";
import { ConversationFeedback } from "@/components/conversation/conversation-feedback";
import { useConversation } from "@/hooks/use-conversations";

export function ConversationDetailPage() {
  const { id: conversationId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: conversation, isLoading, error } = useConversation(conversationId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-3/4 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !conversation) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/conversations">
            <ArrowLeft className="size-4" />
            Назад к разговорам
          </Link>
        </Button>
        <p className="text-destructive">Не удалось загрузить разговор.</p>
      </div>
    );
  }

  // If conversation is active, redirect to chat
  if (conversation.ended_at === null) {
    navigate(`/conversations/${conversationId}/chat`, { replace: true });
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link to="/conversations">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{conversation.scenario_title}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date(conversation.started_at).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <Badge variant="secondary">{conversation.total_turns} ходов</Badge>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        {conversation.messages.map((msg, i) => (
          <ChatMessage
            key={i}
            role={msg.role}
            content={msg.content}
            corrections={msg.corrections}
            suggestions={msg.suggestions}
          />
        ))}
      </div>

      {conversation.feedback && (
        <ConversationFeedback
          feedback={conversation.feedback}
          onNewConversation={() => navigate("/conversations")}
        />
      )}
    </div>
  );
}
