import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  MessageSquare,
  Trophy,
  BarChart3,
  Sparkles,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { DemoFlashcard } from "@/components/landing/demo-flashcard";
import { AnimatedCounter } from "@/components/landing/animated-counter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    icon: Brain,
    title: "SRS-карточки",
    description:
      "Алгоритм интервального повторения SM-2 подстраивается под вашу память. Учите только то, что нужно повторить.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: MessageSquare,
    title: "AI-собеседник",
    description:
      "Практикуйте разговорный английский с AI. Получайте проверку грамматики и рекомендации в реальном времени.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Trophy,
    title: "Геймификация",
    description:
      "Зарабатывайте XP, повышайте уровень, соревнуйтесь в лигах и открывайте достижения.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Детальная статистика",
    description:
      "Отслеживайте прогресс с тепловой картой активности, графиками XP и оценкой уровня CEFR.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

const steps = [
  {
    num: "1",
    title: "Создайте аккаунт",
    description: "Укажите свой уровень и интересы — мы подстроимся под вас.",
  },
  {
    num: "2",
    title: "Учите слова",
    description:
      "Создавайте карточки вручную или генерируйте с помощью AI по любой теме.",
  },
  {
    num: "3",
    title: "Практикуйтесь",
    description:
      "Повторяйте по расписанию SRS и общайтесь с AI-собеседником каждый день.",
  },
];

const stats = [
  { value: 10000, suffix: "+", label: "Карточек создано" },
  { value: 500, suffix: "+", label: "Пользователей" },
  { value: 9, suffix: "", label: "Сценариев диалогов" },
  { value: 25, suffix: "", label: "Достижений" },
];

const freePlan = [
  "До 10 наборов карточек",
  "50 карточек в день",
  "5 AI-диалогов в неделю",
  "Базовая статистика",
  "Интервальное повторение",
];

const premiumPlan = [
  "Безлимитные наборы",
  "Безлимитные карточки",
  "Безлимитные AI-диалоги",
  "Расширенная статистика",
  "Приоритетная поддержка",
  "Все достижения",
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <Badge variant="secondary" className="mb-4 gap-1.5">
                  <Sparkles className="size-3" />
                  Бесплатный старт
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              >
                Учите английский{" "}
                <span className="bg-gradient-to-r from-primary via-violet-600 to-blue-600 bg-clip-text text-transparent">
                  умнее
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-4 max-w-lg text-lg text-muted-foreground leading-relaxed"
              >
                Флеш-карточки с интервальным повторением, AI-собеседник для
                практики и геймификация, которая не даст бросить.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Button size="lg" asChild>
                  <Link to="/register">
                    Начать бесплатно
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Уже есть аккаунт</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right — floating cards + demo */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Decorative floating cards */}
              <motion.div
                className="absolute -top-4 -left-4 z-0 hidden rounded-lg border bg-card/80 px-4 py-3 shadow-md backdrop-blur sm:block"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="text-xs font-medium text-muted-foreground">
                  XP сегодня
                </p>
                <p className="text-lg font-bold">+120</p>
              </motion.div>

              <motion.div
                className="absolute -right-2 -bottom-2 z-0 hidden rounded-lg border bg-card/80 px-4 py-3 shadow-md backdrop-blur sm:block"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <p className="text-xs font-medium text-muted-foreground">
                  Серия
                </p>
                <p className="text-lg font-bold">7 дней 🔥</p>
              </motion.div>

              <div className="relative z-10 w-full max-w-sm">
                <DemoFlashcard compact />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Всё для эффективного обучения
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Научно обоснованные методы, современные AI-технологии и
              мотивирующая геймификация в одной платформе.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex gap-4">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${feature.bg}`}
                    >
                      <feature.icon className={`size-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Как это работает
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Три простых шага до свободного английского.
            </p>
          </motion.div>

          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            {/* Dashed line connecting steps (desktop) */}
            <div className="absolute top-10 right-[16.7%] left-[16.7%] hidden h-px border-t-2 border-dashed border-border md:block" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-lg">
                  {step.num}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Попробуйте прямо сейчас
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Нажмите на карточку, чтобы увидеть перевод. Переключайте карточки
              стрелками.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DemoFlashcard />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground py-16 text-background sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-3xl font-extrabold sm:text-4xl">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-1 text-sm opacity-70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Тарифы</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Начните бесплатно — обновитесь, когда будете готовы.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
            {/* Free */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-bold">Бесплатный</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Всё необходимое для старта
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">0 ₽</span>
                    <span className="text-muted-foreground">/ навсегда</span>
                  </div>
                  <ul className="flex-1 space-y-3">
                    {freePlan.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/register">Начать бесплатно</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="relative h-full border-primary shadow-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1">
                    <Star className="size-3" />
                    Популярный
                  </Badge>
                </div>
                <CardContent className="flex h-full flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-bold">Премиум</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Безлимитный доступ ко всему
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">299 ₽</span>
                    <span className="text-muted-foreground">/ месяц</span>
                  </div>
                  <ul className="flex-1 space-y-3">
                    {premiumPlan.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" disabled>
                    Скоро
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet-500/10 to-blue-500/10" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"
            >
              Готовы начать учить английский?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
            >
              Присоединяйтесь бесплатно и откройте для себя эффективный способ
              изучения языка.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <Button size="lg" asChild>
                <Link to="/register">
                  Создать аккаунт
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
