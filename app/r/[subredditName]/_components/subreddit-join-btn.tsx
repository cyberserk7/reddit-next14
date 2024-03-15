"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";

interface SubredditJoinBtnProps {
    hasJoined: boolean;
    subredditName: string;
    isCreator: boolean;
}

const SubredditJoinBtn = ({hasJoined, subredditName, isCreator} : SubredditJoinBtnProps) => {
    const {onOpen} = useModal();
    const {data: session} = useSession();
  return (
    <Button 
        size={"sm"} 
        className={cn("px-3 rounded-full bg-blue-500 hover:bg-blue-500/90",
        hasJoined && "bg-gray-400 text-gray-200")}
        disabled={isCreator}
        onClick={() => {
            if(!session) {
                onOpen("auth")
            }
        }}
    >
        {hasJoined ? (
            <div className="flex items-center">
                <Check className="h-4 w-4 mr-1" />
                <span>Joined</span>
            </div>
        ) : (
            <div className="flex">
                <span>Join</span>
            </div>
        )}
    </Button>
  )
}

export default SubredditJoinBtn