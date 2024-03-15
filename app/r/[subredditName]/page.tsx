import { Suspense } from "react";
import SubredditPageHeader from "./_components/subreddit-header";
import { Skeleton } from "@/components/ui/skeleton";
import SubredditFeed from "./_components/subreddit-feed";

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
      <div className="w-full h-fit mt-20 flex flex-col-reverse lg:flex-row">
        <div className="w-full">
          <Suspense>
            <SubredditFeed subredditName={params.subredditName} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default SubredditPage