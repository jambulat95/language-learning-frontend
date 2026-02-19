import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cardSetSchema, type CardSetValues } from "@/lib/validations/cards";
import type { CardSet, LanguageLevel } from "@/types";

const LEVELS: LanguageLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

interface SetFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CardSetValues) => void;
  isLoading?: boolean;
  defaultValues?: CardSet | null;
}

export function SetFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  defaultValues,
}: SetFormDialogProps) {
  const isEditing = !!defaultValues;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardSetValues>({
    resolver: zodResolver(cardSetSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty_level: "A1",
      is_public: false,
    },
  });

  useEffect(() => {
    if (open) {
      if (defaultValues) {
        reset({
          title: defaultValues.title,
          description: defaultValues.description ?? "",
          category: defaultValues.category ?? "",
          difficulty_level: defaultValues.difficulty_level,
          is_public: defaultValues.is_public,
        });
      } else {
        reset({
          title: "",
          description: "",
          category: "",
          difficulty_level: "A1",
          is_public: false,
        });
      }
    }
  }, [open, defaultValues, reset]);

  const selectedLevel = watch("difficulty_level");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Редактировать набор" : "Создать набор"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              placeholder="напр. Деловой английский"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Необязательное описание..."
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                placeholder="напр. Бизнес"
                {...register("category")}
              />
            </div>

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
                  {LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
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
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_public"
              className="size-4 rounded border"
              {...register("is_public")}
            />
            <Label htmlFor="is_public" className="font-normal">
              Сделать набор публичным
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? isEditing
                  ? "Сохранение..."
                  : "Создание..."
                : isEditing
                  ? "Сохранить"
                  : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
