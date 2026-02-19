import { z } from "zod";
import type { LanguageLevel } from "@/types";

const languageLevels: [LanguageLevel, ...LanguageLevel[]] = [
  "A1", "A2", "B1", "B2", "C1", "C2",
];

export const generateCardsSchema = z.object({
  topic: z
    .string()
    .min(1, "Тема обязательна")
    .max(200, "Тема слишком длинная"),
  difficulty_level: z.enum(languageLevels, {
    error: "Выберите уровень",
  }),
  count: z.coerce
    .number()
    .int()
    .min(5, "Минимум 5 карточек")
    .max(30, "Максимум 30 карточек"),
  interests: z.array(z.string()).default([]),
});

export type GenerateCardsValues = z.infer<typeof generateCardsSchema>;
