

import { useSession } from "next-auth/react"
import CommunitiesSection from "./communities-section"
import FeedRoutes from "./feed-routes"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import CommunitiesListSection from "./communities-list-section"
import { Suspense } from "react"

const LeftSidebar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="h-full w-60 z-10 bg-[#0B1416] flex flex-col items-center py-5 border-r border-gray-800 space-y-4">
        <FeedRoutes />
        <div className="h-[1px] bg-gray-800 w-[90%]" />
        {session && (
          <Suspense>
            <CommunitiesListSection userId={session.user.id} />
          </Suspense>
        )}
    </div>
  )
}

export default LeftSidebar