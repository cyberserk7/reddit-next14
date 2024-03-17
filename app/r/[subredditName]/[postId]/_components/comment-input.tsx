"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal-store";
import { postCommentPayload } from "@/schema";
import { useMutation } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface CommentInputProps {
    postId: string;
}

const CommentInput = ({postId}:CommentInputProps) => {
    const {data: session} = useSession();
    const {onOpen} = useModal();

    const [input, setInput] = useState("");
    const router = useRouter();

    const {mutate: CreateComment, isPending} = useMutation({
        mutationFn: async () => {
            const payload: postCommentPayload = {
                text: input,
                postId,
            }
            await axios.post(`/api/comment`, payload)
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.request === 401) {
                    return toast.error("Only logged in users can comment")
                }else if(err.response?.request === 500){
                    return toast.error("Internal server error");
                }else if(err.response?.request === 404){
                    return toast.error("Post not found")
                }
            }else if(err instanceof z.ZodError){
                return toast.error("Invalid inputs passed")
            }
            return toast.error("Something went wrong");
        },
        onSuccess: () => {
            setInput("");
            router.refresh();
        }
    })


  return (
    <div className="w-full space-y-2">
        <Textarea 
            className="w-full border border-gray-800 rounded-lg outline-none"               
            placeholder="Add a comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <div className="w-full flex justify-end gap-2">
            <Button 
                size="sm" 
                className="bg-blue-500 hover:bg-blue-500/90 rounded-full"
                onClick={() => {
                    if(!session) {
                        onOpen("auth")
                    }else{
                        CreateComment();
                    }
                }}
                disabled={input.length === 0 || isPending}
            >
                {isPending && (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                )}
                Comment
            </Button>
        </div>
    </div>
    
  )
}

export default CommentInput