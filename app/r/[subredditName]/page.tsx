import { Suspense } from "react";
import SubredditPageHeader from "./_components/subreddit-header";
import { Skeleton } from "@/components/ui/skeleton";

const SubredditPage = async ({
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
    </div>
  )
}

export default SubredditPage