"use client"

import { Settings} from "lucide-react"
import { Button } from "../ui/button"
import { useModal } from "@/hooks/use-modal-store"

const SettingsBtn = () => {
  const {onOpen} = useModal();
  return (
    <Button 
      className="rounded-xl py-2.5 px-5 w-full flex items-center justify-start bg-transparent hover:bg-[#131F23] text-sm"
      onClick={() => {
        onOpen("userSettings")
      }}
    >
        <div className="w-max h-max flex items-center justify-center gap-3">
            <Settings className="w-6 h-6" />
            <span className="text-sm font-normal text-white">Settings</span>
        </div>
    </Button>
  )
}

export default SettingsBtn