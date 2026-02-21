import { Link } from "react-router-dom";
import { BookOpen, MessageSquare, Sparkles } from "lucide-react";

const actions = [
  { to: "/sets", icon: BookOpen, label: "Наборы" },
  { to: "/generate", icon: Sparkles, label: "AI-генерация" },
  { to: "/conversations", icon: MessageSquare, label: "AI-чат" },
] as const;

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map(({ to, icon: Icon, label }) => (
        <Link
          key={to}
          to={to}
          className="flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-xl border bg-card p-3 text-card-foreground transition-colors hover:bg-accent active:bg-accent"
        >
          <Icon className="size-6 text-primary" />
          <span className="text-xs font-medium">{label}</span>
        </Link>
      ))}
    </div>
  );
}
