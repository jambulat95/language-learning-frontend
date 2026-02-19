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
        <p className="break-words">
          <span className="font-medium">{card.front_text}</span>
          <span className="text-muted-foreground"> — </span>
          <span className="text-muted-foreground">{card.back_text}</span>
        </p>
        {card.example_sentence && (
          <p className="break-words text-sm italic text-muted-foreground">
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
