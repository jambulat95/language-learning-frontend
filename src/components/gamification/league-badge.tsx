import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { League } from "@/types";

const leagueStyles: Record<League, string> = {
  Bronze: "bg-amber-100 text-amber-800 border-amber-300",
  Silver: "bg-gray-100 text-gray-800 border-gray-300",
  Gold: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Platinum: "bg-cyan-100 text-cyan-800 border-cyan-300",
  Diamond: "bg-violet-100 text-violet-800 border-violet-300",
};

interface LeagueBadgeProps {
  league: League;
  className?: string;
}

export function LeagueBadge({ league, className }: LeagueBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(leagueStyles[league], className)}
    >
      {league}
    </Badge>
  );
}
