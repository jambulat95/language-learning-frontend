import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { generateCardsSchema, type GenerateCardsValues } from "@/lib/validations/ai";
import { LEVELS, LEVEL_KEYS } from "@/lib/constants/levels";
import { INTERESTS, INTEREST_KEYS } from "@/lib/constants/interests";
import { cn } from "@/lib/utils";
import type { LanguageLevel } from "@/types";

interface GenerateFormProps {
  onSubmit: (data: GenerateCardsValues) => void;
  isLoading: boolean;
  defaultLevel?: LanguageLevel;
  defaultInterests?: string[];
}

export function GenerateForm({
  onSubmit,
  isLoading,
  defaultLevel = "A1",
  defaultInterests = [],
}: GenerateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GenerateCardsValues>({
    resolver: zodResolver(generateCardsSchema) as Resolver<GenerateCardsValues>,
    defaultValues: {
      topic: "",
      difficulty_level: defaultLevel,
      count: 10,
      interests: defaultInterests,
    },
  });

  const selectedLevel = watch("difficulty_level");
  const selectedInterests = watch("interests");

  function toggleInterest(key: string) {
    const current = selectedInterests ?? [];
    if (current.includes(key)) {
      setValue("interests", current.filter((v) => v !== key));
    } else if (current.length < 10) {
      setValue("interests", [...current, key]);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="topic">Тема</Label>
        <Input
          id="topic"
          placeholder="Например: Путешествия, Деловые встречи, Еда..."
          {...register("topic")}
        />
        {errors.topic && (
          <p className="text-sm text-destructive">{errors.topic.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Уровень</Label>
          <Select
            value={selectedLevel}
            onValueChange={(val) =>
              setValue("difficulty_level", val as LanguageLevel)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LEVEL_KEYS.map((level) => (
                <SelectItem key={level} value={level}>
                  {LEVELS[level].label} — {LEVELS[level].description.split("—")[0].trim()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.difficulty_level && (
            <p className="text-sm text-destructive">
              {errors.difficulty_level.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="count">Количество карточек</Label>
          <Input
            id="count"
            type="number"
            min={5}
            max={30}
            {...register("count")}
          />
          {errors.count && (
            <p className="text-sm text-destructive">{errors.count.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Интересы (необязательно)</Label>
          <span className="text-xs text-muted-foreground">
            {selectedInterests?.length ?? 0} выбрано
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {INTEREST_KEYS.map((key) => {
            const { label, icon: Icon } = INTERESTS[key];
            const selected = selectedInterests?.includes(key) ?? false;
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleInterest(key)}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
              >
                <Badge
                  variant={selected ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer select-none px-3 py-1.5 text-sm",
                    selected && "shadow-sm",
                  )}
                >
                  <Icon className="size-3.5" />
                  {label}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        <Sparkles className="size-4" />
        {isLoading ? "Генерация..." : "Сгенерировать карточки"}
      </Button>
    </form>
  );
}
