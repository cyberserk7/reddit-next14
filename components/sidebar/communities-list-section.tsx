import { db } from "@/lib/db";
import CommunitiesList from "./communities-list";

interface CommunitiesListSectionProps {
    userId: string;
}

const CommunitiesListSection = async ({ userId } : CommunitiesListSectionProps) => {
    const subscribe = await db.subscribe.findMany({
        where: {
            userId,
        },
        include: {
            subreddit: true,
        }
    }) 
    const joinedCommunities = subscribe.map((item) => item.subreddit);
  return (
    <CommunitiesList communities={joinedCommunities} />
  )
}

export default CommunitiesListSection