import { Check, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UserSearchResult } from "@/types";

interface UserSearchResultCardProps {
  user: UserSearchResult;
  onAddFriend: (userId: string) => void;
  isSending?: boolean;
}

export function UserSearchResultCard({
  user,
  onAddFriend,
  isSending,
}: UserSearchResultCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <Avatar>
        {user.avatar_url && <AvatarImage src={user.avatar_url} />}
        <AvatarFallback>
          {user.full_name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <span className="font-medium truncate block">{user.full_name}</span>
        <Badge variant="outline" className="mt-1">
          {user.language_level}
        </Badge>
      </div>

      <div className="shrink-0">
        {user.friendship_status === "accepted" ? (
          <Badge variant="secondary" className="gap-1">
            <Check className="size-3" />
            Друзья
          </Badge>
        ) : user.friendship_status === "pending" ? (
          <Badge variant="outline" className="text-muted-foreground">
            Ожидание
          </Badge>
        ) : (
          <Button
            size="sm"
            onClick={() => onAddFriend(user.id)}
            disabled={isSending}
          >
            <UserPlus className="size-4" />
            Добавить в друзья
          </Button>
        )}
      </div>
    </div>
  );
}
