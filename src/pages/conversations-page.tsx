import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MessageSquare, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScenarioCard } from "@/components/conversation/scenario-card";
import { WeeklyStatus } from "@/components/conversation/weekly-status";
import { ConversationHistoryItem } from "@/components/conversation/conversation-history-item";
import {
  useScenarios,
  useWeeklyStatus,
  useStartConversation,
  useConversations,
} from "@/hooks/use-conversations";
import { getApiErrorMessage } from "@/lib/errors";
import type { ScenarioType } from "@/types/conversation";

export function ConversationsPage() {
  const navigate = useNavigate();
  const { data: scenarios, isLoading: scenariosLoading } = useScenarios();
  const { data: weeklyStatus, isLoading: statusLoading } = useWeeklyStatus();
  const { data: history, isLoading: historyLoading } = useConversations(0, 5);
  const startMutation = useStartConversation();

  function handleStart(scenario: ScenarioType) {
    startMutation.mutate(scenario, {
      onSuccess: (result) => {
        navigate(`/conversations/${result.conversation_id}/chat`);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err));
      },
    });
  }

  const isAtLimit =
    weeklyStatus &&
    !weeklyStatus.is_premium &&
    weeklyStatus.used >= weeklyStatus.limit;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI-разговоры</h1>
          <p className="text-muted-foreground">
            Практикуйте английский в реалистичных сценариях
          </p>
        </div>
        {statusLoading ? (
          <Skeleton className="h-6 w-28" />
        ) : (
          weeklyStatus && <WeeklyStatus status={weeklyStatus} />
        )}
      </div>

      {isAtLimit && (
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 text-sm text-yellow-700 dark:text-yellow-400">
          Вы достигли недельного лимита разговоров. Перейдите на Premium для
          неограниченного количества разговоров.
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold">Выберите сценарий</h2>
        {scenariosLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenarios?.map((s) => (
              <ScenarioCard
                key={s.type}
                type={s.type}
                title={s.title}
                description={s.description}
                suggestedTurns={s.suggested_turns}
                disabled={!!isAtLimit || startMutation.isPending}
                onClick={() => handleStart(s.type)}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <History className="size-5" />
          <h2 className="text-lg font-semibold">Недавние разговоры</h2>
        </div>
        {historyLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : history && history.length > 0 ? (
          <div className="space-y-3">
            {history.map((conv) => (
              <ConversationHistoryItem key={conv.id} conversation={conv} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-8 text-center">
            <MessageSquare className="size-8 text-muted-foreground" />
            <p className="text-muted-foreground">
              Пока нет разговоров. Выберите сценарий выше, чтобы начать!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
