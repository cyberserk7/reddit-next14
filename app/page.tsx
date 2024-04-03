import FeedInfoCard from "@/components/feeds/feed-info-card";
import HomeFeed from "@/components/feeds/home-feed";
import FeedSkeleton from "@/components/skeletons/feed-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full h-max flex justify-between">
      <div className="w-full lg:w-[65%] h-max">
        <Suspense fallback={<FeedSkeleton isSubredditPage={false} />}>
          <HomeFeed />
        </Suspense>
      </div>
      <Suspense
        fallback={
          <div className="w-80 h-80 hidden lg:block">
            <Skeleton className="w-full h-full bg-skeleton"></Skeleton>
          </div>
        }
      >
        <FeedInfoCard />
      </Suspense>
    </main>
  );
}
