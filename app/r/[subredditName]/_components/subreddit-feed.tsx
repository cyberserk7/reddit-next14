import { db } from "@/lib/db";

interface SubredditFeedProps {
    subredditName: string;
}

const SubredditFeed = async ({subredditName} : SubredditFeedProps) => {
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
        {posts.map((post) => {
            
        })}
    </>
  )
}

export default SubredditFeed