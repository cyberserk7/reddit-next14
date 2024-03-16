"use client"

import { cn, formatTimeToNow } from "@/lib/utils";
import { Comment, Post, Subreddit, User, Vote } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";
import UserAvatar from "./user-avatar";
import { useSession } from "next-auth/react";
import PostDropdownBtn from "./post/post-dropdown-btn";
import PostVoteClient from "./post/vote-client";

type PartialVote = Pick<Vote, "type">;

interface PostComponentProps {
    index: number;
    voteAmount: number;
    currentVote?: PartialVote;
    className?: string;
    commentAmount: number;
    post: Post & {
        subreddit: Subreddit;
        comments: Comment[];
        votes: Vote[];
        author: User;
    }
    isSubredditPage?: boolean,
    isPostPage?: boolean;
}

const PostComponent = ({
    index,
    commentAmount,
    currentVote,
    post,
    voteAmount,
    className,
    isSubredditPage,
    isPostPage
} : PostComponentProps) => {
  const {data: session} = useSession();
  let showDropdown: boolean = false;
  if(session) {
    const isAuthor = post.authorId === session.user.id ? true : false;
    const isCommunityCreator = post.subreddit.creatorId === session.user.id ? true : false;
    showDropdown = isAuthor || isCommunityCreator;
  }
  return (
    <div className={cn(
      "hover:bg-[#131F23] rounded-md hover:shadow transition group",
      className
    )}>
      {isSubredditPage && index !== 0 && (
        <div className="h-[1px] bg-gray-800 mb-1" />
      )}
      <div className="px-5 py-4 flex justify-between items-center">
        <div className="w-0 flex-1 space-y-2">
          <div className="max-h-40 text-xs text-gray-200 flex items-center justify-between">
            {isSubredditPage ? (
              <div className="flex items-center gap-1.5 text-xs">
                <UserAvatar imageUrl={post.author.image!} className="lg:h-7"  />
                <span className="font-medium">
                  u/
                  {post.author.username}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">
                  {formatTimeToNow(new Date(post.createdAt))}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Link
                  className={cn(
                    "h-6 aspect-square rounded-full bg-[#1A282D] flex items-center justify-center overflow-hidden relative",
                    isPostPage && "h-9"
                  )}
                  href={`/r/${post.subreddit.name}`}
                >
                  {!post.subreddit.subredditImageURL ? (
                    <span className="text-gray-400">
                      {post.subreddit.name[0]}
                    </span>
                  ) : (
                    <Image
                      src={post.subreddit.subredditImageURL}
                      fill
                      alt="reddit image"
                      className="object-cover"
                    />
                  )}
                </Link>
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <a
                      href={`/r/${post.subreddit.name}`}
                      className={cn(
                        "hover:underline transition",
                        isPostPage && "font-bold"
                      )}
                    >
                      r/{post.subreddit.name}
                    </a>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">
                      {formatTimeToNow(new Date(post.createdAt))}
                    </span>
                  </div>
                  <span>u/{post.author.id}</span>
                </div>
              </div>
            )}
            {showDropdown && (
              <PostDropdownBtn
                postId={post.id}
              />
            )}
          </div>
          <a
            className="text-xl font-medium block"
            href={`/r/${post.subreddit.name}/${post.id}`}
          >
            {post.title}
          </a>
          <span className="text-sm text-gray-300">{post.description}</span>
          {post.imageURL && (
            <>
              <Image
                src={post.imageURL}
                className="object-contain w-full rounded-md cursor-pointer"
                width={1920}
                height={1080}
                alt="post image"
                priority
                quality={95}
                onClick={() => {}}
              />
            </>
          )}
          <div className="flex items-center gap-3">
            <PostVoteClient
              postId={post.id}
              initialVotesAmt={voteAmount}
              initialVote={currentVote?.type}
            />
            <a
              className="rounded-full bg-[#1A282D] flex gap-2 items-center px-3 py-1.5 hover:bg-[#223237] transition cursor-pointer"
              href={`/r/${post.subreddit.name}/${post.id}`}
            >
              <div className="">
                <FaRegMessage className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{commentAmount}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostComponent