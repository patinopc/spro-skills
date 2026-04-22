import { Skeleton } from "../atoms/ui/skeleton";

export const HistorySkeleton = () => {
  return (
    <div className="space-y-4 w-full animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-7 w-32 bg-gray-200" />
        <Skeleton className="h-6 w-24 bg-red-50" />
      </div>
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-[72px] w-full rounded-xl bg-gray-100 shadow-sm" />
        ))}
      </div>
    </div>
  );
};
