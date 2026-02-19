import { Button } from "@/components/ui/button";
import { RotateCcw, ThumbsDown, ThumbsUp, Zap } from "lucide-react";
import type { ReviewRating } from "@/types";

interface RatingButtonsProps {
  onRate: (rating: ReviewRating) => void;
  disabled?: boolean;
}

const ratings: { rating: ReviewRating; label: string; icon: typeof Zap; variant: "destructive" | "outline" | "default" | "secondary" }[] = [
  { rating: "again", label: "Снова", icon: RotateCcw, variant: "destructive" },
  { rating: "hard", label: "Трудно", icon: ThumbsDown, variant: "outline" },
  { rating: "good", label: "Хорошо", icon: ThumbsUp, variant: "default" },
  { rating: "easy", label: "Легко", icon: Zap, variant: "secondary" },
];

export function RatingButtons({ onRate, disabled }: RatingButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {ratings.map(({ rating, label, icon: Icon, variant }) => (
        <Button
          key={rating}
          variant={variant}
          onClick={() => onRate(rating)}
          disabled={disabled}
          className="flex-col gap-1 py-3"
        >
          <Icon className="size-5" />
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </div>
  );
}
