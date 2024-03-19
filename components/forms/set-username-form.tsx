"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { SetUsernamePayload } from "@/schema";
import axios, { AxiosError } from "axios"
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { ZodError, z } from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SetUsernameForm = () => {
    const [input, setInput] = useState("");
    const {data: session} = useSession();
    const router = useRouter();

    const hasWhitespace = () => {
        return /\s/.test(input);
    }

    const {mutate: setUsername, isPending} = useMutation({
        mutationFn: async() => {
            const payload: SetUsernamePayload = {
                username: input,
            }
            await axios.patch(`/api/user/${session?.user.id}`, payload)
        },
        onError: (err) => {
            if(err instanceof AxiosError) {
                if(err.response?.status === 401) {
                    return toast.error("Only logged in users can set an username")
                }else if(err.response?.status === 500) {
                    return toast.error("Internal server error")
                }else if(err.response?.status === 404) {
                    return toast.error("User not found")
                }else if(err.response?.status === 409) {
                    return toast.error("This username is already taken")
                }
            }else if(err instanceof z.ZodError) {
                return toast.error("Invalid input")
            }else{
                return toast.error("Something went wrong")
            }
        },
        onSuccess: () => {
            window.location.reload();
        }
    })

  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Set Username</h1>
            <span className="text-sm">Please set an username to continue using the website.</span>
        </div>
      
        <Input className="outline-none bg-[#1A282D] border-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Username"
        />
        
        <div className="w-full flex justify-end">
            <Button 
                className="bg-blue-500 hover:bg-blue-500/90 w-full"
                onClick={() => setUsername()}
                disabled={isPending || input.length === 0 || hasWhitespace()}
            >
                {isPending && <Loader2 className="text-white h-4 w-4 animate-spin mr-2" />}
                Submit
            </Button>
        </div>
    </div>   
  )
}

export default SetUsernameForm