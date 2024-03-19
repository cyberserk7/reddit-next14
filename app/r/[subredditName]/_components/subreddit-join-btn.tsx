"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SubredditJoinBtnProps {
    hasJoined: boolean;
    subredditName: string;
    isCreator: boolean;
    className?: string;
}

const SubredditJoinBtn = ({hasJoined, subredditName, isCreator , className} : SubredditJoinBtnProps) => {
    const {onOpen} = useModal();
    const {data: session} = useSession();
    const router = useRouter();
    const {mutate: ToggleJoin, isPending} = useMutation({
        mutationFn: async () => {
            if(hasJoined) {
                await axios.patch(`/api/community/${subredditName}/leave`)
            }else{
                await axios.patch(`/api/community/${subredditName}/join`)
            }
        },
        onError: (err) => {
            return toast.error("Something went wrong");
        },
        onSuccess: () => {
            router.refresh();
        }
    })
  return (
    <Button 
        size={"sm"} 
        className={cn("px-3 rounded-full bg-blue-500 hover:bg-blue-500/90",
        hasJoined && "bg-gray-400 text-gray-200 hover:bg-gray-400/90", className)}
        disabled={isCreator}
        onClick={() => {
            if(!session) {
                onOpen("auth")
            }else{
                ToggleJoin();
            }
        }}
    >
        {hasJoined ? (
            <div className="flex items-center">
                {!isPending ? (
                    <>
                        <Check className="h-4 w-4 mr-1" />
                    </>
                ) : (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin mr-1" />
                    </>
                )} 
                <span>Joined</span>
            </div>
        ) : (
            <div className="flex items-center">
                {isPending && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
                <span>Join</span>
            </div>
        )}
    </Button>
  )
}

export default SubredditJoinBtn