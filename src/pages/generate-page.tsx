import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GenerateForm } from "@/components/ai/generate-form";
import { GeneratePreview } from "@/components/ai/generate-preview";
import { useGenerateCards } from "@/hooks/use-ai";
import { useAuthStore } from "@/stores";
import { getApiErrorMessage } from "@/lib/errors";
import type { GenerateCardsValues } from "@/lib/validations/ai";
import type { CardSetDetail } from "@/types";

const LOADING_MESSAGES = [
  "Создаём ваши карточки...",
  "Подбираем лучшую лексику...",
  "Составляем примеры предложений...",
  "Почти готово...",
];

export function GeneratePage() {
  const user = useAuthStore((s) => s.user);
  const generateMutation = useGenerateCards();
  const [result, setResult] = useState<CardSetDetail | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  function handleSubmit(data: GenerateCardsValues) {
    setResult(null);
    setLoadingMsgIndex(0);

    const interval = setInterval(() => {
      setLoadingMsgIndex((i) =>
        i < LOADING_MESSAGES.length - 1 ? i + 1 : i,
      );
    }, 3000);

    generateMutation.mutate(
      {
        topic: data.topic,
        difficulty_level: data.difficulty_level,
        count: data.count,
        interests: data.interests,
      },
      {
        onSuccess: (response) => {
          clearInterval(interval);
          setResult(response.card_set);
          toast.success(
            `Сгенерировано ${response.generated_count} карточек!`,
          );
        },
        onError: (err) => {
          clearInterval(interval);
          toast.error(getApiErrorMessage(err));
        },
      },
    );
  }

  function handleGenerateMore() {
    setResult(null);
  }

  // Loading state
  if (generateMutation.isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <div className="relative">
          <Sparkles className="size-10 text-primary animate-pulse" />
          <Loader2 className="absolute -bottom-1 -right-1 size-5 animate-spin text-muted-foreground" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-lg font-medium">
            {LOADING_MESSAGES[loadingMsgIndex]}
          </p>
          <p className="text-sm text-muted-foreground">
            This usually takes 10-20 seconds
          </p>
        </div>
      </div>
    );
  }

  // Preview state
  if (result) {
    return (
      <div className="mx-auto max-w-2xl">
        <GeneratePreview cardSet={result} onGenerateMore={handleGenerateMore} />
      </div>
    );
  }

  // Form state
  const userInterests = user?.interests?.map((i) => i.interest) ?? [];

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-5" />
            AI Card Generator
          </CardTitle>
          <CardDescription>
            Describe a topic and we'll generate flashcards tailored to your
            level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GenerateForm
            onSubmit={handleSubmit}
            isLoading={false}
            defaultLevel={user?.language_level ?? "A1"}
            defaultInterests={userInterests}
          />
        </CardContent>
      </Card>
    </div>
  );
}
