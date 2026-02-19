import { Link } from "react-router-dom";
import { Layers, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SharedCardSetResponse } from "@/types";

interface SharedSetCardProps {
  sharedSet: SharedCardSetResponse;
  showUnshare?: boolean;
  onUnshare?: (shareId: string) => void;
  isUnsharing?: boolean;
}

export function SharedSetCard({
  sharedSet,
  showUnshare,
  onUnshare,
  isUnsharing,
}: SharedSetCardProps) {
  const { card_set, shared_by } = sharedSet;

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          <Layers className="size-5 text-muted-foreground" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="font-medium truncate block">{card_set.title}</span>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{card_set.difficulty_level}</Badge>
            <span className="text-xs text-muted-foreground">
              {card_set.card_count} карточек
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="size-5">
              {shared_by.avatar_url && (
                <AvatarImage src={shared_by.avatar_url} />
              )}
              <AvatarFallback className="text-[10px]">
                {shared_by.full_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {shared_by.full_name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/sets/${card_set.id}`}>Открыть набор</Link>
          </Button>
          {showUnshare && onUnshare && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onUnshare(sharedSet.id)}
              disabled={isUnsharing}
            >
              <X className="size-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
