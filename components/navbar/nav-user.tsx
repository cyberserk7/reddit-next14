"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import UserAvatar from "../user-avatar";
import { signOut } from "next-auth/react";
import { useModal } from "@/hooks/use-modal-store";
import { User } from "@prisma/client";


interface NavUserProps {
  imageUrl: string;
}

const NavUser = ({imageUrl} : NavUserProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const {onOpen} = useModal();
  useEffect(() => {
    setIsMounted(true);
  }, [])

  if(!isMounted) {
    return(
      <Skeleton className="bg-[#1A282C] rounded-full h-10 w-10">
      </Skeleton>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none">
          <UserAvatar imageUrl={imageUrl} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className=" bg-[#0B1416] border-gray-800 text-white p-0 flex flex-col items-center">
          <DropdownMenuItem className="hover:bg-transparent"
            onClick={() => {
              onOpen("userSettings")
            }}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-800 w-full" />
          <DropdownMenuItem onClick={(e) => {
            e.preventDefault();
            signOut();
          }}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default NavUser