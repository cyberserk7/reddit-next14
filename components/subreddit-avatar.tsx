import { cn } from "@/lib/utils";
import Image from "next/image";

interface SubredditAvatarProps {
    imageUrl: string | null;
    className?: string;
    subredditName: string;
}

const SubredditAvatar = ({imageUrl, className, subredditName} : SubredditAvatarProps) => {
  return (
    <div className={cn("h-8 aspect-square rounded-full overflow-hidden bg-[#1A282C] relative flex items-center justify-center text-lg", className)}>
        {imageUrl ? (
            <Image 
                src={imageUrl}
                alt="subreddit image"
                fill
                priority
                className="object-cover"
            />
        ) : (
            <span className="font-medium text-muted-foreground">
                {subredditName[0]}
            </span>
        )}
    </div>
  )
}

export default SubredditAvatar