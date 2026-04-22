import { Skeleton } from "../atoms/ui/skeleton";

export const WeatherSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <Skeleton className="h-[350px] w-full rounded-2xl bg-blue-900/10" />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-xl bg-blue-900/10" />
        ))}
      </div>
    </div>
  );
};
