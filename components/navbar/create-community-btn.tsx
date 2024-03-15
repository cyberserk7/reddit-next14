"use client"

import { useCommunityModal } from "@/hooks/use-community-modal";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image"

const CreateCommunityBtn = () => {
  const { onOpen } = useModal();
  return (
    <button 
      className="hidden lg:flex text-gray-200 items-center gap-2 px-3 py-2.5 rounded-full text-sm hover:bg-[#1A282C] transition font-medium"
      onClick={() => onOpen("createCommunity")}
    >
        <Image 
            src={"/add.png"}
            className="object-contain h-4 w-max"
            alt="add"
            height={250}
            width={250}
        />
        Create
    </button>
  )
}

export default CreateCommunityBtn