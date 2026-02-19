import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Search, Trash2, Crown, Ban } from "lucide-react";
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
import {
  useAdminUsers,
  useUpdateAdminUser,
  useDeleteAdminUser,
} from "@/hooks/use-admin";
import { getApiErrorMessage } from "@/lib/errors";
import type { AdminUser } from "@/types";

export function AdminUsersPage() {
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

  const { data, isLoading } = useAdminUsers({
    skip: page * limit,
    limit,
    search: debouncedSearch || undefined,
  });

  const updateUser = useUpdateAdminUser();
  const deleteUser = useDeleteAdminUser();

  if (!user?.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  function handleTogglePremium(u: AdminUser) {
    updateUser.mutate(
      { userId: u.id, data: { is_premium: !u.is_premium } },
      {
        onSuccess: () =>
          toast.success(
            u.is_premium ? "Premium снят" : "Premium активирован",
          ),
        onError: (err) => toast.error(getApiErrorMessage(err)),
      },
    );
  }

  function handleToggleActive(u: AdminUser) {
    updateUser.mutate(
      { userId: u.id, data: { is_active: !u.is_active } },
      {
        onSuccess: () =>
          toast.success(
            u.is_active ? "Пользователь деактивирован" : "Пользователь активирован",
          ),
        onError: (err) => toast.error(getApiErrorMessage(err)),
      },
    );
  }

  function handleDelete(userId: string) {
    deleteUser.mutate(userId, {
      onSuccess: () => toast.success("Пользователь удалён"),
      onError: (err) => toast.error(getApiErrorMessage(err)),
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Пользователи</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по email или имени..."
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
          Пользователи не найдены.
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {data.items.map((u) => (
              <Card key={u.id}>
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">
                        {u.full_name}
                      </span>
                      {u.is_premium && (
                        <Badge
                          variant="outline"
                          className="border-amber-500 text-amber-600"
                        >
                          PRO
                        </Badge>
                      )}
                      {!u.is_active && (
                        <Badge variant="destructive">Неактивен</Badge>
                      )}
                      {u.is_admin && (
                        <Badge variant="secondary">Админ</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{u.email}</p>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>Уровень: {u.language_level}</span>
                      <span>XP: {u.total_xp}</span>
                      <span>Лвл: {u.level}</span>
                      <span>Лига: {u.league}</span>
                      <span>Наборов: {u.card_sets_count}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePremium(u)}
                      disabled={updateUser.isPending}
                    >
                      <Crown className="mr-1 h-3.5 w-3.5" />
                      {u.is_premium ? "Снять PRO" : "Дать PRO"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(u)}
                      disabled={updateUser.isPending}
                    >
                      <Ban className="mr-1 h-3.5 w-3.5" />
                      {u.is_active ? "Блок" : "Разблок"}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={deleteUser.isPending}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Удалить пользователя?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Пользователь «{u.full_name}» ({u.email}) и все его
                            данные будут удалены безвозвратно.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleDelete(u.id)}
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
