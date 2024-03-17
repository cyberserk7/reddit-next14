import AllFeed from "@/components/feeds/all-feed"
import FeedSkeleton from "@/components/skeletons/feed-skeleton"
import { Suspense } from "react"

const AllPage = () => {
  return (
    <main className="w-full h-full flex justify-between">
      <div className="w-full lg:w-[65%] h-full">
        <Suspense fallback={
          <FeedSkeleton isSubredditPage={false} />
        }>
          <AllFeed />
        </Suspense>
      </div>
    </main>
  )
}

export default AllPage