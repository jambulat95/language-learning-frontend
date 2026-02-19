import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { Card } from "@/types";

interface CardItemProps {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
  isOwner: boolean;
}

export function CardItem({ card, onEdit, onDelete, isOwner }: CardItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3">
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="font-medium">{card.front_text}</span>
          <span className="text-muted-foreground">&mdash;</span>
          <span className="text-muted-foreground">{card.back_text}</span>
        </div>
        {card.example_sentence && (
          <p className="text-sm italic text-muted-foreground truncate">
            {card.example_sentence}
          </p>
        )}
      </div>
      {isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-xs">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(card)}>
              <Pencil className="size-4" />
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(card)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4" />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
