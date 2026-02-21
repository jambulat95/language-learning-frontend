import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Welcome header + XP row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Due cards CTA */}
      <Skeleton className="h-40 w-full rounded-2xl" />

      {/* Quick actions grid */}
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>

      {/* Recent sets horizontal */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <div className="flex gap-3">
          <Skeleton className="h-20 w-40 shrink-0 rounded-xl" />
          <Skeleton className="h-20 w-40 shrink-0 rounded-xl" />
          <Skeleton className="h-20 w-40 shrink-0 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
