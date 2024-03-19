import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import SubredditJoinBtn from "./subreddit-join-btn";
import CreatePostButton from "./create-post-btn";

interface SubredditInfoCardProps {
    subredditName: string;
}

const SubredditInfoCard = async ({subredditName} : SubredditInfoCardProps) => {
    const session = await getServerSession(authOptions);

    const memberCount = await db.subscribe.count({
        where: {
            subreddit: {
                name: subredditName
            }
        }
    })

    const subreddit = await db.subreddit.findUnique({
        where: {
            name: subredditName,
        },
        include: {
            Creator: true,
        }
    }) 

    if(!subreddit) return notFound();

    let hasJoined: boolean = false;

    if(session) {
        const subscription = await db.subscribe.findUnique({
            where: {
                userId_subredditId: {
                    userId: session.user.id,
                    subredditId: subreddit.id,
                }
            }
        })
        if(subscription){
            hasJoined = true;
        }
    }

    const isCreator = subreddit.creatorId === session?.user.id

  return (
    <div className="w-full lg:w-80 h-fit lg:sticky top-[84px] rounded-lg bg-[#04090A] px-5 py-3 space-y-2">
        <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-300 text-lg">r/{subredditName}</h1>
        <SubredditJoinBtn
          isCreator={isCreator}
          subredditName={subredditName}
          hasJoined={hasJoined}
          className="w-max px-2 py-1 h-max text-xs"
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <span className="text-sm items-center ">
            Members :
            <span className="text-md font-medium ml-2">{memberCount}</span>
          </span>
          <span className="text-sm text-muted-foreground">
            This community was created by u/{subreddit.Creator?.username}
          </span>
        </div>
        <div>
          <CreatePostButton
            hasJoined={hasJoined}
            subredditName={subredditName}
          />
        </div>
      </div>
    </div>
  )
}

export default SubredditInfoCard