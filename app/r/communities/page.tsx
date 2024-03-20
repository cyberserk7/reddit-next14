import { db } from "@/lib/db";
import TopCommunities from "./_components/top-communities";

const CommunitiesPage = async ({
    searchParams
} : {
    searchParams: {
        name: string;
    }
}) => {

    let whereClause = {}
    if(searchParams.name){
        whereClause = {
            name: {
                contains: searchParams.name,
            }
        }
    }

    const communities = await db.subreddit.findMany({
        where: whereClause,
        include: {
            subscriptions: true,
        },
        orderBy: {
            subscriptions: {
                _count: "desc"
            }
        }
    })

    return (
        <div className="w-full h-full flex justify-center">
            {communities.length === 0 ? (
                <span className="mt-40 text-lg font-semibold text-muted-foreground">
                    No communities to show
                </span>
            ) : (
                <TopCommunities communities={communities} />
            )}
        </div>
    )
}

export default CommunitiesPage