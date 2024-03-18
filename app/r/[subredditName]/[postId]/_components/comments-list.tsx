import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Comment, CommentVote, Post, User, Vote } from "@prisma/client"
import { getServerSession } from "next-auth";
import CommentItem from "./comment";
import RepliedCommentItem from "./replied-comment-item";

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
              <>
                <CommentItem 
                  key={comment.id}
                  votesAmount={votesAmount}
                  currentVote={currentVote?.type}
                  comment={comment}
                />
                <div>
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
                      <div className="pl-9">     
                        <CommentItem 
                          comment={repliedComment}
                          key={repliedComment.id}
                          votesAmount={votesAmount}
                          currentVote={currentVote?.type}
                        />      
                        {index != comment.replies.length - 1 && <div className="h-px bg-gray-800 w-full mb-2" />  }
                                    
                      </div>
                    )
                  })}
                </div>
                {index != comments.length - 1 && (
                  <div className="h-px w-full bg-gray-800 mb-1" />
                )}
              </>
            )
        })}
    </div>
  )
}

export default CommentsList