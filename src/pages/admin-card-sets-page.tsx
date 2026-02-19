import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Search, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/stores";
import { useAdminCardSets, useDeleteAdminCardSet } from "@/hooks/use-admin";
import { getApiErrorMessage } from "@/lib/errors";

export function AdminCardSetsPage() {
  const user = useAuthStore((s) => s.user);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 20;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading } = useAdminCardSets({
    skip: page * limit,
    limit,
    search: debouncedSearch || undefined,
  });

  const deleteSet = useDeleteAdminCardSet();

  if (!user?.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  function handleDelete(setId: string) {
    deleteSet.mutate(setId, {
      onSuccess: () => toast.success("Набор удалён"),
      onError: (err) => toast.error(getApiErrorMessage(err)),
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Модерация публичных наборов</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию набора..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : !data?.items.length ? (
        <p className="py-8 text-center text-muted-foreground">
          Публичные наборы не найдены.
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {data.items.map((cs) => (
              <Card key={cs.id}>
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{cs.title}</span>
                      <Badge variant="outline">{cs.difficulty_level}</Badge>
                      {cs.is_ai_generated && (
                        <Badge variant="secondary" className="gap-1">
                          <Sparkles className="h-3 w-3" />
                          AI
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cs.user_full_name} ({cs.user_email})
                    </p>
                    <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                      <span>Карточек: {cs.card_count}</span>
                      <span>
                        Создан:{" "}
                        {new Date(cs.created_at).toLocaleDateString("ru-RU")}
                      </span>
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deleteSet.isPending}
                      >
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Удалить
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Удалить набор?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Набор «{cs.title}» от {cs.user_full_name} будет удалён
                          безвозвратно.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => handleDelete(cs.id)}
                        >
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                Назад
              </Button>
              <span className="text-sm text-muted-foreground">
                {page + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Вперёд
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
