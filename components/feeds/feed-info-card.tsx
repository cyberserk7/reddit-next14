import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Comment, Post, Subreddit, Vote } from "@prisma/client";
import { getServerSession } from "next-auth";
import SubredditAvatar from "../subreddit-avatar";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

const FeedInfoCard = async () => {
    const session = await getServerSession(authOptions);
    
    let posts: (Post & {
        subreddit: Subreddit;
        comments: Comment[];
        votes: Vote[];
    })[] = [];

    if(session) {
        const subscribedCommunities = await db.subscribe.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                subreddit: true,
            }
        })
        const subscribedCommunitiesId = subscribedCommunities.map(({subreddit}) => subreddit.id);

        posts = await db.post.findMany({
            where: {
                subreddit: {
                    id: {
                        in: subscribedCommunitiesId,
                    }
                }
            },
            include: {
                subreddit: true,
                comments: true,
                votes: true,
            },
            orderBy: {
                votes: {
                    _count: "desc"
                }
            },
            take: 3,
        })
    }
    const communities = await db.subreddit.findMany({
        include: {
            subscriptions: true,
        },
        orderBy: {
            subscriptions: {
                _count: "desc"
            }
        },
        take: 6
    })
  return (
    <div className={cn("hidden lg:block sticky top-[84px] w-80 rounded-lg h-max bg-[#04090A] px-5 py-3 text-xs transition space-y-5")}>
        <h1 className="uppercase text-gray-400">
            {posts.length === 0 ? "TOP COMMUNITIES" : "TOP POSTS"}
        </h1>
        {posts.length === 0 ? (
            <div className="space-y-1">
                {communities.map((community) => (
                    <Link href={`/r/${community.name}`} key={community.id} className="flex gap-2 items-center">
                        <SubredditAvatar subredditName={community.name} imageUrl={community.subredditImageURL} />
                        <div className="flex flex-col h-full">
                            <span className="text-sm font-medium">
                                r/{community.name}
                            </span>
                            <span className="text-xs text-gray-400">
                                {community.subscriptions.length} member
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="space-y-3 w-full">
                {posts.map((post, index) => {
                    const votesAmt = post.votes.reduce((acc, vote) => {
                        if (vote.type === "UP") return acc + 1;
                        if (vote.type === "DOWN") return acc - 1;
                        return acc;
                    }, 0);
                    return(
                        <>
                            <Link href={`/r/${post.subreddit.name}/${post.id}`} key={post.id} className="flex w-full h-max justify-between items-center relative">
                                <div className={cn("w-[65%] h-full flex flex-col justify-between", !post.imageURL && "w-full")}>
                                    <div className="flex gap-1 items-center">
                                        <SubredditAvatar subredditName={post.subreddit.name} imageUrl={post.subreddit.subredditImageURL} className="h-7" />
                                        <span className="text-xs font-normal">
                                            r/{post.subreddit.name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-lg font-semibold line-clamp-2">
                                            {post.title}
                                        </span>
                                    </div>
                                    <div className="flex text-xs font-light gap-1 text-gray-400">
                                        <span>{votesAmt} upvotes</span>
                                        <span>·</span>
                                        <span>{post.comments.length} comments</span>
                                    </div>
                                </div>
                                {post.imageURL && <Image
                                    src={post.imageURL}
                                    alt="subreddit image"
                                    className="rounded-lg object-cover aspect-square h-20 w-max"
                                    height={250}
                                    width={250}
                                />}
                            </Link>
                            
                            {index != posts.length - 1 && (
                                <div className="h-px bg-gray-800 w-full" />
                            )}
                           
                        </>
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default FeedInfoCard