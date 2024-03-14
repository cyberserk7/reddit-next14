"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useModal } from "@/hooks/use-modal-store";

import { Subreddit } from "@prisma/client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import SubredditAvatar from "../subreddit-avatar";

interface CommunitiesListProps {
    communities: Subreddit[];
}

const CommunitiesList = ({communities}:CommunitiesListProps) => {
    const { onOpen } = useModal();
    const router = useRouter();
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
              onOpen("createCommunity");
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
          {communities.map((subreddit) => (
            <AccordionContent 
              key={subreddit.id}
              className="flex items-center font-normal hover:bg-[#131F23] cursor-pointer gap-x-2 py-1"
              onClick={() => {
                router.push(`/r/${subreddit.name}`);
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

export default CommunitiesList