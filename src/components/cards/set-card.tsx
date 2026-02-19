import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Globe, Sparkles } from "lucide-react";
import type { CardSet } from "@/types";

interface SetCardProps {
  set: CardSet;
}

export function SetCard({ set }: SetCardProps) {
  return (
    <Link to={`/sets/${set.id}`}>
      <Card className="flex h-full flex-col transition-colors hover:bg-accent/30">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-tight">
              {set.title}
            </CardTitle>
            <Badge variant="outline" className="shrink-0">
              {set.difficulty_level}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          {set.description && (
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              {set.description}
            </p>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Layers className="size-3.5" />
              {set.card_count} карточек
            </span>
            {set.category && (
              <Badge variant="secondary" className="text-xs">
                {set.category}
              </Badge>
            )}
            {set.is_public && (
              <span className="flex items-center gap-1">
                <Globe className="size-3.5" />
                Публичный
              </span>
            )}
            {set.is_ai_generated && (
              <span className="flex items-center gap-1">
                <Sparkles className="size-3.5" />
                AI
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
