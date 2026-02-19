import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useFriends, useShareCardSet } from "@/hooks/use-social";
import { getApiErrorMessage } from "@/lib/errors";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setId: string;
}

export function ShareDialog({ open, onOpenChange, setId }: ShareDialogProps) {
  const { data: friends, isLoading } = useFriends();
  const shareMutation = useShareCardSet(setId);

  function handleShare(friendId: string) {
    shareMutation.mutate(
      { friend_id: friendId },
      {
        onSuccess: () => {
          toast.success("Набор карточек отправлен!");
        },
        onError: (err) => toast.error(getApiErrorMessage(err)),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="size-5" />
            Поделиться с другом
          </DialogTitle>
          <DialogDescription>
            Выберите друга, чтобы поделиться набором карточек.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-64 space-y-2 overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))
          ) : !friends?.length ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Сначала добавьте друзей, чтобы делиться наборами.
            </p>
          ) : (
            friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50"
              >
                <Avatar>
                  {friend.avatar_url && (
                    <AvatarImage src={friend.avatar_url} />
                  )}
                  <AvatarFallback>
                    {friend.full_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-sm font-medium">
                  {friend.full_name}
                </span>
                <Button
                  size="sm"
                  onClick={() => handleShare(friend.id)}
                  disabled={shareMutation.isPending}
                >
                  Отправить
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
