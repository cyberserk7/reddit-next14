"use client"

import UserAvatar from "@/components/user-avatar";
import { formatTimeToNow } from "@/lib/utils";
import { Comment, CommentVote, Post, User, VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";
import CommentDropdownBtn from "./comment-dropdown-btn";
import CommentVoteClient from "./comment-vote-client";
import { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";

interface CommentProps {
    votesAmount: number;
    currentVote?: VoteType | null;
    comment: Comment & {
        votes: CommentVote[];
        author: User;
        post: Post;
        replies: (Comment & {
            votes: CommentVote[];
            author: User;
        })[]
    }
}

const CommentItem = ({comment, votesAmount, currentVote} : CommentProps) => {
    const {data: session} = useSession();

    const [isReplying, setIsReplying] = useState(false);

    let canDelete: boolean = false;

    if(session) {
        canDelete = session.user.id === comment.authorId || session.user.id === comment.post.authorId;
    }
    const isOP = comment.authorId === comment.post.authorId;
    return (
        <div className="flex flex-col hit-fit w-full text-sm">
            <div className="flex items-center justify-between gap-1">
                <div className="flex gap-2 items-start">
                    <UserAvatar imageUrl={comment.author.image!} className="h-7" />
                    <div className="flex flex-col">
                        <div className="text-xs flex items-center gap-1">
                            <span className="font-medium">{comment.author.username}</span>
                            {isOP && <span className="text-xs font-medium text-blue-500">OP</span>}
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">
                                {formatTimeToNow(new Date(comment.createdAt))}
                            </span>
                        </div>
                        <span className="text-sm">{comment.text}</span>
                        <div className="flex items-center">
                        <div>
                            <CommentVoteClient
                                initialVotesAmt={votesAmount}
                                initialVote={currentVote}
                                commentId={comment.id}
                            />
                        </div>
                        {!comment.replyToId && (
                            <div  onClick={() => setIsReplying(true)} className="hover:bg-[#223237] h-full rounded-full px-2.5 py-2 flex items-center gap-2 cursor-pointer">
                                <div>
                                    <FaRegMessage className="w-3.5 h-3.5" />
                                </div>
                                <button
                                    className="text-xs font-semibold flex items-center"
                                >
                                Reply
                                </button>
                            </div>
                                
                            )}
                        </div>
                    </div>
                </div>
                {canDelete && (
                    <CommentDropdownBtn commentId={comment.id} />
                )}
            </div>
        </div>
    )
}

export default CommentItem