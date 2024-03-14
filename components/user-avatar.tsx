"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
    imageUrl: string;
    className?: string;
}

const UserAvatar = ({imageUrl, className} : UserAvatarProps) => {

  return (
    <div className={cn("h-10 w-10 rounded-full relative overflow-hidden", className)}>
        <Image 
            src={imageUrl}
            height={500}
            width={500}
            alt="profile image"
            className="object-cover"
        />
    </div>
  )
}

export default UserAvatar