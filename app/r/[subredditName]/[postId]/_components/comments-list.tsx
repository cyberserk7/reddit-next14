import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Comment, CommentVote, Post, User, Vote } from "@prisma/client"
import { getServerSession } from "next-auth";
import CommentItem from "./comment";

interface CommentsListProps {
    comments: (Comment & {
        author: User;
        votes: CommentVote[];
        replies: (Comment & {
            author: User;
            votes: CommentVote[]
        })[]
        post: Post;
    })[]
}

const CommentsList = async ({comments} : CommentsListProps) => {
    const session = await getServerSession(authOptions)
    return (
    <div className="w-full space-y-2">
        {comments.map((comment) => {
            const votesAmount = comment.votes.reduce(
                (acc, vote) => {
                  if (vote.type === "UP") return acc + 1;
                  if (vote.type === "DOWN") return acc - 1;
                  return acc;
                },
                0
              );
              const currentVote = comment.votes.find(
                (vote) => vote.userId === session?.user.id
              );
            return (
                <CommentItem 
                    key={comment.id}
                    votesAmount={votesAmount}
                    currentVote={currentVote?.type}
                    comment={comment}
                />
            )
        })}
    </div>
  )
}

export default CommentsList