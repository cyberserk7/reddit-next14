import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import LeftSidebar from "./left-sidebar"

const MobileSidebarButton = () => {
    
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="lg:hidden w-max h-max bg-transparent hover:bg-transparent">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="py-0">
        <LeftSidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebarButton