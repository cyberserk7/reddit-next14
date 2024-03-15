"use client"

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CreatePostProps {
    hasJoined: boolean;
    subredditName: string;
}

const CreatePostButton = ({hasJoined, subredditName}:CreatePostProps) => {
    const {data: session} = useSession();
    const {onOpen} = useModal();
    const router = useRouter();
  return (
    <Button 
        className="w-full bg-blue-500 hover:bg-blue-500/90 flex items-center gap-1.5"
        onClick={() => {
            if(!session){
                onOpen("auth");
            }else{
                router.push(`/r/${subredditName}/submit`)
            }
        }}
        disabled={!hasJoined}
    >
        <Plus className="w-5 h-5 text-white" />
        Create a post
    </Button>
  )
}

export default CreatePostButton