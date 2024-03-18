"use client"

import UserAvatar from "@/components/user-avatar";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Comment, CommentVote, Post, User, VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";
import CommentDropdownBtn from "./comment-dropdown-btn";
import CommentVoteClient from "./comment-vote-client";
import { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { postCommentPayload } from "@/schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CommentProps {
    votesAmount: number;
    currentVote?: VoteType | null;
    comment: Comment & {
        votes: CommentVote[];
        author: User;
        post: Post;
    }
}

const CommentItem = ({comment, votesAmount, currentVote} : CommentProps) => {
    const {data: session} = useSession();
    const router = useRouter();

    const [isReplying, setIsReplying] = useState(false);
    const [text, setText] = useState("");

    const { onOpen } = useModal(); 

    let canDelete: boolean = false;
    if(session) {
        canDelete = session.user.id === comment.authorId || session.user.id === comment.post.authorId;
    }

    const isOP = comment.authorId === comment.post.authorId;

    const {mutate: CreateComment, isPending} = useMutation({
        mutationFn: async () => {
            const payload: postCommentPayload = {
                postId: comment.postId,
                text,
                replyToId: comment.id,
            }
            await axios.post(`/api/comment`, payload)
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.status === 401) {
                    return toast.error("Unauthorized")
                }
                return toast.error("Something went wrong");
            }
            return toast.error("Invalid inputs passed")
        },
        onSuccess: () => {
            setText("");
            setIsReplying(false);
            router.refresh();
        }
    })

    return (
        <div className={cn("flex flex-col hit-fit w-full text-sm")}>
            <div className="flex items-center justify-between gap-1">
                <div className="flex gap-2 items-start w-full">
                    <UserAvatar imageUrl={comment.author.image!} className="h-7" />
                    <div className="flex flex-col gap-0 w-full">
                        <div className="text-xs flex items-center gap-1 justify-between">
                            <div className="flex gap-1">
                                <span className="font-medium">{comment.author.username}</span>
                                {isOP && <span className="text-xs font-medium text-blue-500">OP</span>}
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-500">
                                    {formatTimeToNow(new Date(comment.createdAt))}
                                </span>
                            </div>
                            {canDelete && (
                                <CommentDropdownBtn commentId={comment.id} />
                            )}
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
                        {isReplying && (
                            <div className="space-y-2 mt-2">
                                <Textarea placeholder="Add a comment" className="outline-none border-gray-800" value={text} onChange={(e) => setText(e.target.value)} />
                                <div className="w-full flex justify-end gap-2">
                                    <Button 
                                        className="bg-skeleton hover:bg-skeleton/90 text-xs rounded-full" 
                                        size={"sm"}
                                        onClick={() => {
                                            setText("");
                                            setIsReplying(false);
                                        }}
                                        disabled={isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        className="bg-blue-500 hover:bg--blue-500/90 text-xs rounded-full" 
                                        size={"sm"}
                                        onClick={() => {
                                            if(!session) {
                                                onOpen("auth")
                                            }else{
                                                CreateComment();
                                            }
                                        }}
                                        disabled={isPending || text.length === 0}
                                    >
                                        {isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                                        Comment
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem