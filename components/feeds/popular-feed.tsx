import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import PostComponent from "../post-component";

const PopularFeed = async () => {
    const session = await getServerSession(authOptions);

    let whereClause = {};

    if(session) {
      const subscribedCommunities = await db.subscribe.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          subreddit: true,
        }
      })
      const subscribedCommunitiesId = subscribedCommunities.map(({subreddit}) => subreddit.id)

      whereClause = {
        subreddit: {
          id: {
            in: subscribedCommunitiesId
          }
        }
      }
    }

    const posts = await db.post.findMany({
      where: whereClause,
      include: {
        subreddit: true,
        comments: true,
        votes: true,
        author: true,
      },
      orderBy: {
        votes: {
            _count: "desc"
        }
      }
    })
  return (
    <div className="w-full h-full flex flex-col gap-2">
        {posts.length === 0 ? (
          <span className="text-lg text-muted-foreground font-semibold mt-40">
            No posts to show
          </span>
        ) : (
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
                      isSubredditPage={false}
                      commentAmount={post.comments.length}
                      post={post}
                  />
                )
            })}
          </>
        )}
    </div>
  )
}

export default PopularFeed