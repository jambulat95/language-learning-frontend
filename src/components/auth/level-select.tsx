import type { LanguageLevel } from "@/types";
import { LEVELS, LEVEL_KEYS } from "@/lib/constants/levels";
import { cn } from "@/lib/utils";

interface LevelSelectProps {
  value: LanguageLevel | undefined;
  onChange: (value: LanguageLevel) => void;
  error?: string;
}

export function LevelSelect({ value, onChange, error }: LevelSelectProps) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">Уровень английского</span>

      <div className="grid grid-cols-2 gap-2">
        {LEVEL_KEYS.map((key) => {
          const { label, description } = LEVELS[key];
          const selected = value === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={cn(
                "flex flex-col items-start rounded-lg border p-3 text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-primary/50",
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold",
                  selected ? "text-primary" : "text-foreground",
                )}
              >
                {label}
              </span>
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            </button>
          );
        })}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
