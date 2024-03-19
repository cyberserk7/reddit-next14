import { authOptions } from "@/lib/auth";
import CreatePostForm from "@/components/forms/create-post-form";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface CreatePostSectionProps {
    subredditName: string;
}

const CreatePostSection = async ({subredditName} : CreatePostSectionProps) => {
    const session = await getServerSession(authOptions);
    const subreddit = await db.subreddit.findUnique({
        where: {
            name: subredditName,
        }
    })
    if(!session || !subreddit) {
        return redirect(`/r/${subredditName}`)
    }
    const hasJoined = await db.subscribe.findUnique({
        where:{
            userId_subredditId: {
                userId: session.user.id,
                subredditId: subreddit.id
            }
        }
    })
    if(!hasJoined) {
        return redirect(`/r/${subredditName}`)
    }
  return (
    <div className="w-full lg:w-[65%]">
        <h1 className="text-2xl font-medium">Create a post</h1>
        <span className="text-sm text-muted-foreground">Submit a post to r/{subredditName}</span>
        <CreatePostForm subredditName={subredditName} />
    </div>
  )
}

export default CreatePostSection