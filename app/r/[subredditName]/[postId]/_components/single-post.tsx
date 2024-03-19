import { authOptions } from "@/lib/auth";
import PostComponent from "@/components/post-component";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface SinglePostProps {
    postId: string;
}

const SinglePost = async ({postId} : SinglePostProps) => {
    const session = await getServerSession(authOptions);
    const post = await db.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            subreddit: true,
            author: true,
            comments: true,
            votes: true,
        }
    })

    if(!post){
        return notFound();
    }

    const votesAmt = post.votes.reduce((acc, vote) => {
        if (vote.type === "UP") return acc + 1;
        if (vote.type === "DOWN") return acc - 1;
        return acc;
      }, 0);
    
      const currentVote = post.votes.find(
        (vote) => vote.userId === session?.user.id
      );

  return (
    <PostComponent
        commentAmount={post.comments.length}
        post={post}
        isSubredditPage={false}
        voteAmount={votesAmt}
        currentVote={currentVote}
        index={0}
        className="hover:bg-transparent"
    />
  )
}

export default SinglePost