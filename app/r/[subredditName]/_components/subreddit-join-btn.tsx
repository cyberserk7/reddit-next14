"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SubredditJoinBtnProps {
    hasJoined: boolean;
    subredditName: string;
    isCreator: boolean;
}

const SubredditJoinBtn = ({hasJoined, subredditName, isCreator} : SubredditJoinBtnProps) => {
    const authModal = useAuth();
  return (
    <Button 
        size={"sm"} 
        className={cn("px-3 rounded-full bg-blue-500 hover:bg-blue-500/90",
        hasJoined && "bg-gray-400 text-gray-200")}
        disabled={isCreator}
    >
        {hasJoined ? (
            <div className="flex">
                <span>Joined</span>
            </div>
        ) : (
            <div className="flex">
                <Check className="h-4 w-4 mr-2" />
                <span>Join</span>
            </div>
        )}
    </Button>
  )
}

export default SubredditJoinBtn