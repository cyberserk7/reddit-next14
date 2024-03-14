"use client"

import { useSheet } from "@/hooks/use-hamburger";
import { AlignJustify } from "lucide-react"

const MobileSidebarButton = () => {
    const sheet = useSheet();
    
  return (
    <button className="lg:hidden" onClick={sheet.onOpen}>
        <AlignJustify />
    </button>
  )
}

export default MobileSidebarButton