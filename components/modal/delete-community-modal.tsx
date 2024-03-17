"use client"

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const DeleteCommunityModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const {subredditName} = data;
    const showModal = isOpen && type === "deleteCommunity"
    const router = useRouter();
    const {mutate: DeleteCommunity, isPending} = useMutation({
        mutationFn: async () => {
            await axios.delete(`/api/community/${subredditName}`)
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.request === 500) {
                    return toast.error("Something went wrong");
                }else if(err.response?.request === 401) {
                    return toast.error("Unauthorized request");
                }else if(err.response?.request === 404) {
                    return toast.error("The subreddit does not exist");
                }else{
                    return toast.error("Something went wrong")
                }
            }else{
                return toast.error("Something went wrong");
            }
        },
        onSuccess: () => {
            onClose();
            router.push("/");
            router.refresh();
        }
    })
  return (
    <Dialog open={showModal} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B1416] border-none outline-none space-y-0">
            <h1 className="text-lg font-medium">
                Delete Community
            </h1>   
            <span className="text-sm text-gray-400">This action cannot be undone and the data will be wiped from our servers.</span>
            <div className="w-full flex justify-end">
                <div className="flex items-center gap-2">
                    <Button 
                        size={"sm"} 
                        className="bg-skeleton hover:bg-skeleton/90"
                        onClick={() => {
                            onClose();
                        }}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button 
                        size={"sm"} 
                        className="bg-red-600 hover:bg-red-600/90 flex"
                        onClick={() => {
                            DeleteCommunity();
                        }}
                        disabled={isPending}
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                        
                        Continue
                    </Button>
                </div>
            </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteCommunityModal