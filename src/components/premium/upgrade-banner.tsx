import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpgradeBannerProps {
  message: string;
}

export function UpgradeBanner({ message }: UpgradeBannerProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
      <div className="flex items-center gap-3 text-sm text-amber-700 dark:text-amber-400">
        <Crown className="size-5 shrink-0" />
        <span>{message}</span>
      </div>
      <Button size="sm" variant="outline" className="shrink-0" disabled>
        Перейти на Premium
      </Button>
    </div>
  );
}
