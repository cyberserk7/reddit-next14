import { Skeleton } from "../ui/skeleton"

interface FeedSkeletonProps {
  isSubredditPage?: boolean;
}

const FeedSkeleton = ({ isSubredditPage } : FeedSkeletonProps) => {
  return (
    <div className="space-y-3">
        <div className="w-full flex flex-col gap-2 lg:px-5">
            <div className="flex gap-1.5 items-center">
                <Skeleton className="w-7 h-7 rounded-full bg-skeleton">
                </Skeleton>
                <Skeleton className="h-5 w-24 rounded-full bg-skeleton">
                </Skeleton>
            </div>
            <Skeleton className="w-full h-36 bg-skeleton">
            </Skeleton>
        </div>
        <div className="w-full flex flex-col gap-2 lg:px-5">
            <div className="flex gap-1.5 items-center">
                <Skeleton className="w-7 h-7 rounded-full bg-skeleton">
                </Skeleton>
                <Skeleton className="h-5 w-24 rounded-full bg-skeleton">
                </Skeleton>
            </div>
            <Skeleton className="w-full h-36 bg-skeleton">
            </Skeleton>
        </div>
        {!isSubredditPage && (
          <>
            <div className="w-full flex flex-col gap-2 lg:px-5">
                <div className="flex gap-1.5 items-center">
                    <Skeleton className="w-7 h-7 rounded-full bg-skeleton">
                    </Skeleton>
                    <Skeleton className="h-5 w-24 rounded-full bg-skeleton">
                    </Skeleton>
                </div>
                <Skeleton className="w-full h-36 bg-skeleton">
                </Skeleton>
            </div>
            <div className="w-full flex flex-col gap-2 lg:px-5">
                <div className="flex gap-1.5 items-center">
                    <Skeleton className="w-7 h-7 rounded-full bg-skeleton">
                    </Skeleton>
                    <Skeleton className="h-5 w-24 rounded-full bg-skeleton">
                    </Skeleton>
                </div>
                <Skeleton className="w-full h-36 bg-skeleton">
                </Skeleton>
            </div>
          </>
        )}
    </div>
  )
}

export default FeedSkeleton