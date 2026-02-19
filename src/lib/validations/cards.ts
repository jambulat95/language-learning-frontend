import { z } from "zod";
import type { LanguageLevel } from "@/types";

const languageLevels: [LanguageLevel, ...LanguageLevel[]] = [
  "A1", "A2", "B1", "B2", "C1", "C2",
];

export const cardSetSchema = z.object({
  title: z
    .string()
    .min(1, "Название обязательно")
    .max(255, "Название слишком длинное"),
  description: z.string().max(2000, "Описание слишком длинное").optional().or(z.literal("")),
  category: z.string().max(100, "Категория слишком длинная").optional().or(z.literal("")),
  difficulty_level: z.enum(languageLevels, {
    error: "Выберите уровень",
  }),
  is_public: z.boolean().optional(),
});

export type CardSetValues = z.infer<typeof cardSetSchema>;

export const cardSchema = z.object({
  front_text: z
    .string()
    .min(1, "Текст лицевой стороны обязателен")
    .max(500, "Текст лицевой стороны слишком длинный"),
  back_text: z
    .string()
    .min(1, "Текст обратной стороны обязателен")
    .max(500, "Текст обратной стороны слишком длинный"),
  example_sentence: z.string().max(1000, "Пример слишком длинный").optional().or(z.literal("")),
});

export type CardValues = z.infer<typeof cardSchema>;
