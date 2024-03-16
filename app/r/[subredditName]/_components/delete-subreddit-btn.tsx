"use client"

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Trash2 } from "lucide-react";

interface DeleteSubredditBtnProps {
    subredditName: string;
}

const DeleteSubredditBtn = ({subredditName} : DeleteSubredditBtnProps) => {
    const {onOpen} = useModal();
  return (
    <Button 
        className="h-8 aspect-square w-max rounded-full bg-blue-500 hover:bg-blue-500/90 p-2"
        onClick={() => onOpen("deleteCommunity", {subredditName})}
    >
        <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export default DeleteSubredditBtn