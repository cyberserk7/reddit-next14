import { Skeleton } from "../ui/skeleton"

const FeedSkeleton = () => {
  return (
    <div className="space-y-5">
        <Skeleton className="w-full bg-skeleton h-40 rounded-lg" />
        <Skeleton className="w-full bg-skeleton h-40 rounded-lg" />
    </div>
  )
}

export default FeedSkeleton