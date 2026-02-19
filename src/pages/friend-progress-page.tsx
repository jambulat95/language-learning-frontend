import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Crown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FriendProgressStats } from "@/components/social/friend-progress-stats";
import { SocialSkeleton } from "@/components/social/social-skeleton";
import { useFriendProgress } from "@/hooks/use-social";

export function FriendProgressPage() {
  const { userId } = useParams<{ userId: string }>();
  const { data, isLoading, error } = useFriendProgress(userId!);

  if (isLoading) return <SocialSkeleton />;

  if (error || !data) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/friends">
            <ArrowLeft className="size-4" />
            Назад к друзьям
          </Link>
        </Button>
        <p className="text-destructive">
          Не удалось загрузить прогресс друга. Возможно, он не в вашем списке
          друзей.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/friends">
          <ArrowLeft className="size-4" />
          Назад к друзьям
        </Link>
      </Button>

      <div className="flex items-center gap-4">
        <Avatar size="lg">
          {data.avatar_url && <AvatarImage src={data.avatar_url} />}
          <AvatarFallback>
            {data.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{data.full_name}</h1>
            {data.is_premium && (
              <Crown className="size-5 text-yellow-500" />
            )}
          </div>
          <Badge variant="outline" className="mt-1">
            {data.language_level}
          </Badge>
        </div>
      </div>

      <FriendProgressStats
        gamification={data.gamification}
        study={data.study}
      />
    </div>
  );
}
