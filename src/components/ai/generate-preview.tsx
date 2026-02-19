import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Check,
  GraduationCap,
  Layers,
  Pencil,
  RotateCcw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateCard, useDeleteCard } from "@/hooks/use-cards";
import { getApiErrorMessage } from "@/lib/errors";
import type { Card, CardSetDetail } from "@/types";

interface GeneratePreviewProps {
  cardSet: CardSetDetail;
  onGenerateMore: () => void;
}

export function GeneratePreview({ cardSet, onGenerateMore }: GeneratePreviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-xl font-bold">{cardSet.title}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{cardSet.difficulty_level}</Badge>
          <Badge variant="secondary">AI-генерация</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Layers className="size-3.5" />
            {cardSet.cards.length} карточек
          </span>
        </div>
        {cardSet.description && (
          <p className="text-sm text-muted-foreground">{cardSet.description}</p>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {cardSet.cards.map((card) => (
          <PreviewCardItem
            key={card.id}
            card={card}
            setId={cardSet.id}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="flex-1">
          <Link to={`/study/${cardSet.id}`}>
            <GraduationCap className="size-4" />
            Учить сейчас
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/sets/${cardSet.id}`}>
            <Layers className="size-4" />
            Открыть набор
          </Link>
        </Button>
        <Button variant="outline" className="flex-1" onClick={onGenerateMore}>
          <RotateCcw className="size-4" />
          Сгенерировать ещё
        </Button>
      </div>
    </div>
  );
}

function PreviewCardItem({ card, setId }: { card: Card; setId: string }) {
  const [editing, setEditing] = useState(false);
  const [frontText, setFrontText] = useState(card.front_text);
  const [backText, setBackText] = useState(card.back_text);
  const [deleted, setDeleted] = useState(false);

  const updateMutation = useUpdateCard(setId);
  const deleteMutation = useDeleteCard(setId);

  if (deleted) return null;

  function handleSave() {
    updateMutation.mutate(
      {
        cardId: card.id,
        data: { front_text: frontText, back_text: backText },
      },
      {
        onSuccess: () => {
          setEditing(false);
          toast.success("Карточка обновлена");
        },
        onError: (err) => toast.error(getApiErrorMessage(err)),
      },
    );
  }

  function handleCancel() {
    setFrontText(card.front_text);
    setBackText(card.back_text);
    setEditing(false);
  }

  function handleDelete() {
    deleteMutation.mutate(card.id, {
      onSuccess: () => {
        setDeleted(true);
        toast.success("Карточка удалена");
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
    });
  }

  if (editing) {
    return (
      <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <Input
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            placeholder="Лицевая сторона"
          />
          <Input
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            placeholder="Обратная сторона"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={updateMutation.isPending}
          >
            <X className="size-4" />
            Отмена
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={updateMutation.isPending || !frontText.trim() || !backText.trim()}
          >
            <Check className="size-4" />
            {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </div>
    );
  }

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
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => setEditing(true)}
        >
          <Pencil className="size-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
