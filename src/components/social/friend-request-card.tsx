import { Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FriendshipResponse } from "@/types";

interface FriendRequestCardProps {
  request: FriendshipResponse;
  onAccept: (friendshipId: string) => void;
  onReject: (friendshipId: string) => void;
  isAccepting?: boolean;
  isRejecting?: boolean;
}

export function FriendRequestCard({
  request,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
}: FriendRequestCardProps) {
  const timeAgo = getRelativeTime(request.created_at);

  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Avatar>
        {request.user.avatar_url && (
          <AvatarImage src={request.user.avatar_url} />
        )}
        <AvatarFallback>
          {request.user.full_name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <span className="font-medium truncate block">
          {request.user.full_name}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">{request.user.language_level}</Badge>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          onClick={() => onAccept(request.id)}
          disabled={isAccepting || isRejecting}
          className="bg-green-600 hover:bg-green-700"
        >
          <Check className="size-4" />
          Принять
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onReject(request.id)}
          disabled={isAccepting || isRejecting}
        >
          <X className="size-4" />
          Отклонить
        </Button>
      </div>
    </div>
  );
}

function getRelativeTime(dateString: string): string {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "только что";
  if (diffMin < 60) return `${diffMin} мин. назад`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} ч. назад`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay} дн. назад`;
  return new Date(dateString).toLocaleDateString("ru");
}
