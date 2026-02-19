import { Navigate } from "react-router-dom";
import {
  Users,
  Crown,
  Layers,
  Globe,
  CreditCard,
  MessageSquare,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores";
import { usePlatformStats } from "@/hooks/use-admin";

const statCards = [
  { key: "total_users", label: "Пользователей", icon: Users },
  { key: "premium_users", label: "Premium", icon: Crown },
  { key: "total_card_sets", label: "Наборов", icon: Layers },
  { key: "public_card_sets", label: "Публичных", icon: Globe },
  { key: "total_cards", label: "Карточек", icon: CreditCard },
  { key: "total_conversations", label: "Диалогов", icon: MessageSquare },
  { key: "active_today", label: "Активны сегодня", icon: Activity },
] as const;

export function AdminDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading } = usePlatformStats();

  if (!user?.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Админ-панель</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <p className="text-2xl font-bold">
                  {data?.[stat.key] ?? 0}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
