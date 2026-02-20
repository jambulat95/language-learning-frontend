import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "@/stores";
import {
  registerSchema,
  registerStep1Schema,
  type RegisterValues,
} from "@/lib/validations/auth";
import { getApiErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/password-input";
import { InterestPicker } from "@/components/auth/interest-picker";
import { LevelSelect } from "@/components/auth/level-select";
import { StepIndicator } from "@/components/auth/step-indicator";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

export function RegisterPage() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((s) => s.register);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setError,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      interests: [],
    },
  });

  const goToStep2 = async () => {
    const valid = await trigger(
      Object.keys(registerStep1Schema.shape) as Array<
        keyof typeof registerStep1Schema.shape
      >,
    );
    if (valid) {
      setDirection(1);
      setStep(2);
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep(1);
  };

  const onSubmit = async (data: RegisterValues) => {
    setIsSubmitting(true);
    try {
      await registerUser(data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setDirection(-1);
        setStep(1);
        setError("email", { message: "Этот email уже зарегистрирован" });
      } else {
        toast.error(getApiErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="text-center">
        <StepIndicator currentStep={step} totalSteps={2} />
        <CardTitle className="text-2xl">Создать аккаунт</CardTitle>
        <CardDescription>
          {step === 1
            ? "Введите свои данные для начала"
            : "Расскажите о себе"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="full_name">Имя</Label>
                  <Input
                    id="full_name"
                    placeholder="Иван Иванов"
                    autoComplete="name"
                    aria-invalid={!!errors.full_name}
                    {...register("full_name")}
                  />
                  {errors.full_name && (
                    <p className="text-sm text-destructive">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <PasswordInput
                    id="password"
                    placeholder="Минимум 8 символов"
                    autoComplete="new-password"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={goToStep2}
                >
                  Далее
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <Controller
                  name="language_level"
                  control={control}
                  render={({ field }) => (
                    <LevelSelect
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.language_level?.message}
                    />
                  )}
                />

                <Controller
                  name="interests"
                  control={control}
                  render={({ field }) => (
                    <InterestPicker
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.interests?.message}
                    />
                  )}
                />

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={goBack}
                  >
                    <ArrowLeft className="size-4" />
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2 className="animate-spin" />}
                    Создать аккаунт
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Войти
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
