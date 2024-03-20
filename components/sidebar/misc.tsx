import { PiScroll } from "react-icons/pi"
import { Button } from "../ui/button"
import { HiOutlineDocumentText, HiOutlineScale } from "react-icons/hi2"

const Misc = () => {
  return (
    <div className="">
        <Button className="rounded-xl py-2.5 px-5 w-full flex justify-start items-center hover:bg-[#131F23] text-sm bg bg-transparent">
        <div className="w-max h-max flex items-center gap-3">
            <PiScroll className="w-6 h-6" />
            <span className="text-sm font-normal text-white">Content Policy</span>
        </div>
        </Button>
        <Button className="rounded-xl py-2.5 px-5 w-full flex justify-start items-center hover:bg-[#131F23] text-sm bg bg-transparent">
        <div className="w-max h-max flex items-center gap-3">
            <HiOutlineScale className="w-6 h-6" />
            <span className="text-sm font-normal text-white">Privacy Policy</span>
        </div>
        </Button>
        <Button className="rounded-xl py-2.5 px-5 w-full flex justify-start items-center hover:bg-[#131F23] text-sm bg bg-transparent">
        <div className="w-max h-max flex items-center gap-3">
            <HiOutlineDocumentText className="w-6 h-6" />
            <span className="text-sm font-normal text-white">User Agreement</span>
        </div>
        </Button>
    </div>
  )
}

export default Misc