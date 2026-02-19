import { useState, useEffect } from "react";
import { Search, Users } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FriendCard } from "@/components/social/friend-card";
import { FriendRequestCard } from "@/components/social/friend-request-card";
import { UserSearchResultCard } from "@/components/social/user-search-result-card";
import { SharedSetCard } from "@/components/social/shared-set-card";
import { SocialSkeleton } from "@/components/social/social-skeleton";
import {
  useFriends,
  useIncomingRequests,
  useUserSearch,
  useIncomingSharedSets,
  useOutgoingSharedSets,
  useSendFriendRequest,
  useAcceptFriendRequest,
  useRejectFriendRequest,
  useRemoveFriend,
  useUnshareCardSet,
} from "@/hooks/use-social";
import { getApiErrorMessage } from "@/lib/errors";

export function FriendsPage() {
  const [tab, setTab] = useState("friends");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sharedTab, setSharedTab] = useState("incoming");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const friends = useFriends();
  const incomingRequests = useIncomingRequests();
  const searchResults = useUserSearch(debouncedQuery);
  const incomingShared = useIncomingSharedSets();
  const outgoingShared = useOutgoingSharedSets();

  const sendRequest = useSendFriendRequest();
  const acceptRequest = useAcceptFriendRequest();
  const rejectRequest = useRejectFriendRequest();
  const removeFriend = useRemoveFriend();
  const unshare = useUnshareCardSet();

  const requestCount = incomingRequests.data?.length ?? 0;

  if (friends.isLoading) return <SocialSkeleton />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Друзья</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="friends">Друзья</TabsTrigger>
          <TabsTrigger value="requests" className="gap-1.5">
            Заявки
            {requestCount > 0 && (
              <Badge
                variant="destructive"
                className="ml-1 h-5 min-w-5 px-1 text-xs"
              >
                {requestCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="search">Поиск</TabsTrigger>
          <TabsTrigger value="shared">Общие наборы</TabsTrigger>
        </TabsList>

        {/* Friends Tab */}
        <TabsContent value="friends" className="mt-4">
          {!friends.data?.length ? (
            <EmptyState
              icon={<Users className="size-10 text-muted-foreground" />}
              title="Пока нет друзей"
              description="Найдите пользователей, чтобы добавить их в друзья."
              action={
                <button
                  onClick={() => setTab("search")}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Найти друзей
                </button>
              }
            />
          ) : (
            <div className="grid gap-3">
              {friends.data.map((friend) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onRemove={(id) => {
                    removeFriend.mutate(id, {
                      onSuccess: () => toast.success("Друг удалён"),
                      onError: (err) => toast.error(getApiErrorMessage(err)),
                    });
                  }}
                  isRemoving={removeFriend.isPending}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="mt-4">
          {!incomingRequests.data?.length ? (
            <EmptyState
              title="Нет заявок"
              description="Полученные заявки в друзья будут отображаться здесь."
            />
          ) : (
            <div className="space-y-3">
              {incomingRequests.data.map((req) => (
                <FriendRequestCard
                  key={req.id}
                  request={req}
                  onAccept={(id) => {
                    acceptRequest.mutate(id, {
                      onSuccess: () =>
                        toast.success("Заявка в друзья принята!"),
                      onError: (err) => toast.error(getApiErrorMessage(err)),
                    });
                  }}
                  onReject={(id) => {
                    rejectRequest.mutate(id, {
                      onSuccess: () => toast.success("Заявка отклонена"),
                      onError: (err) => toast.error(getApiErrorMessage(err)),
                    });
                  }}
                  isAccepting={acceptRequest.isPending}
                  isRejecting={rejectRequest.isPending}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search" className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени (минимум 2 символа)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>

          {debouncedQuery.length < 2 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              Введите минимум 2 символа для поиска.
            </p>
          ) : searchResults.isLoading ? (
            <SocialSkeleton />
          ) : !searchResults.data?.length ? (
            <EmptyState
              title="Пользователи не найдены"
              description={`Нет результатов по запросу «${debouncedQuery}».`}
            />
          ) : (
            <div className="space-y-3">
              {searchResults.data.map((user) => (
                <UserSearchResultCard
                  key={user.id}
                  user={user}
                  onAddFriend={(userId) => {
                    sendRequest.mutate(
                      { friend_id: userId },
                      {
                        onSuccess: () =>
                          toast.success("Заявка в друзья отправлена!"),
                        onError: (err) =>
                          toast.error(getApiErrorMessage(err)),
                      },
                    );
                  }}
                  isSending={sendRequest.isPending}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Shared Sets Tab */}
        <TabsContent value="shared" className="mt-4">
          <Tabs value={sharedTab} onValueChange={setSharedTab}>
            <TabsList>
              <TabsTrigger value="incoming">Мне поделились</TabsTrigger>
              <TabsTrigger value="outgoing">Я поделился</TabsTrigger>
            </TabsList>

            <TabsContent value="incoming" className="mt-4">
              {!incomingShared.data?.length ? (
                <EmptyState
                  title="Нет общих наборов"
                  description="Наборы, которыми друзья поделились с вами, будут отображаться здесь."
                />
              ) : (
                <div className="grid gap-3">
                  {incomingShared.data.map((s) => (
                    <SharedSetCard key={s.id} sharedSet={s} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="outgoing" className="mt-4">
              {!outgoingShared.data?.length ? (
                <EmptyState
                  title="Нет общих наборов"
                  description="Наборы, которыми вы поделились, будут отображаться здесь."
                />
              ) : (
                <div className="grid gap-3">
                  {outgoingShared.data.map((s) => (
                    <SharedSetCard
                      key={s.id}
                      sharedSet={s}
                      showUnshare
                      onUnshare={(shareId) => {
                        unshare.mutate(shareId, {
                          onSuccess: () => toast.success("Доступ отменён"),
                          onError: (err) =>
                            toast.error(getApiErrorMessage(err)),
                        });
                      }}
                      isUnsharing={unshare.isPending}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-12 text-center">
      {icon}
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
