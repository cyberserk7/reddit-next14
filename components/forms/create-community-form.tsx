"use client"

import Image from "next/image"
import { Input } from "../ui/input"
import { useState } from "react"
import { useCommunityModal } from "@/hooks/use-community-modal"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { CreateCommunityPayload } from "@/schema"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"

const CreateCommunityForm = () => {
    const [input, setInput] = useState("");
    const {onClose} = useModal();
    const router = useRouter();

    const hasWhitespace = () => {
        return /\s/.test(input);
    }

    const {mutate: CreateCommunity, isPending} = useMutation({
        mutationFn: async () => {
            const payload: CreateCommunityPayload = {
                name: input,
            };
            const { data } = await axios.post("/api/community", payload);
            return data as string;
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.status === 409) {
                    return toast.error("A community with this name exists")
                }else if(err.response?.status === 422) {
                    return toast.error("Invalid subreddit name")
                }else if(err.response?.status === 401) {
                    return toast.error("Please login to continue")
                }else if(err.response?.status === 500) {
                    return toast.error("Internal server error")
                }
            } else if(err instanceof z.ZodError) {
                return toast.error("Invalid input")
            } else {
                return toast.error("Something went wrong")
            }
        },
        onSuccess: (data) => {
           router.push(`/r/${data}`);
           onClose();
        }
    })

  return (
    <div className="w-full h-fit text-white space-y-5">
        <div className="flex flex-col gap-1">
        <div className="flex items-center gap-x-2">
          <Image
            src={"/care.png"}
            height={300}
            width={300}
            alt="Care png"
            className="h-9 w-max object-contain"
          />
          <span className="text-white text-lg font-semibold">
            Create a community
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Build and grow a community about something you care about.
        </span>
      </div>
      <div>
        <span className="w-max">Name</span>
        <p className="text-xs text-muted-foreground">
          Community names along with the capitalization cannot be changed later.
        </p>
        <div className="h-10 w-full bg-[#1A282D] mt-2 rounded-lg flex items-center px-3 gap-1">
          <span className="text-sm text-muted-foreground">r/</span>
          <Input
            className="outline-none bg-transparent border-none px-0"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center w-full gap-3">
        <Button
          className="w-full bg-[#1A282D] hover:bg-[#223339]"
          onClick={() => onClose()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          className={cn(
            "w-full bg-[#0045AC]",
            input === "" && "bg-[#1A282D]",
            input !== "" && "hover:bg-blue-500"
          )}
          onClick={() => CreateCommunity()}
          disabled={isPending || input.length === 0 || hasWhitespace()}
        >  
            {isPending && <Loader2 className="h-4 w-4 animate-spin text-white mr-1" />}   
            Create
            {input === "" ? (
                " a community"
            ) : (
                <span className="ml-1"> r/{input}</span>
            )}
        </Button>
      </div>
    </div>
  )
}

export default CreateCommunityForm