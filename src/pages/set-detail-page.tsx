import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  GraduationCap,
  Layers,
  MoreHorizontal,
  Pencil,
  Plus,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UpgradeBanner } from "@/components/premium/upgrade-banner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardItem } from "@/components/cards/card-item";
import { CardFormDialog } from "@/components/cards/card-form-dialog";
import { SetFormDialog } from "@/components/cards/set-form-dialog";
import { ImportDialog } from "@/components/cards/import-dialog";
import { ShareDialog } from "@/components/social/share-dialog";
import { DeleteConfirmDialog } from "@/components/cards/delete-confirm-dialog";
import { DetailSkeleton } from "@/components/cards/detail-skeleton";
import { useCardSet, useUpdateCardSet, useDeleteCardSet } from "@/hooks/use-card-sets";
import { useCards, useCreateCard, useUpdateCard, useDeleteCard, useImportCards } from "@/hooks/use-cards";
import { useUsageLimits } from "@/hooks/use-limits";
import { useAuthStore } from "@/stores";
import { getApiErrorMessage } from "@/lib/errors";
import type { CardSetValues, CardValues } from "@/lib/validations/cards";
import type { Card } from "@/types";

export function SetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const { data: cardSet, isLoading, error } = useCardSet(id!);
  const cards = useCards(id!);

  const updateSetMutation = useUpdateCardSet(id!);
  const deleteSetMutation = useDeleteCardSet();
  const createCardMutation = useCreateCard(id!);
  const updateCardMutation = useUpdateCard(id!);
  const deleteCardMutation = useDeleteCard(id!);
  const importMutation = useImportCards(id!);

  const { data: limits } = useUsageLimits();

  const isAtCardLimit =
    limits && !limits.is_premium && limits.cards_today >= limits.cards_today_limit;

  const [editSetOpen, setEditSetOpen] = useState(false);
  const [deleteSetOpen, setDeleteSetOpen] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [deletingCard, setDeletingCard] = useState<Card | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const isOwner = cardSet?.user_id === user?.id;

  if (isLoading) return <DetailSkeleton />;

  if (error || !cardSet) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/sets">
            <ArrowLeft className="size-4" />
            Назад к наборам
          </Link>
        </Button>
        <p className="text-destructive">Набор карточек не найден.</p>
      </div>
    );
  }

  function handleUpdateSet(data: CardSetValues) {
    updateSetMutation.mutate(
      {
        title: data.title,
        description: data.description || null,
        category: data.category || null,
        difficulty_level: data.difficulty_level,
        is_public: data.is_public,
      },
      {
        onSuccess: () => {
          setEditSetOpen(false);
          toast.success("Набор карточек обновлён");
        },
        onError: (err) => toast.error(getApiErrorMessage(err)),
      },
    );
  }

  function handleDeleteSet() {
    deleteSetMutation.mutate(id!, {
      onSuccess: () => {
        toast.success("Набор карточек удалён");
        navigate("/sets");
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
    });
  }

  function handleAddCard(data: CardValues) {
    createCardMutation.mutate(
      {
        front_text: data.front_text,
        back_text: data.back_text,
        example_sentence: data.example_sentence || null,
      },
      {
        onSuccess: () => {
          setAddCardOpen(false);
          toast.success("Карточка добавлена");
        },
        onError: (err) => toast.error(getApiErrorMessage(err)),
      },
    );
  }

  function handleEditCard(data: CardValues) {
    if (!editingCard) return;
    updateCardMutation.mutate(
      {
        cardId: editingCard.id,
        data: {
          front_text: data.front_text,
          back_text: data.back_text,
          example_sentence: data.example_sentence || null,
        },
      },
      {
        onSuccess: () => {
          setEditingCard(null);
          toast.success("Карточка обновлена");
        },
        onError: (err) => toast.error(getApiErrorMessage(err)),
      },
    );
  }

  function handleDeleteCard() {
    if (!deletingCard) return;
    deleteCardMutation.mutate(deletingCard.id, {
      onSuccess: () => {
        setDeletingCard(null);
        toast.success("Карточка удалена");
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
    });
  }

  function handleImport(file: File) {
    importMutation.mutate(file, {
      onSuccess: (result) => {
        setImportOpen(false);
        toast.success(
          `Импортировано ${result.imported_count} карточек` +
            (result.skipped_count > 0
              ? `, ${result.skipped_count} пропущено`
              : ""),
        );
      },
      onError: (err) => toast.error(getApiErrorMessage(err)),
    });
  }

  const cardList = cards.data?.items ?? cardSet.cards ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" asChild>
              <Link to="/sets">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{cardSet.title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{cardSet.difficulty_level}</Badge>
            {cardSet.category && (
              <Badge variant="secondary">{cardSet.category}</Badge>
            )}
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Layers className="size-3.5" />
              {cardSet.card_count} карточек
            </span>
          </div>
          {cardSet.description && (
            <p className="text-sm text-muted-foreground">
              {cardSet.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {cardSet.card_count > 0 && (
            <Button asChild size="sm">
              <Link to={`/study/${cardSet.id}`}>
                <GraduationCap className="size-4" />
                Учить
              </Link>
            </Button>
          )}
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon-sm">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditSetOpen(true)}>
                  <Pencil className="size-4" />
                  Редактировать набор
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setImportOpen(true)} disabled={!!isAtCardLimit}>
                  <Upload className="size-4" />
                  Импорт CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShareOpen(true)}>
                  <Share2 className="size-4" />
                  Поделиться с другом
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteSetOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-4" />
                  Удалить набор
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Cards list */}
      {isAtCardLimit && (
        <UpgradeBanner message="Вы достигли дневного лимита создания карточек. Перейдите на Premium для неограниченного доступа." />
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Карточки</h2>
            {limits && !limits.is_premium && (
              <span className="text-xs text-muted-foreground">
                {limits.cards_today}/{limits.cards_today_limit} карточек сегодня
              </span>
            )}
          </div>
          {isOwner && (
            <Button size="sm" onClick={() => setAddCardOpen(true)} disabled={!!isAtCardLimit}>
              <Plus className="size-4" />
              Добавить карточку
            </Button>
          )}
        </div>

        {cardList.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-12 text-center">
            <p className="text-muted-foreground">В этом наборе пока нет карточек.</p>
            {isOwner && (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setAddCardOpen(true)}>
                  <Plus className="size-4" />
                  Добавить карточку
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setImportOpen(true)}
                >
                  <Upload className="size-4" />
                  Импорт CSV
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {cardList.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                isOwner={isOwner}
                onEdit={setEditingCard}
                onDelete={setDeletingCard}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <SetFormDialog
        open={editSetOpen}
        onOpenChange={setEditSetOpen}
        onSubmit={handleUpdateSet}
        isLoading={updateSetMutation.isPending}
        defaultValues={cardSet}
      />

      <DeleteConfirmDialog
        open={deleteSetOpen}
        onOpenChange={setDeleteSetOpen}
        onConfirm={handleDeleteSet}
        isLoading={deleteSetMutation.isPending}
        title="Удалить набор карточек?"
        description={`Это навсегда удалит «${cardSet.title}» и все его карточки. Это действие нельзя отменить.`}
      />

      <CardFormDialog
        open={addCardOpen}
        onOpenChange={setAddCardOpen}
        onSubmit={handleAddCard}
        isLoading={createCardMutation.isPending}
      />

      <CardFormDialog
        open={!!editingCard}
        onOpenChange={(open) => !open && setEditingCard(null)}
        onSubmit={handleEditCard}
        isLoading={updateCardMutation.isPending}
        defaultValues={editingCard}
      />

      <DeleteConfirmDialog
        open={!!deletingCard}
        onOpenChange={(open) => !open && setDeletingCard(null)}
        onConfirm={handleDeleteCard}
        isLoading={deleteCardMutation.isPending}
        title="Удалить карточку?"
        description={`Удалить «${deletingCard?.front_text}»? Это действие нельзя отменить.`}
      />

      <ImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onImport={handleImport}
        isLoading={importMutation.isPending}
      />

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        setId={id!}
      />
    </div>
  );
}
