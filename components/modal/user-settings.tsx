"use client"

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Label } from "../ui/label";
import { useSession } from "next-auth/react";
import UserAvatar from "../user-avatar";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { Loader2, Pencil } from "lucide-react";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { editUserSettingsPayload } from "@/schema";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserSettingsModal = () => {
    const {isOpen, onClose, type} = useModal();
    const isModalOpen = isOpen && type === "userSettings"
    const {data: session} = useSession();
    const [imageUrl, setImageUrl] = useState<null | string>(null);
    const [username, setUsername] = useState("");
    const router = useRouter();

    useEffect(() => {
        const updateUserSettings = () => {
            if (session && session.user) {
                if (session.user.image) {
                    setImageUrl(session.user.image);
                }
                if (session.user.username) {
                    setUsername(session.user.username);
                }
            }
        };
    
        updateUserSettings();
    }, [session, setImageUrl, setUsername]);

    const hasWhitespace = () => {
        return /\s/.test(username);
    }

    const {mutate: EditSetting, isPending} = useMutation({
        mutationFn: async () => {
            const payload: editUserSettingsPayload = {
                username,
                image: imageUrl!,
            }
            await axios.patch(`/api/user/${session?.user.id}/edit`, payload)
        },
        onError: (err) => {
            if(err instanceof AxiosError){
                if(err.response?.status === 500) {
                    return toast.error("Internal server error")
                } else if(err.response?.status === 401) {
                    return toast.error("Unauthorized")
                }else if(err.response?.status === 404){
                    return toast.error("User not found")
                }
            }
            if(err instanceof z.ZodError) {
                return toast.error("Invalid inputs passed")
            }
            return toast.error("Something went wrong");
        },
        onSuccess: () => {
            onClose();
            router.refresh();
        }
    })

    if(!session){
        return null;
    }
    
    
  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="bg-[#0B1416] border-none outline-none max-w-sm">
        <h1 className="text-lg font-semibold">User Settings</h1>
        <div className="w-full flex items-center gap-2 flex-col">
            {imageUrl ? 
                <div className="w-max h-max">
                    <UserAvatar className="h-24" imageUrl={imageUrl} />       
                </div> 
                    : 
                <UploadDropzone 
                    endpoint="userAvatar"
                    onClientUploadComplete={(res) => {
                        setImageUrl(res[0].url);
                    }}
                />
            }
            <div className="flex gap-2 items-center">
                <Label className="">User Avatar</Label>
                {imageUrl && (
                    <Button 
                        className=" border bg-transparent hover:bg-transparent p-1 h-max w-max"
                        onClick={() => setImageUrl(null)}
                    >
                        <Pencil className="h-3 w-3" />
                    </Button>
                )}
            </div>
            
        </div>
        <div className="w-full flex justify-center">
            <Input 
                className="border-none bg-skeleton outline-none" 
                value={username} 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="w-full flex gap-2">
                <Button 
                    className="w-full bg-skeleton hover:bg-skeleton/90"
                    onClick={() => onClose()}
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button 
                    className="w-full bg-blue-500 hover:bg-blue-500/90"
                    disabled={username.length === 0 || hasWhitespace() || isPending || !imageUrl}
                    onClick={() => {
                        EditSetting();
                    }}
                >
                    {isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                    Save
                </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserSettingsModal