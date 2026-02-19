import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/components/conversation/chat-message";
import { ChatInput } from "@/components/conversation/chat-input";
import { ConversationFeedback } from "@/components/conversation/conversation-feedback";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversation, useEndConversation } from "@/hooks/use-conversations";
import { sendMessageSSE } from "@/api/conversations";
import { getApiErrorMessage } from "@/lib/errors";
import type {
  ConversationMessage,
  ConversationFeedback as FeedbackType,
  GrammarCorrection,
} from "@/types/conversation";

export function ChatPage() {
  const { id: conversationId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: conversation,
    isLoading,
    error,
  } = useConversation(conversationId);
  const endMutation = useEndConversation();

  // Local chat state
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [streamingContent, setStreamingContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages from server data
  useEffect(() => {
    if (conversation && !initialized) {
      const serverMessages: ConversationMessage[] = conversation.messages.map(
        (m) => ({
          role: m.role,
          content: m.content,
          timestamp: m.timestamp,
          corrections: m.corrections,
          suggestions: m.suggestions,
        }),
      );
      setMessages(serverMessages);
      if (conversation.feedback) {
        setFeedback(conversation.feedback);
      }
      setInitialized(true);
    }
  }, [conversation, initialized]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!conversationId || isSending) return;

      setIsSending(true);
      setStreamingContent("");

      // Add user message to local state immediately
      const userMsg: ConversationMessage = {
        role: "user",
        content: text,
        timestamp: new Date().toISOString(),
        corrections: null,
        suggestions: null,
      };
      setMessages((prev) => [...prev, userMsg]);

      let corrections: GrammarCorrection[] = [];
      let suggestions: string[] = [];

      await sendMessageSSE(conversationId, text, {
        onCorrections: (data) => {
          corrections = data.corrections;
          suggestions = data.suggestions;
          // Update the user message with corrections
          setMessages((prev) => {
            const updated = [...prev];
            const lastUserIdx = updated.length - 1;
            if (updated[lastUserIdx]?.role === "user") {
              updated[lastUserIdx] = {
                ...updated[lastUserIdx],
                corrections,
                suggestions,
              };
            }
            return updated;
          });
        },
        onToken: (token) => {
          setStreamingContent((prev) => prev + token);
        },
        onDone: (data) => {
          // Add completed AI message
          const aiMsg: ConversationMessage = {
            role: "assistant",
            content: data.ai_message,
            timestamp: new Date().toISOString(),
            corrections: null,
            suggestions: null,
          };
          setMessages((prev) => [...prev, aiMsg]);
          setStreamingContent("");
          setIsSending(false);
        },
        onError: (errorMsg) => {
          toast.error(errorMsg);
          setStreamingContent("");
          setIsSending(false);
        },
      });
    },
    [conversationId, isSending],
  );

  function handleEnd() {
    if (!conversationId) return;
    setIsEnding(true);
    endMutation.mutate(conversationId, {
      onSuccess: (result) => {
        setFeedback(result.feedback);
        toast.success(`+${result.feedback.xp_earned} XP получено!`);
        setIsEnding(false);
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err));
        setIsEnding(false);
      },
    });
  }

  function handleNewConversation() {
    navigate("/conversations");
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 border-b p-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="flex-1 space-y-4 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-3/4 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error || !conversation) {
    return (
      <div className="space-y-4 p-4">
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

  // Feedback view (conversation ended)
  if (feedback) {
    return (
      <div className="p-4">
        <ConversationFeedback
          feedback={feedback}
          onNewConversation={handleNewConversation}
        />
      </div>
    );
  }

  const isEnded = conversation.ended_at !== null;

  return (
    <div className="flex h-full flex-col -m-4 md:-m-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link to="/conversations">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h2 className="font-semibold">{conversation.scenario_title}</h2>
        </div>
        <Badge variant="outline">{messages.length} сообщ.</Badge>
        {!isEnded && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEnd}
            disabled={isEnding || isSending}
          >
            {isEnding ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Square className="size-4" />
            )}
            Завершить
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            role={msg.role}
            content={msg.content}
            corrections={msg.corrections}
            suggestions={msg.suggestions}
          />
        ))}

        {streamingContent && (
          <ChatMessage
            role="assistant"
            content={streamingContent}
            isStreaming
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {!isEnded && (
        <ChatInput
          onSend={handleSend}
          disabled={isSending}
          placeholder={
            isSending ? "AI печатает..." : "Введите сообщение..."
          }
        />
      )}
    </div>
  );
}
