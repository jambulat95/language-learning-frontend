import { Link } from "react-router-dom";
import { BrandLogo } from "@/components/brand-logo";
import { Separator } from "@/components/ui/separator";

export function LandingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg">
              <BrandLogo className="size-5 text-primary" />
              <span>LangLearn</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Интерактивная платформа для изучения английского языка с
              AI-технологиями и интервальным повторением.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Продукт</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/register" className="hover:text-foreground transition-colors">
                  Флеш-карточки
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-foreground transition-colors">
                  AI-собеседник
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-foreground transition-colors">
                  Статистика
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-foreground transition-colors">
                  Достижения
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Поддержка</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/login" className="hover:text-foreground transition-colors">
                  Войти в аккаунт
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-foreground transition-colors">
                  Создать аккаунт
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="hover:text-foreground transition-colors">
                  Забыли пароль?
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} LangLearn. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
