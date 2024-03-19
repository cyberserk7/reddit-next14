"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
    imageUrl: string;
    className?: string;
}

const UserAvatar = ({imageUrl, className} : UserAvatarProps) => {

  return (
    <div className={cn("h-10 rounded-full relative overflow-hidden aspect-square", className)}>
        <Image 
            src={imageUrl}
            fill
            alt="profile image"
            className="object-cover"
        />
    </div>
  )
}

export default UserAvatar