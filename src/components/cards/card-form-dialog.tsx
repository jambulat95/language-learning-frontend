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
import { cardSchema, type CardValues } from "@/lib/validations/cards";
import type { Card } from "@/types";

interface CardFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CardValues) => void;
  isLoading?: boolean;
  defaultValues?: Card | null;
}

export function CardFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  defaultValues,
}: CardFormDialogProps) {
  const isEditing = !!defaultValues;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      front_text: "",
      back_text: "",
      example_sentence: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (defaultValues) {
        reset({
          front_text: defaultValues.front_text,
          back_text: defaultValues.back_text,
          example_sentence: defaultValues.example_sentence ?? "",
        });
      } else {
        reset({ front_text: "", back_text: "", example_sentence: "" });
      }
    }
  }, [open, defaultValues, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Редактировать карточку" : "Добавить карточку"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="front_text">Лицевая сторона (английский)</Label>
            <Input
              id="front_text"
              placeholder="Слово или фраза"
              {...register("front_text")}
            />
            {errors.front_text && (
              <p className="text-sm text-destructive">
                {errors.front_text.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="back_text">Обратная сторона (перевод)</Label>
            <Input
              id="back_text"
              placeholder="Перевод"
              {...register("back_text")}
            />
            {errors.back_text && (
              <p className="text-sm text-destructive">
                {errors.back_text.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="example_sentence">Пример предложения</Label>
            <Textarea
              id="example_sentence"
              placeholder="Необязательный пример..."
              rows={2}
              {...register("example_sentence")}
            />
            {errors.example_sentence && (
              <p className="text-sm text-destructive">
                {errors.example_sentence.message}
              </p>
            )}
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
                  : "Добавление..."
                : isEditing
                  ? "Сохранить"
                  : "Добавить карточку"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
