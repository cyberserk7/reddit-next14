"use client"

import { Subreddit } from "@prisma/client"
import { Loader, X } from "lucide-react";
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
            window.location.reload();
        }
    })

  return (
    <div className="w-full space-y-2">
        <h1 className="text-lg font-medium">Edit community</h1>
        <div className="w-full flex justify-center flex-col items-center gap-4">
            {subredditImageURL ? (
                <>
                    <div 
                        className="h-24 w-max aspect-square rounded-full bg-skeleton relative overflow-hidden flex justify-center items-center group cursor-pointer"
                        onClick={() => setSubredditImageURL(null)}
                    >
                        <Image 
                            src={subredditImageURL}
                            fill
                            className="object-cover group-hover:blur-sm transition"
                            alt=""
                            priority
                        />
                        <span className="z-10 font-medium hidden group-hover:block">
                            <X className="h-10 w-10" />
                        </span>           
                    </div>
                    <span className="text-sm">Community Avatar</span>
                </>

            ) : (
                <div className="flex flex-col w-full">
                    <span className="text-sm self-start">Community Avatar</span>
                    <UploadDropzone 
                        className="cursor-pointer"
                        endpoint="subredditImage"
                        onClientUploadComplete={(res) => {
                            setSubredditImageURL(res[0].url);
                        }}
                    />
                </div>
            )}
            {coverImageURL ? (
                <>
                    <div 
                        className="w-full rounded-lg bg-skeleton overflow-hidden h-24 relative group flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            setCoverImageURL(null);
                        }}
                    >
                        <Image 
                            src={coverImageURL}
                            className="object-cover group-hover:blur-sm"
                            alt="subreddit cover image"
                            fill
                        />
                        <span className="z-10 font-medium hidden group-hover:block">
                            <X className="h-10 w-10" />
                        </span>     
                    </div>  
                    <span className="text-sm">Community Cover</span>
                </>
            ) : (
                <div className="flex flex-col w-full">
                    <span className="text-sm self-start">Community Cover Image</span>
                    <UploadDropzone 
                        className="cursor-pointer"
                        endpoint="subredditCoverImage"
                        onClientUploadComplete={(res) => {
                            setCoverImageURL(res[0].url);
                        }}
                    />
                </div>
            )}
            <div className="flex w-full gap-2 mt-5">
                <Button className="bg-skeleton hover:bg-skeleton/90 w-full" onClick={() => {
                    onClose(); 
                }}
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button className="w-full flex items-center" disabled={isPending} onClick={() => EditCommunity()}>
                    {isPending && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                    Submit
                </Button>
            </div>
        </div>
    </div>
  )
}

export default EditCommunityForm