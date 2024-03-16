"use client"

import { Subreddit } from "@prisma/client"
import { Loader, Loader2, PlusCircle, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useMutation } from "@tanstack/react-query";
import { editSubredditPayload } from "@/schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface EditCommunityFormProps {
    subreddit: Subreddit | undefined;
}

const EditCommunityForm = ({ subreddit } : EditCommunityFormProps) => {
    const [subredditImageURL, setSubredditImageURL] = useState<string | null>(null);
    const [coverImageURL, setCoverImageURL] = useState<string | null>(null);
    const [isSubredditImageEditing, setIsSubredditImageEditing] = useState(false);
    const [isCoverImageEdit, setCoverImageEdit] = useState(false);
    const[hasEdited, setHasEdited] = useState(false);
    const {onClose} = useModal();
    const router = useRouter();

    useEffect(() => {
        if(subreddit) {
            setSubredditImageURL(subreddit.subredditImageURL);
            setCoverImageURL(subreddit.coverImageURL);
        }
    }, [subreddit]);

    const {mutate: EditCommunity, isPending} = useMutation({
        mutationFn: async () => {
            const payload: editSubredditPayload = {
                coverImageURL,
                subredditImageURL,
            }
            await axios.patch(`/api/community/${subreddit?.name}`, payload);
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.status === 409) {
                    return toast.error("A community with this name exists")
                }else if(err.response?.status === 422) {
                    return toast.error("Invalid subreddit name")
                }else if(err.response?.status === 401) {
                    return toast.error("Please login to continue")
                }else if(err.response?.status === 500) {
                    return toast.error("Internal server error")
                }
            } else if(err instanceof z.ZodError) {
                return toast.error("Invalid input")
            } else {
                return toast.error("Something went wrong")
            }
        },
        onSuccess:() => {
            onClose();
            router.refresh();
        }
    })

  return (
    <div className="w-full space-y-5">
        <h1 className="text-lg font-medium">Community settings</h1>
        <div className="w-full space-y-5">
            <div className="w-full space-y-2">
                <div className="w-full flex justify-between items-center">
                    <span className="text-xs">Community Avatar</span>
                    <Button 
                        className="h-max w-max p-0 text-xs bg-skeleton hover:bg-skeleton/90 px-3 py-1 flex gap-1"
                        onClick={() => {
                            if(subredditImageURL) {
                                setSubredditImageURL(null);
                            } else {
                                setIsSubredditImageEditing(true);
                            } 
                            if(isSubredditImageEditing) {
                                setIsSubredditImageEditing(false);
                            }
                            setHasEdited(true);
                        }}
                    >
                        {!isSubredditImageEditing ? (subredditImageURL ? "Remove" : "Add") : "Cancel"}
                    </Button>
                </div>
                {isSubredditImageEditing && <UploadDropzone
                    endpoint="subredditImage"
                    className="cursor-pointer"
                    onClientUploadComplete={(res) => {
                        setSubredditImageURL(res[0].url);
                        setIsSubredditImageEditing(false);
                    }}
                />}
                <div className="w-full flex justify-between items-center">
                    <span className="text-xs">Community Cover</span>
                    <Button 
                        className="h-max w-max p-0 text-xs bg-skeleton hover:bg-skeleton/90 px-3 py-1"
                        onClick={() => {
                            if(coverImageURL) {
                                setCoverImageURL(null);
                            } else {
                                setCoverImageEdit(true);
                            } 
                            if(isCoverImageEdit) {
                                setCoverImageEdit(false);
                            }
                            setHasEdited(true);
                        }}
                    >
                        {!isCoverImageEdit ? (coverImageURL ? "Remove" : "Add") : "Cancel"}
                    </Button>
                </div>
                {isCoverImageEdit && <UploadDropzone
                    endpoint="subredditCoverImage"
                    className="cursor-pointer"
                    onClientUploadComplete={(res) => {
                        setCoverImageURL(res[0].url);
                        setCoverImageEdit(false);
                    }}
                />}
                
            </div>
            <div className="w-full flex gap-2">
                <Button 
                    className="bg-skeleton hover:bg-skeleton/90 w-full" 
                    onClick={() => onClose()}
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button 
                    className="bg-blue-500 hover:bg-blue/90 w-full flex"
                    onClick={() => EditCommunity()}
                    disabled={isPending || !hasEdited}
                >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    Save
                </Button>
            </div>
        </div>
    </div>
  )
}

export default EditCommunityForm