import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LeagueBadge } from "@/components/gamification/league-badge";
import { cn } from "@/lib/utils";
import type { LeaderboardEntry } from "@/types";

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
  currentUserId: string | undefined;
  userRank: number | null;
}

function getRankDisplay(rank: number) {
  if (rank === 1) return { label: "1st", className: "text-yellow-500 font-bold" };
  if (rank === 2) return { label: "2nd", className: "text-gray-400 font-bold" };
  if (rank === 3) return { label: "3rd", className: "text-amber-600 font-bold" };
  return { label: `${rank}`, className: "text-muted-foreground" };
}

export function LeaderboardList({
  entries,
  currentUserId,
  userRank,
}: LeaderboardListProps) {
  const userInList = entries.some((e) => e.user_id === currentUserId);

  return (
    <div className="space-y-2">
      {entries.map((entry) => {
        const rank = getRankDisplay(entry.rank);
        const isCurrentUser = entry.user_id === currentUserId;

        return (
          <div
            key={entry.user_id}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-3",
              isCurrentUser && "bg-accent",
            )}
          >
            <span className={cn("w-8 text-center text-sm", rank.className)}>
              {rank.label}
            </span>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">
                {entry.full_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {entry.full_name}
                {isCurrentUser && (
                  <span className="ml-1 text-muted-foreground">(you)</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                Level {entry.level}
              </p>
            </div>
            <LeagueBadge league={entry.league} />
            <span className="text-sm font-semibold">
              {entry.total_xp.toLocaleString()} XP
            </span>
          </div>
        );
      })}

      {!userInList && userRank !== null && (
        <>
          <div className="flex justify-center py-1">
            <span className="text-xs text-muted-foreground">...</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-accent p-3">
            <span className="w-8 text-center text-sm text-muted-foreground">
              {userRank}
            </span>
            <span className="text-sm text-muted-foreground">
              Your rank
            </span>
          </div>
        </>
      )}
    </div>
  );
}
