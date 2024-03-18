"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface PostDropdownBtnProps {
  postId: string;
}

const PostDropdownBtn = ({postId} : PostDropdownBtnProps) => {
    const router = useRouter();

    const pathname = usePathname();
    const shouldRedirect = pathname.includes(`/${postId}`);

    const {mutate: DeletePost, isPending} = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/post/${postId}`)
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.request === 500) {
                    return toast.error("Something went wrong");
                }else if(err.response?.request === 401) {
                    return toast.error("Unauthorized request");
                }else if(err.response?.request === 404) {
                    return toast.error("The post does not exist");
                }
            }else{
                return toast.error("Something went wrong");
            }
        },
        onSuccess: () => {
          if(shouldRedirect){
            router.push("/")
          }
          router.refresh();
          toast.success("The post has been deleted successfully");
        }
    })
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="text-white outline-none">
        {!isPending ? (
          <div className="p-1 rounded-full hover:bg-[#1A282D] transition">
            <MoreHorizontal className="text-white h-4 w-4" />
          </div>
        ) : (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" text-white bg-[#0B1416] border-gray-800"
        align="center"
      >     
        <DropdownMenuItem onClick={() => {
            DeletePost();
        }} className="p-0 flex justify-center">
            Delete
        </DropdownMenuItem>   
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PostDropdownBtn