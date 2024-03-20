"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LiaRedditAlien } from "react-icons/lia"

const CommunitiesBtn = () => {
    const pathname = usePathname();
    const isActive = pathname.includes("/communities")
  return (
    <Link href={"/r/communities"} className={cn("rounded-xl py-2.5 px-5 w-full flex items-center hover:bg-[#131F23] text-sm", isActive && "bg-[#1A282D] hover:bg-[#1A282D]")}>
        <div className="w-max h-max flex items-center justify-center gap-3">
            <LiaRedditAlien className="w-6 h-6" />
            <span className="text-sm font-normal text-white">Communities</span>
        </div>
    </Link>
  )
}

export default CommunitiesBtn