"use client"

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Subreddit } from "@prisma/client"
import { Settings } from "lucide-react";

interface EditSubredditBtnProps {
    subreddit: Subreddit;
}

const EditSubredditBtn = ({ subreddit } : EditSubredditBtnProps) => {
  const {onOpen} = useModal();
  return (
    <Button 
      className="h-8 aspect-square w-max rounded-full bg-blue-500 hover:bg-blue-500/90 p-2"
      onClick={() => onOpen("editSubreddit", {subreddit})}
    >
        <Settings className="h-4 w-4" />
    </Button>
  )
}

export default EditSubredditBtn