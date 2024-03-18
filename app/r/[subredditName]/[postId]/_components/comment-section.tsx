import { db } from "@/lib/db";
import CommentInput from "./comment-input";
import CommentsList from "./comments-list";
import { notFound } from "next/navigation";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = async ({postId} : CommentSectionProps) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
      replyToId: null,
    },
    include: {
      votes: true,
      author: true,
      replies: {
        include: {
          author: true,
          votes: true,
          post: true,
        }
      },
      post: true,
    },
    orderBy: {
      createdAt: "desc"
    }

  })

  return (
    <div className="w-full space-y-5 lg:px-5">
      <CommentInput postId={postId} />
      {comments.length === 0 ? (
        <span className="text-md font-semibold text-muted-foreground">
          No comments yet
        </span>
      ) : (
        <CommentsList comments={comments} />
      )}
    </div>
  )
}

export default CommentSection