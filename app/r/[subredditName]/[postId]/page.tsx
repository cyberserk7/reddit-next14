import { Suspense } from "react"
import SinglePost from "./_components/single-post"
import CommentSection from "./_components/comment-section"
import { Skeleton } from "@/components/ui/skeleton"
import { Divide, Loader2 } from "lucide-react"
import SubredditInfoCard from "../_components/subreddit-info-card"

const PostIdPage = ({
    params
} : {
    params: {
        subredditName: string;
        postId: string;
    }
}) => {
  return (
    <div className="w-full flex justify-between">
        <div className="w-full lg:w-[65%] h-full">
            <Suspense fallback={
                <div className="w-full h-52">
                </div>
            }>
                <SinglePost postId={params.postId} />
            </Suspense>
            <Suspense fallback={
                <div className="w-full h-[300px] flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
                </div>
            }>
                <CommentSection postId={params.postId} />
            </Suspense>
        </div>
        <div className="hidden lg:block">
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

export default PostIdPage