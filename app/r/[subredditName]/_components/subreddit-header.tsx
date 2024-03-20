import { authOptions } from "@/lib/auth";
import SubredditAvatar from "@/components/subreddit-avatar";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import SubredditJoinBtn from "./subreddit-join-btn";
import Image from "next/image";
import EditSubredditBtn from "./edit-subreddit-btn";
import DeleteSubredditBtn from "./delete-subreddit-btn";

interface SubredditPageHeaderProps {
    subredditName: string;
}

const SubredditPageHeader = async ({ subredditName } : SubredditPageHeaderProps) => {
    const session = await getServerSession(authOptions);
    const subreddit = await db.subreddit.findUnique({
        where: {
            name: subredditName
        }
    })
    if(!subreddit) {
        return notFound();
    }

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

    const isCreator = session?.user.id === subreddit.creatorId ? true : false;
  return (
    <div className="w-full h-28 md:h-32 lg:h-44 rounded-lg bg-skeleton pl-1 lg:pl-5 flex items-end relative group">
        {/* Subreddit cover image */}
        {subreddit.coverImageURL ? (
            <Image 
                src={subreddit.coverImageURL}
                fill
                alt="subreddit cover image"
                className="object-cover rounded-lg"
                priority
            />
        ) : (
            <span className="text-muted-foreground text-2xl md:text-3xl lg:text-6xl font-bold absolute inset-0 w-max h-max mx-auto my-auto">
               Welcome to r/{subredditName}
            </span>
        )}
        
        {/* This entire section is shifted down */}
        <div className="h-fit flex items-center gap-x-1 md:gap-x-2 translate-y-1/2 w-full">
            <div className="h-fit w-fit">
                <SubredditAvatar imageUrl={subreddit.subredditImageURL} subredditName={subreddit.name} className="border-4 lg:border-8 h-20 md:h-24 lg:h-32 border-background text-3xl md:text-4xl lg:text-5xl" />
            </div>
            <div className="h-fit w-full translate-y-2/3 flex justify-between items-center">
                <span className="text-2xl font-medium">r/{subreddit?.name}</span>
                <div className="flex gap-x-2">
                    <SubredditJoinBtn hasJoined={hasJoined} subredditName={subredditName} isCreator={isCreator} />
                    {isCreator && <EditSubredditBtn subreddit={subreddit} />}
                    {isCreator && <DeleteSubredditBtn subredditName={subredditName} />}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SubredditPageHeader