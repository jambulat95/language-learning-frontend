import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";
import type { ReviewRating } from "@/types";

interface RatingButtonsProps {
  onRate: (rating: ReviewRating) => void;
  disabled?: boolean;
}

export function RatingButtons({ onRate, disabled }: RatingButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="destructive"
        onClick={() => onRate("again")}
        disabled={disabled}
        className="h-auto flex-col gap-1.5 py-5 text-base"
      >
        <X className="size-6" />
        Не знаю
      </Button>
      <Button
        onClick={() => onRate("good")}
        disabled={disabled}
        className="h-auto flex-col gap-1.5 py-5 text-base bg-green-600 hover:bg-green-700 text-white"
      >
        <Check className="size-6" />
        Знаю
      </Button>
    </div>
  );
}
