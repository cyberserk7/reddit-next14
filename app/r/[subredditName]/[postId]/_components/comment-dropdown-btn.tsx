"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, isAxiosError } from "axios";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CommentDropdownBtnProps {
    commentId: string;
}

const CommentDropdownBtn = ({commentId} : CommentDropdownBtnProps) => {
    const router = useRouter();
    const {mutate: DeleteComment ,isPending} = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/comment/${commentId}`);
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.request === 401) {
                    return toast.error("Unauthorized");
                }else if(err.response?.status === 500) {
                    return toast.error("Something went wrong");
                }else if(err.response?.status === 404) {
                    return toast.error("Comment does not exist")
                }
            }
            return toast.error("Something went wrong");
        },
        onSuccess: () => {
            router.refresh();
            return toast.success("Comment has been deleted");
        }
    })

    return (
        <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="text-white outline-none">
            {!isPending ? (
            <div className="p-1 rounded-full hover:bg-[#1A282D] transition flex items-center">
                <MoreHorizontal className="text-white h-4 w-4" />
            </div>
            ) : (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
            )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
            className=" text-white bg-[#0B1416] border-gray-800 flex justify-center"
            align="center"
        >  
            <DropdownMenuItem onClick={() => DeleteComment()} className="p-0">       
                Delete
            </DropdownMenuItem> 
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CommentDropdownBtn