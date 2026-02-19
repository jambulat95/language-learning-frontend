import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  MessageSquare,
  BarChart3,
  Trophy,
  Medal,
  Users,
  UserCircle,
  LogOut,
  Shield,
  UserCog,
  ShieldAlert,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Главная", icon: LayoutDashboard },
  { to: "/sets", label: "Наборы карточек", icon: Layers },
  { to: "/generate", label: "AI-генерация", icon: Sparkles },
  { to: "/conversations", label: "AI-чат", icon: MessageSquare },
  { to: "/statistics", label: "Статистика", icon: BarChart3 },
  { to: "/achievements", label: "Достижения", icon: Trophy },
  { to: "/leaderboard", label: "Лидеры", icon: Medal },
  { to: "/friends", label: "Друзья", icon: Users },
  { to: "/profile", label: "Профиль", icon: UserCircle },
];

const adminNavItems = [
  { to: "/admin", label: "Админ", icon: Shield },
  { to: "/admin/users", label: "Пользователи", icon: UserCog },
  { to: "/admin/card-sets", label: "Модерация", icon: ShieldAlert },
];

export function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center px-6 font-bold text-lg">
        LangLearn
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.disabled ? "#" : item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive && !item.disabled
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                item.disabled && "pointer-events-none opacity-50",
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
        {user?.is_admin && (
          <>
            <Separator className="my-2" />
            {adminNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>
      <Separator />
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">
            {user?.full_name?.charAt(0)?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-1 items-center gap-1.5 truncate text-sm font-medium">
          <span className="truncate">{user?.full_name}</span>
          {user?.is_premium && (
            <Badge variant="outline" className="shrink-0 border-amber-500 px-1 py-0 text-[10px] text-amber-600 dark:text-amber-400">
              PRO
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}
