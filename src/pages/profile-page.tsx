import { useState } from "react";
import { toast } from "sonner";
import { Save, Crown, Calendar, Mail, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LevelSelect } from "@/components/auth/level-select";
import { InterestPicker } from "@/components/auth/interest-picker";
import { useAuthStore } from "@/stores";
import { useUpdateMe } from "@/hooks/use-user";
import { useUsageLimits } from "@/hooks/use-limits";
import { LEVELS } from "@/lib/constants/levels";
import { getApiErrorMessage } from "@/lib/errors";
import type { InterestType, LanguageLevel } from "@/types";

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const updateMutation = useUpdateMe();
  const { data: limits } = useUsageLimits();

  const [fullName, setFullName] = useState(user?.full_name ?? "");
  const [level, setLevel] = useState<LanguageLevel>(user?.language_level ?? "A1");
  const [dailyGoal, setDailyGoal] = useState(user?.daily_xp_goal ?? 100);
  const [interests, setInterests] = useState<InterestType[]>(
    (user?.interests?.map((i) => i.interest) as InterestType[]) ?? [],
  );

  if (!user) return null;

  const hasChanges =
    fullName !== user.full_name ||
    level !== user.language_level ||
    dailyGoal !== user.daily_xp_goal ||
    JSON.stringify(interests) !==
      JSON.stringify(user.interests.map((i) => i.interest));

  function handleSave() {
    if (fullName.trim().length === 0) {
      toast.error("Имя не может быть пустым");
      return;
    }
    if (interests.length < 3) {
      toast.error("Выберите минимум 3 интереса");
      return;
    }

    updateMutation.mutate(
      {
        full_name: fullName.trim(),
        language_level: level,
        daily_xp_goal: dailyGoal,
        interests,
      },
      {
        onSuccess: () => toast.success("Профиль обновлён"),
        onError: (err) => toast.error(getApiErrorMessage(err)),
      },
    );
  }

  const createdAt = new Date(user.created_at).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Профиль</h1>

      {/* User info card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-5" />
            Личные данные
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="size-4" />
            {user.email}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            Зарегистрирован {createdAt}
          </div>
          <div className="flex items-center gap-2">
            {user.is_premium ? (
              <Badge className="border-amber-500 bg-amber-500/10 text-amber-600">
                <Crown className="size-3" />
                Premium
              </Badge>
            ) : (
              <Badge variant="secondary">Бесплатный план</Badge>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="fullName">Имя</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyGoal">Дневная цель XP</Label>
            <Input
              id="dailyGoal"
              type="number"
              min={10}
              max={1000}
              step={10}
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language level */}
      <Card>
        <CardHeader>
          <CardTitle>Уровень языка</CardTitle>
        </CardHeader>
        <CardContent>
          <LevelSelect value={level} onChange={setLevel} />
        </CardContent>
      </Card>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Интересы</CardTitle>
        </CardHeader>
        <CardContent>
          <InterestPicker value={interests} onChange={setInterests} />
        </CardContent>
      </Card>

      {/* Usage limits for free users */}
      {limits && !limits.is_premium && (
        <Card>
          <CardHeader>
            <CardTitle>Лимиты использования</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-md border p-3 text-center">
                <p className="text-2xl font-bold">
                  {limits.card_sets_used}/{limits.card_sets_limit}
                </p>
                <p className="text-xs text-muted-foreground">Наборы карточек</p>
              </div>
              <div className="rounded-md border p-3 text-center">
                <p className="text-2xl font-bold">
                  {limits.cards_today}/{limits.cards_today_limit}
                </p>
                <p className="text-xs text-muted-foreground">Карточек сегодня</p>
              </div>
              <div className="rounded-md border p-3 text-center">
                <p className="text-2xl font-bold">
                  {limits.ai_dialogues_used}/{limits.ai_dialogues_limit}
                </p>
                <p className="text-xs text-muted-foreground">AI-диалогов / нед.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save button */}
      <div className="flex justify-end pb-6">
        <Button
          onClick={handleSave}
          disabled={!hasChanges || updateMutation.isPending}
          size="lg"
        >
          <Save className="size-4" />
          {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </div>
  );
}
