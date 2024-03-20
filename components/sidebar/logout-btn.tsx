"use client"

import { TbLogout } from "react-icons/tb";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <Button 
      className="rounded-xl py-2.5 px-5 w-full flex items-center justify-start bg-transparent hover:bg-[#131F23] text-sm"
      onClick={() => signOut()}
    >
        <div className="w-max h-max flex items-center justify-center gap-3">
            <TbLogout className="w-6 h-6" />
            <span className="text-sm font-normal text-white">Logout</span>
        </div>
    </Button>
  )
}

export default LogoutBtn