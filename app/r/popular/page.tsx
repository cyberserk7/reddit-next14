import PopularFeed from "@/components/feeds/popular-feed"
import FeedSkeleton from "@/components/skeletons/feed-skeleton"
import { Suspense } from "react"

const PopularPage = () => {
  return (
    <div className="w-full lg:w-[65%] h-full">
        <Suspense fallback={
            <FeedSkeleton isSubredditPage={false} />
        }>
            <PopularFeed />
        </Suspense>
    </div>
  )
}

export default PopularPage