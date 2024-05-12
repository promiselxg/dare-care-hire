import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <div className="space-y-[5px]">
        <Skeleton className="h-2 w-full bg-[#171726] rounded-full" />
        <Skeleton className="h-2 w-2/3 bg-[#212136] rounded-full" />
        <Skeleton className="h-2 w-1/3 bg-[#0d0d16] rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
