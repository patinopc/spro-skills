import { Skeleton } from "../atoms/ui/skeleton";
import { Card, CardContent } from "../atoms/ui/card";
import { Separator } from "../atoms/ui/separator";

export const WeatherSkeleton = () => {
  return (
    <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 w-full animate-pulse">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Skeleton className="h-6 w-32 bg-white/20" />
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-6 mb-4">
              <Skeleton className="h-[72px] w-24 bg-white/20" />
              <div className="h-16 w-[1px] bg-white/10 hidden md:block" />
              <div className="flex flex-col items-center md:items-start gap-1">
                <Skeleton className="h-12 w-12 bg-white/20 rounded-full" />
                <Skeleton className="h-6 w-20 bg-white/20 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-5 w-56 bg-white/20 mx-auto md:mx-0" />
          </div>
          
          <Separator orientation="vertical" className="hidden md:block bg-white/10 h-auto self-stretch mx-4" />
          <Separator orientation="horizontal" className="md:hidden bg-white/10 w-full" />

          <div className="grid grid-cols-2 gap-8 w-full md:w-auto p-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-1">
                <Skeleton className="h-5 w-20 bg-white/20" />
                <Skeleton className="h-7 w-28 bg-white/20" />
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/10 my-8 w-full" />
        
        <div>
          <Skeleton className="h-4 w-24 bg-white/20 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-[126px] w-full rounded-xl bg-white/10" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
