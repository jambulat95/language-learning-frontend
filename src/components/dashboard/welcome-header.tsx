import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

interface WelcomeHeaderProps {
  userName: string;
  streak: number;
}

export function WelcomeHeader({ userName, streak }: WelcomeHeaderProps) {
  const firstName = userName.split(" ")[0];

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight">
        С возвращением, {firstName}!
      </h1>
      {streak > 0 && (
        <Badge variant="secondary" className="gap-1 text-sm">
          <Flame className="size-4 text-orange-500" />
          {streak} дней подряд
        </Badge>
      )}
    </div>
  );
}
