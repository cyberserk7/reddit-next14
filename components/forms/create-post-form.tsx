"use client"

import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { FileVideo, ImagePlus, PlusCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'

interface CreatePostProps  {
    subredditName: string
}

const CreatePostForm = ({subredditName}: CreatePostProps) => {
    const [isAddingImage, setIsAddingImage] = useState(false);
    const { onOpen } = useModal();
    const router = useRouter();
  return (
    <div className='w-full mt-5 space-y-5'>
        <div className=''>
            <div className='w-full space-y-1'>
                <Label>
                    Title
                </Label>
                <Input className='border-none outline-none bg-skeleton' />
            </div>
            <div className='w-full space-y-1'>
                <Label>
                    Description
                </Label>
                <Textarea className='border-none outline-none bg-skeleton' />
            </div>

            <div className='w-full space-y-1'>
                <Label>
                    Attachments
                </Label>
                <div className='w-full flex gap-2'>
                    <Button className='bg-skeleton px-2 py-1 w-full rounded-lg text-sm hover:bg-skeleton/90'
                        onClick={() => {
                            onOpen("postImageUpload")
                        }}
                    >   
                        <ImagePlus className='h-4 w-4 mr-2' />
                        Image
                    </Button>
                    <Button className='bg-skeleton px-2 py-1 w-full rounded-lg text-sm hover:bg-skeleton/90'
                        onClick={() => {
                            setIsAddingImage(true);
                        }}
                    >   
                        <FileVideo className='h-4 w-4 mr-2' />
                        Video
                    </Button>
                </div>
            </div>
        </div>
        <div className='w-full space-y-2'>
                <Button className='w-full bg-blue-500 hover:bg-blue-500/90'>
                    Submit
                </Button>
                <Button 
                    className='w-full bg-skeleton hover:bg-skeleton/90'
                    onClick={() => {
                        router.push(`/r/${subredditName}`)
                    }}
                >
                    Cancel
                </Button>
        </div>
    </div>
  )
}

export default CreatePostForm