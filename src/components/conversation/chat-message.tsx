import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { CorrectionsDisplay } from "./corrections-display";
import type { GrammarCorrection } from "@/types/conversation";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  corrections?: GrammarCorrection[] | null;
  suggestions?: string[] | null;
  isStreaming?: boolean;
}

export function ChatMessage({
  role,
  content,
  corrections,
  suggestions,
  isStreaming,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>

      <div className={cn("max-w-[80%] space-y-2", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted rounded-tl-sm",
          )}
        >
          <p className="whitespace-pre-wrap">{content}</p>
          {isStreaming && (
            <span className="ml-1 inline-block animate-pulse">|</span>
          )}
        </div>

        {isUser && corrections && corrections.length > 0 && (
          <CorrectionsDisplay
            corrections={corrections}
            suggestions={suggestions}
          />
        )}
      </div>
    </div>
  );
}
