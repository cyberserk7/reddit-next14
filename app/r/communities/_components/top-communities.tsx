import SearchInput from "@/components/navbar/search-input";
import SubredditAvatar from "@/components/subreddit-avatar";
import { Subreddit , Subscribe} from "@prisma/client"

interface TopCommunitiesProps {
    communities: (Subreddit & {
        subscriptions: Subscribe[];
    })[]
}
const TopCommunities = ({communities} : TopCommunitiesProps) => {
  return (
    <div className="w-full space-y-5">
      <SearchInput className="w-full lg:hidden" />
      <div className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-2">
          {communities.map((community, index) => (
            <div key={community.id} className="flex">
              <div className="w-14 h-14 flex items-center justify-center">
                <span className="text-sm font-semibold">
                  {index+1}
                </span>
              </div>
              <div className="w-14 h-14 flex items-center justify-center">
                <SubredditAvatar imageUrl={community.subredditImageURL} subredditName={community.name} className="h-9" />
              </div>
              <div className="flex flex-col h-full items-start justify-center gap-1">
                <span className="font-semibold text-xs text-gray-300">
                  r/{community.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {community.subscriptions.length} {community.subscriptions.length === 1 ? "member" : "members"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopCommunities