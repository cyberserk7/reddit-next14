import { Suspense } from "react";
import SubredditPageHeader from "./_components/subreddit-header";
import { Skeleton } from "@/components/ui/skeleton";
import SubredditFeed from "./_components/subreddit-feed";
import SubredditInfoCard from "./_components/subreddit-info-card";

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
        <div className="w-full h-44">
          <Skeleton className="w-full h-full bg-skeleton">
          </Skeleton>
        </div>
      }>
        <SubredditPageHeader subredditName={params.subredditName} />
      </Suspense>
      <div className="w-full h-fit mt-20 flex flex-col-reverse lg:flex-row justify-between">
        <div className="w-full lg:w-[65%]">
          <Suspense>
            <SubredditFeed subredditName={params.subredditName} />
          </Suspense>
        </div>
        <Suspense fallback={
          <div className="w-80 h-80  rounded-lg">
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