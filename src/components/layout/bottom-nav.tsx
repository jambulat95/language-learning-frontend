import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  MessageSquare,
  MoreHorizontal,
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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { to: "/dashboard", label: "Главная", icon: LayoutDashboard },
  { to: "/sets", label: "Наборы", icon: Layers },
  { to: "/generate", label: "AI", icon: Sparkles },
  { to: "/conversations", label: "Чат", icon: MessageSquare },
];

const moreNavItems = [
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

// Paths that live inside the "more" drawer
const morePaths = [
  ...moreNavItems.map((i) => i.to),
  ...adminNavItems.map((i) => i.to),
];

export function BottomNav() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { pathname } = useLocation();

  const isMoreActive = morePaths.some((p) =>
    p === "/admin" ? pathname === p : pathname.startsWith(p),
  );

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background md:hidden">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground",
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
            isMoreActive ? "text-primary" : "text-muted-foreground",
          )}
        >
          <MoreHorizontal className="h-5 w-5" />
          Ещё
        </button>
      </nav>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Навигация</DrawerTitle>
          </DrawerHeader>
          <nav className="flex flex-col gap-1 px-4 pb-2">
            {moreNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
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
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
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
          <DrawerFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setOpen(false);
                logout();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
