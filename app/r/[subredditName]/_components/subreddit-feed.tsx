import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostComponent from "@/components/post-component";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

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
        }
    })

  return (
    <>
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
    </>
  )
}

export default SubredditFeed