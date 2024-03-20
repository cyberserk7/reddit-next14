import FeedRoutes from "./feed-routes"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import CommunitiesListSection from "./communities-list-section"
import { Suspense } from "react"
import { Button } from "../ui/button";
import { PiScroll } from "react-icons/pi";
import { HiOutlineScale } from "react-icons/hi2";
import { HiOutlineDocumentText } from "react-icons/hi";
import CommunitiesBtn from "./communities-btn";
import Misc from "./misc";
import SettingsBtn from "./settings-btn";
import LogoutBtn from "./logout-btn";

const LeftSidebar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="h-full lg:h-[calc(100vh-64px)] w-60 z-10 bg-[#0B1416] flex flex-col items-center py-5 border-r border-gray-800 justify-between">
      <div className="w-full flex flex-col items-center space-y-4">
        <FeedRoutes />
        <div className="h-[1px] bg-gray-800 w-[90%]" />
          {session && (
            <Suspense>
              <CommunitiesListSection userId={session.user.id} />
            </Suspense>
          )}
          <div className="w-[90%]">
            <CommunitiesBtn />
            <Misc />
          </div>
          <div className="w-[90%] h-px bg-gray-800" />
          {session && (
            <div className="w-[90%]">
              <SettingsBtn />
              <LogoutBtn />
            </div>
          )}
      </div>
    </div>
  )
}

export default LeftSidebar