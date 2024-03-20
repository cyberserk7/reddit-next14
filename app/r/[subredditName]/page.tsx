import { Suspense } from "react";
import SubredditPageHeader from "./_components/subreddit-header";
import { Skeleton } from "@/components/ui/skeleton";
import SubredditFeed from "./_components/subreddit-feed";
import SubredditInfoCard from "./_components/subreddit-info-card";
import FeedSkeleton from "@/components/skeletons/feed-skeleton";

const SubredditPage =  ({
    params,
} : {
    params: {
        subredditName: string;
    }
}) => {
  return (
    <div className="h-full w-full flex flex-col">
      <Suspense fallback={
        <div className="w-full h-28 md:h-32 lg:h-44">
          <Skeleton className="w-full h-full bg-skeleton">
          </Skeleton>
        </div>
      }>
        <SubredditPageHeader subredditName={params.subredditName} />
      </Suspense>
      <div className="w-full h-fit mt-20 flex flex-col-reverse lg:flex-row justify-between gap-5">
        <div className="w-full lg:w-[65%]">
          <Suspense fallback={
            <FeedSkeleton isSubredditPage={true} />
          }>
            <SubredditFeed subredditName={params.subredditName} />
          </Suspense>
        </div>
        <Suspense fallback={
          <div className="w-full lg:w-80 h-36 lg:h-44 rounded-lg">
            <Skeleton className="w-full h-full bg-skeleton">
            </Skeleton>
          </div>
        }>
          <SubredditInfoCard subredditName={params.subredditName} />
        </Suspense>
      </div>
    </div>
  )
}

export default SubredditPage