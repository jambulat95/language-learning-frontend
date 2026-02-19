import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SetCard } from "@/components/cards/set-card";
import { SetFormDialog } from "@/components/cards/set-form-dialog";
import { SetsFilters } from "@/components/cards/sets-filters";
import { SetsSkeleton } from "@/components/cards/sets-skeleton";
import { UpgradeBanner } from "@/components/premium/upgrade-banner";
import { useCardSets, usePublicCardSets, useCreateCardSet } from "@/hooks/use-card-sets";
import { useUsageLimits } from "@/hooks/use-limits";
import { getApiErrorMessage } from "@/lib/errors";
import type { CardSetValues } from "@/lib/validations/cards";
import type { LanguageLevel } from "@/types";

export function SetsPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);

  const params = useMemo(
    () => ({
      q: search || undefined,
      difficulty_level: level !== "all" ? (level as LanguageLevel) : undefined,
      limit: 50,
    }),
    [search, level],
  );

  const mySets = useCardSets(params);
  const publicSets = usePublicCardSets(params);
  const createMutation = useCreateCardSet();
  const { data: limits } = useUsageLimits();

  const isAtSetLimit =
    limits && !limits.is_premium && limits.card_sets_used >= limits.card_sets_limit;

  function handleCreate(data: CardSetValues) {
    createMutation.mutate(
      {
        title: data.title,
        description: data.description || null,
        category: data.category || null,
        difficulty_level: data.difficulty_level,
        is_public: data.is_public,
      },
      {
        onSuccess: () => {
          setCreateOpen(false);
          toast.success("Набор карточек создан");
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err));
        },
      },
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Наборы карточек</h1>
          {limits && !limits.is_premium && (
            <Badge variant="secondary">
              {limits.card_sets_used}/{limits.card_sets_limit} наборов
            </Badge>
          )}
        </div>
        <Button onClick={() => setCreateOpen(true)} disabled={!!isAtSetLimit}>
          <Plus className="size-4" />
          Новый набор
        </Button>
      </div>

      {isAtSetLimit && (
        <UpgradeBanner message="Вы достигли максимального количества наборов. Перейдите на Premium для неограниченного доступа." />
      )}

      <SetsFilters
        search={search}
        onSearchChange={setSearch}
        level={level}
        onLevelChange={setLevel}
      />

      <Tabs defaultValue="my">
        <TabsList>
          <TabsTrigger value="my">Мои наборы</TabsTrigger>
          <TabsTrigger value="public">Публичные</TabsTrigger>
        </TabsList>

        <TabsContent value="my" className="mt-4">
          {mySets.isLoading ? (
            <SetsSkeleton />
          ) : mySets.error ? (
            <p className="text-destructive">Не удалось загрузить наборы.</p>
          ) : mySets.data && mySets.data.items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mySets.data.items.map((set) => (
                <SetCard key={set.id} set={set} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="text-muted-foreground">
                {search || level !== "all"
                  ? "Нет наборов, соответствующих фильтрам."
                  : "У вас пока нет наборов карточек."}
              </p>
              {!search && level === "all" && (
                <Button onClick={() => setCreateOpen(true)} size="sm">
                  <Plus className="size-4" />
                  Создайте свой первый набор
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="public" className="mt-4">
          {publicSets.isLoading ? (
            <SetsSkeleton />
          ) : publicSets.error ? (
            <p className="text-destructive">Не удалось загрузить публичные наборы.</p>
          ) : publicSets.data && publicSets.data.items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {publicSets.data.items.map((set) => (
                <SetCard key={set.id} set={set} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              Нет доступных публичных наборов.
            </p>
          )}
        </TabsContent>
      </Tabs>

      <SetFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
