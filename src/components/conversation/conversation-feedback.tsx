import { Link } from "react-router-dom";
import {
  Trophy,
  MessageSquare,
  AlertTriangle,
  ThumbsUp,
  Target,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ConversationFeedback as FeedbackType } from "@/types/conversation";

interface ConversationFeedbackProps {
  feedback: FeedbackType;
  onNewConversation: () => void;
}

export function ConversationFeedback({
  feedback,
  onNewConversation,
}: ConversationFeedbackProps) {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <Trophy className="size-12 text-yellow-500" />
        <h2 className="text-2xl font-bold">Разговор завершён!</h2>
        <p className="text-muted-foreground">
          Отличная тренировка. Вот ваши результаты.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Итоги разговора</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1.5">
                <MessageSquare className="size-4 text-muted-foreground" />
                <p className="text-2xl font-bold">{feedback.total_turns}</p>
              </div>
              <p className="text-xs text-muted-foreground">Всего ходов</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5">
                <AlertTriangle className="size-4 text-muted-foreground" />
                <p className="text-2xl font-bold">{feedback.total_errors}</p>
              </div>
              <p className="text-xs text-muted-foreground">Errors found</p>
            </div>
          </div>

          {feedback.xp_earned > 0 && (
            <div className="flex items-center justify-center gap-2 rounded-md bg-yellow-500/10 py-2">
              <Zap className="size-5 text-yellow-500" />
              <span className="text-lg font-semibold">+{feedback.xp_earned} XP</span>
            </div>
          )}
        </CardContent>
      </Card>

      {feedback.common_error_types.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="size-4" />
              Common Error Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {feedback.common_error_types.map((type, i) => (
                <Badge key={i} variant="outline">{type}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {feedback.strengths.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ThumbsUp className="size-4 text-green-500" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {feedback.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {feedback.areas_to_improve.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="size-4 text-orange-500" />
              Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {feedback.areas_to_improve.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {feedback.overall_assessment && (
        <Card>
          <CardContent>
            <p className="text-sm leading-relaxed">{feedback.overall_assessment}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" asChild>
          <Link to="/conversations">All Conversations</Link>
        </Button>
        <Button className="flex-1" onClick={onNewConversation}>
          New Conversation
        </Button>
      </div>
    </div>
  );
}
