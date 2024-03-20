
import { Comment, CommentVote, Post, User } from "@prisma/client"
import { getServerSession } from "next-auth";
import CommentItem from "./comment";
import { authOptions } from "@/lib/auth";

interface CommentsListProps {
    comments: (Comment & {
        author: User;
        votes: CommentVote[];
        replies: (Comment & {
            author: User;
            votes: CommentVote[]
            post: Post;
        })[]
        post: Post;
    })[]
}

const CommentsList = async ({comments} : CommentsListProps) => {
    const session = await getServerSession(authOptions)
    return (
    <div className="w-full space-y-3">
        {comments.map((comment, index) => {
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
              <div key={comment.id}>
                <CommentItem
                  
                  votesAmount={votesAmount}
                  currentVote={currentVote?.type}
                  comment={comment}
                />
                <div className="pl-9">
                  {comment.replies.map((repliedComment, index) => {
                    const votesAmount = repliedComment.votes.reduce(
                      (acc, vote) => {
                        if (vote.type === "UP") return acc + 1;
                        if (vote.type === "DOWN") return acc - 1;
                        return acc;
                      },
                      0
                    );
                    const currentVote = repliedComment.votes.find(
                      (vote) => vote.userId === session?.user.id
                    );
                    return (
                      <div className="" key={repliedComment.id}>     
                        <CommentItem 
                          comment={repliedComment}
                          
                          votesAmount={votesAmount}
                          currentVote={currentVote?.type}
                        />      
                        {index != comment.replies.length - 1 && <div className="h-px bg-gray-800 w-full mb-3" />  }            
                      </div>
                    )
                  })}
                </div>
                {index != comments.length - 1 && (
                  <div className="h-px w-full bg-gray-800 mb-1" />
                )}
              </div>
            )
        })}
    </div>
  )
}

export default CommentsList