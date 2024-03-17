"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react"

const CommentInput = () => {
    const {data: session} = useSession();

  return (
    <div className="w-full space-y-2">
        <Textarea className="w-full border border-gray-800 rounded-lg outline-none" placeholder="Add a comment" />
        <div className="w-full flex justify-end">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-500/90">
                Comment
            </Button>
        </div>
    </div>
    
  )
}

export default CommentInput