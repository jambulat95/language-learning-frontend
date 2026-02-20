import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoCard {
  front: string;
  back: string;
  example: string;
}

const DEMO_CARDS: DemoCard[] = [
  {
    front: "Serendipity",
    back: "Счастливая случайность",
    example: "Finding that book was pure serendipity.",
  },
  {
    front: "Eloquent",
    back: "Красноречивый",
    example: "She gave an eloquent speech at the conference.",
  },
  {
    front: "Ubiquitous",
    back: "Вездесущий, повсеместный",
    example: "Smartphones have become ubiquitous in modern life.",
  },
];

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    scale: 0.95,
  }),
};

interface DemoFlashcardProps {
  compact?: boolean;
}

export function DemoFlashcard({ compact = false }: DemoFlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

  const card = DEMO_CARDS[currentIndex];

  // Hint wobble after 2 seconds if user hasn't interacted
  useEffect(() => {
    if (hasInteracted) return;
    const timer = setTimeout(() => {
      setHasInteracted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const goNext = () => {
    setFlipped(false);
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % DEMO_CARDS.length);
    setHasInteracted(true);
  };

  const goPrev = () => {
    setFlipped(false);
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + DEMO_CARDS.length) % DEMO_CARDS.length);
    setHasInteracted(true);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    setHasInteracted(true);
  };

  const minH = compact ? "min-h-[200px]" : "min-h-[260px]";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-sm">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div
              className="perspective-[1000px] cursor-pointer"
              onClick={handleFlip}
            >
              <motion.div
                className="relative w-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  rotateY: flipped ? 180 : 0,
                  ...(hasInteracted
                    ? {}
                    : { rotateY: [0, 8, -8, 5, -5, 0] }),
                }}
                transition={
                  hasInteracted
                    ? { duration: 0.5, ease: "easeInOut" }
                    : { duration: 1.2, delay: 2, ease: "easeInOut" }
                }
              >
                {/* Front */}
                <div
                  className={`${minH} rounded-xl border bg-card p-6 shadow-lg`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div
                    className={`flex ${minH} flex-col items-center justify-center text-center`}
                  >
                    <Badge variant="outline" className="mb-3">
                      English
                    </Badge>
                    <p className="text-2xl font-bold text-foreground">
                      {card.front}
                    </p>
                    {!flipped && (
                      <p className="mt-4 text-xs text-muted-foreground">
                        Нажмите, чтобы перевернуть
                      </p>
                    )}
                  </div>
                </div>

                {/* Back */}
                <div
                  className={`absolute inset-0 ${minH} rounded-xl border bg-card p-6 shadow-lg`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div
                    className={`flex ${minH} flex-col items-center justify-center text-center`}
                  >
                    <Badge variant="secondary" className="mb-3">
                      Перевод
                    </Badge>
                    <p className="text-2xl font-bold text-foreground">
                      {card.back}
                    </p>
                    <p className="mt-3 text-sm italic text-muted-foreground">
                      {card.example}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={goPrev}>
          <ChevronLeft className="size-4" />
        </Button>
        <div className="flex gap-1.5">
          {DEMO_CARDS.map((_, i) => (
            <div
              key={i}
              className={`size-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={goNext}>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
