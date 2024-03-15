import { Suspense } from "react";
import CreatePostSection from "./_components/create-post-section";

const CreatePostPage = ({
    params
} : {
    params : {
        subredditName: string;
    }
}) => {
  return (
    <Suspense fallback={
        <div className="w-full">
            <h1 className="text-2xl font-medium">Create a post</h1>
        </div>
    }>
        <CreatePostSection subredditName={params.subredditName} />
    </Suspense>
  )
}

export default CreatePostPage