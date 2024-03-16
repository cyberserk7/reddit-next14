"use client"

import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { FileVideo, ImagePlus, Loader2, X } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { UploadButton } from '@/lib/uploadthing'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { createPostPayload } from '@/schema'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

interface CreatePostProps  {
    subredditName: string
}

const CreatePostForm = ({subredditName}: CreatePostProps) => {
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const router = useRouter();

    const {mutate: CreatePost, isPending} = useMutation({
        mutationFn: async () => {
            const payload: createPostPayload = {
                title,
                caption,
                imageURL,
                videoURL,
            }
            await axios.post(`/api/community/${subredditName}/createPost`, payload)
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
        onSuccess: () => {
           router.push(`/r/${subredditName}`);
        }
    })

   
  return (
    <div className='w-full mt-5 space-y-5'>
        <div className=''>
            <div className='w-full space-y-1'>
                <Label>
                    Title
                </Label>
                <Input className='border-none outline-none bg-skeleton' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='w-full space-y-1'>
                <Label>
                    Caption
                </Label>
                <Textarea className='border-none outline-none bg-skeleton' value={caption} onChange={(e) => setCaption(e.target.value)} />
            </div>

            <div className='w-full space-y-1'>
                <Label>
                    Attachments
                </Label>
                <div className='w-full h-max flex gap-2'>
                    <div className='w-full relative h-full'>
                        {!imageURL ? (
                            <UploadButton 
                                endpoint='postImage'
                                onClientUploadComplete={(res) => {
                                    setImageURL(res[0].url);
                                }}          
                                appearance={{
                                    button: "bg-skeleton w-full",
                                    container: "min-h-10",
                                    allowedContent: "hidden",
                                }}  
                                content={{
                                    button({ready}) {
                                        if(ready) {
                                            return <div className='flex items-center gap-2'>
                                                <ImagePlus className='h-3.5 w-3.5' />
                                                <span className='text-sm font-medium'>Image</span>
                                            </div>
                                        }
                                        return <div className='flex items-center gap-2'>
                                            <ImagePlus className='h-3.5 w-3.5' />
                                        <span className='text-sm'>Image</span>
                                    </div>
                                    }
                                }}
                            />
                        ) : (
                            <Image 
                                src={imageURL}
                                alt='post image'
                                height={500}
                                width={500}
                                className='w-full object-contain rounded-lg'
                            />
                        )}
                        {imageURL && (
                            <Button 
                                className='absolute right-2 top-2 bg-red-500 hover:bg-red-500/90 backdrop-blur-sm rounded-full border h-max w-max p-1'
                                onClick={() => {
                                    setImageURL(null);
                                }}
                            >
                                <X className='w-4 h-4' />
                            </Button>
                        )}
                    </div>
                    <div className='w-full relative h-full'>
                        {!videoURL ? (
                            <UploadButton 
                                endpoint='postVideo'
                                onClientUploadComplete={(res) => {
                                    setVideoURL(res[0].url);
                                }}          
                                appearance={{
                                    button: "bg-skeleton w-full",
                                    container: "min-h-10",
                                    allowedContent: "hidden",
                                }}  
                                content={{
                                    button({ready}) {
                                        if(ready) {
                                            return <div className='flex items-center gap-2'>
                                                <FileVideo className='h-3.5 w-3.5' />
                                                <span className='text-sm font-medium'>Video</span>
                                            </div>
                                        }
                                        return <div className='flex items-center gap-2'>
                                            <FileVideo className='h-3.5 w-3.5' />
                                            <span className='text-sm font-medium'>Video</span>
                                    </div>
                                    }
                                }}
                            />
                        ) : (
                            <video src={videoURL} className='w-full object-contain'>

                            </video>
                        )}
                        {videoURL && (
                            <Button 
                                className='absolute right-2 top-2 bg-red-500 hover:bg-red-500/90 backdrop-blur-sm rounded-full border h-max w-max p-1'
                                onClick={() => {
                                    setVideoURL(null);
                                }}
                            >
                                <X className='w-4 h-4' />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full space-y-2'>
                <Button 
                    className='w-full bg-blue-500 hover:bg-blue-500/90 flex gap-1'
                    onClick={() => {    
                        CreatePost();
                    }}
                    disabled={title.length === 0 || caption.length === 0 || isPending}
                >
                    {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
                    
                    Submit
                </Button>
                <Button 
                    className='w-full bg-skeleton hover:bg-skeleton/90'
                    onClick={() => {
                        router.push(`/r/${subredditName}`)
                    }}
                    disabled={isPending}
                >
                    Cancel
                </Button>
        </div>
    </div>
  )
}

export default CreatePostForm