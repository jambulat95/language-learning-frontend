import type { InterestType } from "@/types";
import { INTERESTS, INTEREST_KEYS } from "@/lib/constants/interests";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface InterestPickerProps {
  value: InterestType[];
  onChange: (value: InterestType[]) => void;
  error?: string;
}

export function InterestPicker({ value, onChange, error }: InterestPickerProps) {
  const toggle = (key: InterestType) => {
    if (value.includes(key)) {
      onChange(value.filter((v) => v !== key));
    } else if (value.length < 10) {
      onChange([...value, key]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Ваши интересы</span>
        <span
          className={cn(
            "text-xs",
            value.length < 3
              ? "text-muted-foreground"
              : value.length >= 10
                ? "text-destructive"
                : "text-primary",
          )}
        >
          {value.length}/10
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {INTEREST_KEYS.map((key) => {
          const { label, icon: Icon } = INTERESTS[key];
          const selected = value.includes(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
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

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
