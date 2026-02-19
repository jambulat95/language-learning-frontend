import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { confirmPasswordResetApi } from "@/api/auth";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/lib/validations/auth";
import { getApiErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/password-input";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  if (!token) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Недействительная ссылка</CardTitle>
          <CardDescription>
            Эта ссылка для сброса недействительна или истекла.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link to="/forgot-password">Запросить новую ссылку</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Пароль сброшен</CardTitle>
          <CardDescription>
            Ваш пароль был успешно изменён.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link to="/login">Перейти ко входу</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const onSubmit = async (data: ResetPasswordValues) => {
    setIsSubmitting(true);
    try {
      await confirmPasswordResetApi(token, data.new_password);
      setIsSuccess(true);
    } catch (error) {
      const message = getApiErrorMessage(error);
      toast.error(message);
      if (message.toLowerCase().includes("expired") || message.toLowerCase().includes("invalid")) {
        toast.info("Попробуйте запросить новую ссылку для сброса.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Новый пароль</CardTitle>
        <CardDescription>Введите новый пароль ниже</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new_password">Новый пароль</Label>
            <PasswordInput
              id="new_password"
              placeholder="Минимум 8 символов"
              autoComplete="new-password"
              aria-invalid={!!errors.new_password}
              {...register("new_password")}
            />
            {errors.new_password && (
              <p className="text-sm text-destructive">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Подтвердите пароль</Label>
            <PasswordInput
              id="confirm_password"
              placeholder="Повторите пароль"
              autoComplete="new-password"
              aria-invalid={!!errors.confirm_password}
              {...register("confirm_password")}
            />
            {errors.confirm_password && (
              <p className="text-sm text-destructive">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            Сбросить пароль
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
