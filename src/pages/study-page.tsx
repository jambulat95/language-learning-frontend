import { useCallback, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Flashcard } from "@/components/study/flashcard";
import { RatingButtons } from "@/components/study/rating-buttons";
import { StudyProgressBar } from "@/components/study/study-progress-bar";
import { SessionResults } from "@/components/study/session-results";
import { StudyEmpty } from "@/components/study/study-empty";
import { StudySkeleton } from "@/components/study/study-skeleton";
import { useDueCards, useSubmitReview } from "@/hooks/use-study";
import { getApiErrorMessage } from "@/lib/errors";
import type { ReviewRating, ReviewResult } from "@/types";

export function StudyPage() {
  const { id: setId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isPractice = searchParams.get("practice") === "true";
  const { data: cards, isLoading, error, refetch } = useDueCards(setId!, 20, isPractice);
  const reviewMutation = useSubmitReview(setId!);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<ReviewResult[]>([]);
  const [sessionDone, setSessionDone] = useState(false);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const totalCards = cards?.length ?? 0;
  const currentCard = cards?.[currentIndex] ?? null;

  const handleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  function handleRate(rating: ReviewRating) {
    if (!currentCard) return;

    reviewMutation.mutate(
      { cardId: currentCard.id, rating },
      {
        onSuccess: (result) => {
          setResults((prev) => [...prev, result]);

          if (result.xp_earned > 0) {
            toast.success(`+${result.xp_earned} XP`);
          }

          if (result.new_achievements?.length) {
            for (const achievement of result.new_achievements) {
              toast("Достижение разблокировано: " + achievement.title, {
                icon: "🏆",
              });
            }
          }

          setTotalXpEarned((prev) => prev + (result.xp_earned ?? 0));

          if (currentIndex + 1 < totalCards) {
            setCurrentIndex((prev) => prev + 1);
            setFlipped(false);
          } else {
            setSessionDone(true);
          }
        },
        onError: (err) => {
          toast.error(getApiErrorMessage(err));
        },
      },
    );
  }

  function handleStudyAgain() {
    setCurrentIndex(0);
    setFlipped(false);
    setResults([]);
    setSessionDone(false);
    setTotalXpEarned(0);
    refetch();
  }

  if (isLoading) return <StudySkeleton />;

  if (error) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/sets/${setId}`}>
            <ArrowLeft className="size-4" />
            Назад к набору
          </Link>
        </Button>
        <p className="text-destructive">Не удалось загрузить карточки для изучения.</p>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return <StudyEmpty setId={setId!} isPractice={isPractice} />;
  }

  if (sessionDone) {
    const correctCount = results.filter((r) => r.is_correct).length;
    const incorrectCount = results.length - correctCount;

    return (
      <SessionResults
        totalReviewed={results.length}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        xpEarned={totalXpEarned}
        setId={setId!}
        onStudyAgain={handleStudyAgain}
        isPractice={isPractice}
      />
    );
  }

  return (
    <div className="space-y-6">
      <StudyProgressBar
        current={currentIndex + 1}
        total={totalCards}
        setId={setId!}
      />

      {currentCard && (
        <>
          <Flashcard
            card={currentCard}
            flipped={flipped}
            onFlip={handleFlip}
          />

          <div className="mx-auto max-w-lg">
            {flipped ? (
              <RatingButtons
                onRate={handleRate}
                disabled={reviewMutation.isPending}
              />
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                Подумайте над ответом, затем нажмите на карточку, чтобы перевернуть
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
