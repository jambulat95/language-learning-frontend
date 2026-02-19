import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function StudySkeleton() {
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <Skeleton className="size-8" />
        <Skeleton className="h-2 flex-1" />
        <Skeleton className="h-5 w-12" />
        <Skeleton className="size-8" />
      </div>

      {/* Flashcard */}
      <div className="mx-auto max-w-lg">
        <Card>
          <CardContent className="flex min-h-[280px] flex-col items-center justify-center p-8">
            <Skeleton className="mb-4 h-5 w-12" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-6 h-4 w-36" />
          </CardContent>
        </Card>
      </div>

      {/* Rating buttons */}
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14" />
        ))}
      </div>
    </div>
  );
}
