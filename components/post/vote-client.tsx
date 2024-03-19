"use client";

import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { postVotePayload } from "@/schema";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { TbArrowBigDownFilled } from "react-icons/tb";
import { toast } from "sonner";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient = ({
  initialVotesAmt,
  postId,
  initialVote,
}: PostVoteClientProps) => {
  const {data: session} = useSession();
  const {onOpen} = useModal();
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);
  const router = useRouter();

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: postVotePayload = {
        voteType,
      };

      await axios.patch(`/api/post/${postId}/vote`, payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") {
        setVotesAmt((prev) => prev - 1);
      } else setVotesAmt((prev) => prev + 1);
      setCurrentVote(prevVote);
      if (err instanceof AxiosError) {
        if (err?.response?.status === 401) {
          return toast.error("Something went wrong");
        }
      }
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === "UP") {
          setVotesAmt((prev) => prev - 1);
        } else {
          setVotesAmt((prev) => prev + 1);
        }
      } else {
        setCurrentVote(type);
        if (type === "UP") {
          setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        } else {
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
        }
      }
    },
    onSuccess: () => {
      router.refresh();
    }
  });

  return (
    <div
      className={cn(
        "rounded-full bg-[#1A282D] flex items-center transition",
        currentVote === "UP" && "bg-[#FF4401]",
        currentVote === "DOWN" && "bg-[#6A5CFF]"
      )}
    >
      <div
        className={cn(
          "hover:bg-[#223237] w-full h-full p-2 rounded-full transition cursor-pointer hover:text-[#FF4401] ",
          currentVote && "hover:bg-transparent"
        )}
        onClick={() => {
          if(session) {
            vote("UP");
          }else{
            onOpen("auth")
          }
        }}
      >
        {currentVote === "UP" ? (
          <TbArrowBigUpFilled className="h-4 w-4 text-white" />
        ) : (
          <TbArrowBigUp className="h-4 w-4" />
        )}
      </div>
      <span className="text-sm font-medium">{votesAmt}</span>
      <div
        className={cn(
          "hover:bg-[#223237] w-full h-full p-2 rounded-full transition cursor-pointer hover:text-blue-600",
          currentVote && "hover:bg-transparent"
        )}
        onClick={() => {
          if(session) {
            vote("DOWN");
          }else{
            onOpen("auth")
          }
        }}
      >
        {currentVote === "DOWN" ? (
          <TbArrowBigDownFilled className="h-4 w-4 text-white" />
        ) : (
          <TbArrowBigDown className="h-4 w-4" />
        )}
      </div>
    </div>
  );
};

export default PostVoteClient;