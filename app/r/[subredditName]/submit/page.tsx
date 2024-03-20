import { Suspense } from "react";
import CreatePostSection from "./_components/create-post-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const CreatePostPage = ({
    params
} : {
    params : {
        subredditName: string;
    }
}) => {
  return (
    <Suspense fallback={
        <div className="w-full lg:w-[65%]">
            <h1 className="text-2xl font-medium">Create a post</h1>
            <div className="h-80 w-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-muted-foreground animate-spin" />
            </div>
        </div>
    }>
        <CreatePostSection subredditName={params.subredditName} />
    </Suspense>
  )
}

export default CreatePostPage