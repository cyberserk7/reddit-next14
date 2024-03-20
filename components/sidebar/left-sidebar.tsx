import FeedRoutes from "./feed-routes"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import CommunitiesListSection from "./communities-list-section"
import { Suspense } from "react"
import { LiaRedditAlien } from "react-icons/lia";
import Link from "next/link";


const LeftSidebar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="h-full lg:h-[calc(100vh-64px)] w-60 z-10 bg-[#0B1416] flex flex-col items-center py-5 border-r border-gray-800 justify-between">
        <div className="w-full flex flex-col items-center  space-y-4">
          <FeedRoutes />
          <div className="h-[1px] bg-gray-800 w-[90%]" />
            {session && (
              <Suspense>
                <CommunitiesListSection userId={session.user.id} />
              </Suspense>
            )}
            <div className="w-[90%]">
              <Link href={"/r/communities"} className="rounded-xl py-2.5 px-5 w-full flex items-center hover:bg-[#131F23] text-sm">
                <div className="w-max h-max flex items-center justify-center gap-3">
                    <LiaRedditAlien className="w-6 h-6" />
                    <span className="text-sm font-normal text-white">Communities</span>
                </div>
              </Link>

          </div>
        </div>
    </div>
  )
}

export default LeftSidebar