import { db } from "@/lib/db";
import CommentInput from "./comment-input";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = async ({postId} : CommentSectionProps) => {
  const comments = await db.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      comments: true,
      author: true,
    }
  })
  return (
    <div className="w-full space-y-5 px-5">
      <CommentInput />
    </div>
  )
}

export default CommentSection