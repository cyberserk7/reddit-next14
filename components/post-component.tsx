import { Comment, Post, Subreddit, User, Vote } from "@prisma/client";

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
    isSubredditPage: boolean,
}

const PostComponent = ({
    index,
    commentAmount,
    currentVote,
    post,
    voteAmount,
    className,
    isSubredditPage
} : PostComponentProps) => {
  return (
    <div>PostComponent</div>
  )
}

export default PostComponent