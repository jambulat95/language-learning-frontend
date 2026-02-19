import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { requestPasswordResetApi } from "@/api/auth";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/lib/validations/auth";
import { getApiErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [debugToken, setDebugToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsSubmitting(true);
    try {
      const result = await requestPasswordResetApi(data.email);
      setIsSubmitted(true);

      if (result.reset_token) {
        setDebugToken(result.reset_token);
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Проверьте почту</CardTitle>
          <CardDescription>
            Если аккаунт с таким email существует, мы отправили ссылку для
            сброса пароля.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {debugToken && (
            <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-3 text-sm">
              <p className="font-medium text-yellow-700 dark:text-yellow-400">
                Dev-режим — ссылка для сброса:
              </p>
              <Link
                to={`/reset-password?token=${debugToken}`}
                className="text-primary hover:underline break-all"
              >
                /reset-password?token={debugToken}
              </Link>
            </div>
          )}

          <Button variant="outline" className="w-full" asChild>
            <Link to="/login">
              <ArrowLeft className="size-4" />
              Вернуться ко входу
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Забыли пароль</CardTitle>
        <CardDescription>
          Введите email, и мы отправим ссылку для сброса пароля
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            Отправить ссылку
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <Link to="/login">
              <ArrowLeft className="size-4" />
              Вернуться ко входу
            </Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
