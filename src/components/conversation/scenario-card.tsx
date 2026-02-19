import {
  Plane,
  UtensilsCrossed,
  Briefcase,
  Hotel,
  ShoppingBag,
  Stethoscope,
  Coffee,
  Building2,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ScenarioType } from "@/types/conversation";

const SCENARIO_ICONS: Record<ScenarioType, LucideIcon> = {
  airport: Plane,
  restaurant: UtensilsCrossed,
  job_interview: Briefcase,
  hotel_checkin: Hotel,
  shopping: ShoppingBag,
  doctor_visit: Stethoscope,
  small_talk: Coffee,
  business_meeting: Building2,
  free_conversation: MessageCircle,
};

interface ScenarioCardProps {
  type: ScenarioType;
  title: string;
  description: string;
  suggestedTurns: number;
  disabled?: boolean;
  onClick: () => void;
}

export function ScenarioCard({
  type,
  title,
  description,
  suggestedTurns,
  disabled,
  onClick,
}: ScenarioCardProps) {
  const Icon = SCENARIO_ICONS[type] ?? MessageCircle;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-primary/50 hover:shadow-md",
        disabled && "pointer-events-none opacity-50",
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <Badge variant="secondary" className="mt-2">
            ~{suggestedTurns} turns
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
