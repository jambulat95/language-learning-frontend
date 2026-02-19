import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StudyCard } from "@/types";

interface FlashcardProps {
  card: StudyCard;
  flipped: boolean;
  onFlip: () => void;
}

export function Flashcard({ card, flipped, onFlip }: FlashcardProps) {
  return (
    <div
      className="perspective-[1000px] mx-auto w-full max-w-lg cursor-pointer"
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Front */}
        <Card
          className="min-h-[280px] backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center">
            <Badge variant="outline" className="mb-4">
              Лицевая сторона
            </Badge>
            <p className="text-2xl font-semibold">{card.front_text}</p>
            {!flipped && (
              <p className="mt-6 text-sm text-muted-foreground">
                Нажмите, чтобы перевернуть
              </p>
            )}
          </CardContent>
        </Card>

        {/* Back */}
        <Card
          className="absolute inset-0 min-h-[280px]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center">
            <Badge variant="secondary" className="mb-4">
              Обратная сторона
            </Badge>
            <p className="text-2xl font-semibold">{card.back_text}</p>
            {card.example_sentence && (
              <p className="mt-4 text-sm italic text-muted-foreground">
                {card.example_sentence}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
