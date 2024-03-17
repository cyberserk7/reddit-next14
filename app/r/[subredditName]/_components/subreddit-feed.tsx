import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostComponent from "@/components/post-component";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface SubredditFeedProps {
    subredditName: string;
}

const SubredditFeed = async ({subredditName} : SubredditFeedProps) => {
    const session = await getServerSession(authOptions);
    const posts = await db.post.findMany({
        where: {
            subreddit: {
                name: subredditName,
            }
        },
        include: {
            author: true,
            subreddit: true,
            votes: true,
            comments: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    if(!posts) {
        return notFound();
    }

    if(posts.length === 0) {
        return (
            <div className="w-full px-5 h-full flex items-center justify-center">
                <h1 className="text-lg font-semibold text-muted-foreground">No posts to show</h1>
            </div>
        )
    }

  return (
    <div className="space-y-2">
        {posts.map((post, index) => {
            const voteAmount = post.votes.reduce((acc, vote) => {
                if(vote.type === "UP") return acc + 1;
                if(vote.type === "DOWN") return acc - 1;
                return acc;
            }, 0);

            const currentVote = post.votes.find((vote) => 
                vote.userId === session?.user.id
            )

            return (
                <PostComponent 
                    index={index}
                    key={post.id}
                    voteAmount={voteAmount}
                    currentVote={currentVote}
                    isSubredditPage={subredditName ? true : false}
                    commentAmount={post.comments.length}
                    post={post}
                />
            )
        })}
    </div>
  )
}

export default SubredditFeed