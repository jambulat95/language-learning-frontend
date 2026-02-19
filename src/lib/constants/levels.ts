import type { LanguageLevel } from "@/types";

export const LEVELS: Record<LanguageLevel, { label: string; description: string }> = {
  A1: { label: "A1", description: "Начальный — базовые фразы и выражения" },
  A2: { label: "A2", description: "Элементарный — простые повседневные темы" },
  B1: { label: "B1", description: "Средний — знакомые темы, ситуации в поездках" },
  B2: { label: "B2", description: "Выше среднего — сложные тексты, свободное общение" },
  C1: { label: "C1", description: "Продвинутый — сложные тексты, скрытый смысл" },
  C2: { label: "C2", description: "Владение в совершенстве — понимание на уровне носителя" },
};

export const LEVEL_KEYS = Object.keys(LEVELS) as LanguageLevel[];
