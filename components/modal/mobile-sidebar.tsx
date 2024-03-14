"use client"

import {
    Sheet,
    SheetContent,
  } from "@/components/ui/sheet"

import LeftSidebar from "../sidebar/left-sidebar";
import { useSheet } from "@/hooks/use-hamburger";

const MobileSidebar = () => {
    const sheet = useSheet();

  return (
    <Sheet open={sheet.isOpen} onOpenChange={sheet.onClose}>
        <SheetContent side={"left"} className="p-0 ">
            <LeftSidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar