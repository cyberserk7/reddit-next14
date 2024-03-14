"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useCommunityModal } from "@/hooks/use-community-modal"
import { useSheet } from "@/hooks/use-hamburger"
import { Subreddit } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SubredditAvatar from "../subreddit-avatar"


const CommunitiesSection = () => {
  const sheet = useSheet();
  const communityModal = useCommunityModal();
  const router = useRouter();

  const {data, isFetching, refetch} = useQuery({
    queryKey: ["get-subscribed-communities"],
    queryFn: async () => {
      const { data } = await axios.get('/api/subscribed')
      return data as Subreddit[];
    }
  })

  useEffect(() => {
    refetch();
  },[refetch])


  return (
    <>
      <Accordion
        type="single"
        defaultValue="item-1"
        collapsible
        className="w-[90%]"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xs uppercase tracking-wider text-gray-500 rounded-lg hover:bg-[#131F23]">Communities</AccordionTrigger>
          <AccordionContent 
            className="flex items-center font-normal hover:bg-[#131F23] cursor-pointer"
            onClick={() => {
              sheet.onClose();
              communityModal.onOpen();
            }}
          >
            <Image
              src={"/add.png"}
              className="h-5 w-max object-contain mr-2"
              height={250}
              width={250}
              alt="add"
            />
            Create a community
          </AccordionContent>
          {isFetching && !data && (
            <>
              <div className="flex items-center rounded-xl h-10 px-5 gap-x-2">
                <Skeleton className="h-8 w-8 rounded-full bg-skeleton"/>
                <Skeleton className="h-5 w-28 rounded-full bg-skeleton"/>
              </div>
              <div className="flex items-center rounded-xl h-10 px-5 gap-x-2">
                <Skeleton className="h-8 w-8 rounded-full bg-skeleton"/>
                <Skeleton className="h-5 w-28 rounded-full bg-skeleton"/>
              </div>
              <div className="flex items-center rounded-xl h-10 px-5 gap-x-2">
                <Skeleton className="h-8 w-8 rounded-full bg-skeleton"/>
                <Skeleton className="h-5 w-28 rounded-full bg-skeleton"/>
              </div>
            </>   
          )}
          {data?.map((subreddit) => (
            <AccordionContent 
              key={subreddit.id}
              className="flex items-center font-normal hover:bg-[#131F23] cursor-pointer gap-x-2 py-1"
              onClick={() => {
                router.push(`/r/${subreddit.name}`);
                sheet.onClose();
              }}
            >
              <SubredditAvatar imageUrl={subreddit.subredditImageURL} subredditName={subreddit.name} />
              <span>r/{subreddit.name}</span>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
      <div className="h-[1px] bg-gray-800 w-[90%]" />
    </>
  )
}

export default CommunitiesSection