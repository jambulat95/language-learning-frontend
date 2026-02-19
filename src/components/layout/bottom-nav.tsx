import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  MessageSquare,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/sets", label: "Sets", icon: Layers },
  { to: "/generate", label: "AI", icon: Sparkles },
  { to: "/conversations", label: "Chat", icon: MessageSquare },
  { to: "/friends", label: "Friends", icon: Users },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.disabled ? "#" : item.to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
              isActive && !item.disabled
                ? "text-primary"
                : "text-muted-foreground",
              item.disabled && "pointer-events-none opacity-50",
            )
          }
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
