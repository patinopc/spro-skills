import { Skeleton } from "../atoms/ui/skeleton";
import { Card, CardContent } from "../atoms/ui/card";

export const HistorySkeleton = () => {
  return (
    <div className="space-y-4 w-full animate-pulse">
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-40 bg-gray-200" />
        <Skeleton className="h-9 w-28 bg-red-100 rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="bg-white/60 backdrop-blur-sm border-gray-100 shadow-sm border-none">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-32 bg-gray-300" />
                <Skeleton className="h-4 w-20 bg-gray-200" />
              </div>
              <Skeleton className="h-7 w-12 bg-gray-300" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
