import { z } from "zod";
import type { InterestType, LanguageLevel } from "@/types";

const languageLevels: [LanguageLevel, ...LanguageLevel[]] = [
  "A1", "A2", "B1", "B2", "C1", "C2",
];

const interestTypes: [InterestType, ...InterestType[]] = [
  "technology", "science", "travel", "food", "sports",
  "music", "movies", "books", "gaming", "art",
  "business", "health", "fashion", "nature", "history",
  "photography", "education", "politics", "humor", "pets",
];

export const loginSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Некорректный формат email"),
  password: z.string().min(1, "Пароль обязателен"),
});

export const registerStep1Schema = z.object({
  full_name: z
    .string()
    .min(1, "Имя обязательно")
    .max(255, "Имя слишком длинное"),
  email: z.string().min(1, "Email обязателен").email("Некорректный формат email"),
  password: z
    .string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .max(128, "Пароль должен быть не более 128 символов"),
});

export const registerStep2Schema = z.object({
  language_level: z.enum(languageLevels, {
    error: "Выберите ваш уровень",
  }),
  interests: z
    .array(z.enum(interestTypes))
    .min(3, "Выберите не менее 3 интересов")
    .max(10, "Выберите не более 10 интересов"),
});

export const registerSchema = registerStep1Schema.merge(registerStep2Schema);

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Некорректный формат email"),
});

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, "Пароль должен быть не менее 8 символов")
      .max(128, "Пароль должен быть не более 128 символов"),
    confirm_password: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Пароли не совпадают",
    path: ["confirm_password"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterStep1Values = z.infer<typeof registerStep1Schema>;
export type RegisterStep2Values = z.infer<typeof registerStep2Schema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
