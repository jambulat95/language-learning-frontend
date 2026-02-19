import { Link } from "react-router-dom";
import { Crown, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FriendResponse } from "@/types";

interface FriendCardProps {
  friend: FriendResponse;
  onRemove: (friendId: string) => void;
  isRemoving?: boolean;
}

export function FriendCard({ friend, onRemove, isRemoving }: FriendCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar>
          {friend.avatar_url && <AvatarImage src={friend.avatar_url} />}
          <AvatarFallback>
            {friend.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{friend.full_name}</span>
            {friend.is_premium && (
              <Crown className="size-4 text-yellow-500 shrink-0" />
            )}
          </div>
          <Badge variant="outline" className="mt-1">
            {friend.language_level}
          </Badge>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/friends/${friend.id}/progress`}>View Progress</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onRemove(friend.id)}
            disabled={isRemoving}
          >
            <UserX className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
