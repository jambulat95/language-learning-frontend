import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 rounded-full transition-all",
            i + 1 === currentStep
              ? "w-6 bg-primary"
              : i + 1 < currentStep
                ? "w-2 bg-primary"
                : "w-2 bg-muted",
          )}
        />
      ))}
    </div>
  );
}
