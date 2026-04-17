import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200", className)} />;
}

export function SkeletonCard() {
  return <Skeleton className="h-44 w-full rounded-[28px]" />;
}

export function SkeletonRow() {
  return <Skeleton className="h-16 w-full rounded-2xl" />;
}
